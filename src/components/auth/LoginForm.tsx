
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Here would be the authentication API call
      console.log('Login with:', { email, password });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect would happen here after successful login
    } catch (err) {
      setError('Erro de autenticação. Verifique suas credenciais.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-helkein-light rounded-lg shadow-helkein">
      <h2 className="text-2xl font-heading font-bold text-center mb-6">Entrar</h2>
      
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-helkein border border-helkein-light rounded-md focus:outline-none focus:ring-2 focus:ring-helkein-accent"
            required
          />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium">
              Senha
            </label>
            <Link to="/forgot-password" className="text-xs text-helkein-accent hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              Entrando...
            </span>
          ) : 'Entrar'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-helkein-muted">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-helkein-accent hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
