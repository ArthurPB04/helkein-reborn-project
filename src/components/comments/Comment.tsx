
import React, { useState } from 'react';
import CommentForm from './CommentForm';

interface CommentProps {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  body: string;
  createdAt: string;
  replies?: CommentProps[];
}

const Comment: React.FC<CommentProps> = ({
  id,
  postId,
  author,
  body,
  createdAt,
  replies = []
}) => {
  const [isReplying, setIsReplying] = useState(false);
  
  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ' às ' + new Date(createdAt).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Get role badge background color
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-600';
      case 'assinante':
        return 'bg-helkein-accent';
      default:
        return 'bg-gray-600';
    }
  };
  
  const handleReplySubmit = () => {
    setIsReplying(false);
    // In a real app, we would refresh comments here
  };

  return (
    <div className="mb-4">
      <div className="bg-helkein-light p-4 rounded-lg">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-helkein flex items-center justify-center text-white text-sm mr-3">
              {author.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-medium mr-2">{author.name}</span>
                <span 
                  className={`text-xs px-1.5 py-0.5 rounded text-white ${getRoleBadgeColor(author.role)}`}
                >
                  {author.role}
                </span>
              </div>
              <div className="text-xs text-helkein-muted">
                {formattedDate}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-helkein-text mb-3">{body}</div>
        
        <div className="flex justify-end">
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="text-sm text-helkein-accent hover:underline"
          >
            {isReplying ? 'Cancelar' : 'Responder'}
          </button>
        </div>
      </div>
      
      {/* Reply form */}
      {isReplying && (
        <div className="mt-3 ml-6">
          <CommentForm 
            postId={postId} 
            parentId={id} 
            onSubmitSuccess={handleReplySubmit} 
          />
        </div>
      )}
      
      {/* Comment replies */}
      {replies.length > 0 && (
        <div className="ml-6 mt-3">
          {replies.map(reply => (
            <Comment key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
