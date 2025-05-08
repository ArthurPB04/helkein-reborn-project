
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-6xl font-heading font-bold mb-4">404</h1>
        <p className="text-xl text-helkein-muted mb-8">Oops! Página não encontrada</p>
        <p className="text-helkein-muted max-w-md text-center mb-8">
          A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
        </p>
        <Link to="/" className="btn-primary">
          Voltar para a Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
