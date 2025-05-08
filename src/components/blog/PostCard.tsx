
import React from 'react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  isPaid: boolean;
  categories: string[];
  author: {
    name: string;
    avatar: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  slug,
  excerpt,
  publishedAt,
  isPaid,
  categories,
  author,
}) => {
  // Format the date
  const formattedDate = new Date(publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <article className="post-card">
      <Link to={`/blog/${slug}`}>
        <div className="h-48 bg-helkein-accent bg-opacity-20 flex items-center justify-center">
          <span className="text-helkein-accent text-opacity-70 text-lg">Imagem do Post</span>
        </div>
      </Link>
      <div className="p-5">
        {isPaid && (
          <span className="inline-block bg-helkein-accent text-white text-xs px-2 py-1 rounded-md mb-2">
            Premium
          </span>
        )}
        
        <div className="flex space-x-2 mb-2">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={`/category/${category.toLowerCase()}`} 
              className="text-xs text-helkein-muted hover:text-helkein-accent"
            >
              {category}
            </Link>
          ))}
        </div>
        
        <Link to={`/blog/${slug}`}>
          <h2 className="text-xl font-heading font-semibold mb-2 hover:text-helkein-accent transition-colors">
            {title}
          </h2>
        </Link>
        
        <p className="text-helkein-muted text-sm mb-4">{excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-helkein-accent flex items-center justify-center text-white text-xs mr-2">
              {author.name.charAt(0)}
            </div>
            <span className="text-sm text-helkein-muted">{author.name}</span>
          </div>
          <span className="text-sm text-helkein-muted">{formattedDate}</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
