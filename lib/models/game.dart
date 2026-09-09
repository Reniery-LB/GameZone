class Juego {
  final String titulo;
  final String genero;
  final double precio;
  final String descripcion;
  final String imagenUrl;

  const Juego({
    required this.titulo,
    required this.genero,
    required this.precio,
    required this.descripcion,
    required this.imagenUrl,
  });
}

// Esta es una lista de juegos de ejemplo (datos inventados)
final List<Juego> listaDeJuegos = [
  const Juego(
    titulo: 'Galaxy Raiders',
    genero: 'Accion',
    precio: 899.0,
    descripcion:
        'Un juego de disparos en el espacio. Manejas una nave y te '
        'enfrentas a otras naves enemigas mientras avanzas por el mapa.',
    imagenUrl: 'https://picsum.photos/seed/galaxyraiders/600/400',
  ),
  const Juego(
    titulo: 'Reino de Sombras',
    genero: 'Rol (RPG)',
    precio: 749.0,
    descripcion:
        'Un juego de fantasia donde creas tu propio personaje, exploras '
        'un mundo grande y vas cumpliendo misiones para avanzar la historia.',
    imagenUrl: 'https://picsum.photos/seed/reinosombras/600/400',
  ),
  const Juego(
    titulo: 'Turbo Circuit',
    genero: 'Carreras',
    precio: 599.0,
    descripcion:
        'Un juego de carreras de autos. Puedes competir contra la '
        'computadora o contra otros jugadores en distintas pistas.',
    imagenUrl: 'https://picsum.photos/seed/turbocircuit/600/400',
  ),
  const Juego(
    titulo: 'Pixel Legends',
    genero: 'Aventura',
    precio: 349.0,
    descripcion:
        'Un juego de plataformas con un estilo retro, parecido a los '
        'juegos clasicos de hace muchos anos.',
    imagenUrl: 'https://picsum.photos/seed/pixellegends/600/400',
  ),
  const Juego(
    titulo: 'Mystic Quest Online',
    genero: 'Multijugador',
    precio: 0.0,
    descripcion:
        'Un juego gratuito donde puedes jugar en linea con tus amigos, '
        'cumplir misiones juntos y explorar un mundo compartido.',
    imagenUrl: 'https://picsum.photos/seed/mysticquest/600/400',
  ),
];
