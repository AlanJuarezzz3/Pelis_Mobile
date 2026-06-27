'use client';

import { useState, useEffect } from 'react';
import { Movie, Genre } from '@/types/movie';
import { searchMovies, getGenres, getMoviesByGenre } from '@/services/tmdb';
import MovieCard from '@/components/MovieCard';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        setSelectedGenre(null);
        const results = await searchMovies(query);
        setMovies(results);
        setIsLoading(false);
      } else if (!selectedGenre) {
        setMovies([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, selectedGenre]);

  const handleGenreClick = async (genreId: number) => {
    if (selectedGenre === genreId) {
      setSelectedGenre(null);
      setMovies([]);
      return;
    }
    setSelectedGenre(genreId);
    setQuery('');
    setIsLoading(true);
    const results = await getMoviesByGenre(genreId);
    setMovies(results);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#141414] pt-28 px-6">
      <h1 className="text-white text-2xl font-bold mb-6">Buscar</h1>

      {/* Barra de búsqueda */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas..."
          className="w-full bg-[#2F2F2F] text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-600"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setMovies([]); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros por género */}
      <div className="flex gap-2 flex-wrap mb-8">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              selectedGenre === genre.id
                ? 'bg-red-600 text-white'
                : 'bg-[#2F2F2F] text-gray-300 hover:bg-[#3F3F3F]'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Resultados */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-60 text-gray-500">
          <span className="text-6xl mb-4">🔍</span>
          <p className="text-lg">
            {query
              ? 'No se encontraron resultados'
              : 'Buscá o seleccioná un género'}
          </p>
        </div>
      )}
    </div>
  );
}