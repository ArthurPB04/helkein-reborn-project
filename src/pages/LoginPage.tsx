
import React from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container-helkein">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-heading font-bold text-center mb-8">
              Entrar no Helkein<span className="text-helkein-accent">.</span>
            </h1>
            <LoginForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
