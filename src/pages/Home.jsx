import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';
import { poems } from '../data/poems';

const Header = () => (
  <header className="py-12 text-center border-b border-stone-200 mb-10 bg-white shadow-sm">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <BookOpen className="w-8 h-8 text-stone-700" />
        <h1 className="text-4xl md:text-5xl font-serif text-stone-800 tracking-tight">
          Verses & Stanzas
        </h1>
      </div>
      <p className="text-stone-500 font-serif italic text-lg">
        A timeless collection of classical poetry.
      </p>
    </div>
  </header>
);

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // React Router's navigation

  // Filter poems based on search query
  const filteredPoems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return poems.filter(
      (poem) =>
        poem.title.toLowerCase().includes(query) ||
        poem.poet.toLowerCase().includes(query) ||
        poem.content.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group filtered poems by their poet
  const categorizedPoems = useMemo(() => {
    return filteredPoems.reduce((acc, poem) => {
      if (!acc[poem.poet]) {
        acc[poem.poet] = [];
      }
      acc[poem.poet].push(poem);
      return acc;
    }, {});
  }, [filteredPoems]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 font-sans selection:bg-stone-200 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-6 pb-20 w-full">
        {/* Search Bar */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 border border-stone-200 rounded-full shadow-sm bg-white text-stone-800 placeholder-stone-400 focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all font-serif outline-none"
            placeholder="Search by poet, title, or words within poems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categorized Poems List */}
        {Object.keys(categorizedPoems).length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-500 font-serif text-xl">No poems found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(categorizedPoems).map(([poet, poetPoems]) => (
              <section key={poet}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-3xl font-serif text-stone-800">{poet}</h2>
                  <div className="h-px flex-1 bg-stone-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {poetPoems.map((poem) => (
                    <div
                      key={poem.id}
                      onClick={() => navigate(`/poem/${poem.id}`)}
                      className="group bg-white p-8 rounded-xl border border-stone-100 shadow-sm hover:shadow-md hover:border-stone-200 transition-all cursor-pointer flex flex-col h-full"
                    >
                      <h3 className="text-xl font-serif font-semibold text-stone-800 mb-2 group-hover:text-stone-600 transition-colors">
                        {poem.title}
                      </h3>
                      <p className="text-stone-500 font-serif italic text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
                        {poem.content}
                      </p>
                      <div className="mt-auto">
                        <span className="inline-flex items-center text-sm font-medium text-stone-600 group-hover:text-stone-900 uppercase tracking-wider transition-colors">
                          Read Poem <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-stone-400 font-serif text-sm border-t border-stone-200 mt-12 w-full">
        &copy; {new Date().getFullYear()} Verses & Stanzas. A poetry collection.
      </footer>
    </div>
  );
};

export default Home;