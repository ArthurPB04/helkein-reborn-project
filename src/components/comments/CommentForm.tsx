
import React, { useState } from 'react';

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onSubmitSuccess?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  postId, 
  parentId, 
  onSubmitSuccess 
}) => {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Here would be the API call to submit the comment
      console.log('Submitting comment:', {
        postId,
        parentId,
        body: comment
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form after successful submission
      setComment('');
      
      // Call the success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      setError('Erro ao enviar comentário. Tente novamente.');
      console.error('Comment submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && (
        <div className="bg-red-900 bg-opacity-20 border border-red-800 text-red-100 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escreva seu comentário..."
          className="w-full px-3 py-2 bg-helkein border border-helkein-light rounded-md focus:outline-none focus:ring-2 focus:ring-helkein-accent min-h-[100px] resize-y"
          required
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : parentId ? 'Responder' : 'Comentar'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
