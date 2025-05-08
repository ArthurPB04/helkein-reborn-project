
import React from 'react';
import Layout from '../components/layout/Layout';
import PricingSection from '../components/subscription/PricingSection';

const SubscriptionPage = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container-helkein">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Planos de Assinatura
            </h1>
            <p className="text-helkein-muted">
              Escolha o plano que melhor se adapta às suas necessidades e tenha acesso a conteúdos exclusivos.
            </p>
          </div>
          
          <PricingSection />
          
          <div className="max-w-2xl mx-auto mt-16 bg-helkein-light rounded-lg p-6">
            <h3 className="text-xl font-heading font-semibold mb-4">Perguntas Frequentes</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Como funciona a assinatura?</h4>
                <p className="text-helkein-muted">
                  A assinatura é cobrada mensalmente e dá acesso a todo o conteúdo premium do site, incluindo artigos exclusivos, tutoriais detalhados e recursos adicionais.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Posso cancelar a qualquer momento?</h4>
                <p className="text-helkein-muted">
                  Sim, você pode cancelar sua assinatura a qualquer momento. O acesso premium permanecerá disponível até o final do período de cobrança atual.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Quais métodos de pagamento são aceitos?</h4>
                <p className="text-helkein-muted">
                  Aceitamos pagamentos via cartão de crédito (Visa, Mastercard, American Express) e PayPal.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Existe um período de teste?</h4>
                <p className="text-helkein-muted">
                  Não oferecemos período de teste, mas você pode acessar todos os artigos gratuitos para avaliar a qualidade do nosso conteúdo antes de assinar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SubscriptionPage;
