
import React from 'react';
import Layout from '../components/layout/Layout';
import PostList from '../components/blog/PostList';
import PricingSection from '../components/subscription/PricingSection';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-helkein">
        <div className="container-helkein">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
              Bem-vindo ao Helkein<span className="text-helkein-accent">.</span>
            </h1>
            <p className="text-xl text-helkein-muted mb-8">
              Portal de conhecimento sobre tecnologia, programação e desenvolvimento pessoal.
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <Link to="/blog" className="btn-primary px-8 py-3">
                Explorar Conteúdo
              </Link>
              <Link to="/subscription" className="btn-secondary px-8 py-3">
                Conheça Nossos Planos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 bg-helkein-light">
        <div className="container-helkein">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Últimos Artigos</h2>
            <Link to="/blog" className="text-helkein-accent hover:underline">
              Ver todos os artigos →
            </Link>
          </div>
          
          <PostList />
        </div>
      </section>

      {/* Subscription CTA */}
      <PricingSection />

      {/* Features Section */}
      <section className="py-16 bg-helkein">
        <div className="container-helkein">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Por que escolher o Helkein?
            </h2>
            <p className="text-helkein-muted">
              Compromisso com qualidade e conhecimento acessível para todos os níveis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-helkein-light p-6 rounded-lg">
              <div className="w-12 h-12 bg-helkein-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Conteúdo de Qualidade</h3>
              <p className="text-helkein-muted">
                Artigos escritos por especialistas, com foco em clareza e aplicabilidade prática.
              </p>
            </div>
            
            <div className="bg-helkein-light p-6 rounded-lg">
              <div className="w-12 h-12 bg-helkein-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Conteúdo Exclusivo</h3>
              <p className="text-helkein-muted">
                Acesso a material exclusivo para assinantes, com tópicos avançados e tutoriais detalhados.
              </p>
            </div>
            
            <div className="bg-helkein-light p-6 rounded-lg">
              <div className="w-12 h-12 bg-helkein-accent rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">Comunidade Ativa</h3>
              <p className="text-helkein-muted">
                Interaja com outros leitores e autores através dos comentários e fóruns de discussão.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
