
import React from 'react';
import Layout from '../components/layout/Layout';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container-helkein">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-heading font-bold text-center mb-8">
              Criar Conta no Helkein<span className="text-helkein-accent">.</span>
            </h1>
            <RegisterForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
