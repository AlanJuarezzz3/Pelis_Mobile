'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { getPosterUrl } from '@/services/tmdb';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="relative group cursor-pointer">
        <div className="relative w-[110px] h-[165px] rounded overflow-hidden">
          <Image
            src={getPosterUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="110px"
          />
        </div>
        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex items-end p-2">
          <p className="text-white text-xs font-semibold line-clamp-2">
            {movie.title}
          </p>
        </div>
      </div>
    </Link>
  );
}