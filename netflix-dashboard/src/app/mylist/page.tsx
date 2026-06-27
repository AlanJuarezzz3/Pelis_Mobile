'use client';

import { useState } from 'react';
import { Movie } from '@/types/movie';
import MovieCard from '@/components/MovieCard';

function getInitialList(): Movie[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('myList');
    return saved ? (JSON.parse(saved) as Movie[]) : [];
  } catch {
    return [];
  }
}

export default function MyListPage() {
  const [myList, setMyList] = useState<Movie[]>(getInitialList);

  const removeFromList = (movieId: number) => {
    const updated = myList.filter((m) => m.id !== movieId);
    setMyList(updated);
    localStorage.setItem('myList', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#141414] pt-24 px-6">
      <h1 className="text-white text-2xl font-bold mb-2">Mi Lista</h1>
      <p className="text-gray-400 text-sm mb-8">
        {myList.length} {myList.length === 1 ? 'película' : 'películas'}
      </p>

      {myList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-gray-500">
          <span className="text-6xl mb-4">🔖</span>
          <p className="text-lg text-white font-bold">Tu lista está vacía</p>
          <p className="text-sm mt-2">Agregá películas desde el detalle</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {myList.map((movie) => (
            <div key={movie.id} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => removeFromList(movie.id)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}