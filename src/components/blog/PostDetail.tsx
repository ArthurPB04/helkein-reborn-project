
import React from 'react';
import { Link } from 'react-router-dom';

interface PostDetailProps {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  isPaid: boolean;
  categories: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

const PostDetail: React.FC<PostDetailProps> = ({
  title,
  content,
  publishedAt,
  isPaid,
  categories,
  author,
}) => {
  // Format the date
  const formattedDate = new Date(publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <article className="max-w-3xl mx-auto">
      {/* Post Header */}
      <header className="mb-8">
        {isPaid && (
          <span className="inline-block bg-helkein-accent text-white text-sm px-3 py-1 rounded-md mb-4">
            Conteúdo Premium
          </span>
        )}
        
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center text-helkein-muted mb-4">
          <span className="mr-4">{formattedDate}</span>
          <span className="mr-4">•</span>
          <div className="flex space-x-2">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/category/${category.toLowerCase()}`} 
                className="hover:text-helkein-accent"
              >
                {category}
                {index < categories.length - 1 && ', '}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-helkein-accent flex items-center justify-center text-white mr-3">
            {author.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{author.name}</div>
            <div className="text-sm text-helkein-muted">Autor</div>
          </div>
        </div>
      </header>
      
      {/* Post Content */}
      <div className="prose prose-lg prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      
      {/* Author Bio */}
      <div className="mt-12 border-t border-helkein-light pt-8">
        <h3 className="text-xl font-heading font-bold mb-4">Sobre o autor</h3>
        <div className="flex items-start">
          <div className="w-16 h-16 rounded-full bg-helkein-accent flex items-center justify-center text-white text-2xl mr-4 flex-shrink-0">
            {author.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-heading font-medium mb-2">{author.name}</h4>
            <p className="text-helkein-muted">{author.bio}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
