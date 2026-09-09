import 'package:flutter/material.dart';

import '../models/game.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('GameZone')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Mensaje de bienvenida.
          const Text(
            'Bienvenido de nuevo',
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          const Text(
            'Estos son algunos de los videojuegos disponibles en la tienda.',
            style: TextStyle(color: Colors.grey),
          ),
          const SizedBox(height: 24),

          for (final juego in listaDeJuegos) TarjetaDeJuego(juego: juego),
        ],
      ),
    );
  }
}

// Esta es una tarjeta que muestra la informacion de un solo videojuego.
class TarjetaDeJuego extends StatelessWidget {
  final Juego juego;

  const TarjetaDeJuego({super.key, required this.juego});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),

      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Imagen del juego.
          Image.network(
            juego.imagenUrl,
            height: 160,
            width: double.infinity,
            fit: BoxFit.cover,
            errorBuilder: (context, error, stackTrace) {
              return Container(
                height: 160,
                color: Colors.grey[300],
                child: const Icon(Icons.videogame_asset, size: 50),
              );
            },
          ),

          // Informacion del juego (titulo, genero, precio, boton).
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  juego.titulo,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 4),
                Text(juego.genero, style: const TextStyle(color: Colors.grey)),
                const SizedBox(height: 8),
                Text(
                  juego.precio == 0
                      ? 'Gratis'
                      : '\$${juego.precio.toStringAsFixed(2)}',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.deepPurple,
                  ),
                ),
                const SizedBox(height: 8),

                // Boton para ver el detalle de este juego.
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    child: const Text('Ver detalle'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
