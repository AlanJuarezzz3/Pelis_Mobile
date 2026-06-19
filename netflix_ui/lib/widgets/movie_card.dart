import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:shimmer/shimmer.dart';
import '../models/movie.dart';

class MovieCard extends StatelessWidget {
  final Movie movie;
  final VoidCallback onTap;

  const MovieCard({super.key, required this.movie, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 110,
        margin: const EdgeInsets.only(right: 8),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: CachedNetworkImage(
            imageUrl: movie.posterUrl,
            fit: BoxFit.cover,
            placeholder: (context, url) => Shimmer.fromColors(
              baseColor: const Color(0xFF2F2F2F),
              highlightColor: const Color(0xFF1F1F1F),
              child: Container(color: const Color(0xFF2F2F2F)),
            ),
            errorWidget: (context, url, error) => Container(
              color: const Color(0xFF2F2F2F),
              child: const Icon(Icons.movie, color: Colors.white54, size: 40),
            ),
          ),
        ),
      ),
    );
  }
}