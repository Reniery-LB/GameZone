import 'package:flutter/material.dart';

import '../models/game.dart';

class DetailScreen extends StatelessWidget {
  final Juego juego;

  DetailScreen({super.key, Juego? juego})
    : juego = juego ?? listaDeJuegos.first;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(juego.titulo)),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Imagen grande del juego.
            Image.network(
              juego.imagenUrl,
              height: 220,
              width: double.infinity,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  height: 220,
                  color: Colors.grey[300],
                  child: const Icon(Icons.videogame_asset, size: 60),
                );
              },
            ),

            // Informacion del juego.
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    juego.titulo,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    juego.genero,
                    style: const TextStyle(color: Colors.grey),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    juego.precio == 0
                        ? 'Gratis'
                        : '\$${juego.precio.toStringAsFixed(2)}',
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.deepPurple,
                    ),
                  ),
                  const SizedBox(height: 20),

                  const Text(
                    'Descripcion',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Text(juego.descripcion),
                  const SizedBox(height: 24),

                  // Boton para agregar el juego al carrito.
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {},
                      child: const Padding(
                        padding: EdgeInsets.symmetric(vertical: 12),
                        child: Text('Agregar al carrito'),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
