import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/movie_provider.dart';
import '../models/movie.dart';
import '../widgets/movie_banner.dart';
import '../widgets/movie_row.dart';
import 'detail_screen.dart';
import 'search_screen.dart';
import 'mylist_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<MovieProvider>().loadAllMovies();
    });
  }

  void _navigateToDetail(Movie movie) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => DetailScreen(movie: movie)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF141414),
      body: IndexedStack(
        index: _currentIndex,
        children: [
          _buildHomeTab(),
          const SearchScreen(),
          const MyListScreen(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        backgroundColor: const Color(0xFF141414),
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Inicio',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Buscar',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.bookmark),
            label: 'Mi Lista',
          ),
        ],
      ),
    );
  }

  Widget _buildHomeTab() {
    return Consumer<MovieProvider>(
      builder: (context, provider, _) {
        return CustomScrollView(
          slivers: [
            // AppBar transparente
            SliverAppBar(
              floating: true,
              backgroundColor: Colors.transparent,
              title: Text(
                'NETFLIX',
                style: TextStyle(
                  color: const Color(0xFFE50914),
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 4,
                ),
              ),
              actions: [
                IconButton(
                  icon: const Icon(Icons.notifications_none,
                      color: Colors.white),
                  onPressed: () {},
                ),
                const SizedBox(width: 8),
              ],
            ),
            // Contenido
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Banner principal
                  if (provider.isLoading)
                    Container(
                      height: 500,
                      color: const Color(0xFF1F1F1F),
                    )
                  else if (provider.trending.isNotEmpty)
                    MovieBanner(
                      movie: provider.trending.first,
                      onTap: () => _navigateToDetail(provider.trending.first),
                    ),
                  // Filas de películas
                  MovieRow(
                    title: '🔥 En tendencia',
                    movies: provider.trending,
                    isLoading: provider.isLoading,
                    onMovieTap: _navigateToDetail,
                  ),
                  MovieRow(
                    title: '⭐ Mejor valoradas',
                    movies: provider.topRated,
                    isLoading: provider.isLoading,
                    onMovieTap: _navigateToDetail,
                  ),
                  MovieRow(
                    title: '🎬 Populares',
                    movies: provider.popular,
                    isLoading: provider.isLoading,
                    onMovieTap: _navigateToDetail,
                  ),
                  MovieRow(
                    title: '🆕 Próximos estrenos',
                    movies: provider.upcoming,
                    isLoading: provider.isLoading,
                    onMovieTap: _navigateToDetail,
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ],
        );
      },
    );
  }
}