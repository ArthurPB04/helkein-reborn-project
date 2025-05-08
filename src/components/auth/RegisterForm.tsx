
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }
    
    try {
      // Here would be the registration API call
      console.log('Register with:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect would happen here after successful registration
    } catch (err) {
      setError('Erro ao registrar. Tente novamente mais tarde.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-helkein-light rounded-lg shadow-helkein">
      <h2 className="text-2xl font-heading font-bold text-center mb-6">Criar Conta</h2>
      
      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-red-800 text-red-100 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-helkein border border-helkein-light rounded-md focus:outline-none focus:ring-2 focus:ring-helkein-accent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="nickname" className="block text-sm font-medium mb-1">
            Nome de usuário
          </label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            value={formData.nickname}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-helkein border border-helkein-light rounded-md focus:outline-none focus:ring-2 focus:ring-helkein-accent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-helkein border border-helkein-light rounded-md focus:outline-none focus:ring-2 focus:ring-helkein-accent"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirmar senha
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-helkein border border-helkein-light rounded-md focus:outline-none focus:ring-2 focus:ring-helkein-accent"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-2 px-4 flex justify-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Registrando...
            </span>
          ) : 'Registrar'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-helkein-muted">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-helkein-accent hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
