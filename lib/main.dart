import 'package:flutter/material.dart';
import 'package:flutter_application_1/screens/detail_screen.dart';
import 'package:flutter_application_1/screens/home_screen.dart';

import 'screens/login_screen.dart';

void main() {
  runApp(const MiApp());
}

class MiApp extends StatelessWidget {
  const MiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GameZone',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.deepPurple),
      home: const LoginScreen(),
    );
  }
}
