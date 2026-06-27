import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getBackdropUrl } from '@/services/tmdb';

interface Props {
  movie: Movie;
}

export default function HeroBanner({ movie }: Props) {
  return (
    <div className="relative w-full h-[600px]">
      {/* Imagen de fondo */}
      <Image
        src={getBackdropUrl(movie.backdrop_path)}
        alt={movie.title}
        fill
        className="object-cover"
        priority
      />

      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#14141480] to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />

      {/* Contenido */}
      <div className="absolute bottom-24 left-6 max-w-lg">
        <h1 className="text-white text-4xl font-black mb-4 drop-shadow-lg">
          {movie.title}
        </h1>
        <p className="text-gray-300 text-sm mb-6 line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex gap-3">
          <Link href={`/movie/${movie.id}`}>
            <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200 transition">
              ▶ Reproducir
            </button>
          </Link>
          <Link href={`/movie/${movie.id}`}>
            <button className="flex items-center gap-2 bg-gray-600/80 text-white font-bold px-6 py-2 rounded hover:bg-gray-600 transition">
              + Más info
            </button>
          </Link>
        </div>
      </div>

      {/* Rating */}
      <div className="absolute bottom-24 right-6">
        <div className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white font-bold">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}