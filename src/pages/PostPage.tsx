
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PostDetail from '../components/blog/PostDetail';
import CommentList from '../components/comments/CommentList';

// Example post data
const samplePost = {
  id: '1',
  title: 'Desenvolvimento Fullstack com React e Node.js',
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis euismod, rhoncus metus id, tristique nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras vel lacus vel eros convallis finibus.</p>
    <h2>Subtítulo Principal</h2>
    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras id elit et justo tincidunt tempus. Donec vitae urna ut dolor imperdiet auctor.</p>
    <ul>
      <li>Item 1 da lista</li>
      <li>Item 2 da lista</li>
      <li>Item 3 da lista</li>
    </ul>
    <p>Mauris euismod erat eu velit facilisis ultrices. Suspendisse potenti. Curabitur vel neque at quam ultrices suscipit vel ac leo. Proin vestibulum aliquet mi, non feugiat magna viverra sit amet.</p>
    <blockquote>Este é um exemplo de citação importante no artigo.</blockquote>
    <p>Quisque lacinia molestie purus, at faucibus erat dictum nec. Nulla id ipsum vel magna faucibus fermentum. Integer hendrerit est sit amet volutpat aliquam.</p>
  `,
  publishedAt: '2023-05-15T10:30:00Z',
  isPaid: false,
  categories: ['Programação', 'Web'],
  author: {
    name: 'João Silva',
    avatar: '/placeholder.svg',
    bio: 'Desenvolvedor fullstack com mais de 10 anos de experiência. Especialista em React, Node.js e arquitetura de sistemas.',
  }
};

const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // In a real application, you would fetch the post based on the slug
  console.log('Post slug:', slug);
  
  return (
    <Layout>
      <article className="py-12">
        <div className="container-helkein">
          <PostDetail {...samplePost} />
          
          <div className="max-w-3xl mx-auto mt-16">
            <hr className="border-helkein-light mb-8" />
            <CommentList postId={samplePost.id} />
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default PostPage;
