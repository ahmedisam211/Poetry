import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { poems } from '../data/poems';

const PoemDetail = () => {
  const { id } = useParams(); // Gets the ID from the URL
  const navigate = useNavigate(); 
  
  const poem = poems.find((p) => p.id === id);

  if (!poem) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-serif text-stone-800 mb-4">Poem not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-stone-600 hover:text-stone-900 underline font-serif"
          >
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 font-sans selection:bg-stone-200">
      <article className="max-w-3xl mx-auto px-6 pb-24">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-12 font-serif text-lg pt-8"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </button>

        {/* Poem Header */}
        <header className="mb-14 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4 leading-tight">
            {poem.title}
          </h1>
          <p className="text-xl font-serif italic text-stone-600">
            by {poem.poet}
          </p>
          <div className="w-24 h-px bg-stone-300 mx-auto mt-8"></div>
        </header>

        {/* Full Poem Content */}
        <div className="bg-white p-8 md:p-16 rounded-2xl shadow-sm border border-stone-100">
          <p className="text-lg md:text-xl font-serif text-stone-800 leading-loose whitespace-pre-wrap text-center md:text-left mx-auto max-w-xl">
            {poem.content}
          </p>
        </div>
      </article>
    </div>
  );
};

export default PoemDetail;