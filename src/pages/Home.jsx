import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { poems } from '../data/poems';

function Home() {
  const [search, setSearch] = useState('');

  // Filter poems based on search query (checks title, poet, or content text)
  const filteredPoems = poems.filter((poem) => {
    const query = search.toLowerCase();
    return (
      poem.title.toLowerCase().includes(query) ||
      poem.poet.toLowerCase().includes(query) ||
      poem.content.toLowerCase().includes(query)
    );
  });

  // Group the filtered poems by poet
  const groupedByPoet = filteredPoems.reduce((acc, poem) => {
    if (!acc[poem.poet]) {
      acc[poem.poet] = [];
    }
    acc[poem.poet].push(poem);
    return acc;
  }, {});

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a word, title, or poet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          marginBottom: '30px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />

      {Object.keys(groupedByPoet).length === 0 ? (
        <p>No poems found matching "{search}".</p>
      ) : (
        Object.keys(groupedByPoet).map((poet) => (
          <div key={poet} style={{ marginBottom: '40px' }}>
            <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>{poet}</h2>
            
            <div style={{ display: 'grid', gap: '20px', marginTop: '15px' }}>
              {groupedByPoet[poet].map((poem) => (
                <div key={poem.id} style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
                  <h3 style={{ margin: '0 0 10px 0' }}>{poem.title}</h3>
                  {/* Extract first 100 characters for the preview */}
                  <p style={{ color: '#555', fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                    {poem.content.substring(0, 100)}...
                  </p>
                  <Link 
                    to={`/poem/${poem.id}`} 
                    style={{ display: 'inline-block', marginTop: '15px', color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    Read Full Poem →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;