
import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

// Example comments data
const sampleComments = [
  {
    id: '1',
    postId: '123',
    author: {
      id: 'user1',
      name: 'João Silva',
      role: 'Admin'
    },
    body: 'Ótimo artigo! Muito bem explicado e detalhado.',
    createdAt: '2023-06-15T10:30:00Z',
    replies: [
      {
        id: '2',
        postId: '123',
        author: {
          id: 'user2',
          name: 'Maria Oliveira',
          role: 'Assinante'
        },
        body: 'Concordo totalmente! Este conteúdo é incrível.',
        createdAt: '2023-06-15T11:45:00Z',
        replies: []
      }
    ]
  },
  {
    id: '3',
    postId: '123',
    author: {
      id: 'user3',
      name: 'Pedro Santos',
      role: 'Membro'
    },
    body: 'Tenho algumas dúvidas sobre a implementação. Poderia explicar mais sobre a parte X?',
    createdAt: '2023-06-16T09:20:00Z',
    replies: []
  }
];

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const comments = sampleComments.filter(comment => comment.postId === postId);

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-heading font-bold mb-6">Comentários ({comments.length})</h3>
      
      {/* Comment form for new top-level comments */}
      <div className="mb-8">
        <CommentForm postId={postId} />
      </div>
      
      {/* List of comments */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-helkein-muted">
          Ainda não há comentários. Seja o primeiro a comentar!
        </div>
      ) : (
        <div>
          {comments.map(comment => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
