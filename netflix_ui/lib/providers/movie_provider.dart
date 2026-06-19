import 'package:flutter/material.dart';
import '../models/movie.dart';
import '../services/tmdb_service.dart';

class MovieProvider extends ChangeNotifier {
  final TmdbService _service = TmdbService();

  List<Movie> trending = [];
  List<Movie> popular = [];
  List<Movie> topRated = [];
  List<Movie> upcoming = [];
  List<Movie> searchResults = [];
  List<Movie> myList = [];

  bool isLoading = false;
  bool isSearching = false;
  String errorMessage = '';

  Future<void> loadAllMovies() async {
    isLoading = true;
    errorMessage = '';
    notifyListeners();

    try {
      final results = await Future.wait([
        _service.getTrending(),
        _service.getPopular(),
        _service.getTopRated(),
        _service.getUpcoming(),
      ]);

      trending = results[0];
      popular = results[1];
      topRated = results[2];
      upcoming = results[3];
    } catch (e) {
      errorMessage = 'Error al cargar películas';
    }

    isLoading = false;
    notifyListeners();
  }

  Future<void> searchMovies(String query) async {
    if (query.isEmpty) {
      searchResults = [];
      isSearching = false;
      notifyListeners();
      return;
    }

    isSearching = true;
    notifyListeners();

    try {
      searchResults = await _service.searchMovies(query);
    } catch (e) {
      searchResults = [];
    }

    isSearching = false;
    notifyListeners();
  }

  void toggleMyList(Movie movie) {
    final exists = myList.any((m) => m.id == movie.id);
    if (exists) {
      myList.removeWhere((m) => m.id == movie.id);
    } else {
      myList.add(movie);
    }
    notifyListeners();
  }

  bool isInMyList(int movieId) {
    return myList.any((m) => m.id == movieId);
  }
}