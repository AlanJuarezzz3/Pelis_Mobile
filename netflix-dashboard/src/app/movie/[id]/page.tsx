'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getMovieById, getBackdropUrl, getPosterUrl } from '@/services/tmdb';
import { Movie } from '@/types/movie';

function isInMyList(id: number): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const saved = localStorage.getItem('myList');
    if (!saved) return false;
    const list = JSON.parse(saved) as Movie[];
    return list.some((m) => m.id === id);
  } catch {
    return false;
  }
}

export default function MovieDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [inMyList, setInMyList] = useState(() => isInMyList(id));

  const fetchMovie = useCallback(async () => {
    const data = await getMovieById(id);
    setMovie(data);
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const toggleMyList = () => {
    const saved = localStorage.getItem('myList');
    const list: Movie[] = saved ? JSON.parse(saved) : [];
    if (inMyList) {
      const updated = list.filter((m) => m.id !== id);
      localStorage.setItem('myList', JSON.stringify(updated));
      setInMyList(false);
    } else if (movie) {
      list.push(movie);
      localStorage.setItem('myList', JSON.stringify(list));
      setInMyList(true);
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="relative w-full h-[500px]">
        <Image
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#14141480] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
        <Link
          href="/"
          className="absolute top-24 left-6 flex items-center gap-2 text-white hover:text-gray-300 transition"
        >
          ← Volver
        </Link>
      </div>

      <div className="relative -mt-48 px-6 pb-10 max-w-5xl">
        <div className="flex gap-8">
          <div className="hidden md:block flex-shrink-0">
            <div className="relative w-[200px] h-[300px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-white text-4xl font-black mb-2">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-yellow-400 font-bold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-400">
                {movie.release_date?.substring(0, 4)}
              </span>
            </div>

            <div className="flex gap-3 mb-8">
              <button className="flex items-center gap-2 bg-white text-black font-bold px-8 py-3 rounded hover:bg-gray-200 transition">
                ▶ Reproducir
              </button>
              <button
                onClick={toggleMyList}
                className={`flex items-center gap-2 font-bold px-8 py-3 rounded transition ${
                  inMyList
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-600/80 text-white hover:bg-gray-600'
                }`}
              >
                {inMyList ? '✓ En mi lista' : '+ Mi Lista'}
              </button>
            </div>

            <h2 className="text-white text-xl font-bold mb-3">Sinopsis</h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {movie.overview || 'Sin descripción disponible.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}