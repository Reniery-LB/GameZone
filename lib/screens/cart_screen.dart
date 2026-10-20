import 'package:flutter/material.dart';
import '../models/game_models.dart';
import '../theme/app_theme.dart';

class CartScreen extends StatefulWidget {
  final List<CartItem> cartItems;
  final Function(String) onRemoveItem;
  final VoidCallback onClearCart;
  final VoidCallback onCheckoutComplete;
  final VoidCallback onNavigateToLibrary;
  final Function(String) onShowSnackBar;
  final VoidCallback onBack;

  const CartScreen({
    super.key,
    required this.cartItems,
    required this.onRemoveItem,
    required this.onClearCart,
    required this.onCheckoutComplete,
    required this.onNavigateToLibrary,
    required this.onShowSnackBar,
    required this.onBack,
  });

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  bool _useZCoins = true;
  final TextEditingController _couponController = TextEditingController();
  String? _appliedCoupon;
  double _couponDiscount = 0.0;

  @override
  void dispose() {
    _couponController.dispose();
    super.dispose();
  }

  void _applyCoupon() {
    final code = _couponController.text.trim().toUpperCase();
    if (code.isEmpty) {
      widget.onShowSnackBar('Ingresa un código de cupón');
      return;
    }
    final subtotal = widget.cartItems.fold<double>(0.0, (acc, item) => acc + item.price);
    setState(() {
      _appliedCoupon = code;
      _couponDiscount = subtotal * 0.05;
    });
    widget.onShowSnackBar('¡Cupón $code aplicado: 5% de descuento!');
  }

