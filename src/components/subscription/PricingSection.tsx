
import React from 'react';
import PricingCard from './PricingCard';

const PricingSection: React.FC = () => {
  // Example features for each plan
  const freePlanFeatures = [
    { title: 'Acesso a artigos gratuitos', included: true },
    { title: 'Comentários em artigos gratuitos', included: true },
    { title: 'Perfil de usuário básico', included: true },
    { title: 'Acesso a artigos premium', included: false },
    { title: 'Comentários em artigos premium', included: false },
    { title: 'Sem anúncios', included: false },
  ];
  
  const proPlanFeatures = [
    { title: 'Acesso a artigos gratuitos', included: true },
    { title: 'Comentários em artigos gratuitos', included: true },
    { title: 'Perfil de usuário avançado', included: true },
    { title: 'Acesso a artigos premium', included: true },
    { title: 'Comentários em artigos premium', included: true },
    { title: 'Sem anúncios', included: true },
  ];
  
  // Mock handlers for the subscribe buttons
  const handleSubscribeFree = () => {
    console.log('User selected Free plan');
    // Registration flow would start here
  };
  
  const handleSubscribePro = () => {
    console.log('User selected Pro plan');
    // Would redirect to payment flow
  };

  return (
    <section className="py-12">
      <div className="container-helkein">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-heading font-bold mb-4">Planos de Assinatura</h2>
          <p className="text-helkein-muted">
            Escolha o plano que melhor se adapta às suas necessidades e tenha acesso a conteúdos exclusivos.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard 
            title="Plano Gratuito"
            price={0}
            period="sempre"
            description="Ideal para visitantes ocasionais que desejam explorar nosso conteúdo básico."
            features={freePlanFeatures}
            buttonText="Registrar Gratuitamente"
            onSubscribe={handleSubscribeFree}
          />
          
          <PricingCard 
            title="Plano Premium"
            price={19.90}
            period="mês"
            description="Para entusiastas que desejam acesso completo ao nosso conteúdo exclusivo."
            features={proPlanFeatures}
            buttonText="Assinar Agora"
            highlighted
            onSubscribe={handleSubscribePro}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
