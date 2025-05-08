import express from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const router = express.Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Middleware to check if user is authenticated
const isAuthenticated = (req: any, res: any, next: any) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  next();
};

// Create subscription checkout session
router.post('/create-checkout-session', isAuthenticated, async (req, res) => {
  try {
    const { priceId } = req.body;
    const userId = (req as any).userId;
    
    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Check if user is already a subscriber
    if (user.role === 'Assinante' || user.role === 'Admin') {
      return res.status(400).json({ error: 'Usuário já é assinante' });
    }
    
    // Get or create Stripe customer
    let customerId;
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId }
    });
    
    if (existingSubscription?.stripeCustomerId) {
      customerId = existingSubscription.stripeCustomerId;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId
        }
      });
      customerId = customer.id;
      
      // Create subscription record
      await prisma.subscription.create({
        data: {
          userId,
          stripeCustomerId: customerId
        }
      });
    }
    
    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`,
      metadata: {
        userId
      }
    });
    
    return res.json({ url: session.url });
  } catch (error) {
    console.error('Create checkout session error:', error);
    return res.status(500).json({
      error: 'Erro ao criar sessão de checkout'
    });
  }
});

// Webhook to handle subscription events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature']!;
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Update user role and subscription
        await handleSuccessfulSubscription(session);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update user role back to Membro
        await handleCancelledSubscription(subscription);
        break;
      }
    }
    
    return res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({
      error: 'Erro ao processar webhook'
    });
  }
});

// Helper to handle successful subscription
async function handleSuccessfulSubscription(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  
  if (!userId) {
    console.error('No userId in session metadata');
    return;
  }
  
  if (session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    
    await prisma.$transaction([
      // Update user role
      prisma.user.update({
        where: { id: userId },
        data: { role: 'Assinante' }
      }),
      // Update subscription data
      prisma.subscription.update({
        where: { userId },
        data: {
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          status: subscription.status,
          currentPeriodEnd: new Date(subscription.current_period_end * 1000)
        }
      })
    ]);
  }
}

// Helper to handle cancelled subscription
async function handleCancelledSubscription(subscription: Stripe.Subscription) {
  // Find the subscription in our database
  const dbSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id },
    include: { user: true }
  });
  
  if (!dbSubscription) {
    console.error('No subscription found in database');
    return;
  }
  
  await prisma.$transaction([
    // Update user role back to Membro
    prisma.user.update({
      where: { id: dbSubscription.userId },
      data: { role: 'Membro' }
    }),
    // Update subscription status
    prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        status: subscription.status,
        // We keep the stripeSubscriptionId for history
        stripePriceId: null,
        currentPeriodEnd: null
      }
    })
  ]);
}

// Get subscription status for a user
router.get('/subscription-status', isAuthenticated, async (req, res) => {
  try {
    const userId = (req as any).userId;
    
    // Get user with subscription data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Subscription: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    return res.json({
      isSubscriber: user.role === 'Assinante' || user.role === 'Admin',
      subscription: user.Subscription
    });
  } catch (error) {
    console.error('Subscription status error:', error);
    return res.status(500).json({
      error: 'Erro ao buscar status da assinatura'
    });
  }
});

export default router;
