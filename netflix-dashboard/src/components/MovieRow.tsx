import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';

interface Props {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: Props) {
  if (!movies.length) return null;

  return (
    <div className="mb-8">
      <h2 className="text-white text-xl font-bold mb-4 px-6">{title}</h2>
      <div className="flex gap-2 overflow-x-auto px-6 pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}