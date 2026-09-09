import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              // Column pone los widgets uno debajo del otro, de forma vertical.
              mainAxisSize: MainAxisSize.min,
              children: [
                // Icono decorativo de la app.
                const Icon(
                  Icons.videogame_asset,
                  size: 80,
                  color: Colors.deepPurple,
                ),
                const SizedBox(height: 16),

                // Nombre de la app.
                const Text(
                  'GameZone',
                  style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),

                // Pequeña descripción debajo del nombre.
                const Text(
                  'Tu tienda de videojuegos',
                  style: TextStyle(fontSize: 16, color: Colors.grey),
                ),
                const SizedBox(height: 40),

                // Campo de texto para escribir el usuario o correo.
                const TextField(
                  decoration: InputDecoration(
                    labelText: 'Usuario o correo',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 16),

                // Campo de texto para escribir la contraseña.
                const TextField(
                  obscureText: true,
                  decoration: InputDecoration(
                    labelText: 'Contraseña',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 24),

                // Boton para iniciar sesion.
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {},
                    child: const Padding(
                      padding: EdgeInsets.symmetric(vertical: 12),
                      child: Text('Iniciar sesion'),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
