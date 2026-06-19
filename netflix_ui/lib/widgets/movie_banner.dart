import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../models/movie.dart';

class MovieBanner extends StatelessWidget {
  final Movie movie;
  final VoidCallback onTap;

  const MovieBanner({super.key, required this.movie, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Stack(
        children: [
          // Imagen de fondo
          SizedBox(
            height: 500,
            width: double.infinity,
            child: CachedNetworkImage(
              imageUrl: movie.backdropUrl,
              fit: BoxFit.cover,
              placeholder: (context, url) =>
                  Container(color: const Color(0xFF1F1F1F)),
              errorWidget: (context, url, error) =>
                  Container(color: const Color(0xFF1F1F1F)),
            ),
          ),
          // Gradiente superior
          Container(
            height: 500,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.transparent,
                  Color(0x80141414),
                  Color(0xFF141414),
                ],
                stops: [0.4, 0.75, 1.0],
              ),
            ),
          ),
          // Contenido inferior
          Positioned(
            bottom: 20,
            left: 0,
            right: 0,
            child: Column(
              children: [
                // Título
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Text(
                    movie.title,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      shadows: [
                        Shadow(
                          blurRadius: 10,
                          color: Colors.black,
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                // Botones
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Botón Reproducir
                    ElevatedButton.icon(
                      onPressed: onTap,
                      icon: const Icon(Icons.play_arrow, color: Colors.black),
                      label: const Text(
                        'Reproducir',
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 10,
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    // Botón Mi Lista
                    ElevatedButton.icon(
                      onPressed: onTap,
                      icon: const Icon(Icons.add, color: Colors.white),
                      label: const Text(
                        'Mi lista',
                        style: TextStyle(color: Colors.white),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF2F2F2F),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 10,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}