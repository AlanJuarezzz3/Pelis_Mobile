import { getTrending, getPopular, getTopRated, getUpcoming } from '@/services/tmdb';
import HeroBanner from '@/components/HeroBanner';
import MovieRow from '@/components/MovieRow';

export default async function Home() {
  const [trending, popular, topRated, upcoming] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
    getUpcoming(),
  ]);

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Banner principal */}
      {trending.length > 0 && <HeroBanner movie={trending[0]} />}

      {/* Filas de películas */}
      <div className="relative -mt-32 pb-10">
        <MovieRow title="🔥 En tendencia" movies={trending} />
        <MovieRow title="⭐ Mejor valoradas" movies={topRated} />
        <MovieRow title="🎬 Populares" movies={popular} />
        <MovieRow title="🆕 Próximos estrenos" movies={upcoming} />
      </div>
    </div>
  );
}