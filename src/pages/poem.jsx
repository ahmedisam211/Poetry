import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { poems } from '../data/poems';

function Poem() {
  const { id } = useParams();
  
  // Find the specific poem from our data file using the ID in the URL
  const poem = poems.find((p) => p.id === id);

  if (!poem) {
    return <h2>Poem not found!</h2>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px solid #eaeaea' }}>
      <Link to="/" style={{ color: '#0056b3', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Collection
      </Link>
      
      <h1 style={{ marginBottom: '5px' }}>{poem.title}</h1>
      <h3 style={{ marginTop: '0', color: '#666', fontStyle: 'italic' }}>by {poem.poet}</h3>
      
      <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '20px 0' }} />
      
      <div style={{ 
        whiteSpace: 'pre-wrap', 
        fontSize: '18px', 
        lineHeight: '1.8', 
        color: '#333' 
      }}>
        {poem.content}
      </div>
    </div>
  );
}

export default Poem;