  void _showCheckoutDialog(double total) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        backgroundColor: GameZoneColors.surfaceContainerHigh,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                color: GameZoneColors.primaryContainer.withOpacity(0.2),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.check_circle, color: GameZoneColors.primary, size: 36),
            ),
            const SizedBox(height: 16),
            const Text(
              '¡Compra Confirmada!',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
            ),
            const SizedBox(height: 8),
            const Text(
              'Tus licencias de juego han sido añadidas a tu biblioteca. Se envió el recibo a tu correo.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: GameZoneColors.onSurfaceVariant),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: GameZoneColors.primaryContainer,
                foregroundColor: Colors.white,
                minimumSize: const Size.fromHeight(46),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
              ),
              onPressed: () {
                Navigator.of(ctx).pop();
                widget.onCheckoutComplete();
                widget.onNavigateToLibrary();
              },
              child: const Text('Ir a mi Biblioteca', style: TextStyle(fontWeight: FontWeight.bold)),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(ctx).pop();
                widget.onCheckoutComplete();
                widget.onBack();
              },
              child: const Text('Continuar explorando', style: TextStyle(color: GameZoneColors.secondary)),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final subtotal = widget.cartItems.fold<double>(0.0, (acc, item) => acc + item.price);
    final zCoinsDiscount = _useZCoins && subtotal > 0 ? (subtotal >= 100 ? 100.0 : subtotal) : 0.0;
    final total = (subtotal - zCoinsDiscount - _couponDiscount).clamp(0.0, double.infinity);

    return Scaffold(
      backgroundColor: GameZoneColors.surface,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: GameZoneColors.onSurface, size: 20),
          onPressed: widget.onBack,
        ),
        title: const Text('Carrito De Compras', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
      ),
      bottomNavigationBar: widget.cartItems.isEmpty
          ? null
          : Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: GameZoneColors.surface,
                border: Border(top: BorderSide(color: GameZoneColors.surfaceContainerHigh)),
              ),
              child: SafeArea(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: GameZoneColors.primaryContainer,
                        foregroundColor: Colors.white,
                        minimumSize: const Size.fromHeight(52),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
                      ),
                      onPressed: () => _showCheckoutDialog(total),
                      icon: const Icon(Icons.lock, size: 20),
                      label: Text(
                        'Confirmar y Pagar \$${total.toStringAsFixed(2)} MXN',
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                      ),
                    ),
                    const SizedBox(height: 6),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.shield, size: 14, color: GameZoneColors.outline),
                        SizedBox(width: 4),
                        Text('Transacción cifrada SSL 256-bit de alta seguridad', style: TextStyle(color: GameZoneColors.outline, fontSize: 11)),
                      ],
                    ),
                  ],
                ),
              ),
            ),
      body: widget.cartItems.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.remove_shopping_cart, size: 64, color: GameZoneColors.outline),
                  const SizedBox(height: 12),
                  const Text('Tu carrito está vacío', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: widget.onBack,
                    child: const Text('Explorar Juegos'),
                  ),
                ],
              ),
            )
          : ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Text('Mi Carrito', style: Theme.of(context).textTheme.headlineSmall),
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: GameZoneColors.surfaceContainerHigh,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text('${widget.cartItems.length} items', style: const TextStyle(color: GameZoneColors.primary, fontSize: 11)),
                        ),
                      ],
                    ),
                    TextButton.icon(
                      onPressed: widget.onClearCart,
                      icon: const Icon(Icons.delete_sweep, size: 16, color: GameZoneColors.tertiary),
                      label: const Text('Vaciar', style: TextStyle(color: GameZoneColors.tertiary, fontSize: 12)),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Cart Items
                ...widget.cartItems.map((item) => _buildCartItemCard(item)),
                const SizedBox(height: 16),

                // Z-Coins Gamer Club Module
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: GameZoneColors.surfaceContainerLow,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Container(
                                width: 36,
                                height: 36,
                                decoration: BoxDecoration(
                                  color: GameZoneColors.primaryContainer.withOpacity(0.3),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: const Icon(Icons.monetization_on, color: GameZoneColors.primary, size: 22),
                              ),
                              const SizedBox(width: 10),
                              const Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text('Z-Coins Gamer Club', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                                      SizedBox(width: 6),
                                      Text('NIVEL 4', style: TextStyle(color: GameZoneColors.tertiary, fontSize: 10, fontWeight: FontWeight.bold)),
                                    ],
                                  ),
                                  Text('Tienes 3,450 Z-Coins disponibles', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                                ],
                              ),
                            ],
                          ),
                          Switch(
                            value: _useZCoins,
                            activeColor: Colors.white,
                            activeTrackColor: GameZoneColors.primaryContainer,
                            onChanged: (val) => setState(() => _useZCoins = val),
                          ),
                        ],
                      ),
                      if (_useZCoins) ...[
                        const SizedBox(height: 10),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: GameZoneColors.surfaceContainer,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Icon(Icons.check_circle, color: GameZoneColors.secondary, size: 16),
                                  SizedBox(width: 6),
                                  Text('Canjeando 1,000 Z-Coins', style: TextStyle(fontSize: 12)),
                                ],
                              ),
                              Text('-\$100.00 MXN', style: TextStyle(color: GameZoneColors.tertiary, fontWeight: FontWeight.bold, fontSize: 12)),
                            ],
                          ),
                        ),
                      ],
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(
                            child: TextField(
                              controller: _couponController,
                              style: const TextStyle(fontSize: 12),
                              decoration: InputDecoration(
                                hintText: 'CÓDIGO DE CUPÓN O CREADOR',
                                hintStyle: const TextStyle(color: GameZoneColors.outline, fontSize: 11),
                                prefixIcon: const Icon(Icons.confirmation_number, color: GameZoneColors.outline, size: 18),
                                filled: true,
                                fillColor: GameZoneColors.surfaceContainer,
                                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: GameZoneColors.surfaceContainerHigh,
                              foregroundColor: GameZoneColors.secondary,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            onPressed: _applyCoupon,
                            child: const Text('Aplicar', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Payment Method
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: GameZoneColors.surfaceContainer,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Método de pago', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                          Text('Cambiar', style: TextStyle(color: GameZoneColors.primary, fontSize: 12)),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: GameZoneColors.surfaceContainerHigh,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Row(
                          children: [
                            Text('VISA', style: TextStyle(fontStyle: FontStyle.italic, fontWeight: FontWeight.w900, fontSize: 14)),
                            SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Visa terminada en 8842', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                                  Text('Expira 09/27 • Tarjeta Principal', style: TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                                ],
                              ),
                            ),
                            Icon(Icons.check_circle, color: GameZoneColors.primary, size: 20),
                          ],
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton(
                              onPressed: () => widget.onShowSnackBar('Google Pay seleccionado'),
                              child: const Text('G Pay', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: OutlinedButton(
                              onPressed: () => widget.onShowSnackBar('Apple Pay seleccionado'),
                              child: const Text('Apple Pay', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // Summary
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: GameZoneColors.surfaceContainerLow,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Resumen del pedido', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                      const SizedBox(height: 10),
                      _buildSummaryRow('Subtotal (${widget.cartItems.length} artículos)', '\$${subtotal.toStringAsFixed(2)} MXN'),
                      if (_useZCoins && zCoinsDiscount > 0)
                        _buildSummaryRow('Recompensa Z-Coins', '-\$${zCoinsDiscount.toStringAsFixed(2)} MXN', isDiscount: true),
                      if (_couponDiscount > 0)
                        _buildSummaryRow('Cupón $_appliedCoupon', '-\$${_couponDiscount.toStringAsFixed(2)} MXN', isDiscount: true),
                      _buildSummaryRow('Impuestos e IVA (16% incl.)', '\$${(total * 0.16).toStringAsFixed(2)} MXN'),
                      const Divider(color: GameZoneColors.surfaceContainerHigh),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Total a Pagar', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                              Text('Precios en Pesos Mexicanos', style: TextStyle(color: GameZoneColors.outline, fontSize: 10)),
                            ],
                          ),
                          Text('\$${total.toStringAsFixed(2)} MXN', style: const TextStyle(color: GameZoneColors.primary, fontWeight: FontWeight.bold, fontSize: 20)),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
              ],
            ),
    );
  }

  Widget _buildCartItemCard(CartItem item) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: GameZoneColors.surfaceContainer,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.network(item.image, width: 80, height: 96, fit: BoxFit.cover),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(item.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                      ),
                      IconButton(
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(),
                        icon: const Icon(Icons.delete, color: GameZoneColors.outline, size: 18),
                        onPressed: () => widget.onRemoveItem(item.id),
                      ),
                    ],
                  ),
                  Text(item.edition, style: const TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 11)),
                  const SizedBox(height: 4),
                  const Row(
                    children: [
                      Icon(Icons.circle, color: GameZoneColors.tertiary, size: 8),
                      SizedBox(width: 4),
                      Text('Entrega Inmediata', style: TextStyle(color: GameZoneColors.tertiary, fontSize: 11)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Checkbox(
                            value: item.isGift,
                            activeColor: GameZoneColors.primaryContainer,
                            onChanged: (val) => setState(() => item.isGift = val ?? false),
                          ),
                          const Text('Para regalar', style: TextStyle(fontSize: 11)),
                        ],
                      ),
                      Text('\$${item.price.toStringAsFixed(2)} MXN', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryRow(String label, String value, {bool isDiscount = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(color: GameZoneColors.onSurfaceVariant, fontSize: 12)),
          Text(
            value,
            style: TextStyle(
              color: isDiscount ? GameZoneColors.tertiary : GameZoneColors.onSurface,
              fontWeight: FontWeight.bold,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}
