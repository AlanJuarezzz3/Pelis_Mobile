import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/constants.dart';
import '../models/movie.dart';

class TmdbService {
  final Map<String, String> _headers = {
    'Authorization': 'Bearer ${AppConstants.readToken}',
    'Content-Type': 'application/json',
  };

  Future<List<Movie>> getTrending() async {
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/trending/movie/week?language=es-AR'),
      headers: _headers,
    );
    return _parseMovies(response);
  }

  Future<List<Movie>> getPopular() async {
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/movie/popular?language=es-AR'),
      headers: _headers,
    );
    return _parseMovies(response);
  }

  Future<List<Movie>> getTopRated() async {
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/movie/top_rated?language=es-AR'),
      headers: _headers,
    );
    return _parseMovies(response);
  }

  Future<List<Movie>> getUpcoming() async {
    final response = await http.get(
      Uri.parse('${AppConstants.baseUrl}/movie/upcoming?language=es-AR'),
      headers: _headers,
    );
    return _parseMovies(response);
  }

  Future<List<Movie>> searchMovies(String query) async {
    final response = await http.get(
      Uri.parse(
          '${AppConstants.baseUrl}/search/movie?query=$query&language=es-AR'),
      headers: _headers,
    );
    return _parseMovies(response);
  }

  List<Movie> _parseMovies(http.Response response) {
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final List results = data['results'];
      return results.map((json) => Movie.fromJson(json)).toList();
    }
    return [];
  }
}