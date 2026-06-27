import { Movie, Genre, TMDBResponse } from '@/types/movie';

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

async function fetchTMDB<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, { headers });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
}

export async function getTrending(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse>(
    '/trending/movie/week?language=es-AR'
  );
  return data.results;
}

export async function getPopular(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse>(
    '/movie/popular?language=es-AR'
  );
  return data.results;
}

export async function getTopRated(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse>(
    '/movie/top_rated?language=es-AR'
  );
  return data.results;
}

export async function getUpcoming(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse>(
    '/movie/upcoming?language=es-AR'
  );
  return data.results;
}

export async function getMovieById(id: number): Promise<Movie> {
  return fetchTMDB<Movie>(`/movie/${id}?language=es-AR`);
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse>(
    `/search/movie?query=${encodeURIComponent(query)}&language=es-AR`
  );
  return data.results;
}

export async function getGenres(): Promise<Genre[]> {
  const data = await fetchTMDB<{ genres: Genre[] }>(
    '/genre/movie/list?language=es-AR'
  );
  return data.genres;
}

export async function getMoviesByGenre(genreId: number): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse>(
    `/discover/movie?with_genres=${genreId}&language=es-AR&sort_by=popularity.desc`
  );
  return data.results;
}

export function getPosterUrl(path: string | null): string {
  if (!path) return '/placeholder.png';
  return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${path}`;
}

export function getBackdropUrl(path: string | null): string {
  if (!path) return '/placeholder.png';
  return `${process.env.NEXT_PUBLIC_BACKDROP_BASE_URL}${path}`;
}