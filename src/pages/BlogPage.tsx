
import React from 'react';
import Layout from '../components/layout/Layout';
import PostList from '../components/blog/PostList';

const BlogPage = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="container-helkein">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Blog Helkein<span className="text-helkein-accent">.</span>
            </h1>
            <p className="text-helkein-muted">
              Artigos, tutoriais e discussões sobre tecnologia, programação e desenvolvimento pessoal.
            </p>
          </div>
          
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button className="px-4 py-2 bg-helkein-accent text-white rounded-md">
              Todos
            </button>
            <button className="px-4 py-2 bg-helkein hover:bg-helkein-light text-white rounded-md">
              Programação
            </button>
            <button className="px-4 py-2 bg-helkein hover:bg-helkein-light text-white rounded-md">
              Web
            </button>
            <button className="px-4 py-2 bg-helkein hover:bg-helkein-light text-white rounded-md">
              TypeScript
            </button>
            <button className="px-4 py-2 bg-helkein hover:bg-helkein-light text-white rounded-md">
              SEO
            </button>
            <button className="px-4 py-2 bg-helkein hover:bg-helkein-light text-white rounded-md">
              Marketing
            </button>
          </div>
          
          {/* Post Grid */}
          <PostList />
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="inline-flex">
              <button className="px-3 py-1 bg-helkein-light text-helkein-muted rounded-l-md border-r border-helkein">
                Anterior
              </button>
              <button className="px-3 py-1 bg-helkein-accent text-white">
                1
              </button>
              <button className="px-3 py-1 bg-helkein-light text-helkein-text">
                2
              </button>
              <button className="px-3 py-1 bg-helkein-light text-helkein-text">
                3
              </button>
              <button className="px-3 py-1 bg-helkein-light text-helkein-muted rounded-r-md">
                Próximo
              </button>
            </nav>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
