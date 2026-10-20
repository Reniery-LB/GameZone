import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onToggleGift: (itemId: string) => void;
  onCompleteCheckout: () => void;
  onNavigateToLibrary: () => void;
  onContinueShopping: () => void;
  showToast: (msg: string) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onRemoveItem,
  onClearCart,
  onToggleGift,
  onCompleteCheckout,
  onNavigateToLibrary,
  onContinueShopping,
  showToast,
}) => {
  const [useZCoins, setUseZCoins] = useState<boolean>(true);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'gpay' | 'applepay'>('card');
  const [showPaymentChangeModal, setShowPaymentChangeModal] = useState<boolean>(false);

  const zCoinsValue = 100.0; // 1,000 Z-Coins = $100.00 MXN

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const zCoinDiscountAmount = useZCoins && subtotal > 0 ? Math.min(zCoinsValue, subtotal) : 0;
  const taxableAmount = Math.max(0, subtotal - zCoinDiscountAmount - couponDiscount);
  const taxesIncluded = taxableAmount * 0.16; // 16% IVA already included
  const total = Math.max(0, taxableAmount);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      showToast('Ingresa un código de cupón');
      return;
    }
    const cleanCode = couponCode.trim().toUpperCase();
    const discount = Math.round(subtotal * 0.05); // 5% extra discount
    setAppliedCoupon(cleanCode);
    setCouponDiscount(discount);
    showToast(`¡Código "${cleanCode}" aplicado con éxito: 5% extra!`);
  };

  const handleConfirmPayment = () => {
    if (cartItems.length === 0) {
      showToast('Tu carrito está vacío');
      return;
    }
    setShowCheckoutModal(true);
    onCompleteCheckout();
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pb-28 pt-2 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="pt-2 pb-2 flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-xl text-[#e5e0ee] font-headline">Mi Carrito</h2>
          <span className="px-2 py-0.5 rounded-full bg-[#2a2933] text-[#d2bbff] text-xs font-semibold">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        {cartItems.length > 0 && (
          <button
            className="text-xs font-semibold text-[#4cd7f6] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
            onClick={() => {
              onClearCart();
              showToast('Carrito vaciado');
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
            Vaciar
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="p-8 my-8 text-center flex flex-col items-center gap-3 rounded-3xl bg-[#201e28]">
          <div className="w-16 h-16 rounded-full bg-[#2a2933] flex items-center justify-center text-[#958da1]">
            <span className="material-symbols-outlined text-[32px]">production_quantity_limits</span>
          </div>
          <h3 className="text-lg font-bold text-[#e5e0ee]">Tu carrito está vacío</h3>
          <p className="text-xs text-[#ccc3d8] max-w-[240px]">
            Explora las mejores ofertas y lanzamientos para agregar a tu colección.
          </p>
          <button
            onClick={onContinueShopping}
            className="mt-2 px-6 py-2.5 rounded-full bg-[#7c3aed] text-white text-xs font-bold shadow-lg shadow-[#7c3aed]/30 active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            Explorar Juegos
          </button>
        </div>
      ) : (
        <div className="py-2 flex flex-col gap-4">
          {/* Cart Items List */}
          <div className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <article
                key={item.id}
                className="relative rounded-2xl bg-[#201e28] p-3 flex flex-col gap-3 shadow-md border border-[#2a2933]/60 transition-all duration-300"
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-28 rounded-xl overflow-hidden shrink-0 bg-[#0e0d16]">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover"
                      src={item.image}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d16]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#0e0d16]/90 text-[#4cd7f6] text-[10px] uppercase font-bold tracking-wider">
                      {item.platform}
                    </span>
                    {item.discount && (
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-[#7c3aed] text-white text-[9px] font-bold">
                        {item.discount}
                      </span>
                    )}
                  </div>

                  {/* Info & Price */}
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h3 className="font-bold text-base text-[#e5e0ee] truncate leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-[#ccc3d8] truncate">{item.edition}</p>
                      </div>
                      <button
                        aria-label={`Eliminar ${item.title}`}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#ccc3d8] hover:text-[#ffb4ab] hover:bg-[#35333e] transition-colors cursor-pointer"
                        onClick={() => {
                          onRemoveItem(item.id);
                          showToast(`Eliminado ${item.title}`);
                        }}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
                      <span className="text-[11px] font-semibold text-[#4cd7f6]">
                        Entrega Inmediata
                      </span>
                    </div>

                    <div className="flex items-end justify-between mt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          checked={item.isGift}
                          onChange={() => onToggleGift(item.id)}
                          className="sr-only"
                          type="checkbox"
                        />
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                            item.isGift ? 'bg-[#7c3aed]' : 'bg-[#35333e]'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-white text-[13px] ${
                              item.isGift ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            card_giftcard
                          </span>
                        </div>
                        <span
                          className={`text-[11px] ${
                            item.isGift ? 'text-[#d2bbff] font-semibold' : 'text-[#ccc3d8]'
                          }`}
                        >
                          Para regalar
                        </span>
                      </label>

                      <div className="flex flex-col items-end">
                        {item.originalPrice && (
                          <span className="text-[11px] line-through text-[#958da1]">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="font-bold text-base text-[#e5e0ee]">
                          ${item.price.toFixed(2)}{' '}
                          <span className="text-[11px] font-normal text-[#ccc3d8]">MXN</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Z-Coins Interactive Module */}
          <section className="rounded-2xl bg-[#1c1a24] p-4 flex flex-col gap-3 border border-[#2a2933]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#7c3aed]/30 flex items-center justify-center text-[#d2bbff]">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    monetization_on
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-[#e5e0ee]">Z-Coins Gamer Club</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#007184] text-[#b7efff] text-[10px] font-bold">
                      NIVEL 4
                    </span>
                  </div>
                  <p className="text-xs text-[#ccc3d8]">
                    Tienes <strong className="text-[#cebdff] font-bold">3,450 Z-Coins</strong>{' '}
                    disponibles
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  checked={useZCoins}
                  onChange={(e) => setUseZCoins(e.target.checked)}
                  className="sr-only"
                  type="checkbox"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors relative shadow-inner ${
                    useZCoins ? 'bg-[#7c3aed]' : 'bg-[#35333e]'
                  }`}
                >
                  <div
                    className={`absolute top-[2px] bg-white rounded-full h-5 w-5 transition-transform duration-200 shadow-md ${
                      useZCoins ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </label>
            </div>

            {useZCoins && (
              <div className="flex items-center justify-between rounded-xl bg-[#201e28] px-3 py-2 text-[#e5e0ee] animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#cebdff]">
                    check_circle
                  </span>
                  <span className="text-xs text-[#e5e0ee]">Canjeando 1,000 Z-Coins</span>
                </div>
                <span className="text-xs font-bold text-[#4cd7f6]">
                  -${zCoinDiscountAmount.toFixed(2)} MXN
                </span>
              </div>
            )}

            {/* Cupón / Promo code Input */}
            <div className="flex items-center gap-2 mt-1">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-[#958da1]">
                  confirmation_number
                </span>
                <input
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#201e28] text-xs text-[#e5e0ee] placeholder:text-[#958da1] focus:outline-none focus:bg-[#2a2933] transition-colors uppercase tracking-wider border border-transparent focus:border-[#7c3aed]"
                  placeholder="CÓDIGO DE CUPÓN O CREADOR"
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <button
                className="h-11 px-4 rounded-xl bg-[#2a2933] hover:bg-[#3a3842] text-[#cebdff] text-xs font-bold transition-colors flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
                onClick={handleApplyCoupon}
                type="button"
              >
                Aplicar
              </button>
            </div>

            {appliedCoupon && (
              <div className="text-xs text-[#4cd7f6] px-1 font-semibold flex items-center justify-between">
                <span>¡Cupón {appliedCoupon} activo: -$5% extra!</span>
                <span className="text-[#4cd7f6]">-${couponDiscount.toFixed(2)} MXN</span>
              </div>
            )}
          </section>

          {/* Payment Selector */}
          <section className="rounded-2xl bg-[#201e28] p-4 flex flex-col gap-3 border border-[#2a2933]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#e5e0ee]">Método de pago</span>
              <button
                className="text-xs font-semibold text-[#d2bbff] hover:underline cursor-pointer"
                onClick={() => setShowPaymentChangeModal(true)}
                type="button"
              >
                Cambiar
              </button>
            </div>

            {/* Selected Card */}
            <div
              className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                selectedPayment === 'card'
                  ? 'bg-[#2a2933] ring-1 ring-[#7c3aed]'
                  : 'bg-[#1c1a24] hover:bg-[#2a2933]'
              }`}
              onClick={() => setSelectedPayment('card')}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-7 rounded-md bg-[#0e0d16] flex items-center justify-center px-1 border border-[#35333e]">
                  <span className="text-[13px] italic font-black text-white tracking-tighter">
                    VISA
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#e5e0ee] leading-snug">
                    Visa terminada en 8842
                  </p>
                  <p className="text-[11px] text-[#ccc3d8]">Expira 09/27 • Tarjeta Principal</p>
                </div>
              </div>
              {selectedPayment === 'card' && (
                <span
                  className="material-symbols-outlined text-[20px] text-[#d2bbff]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              )}
            </div>

            {/* Express Checkout quick buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                className={`h-10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold tracking-tight transition-all cursor-pointer active:scale-95 ${
                  selectedPayment === 'gpay'
                    ? 'bg-[#7c3aed] text-white ring-1 ring-white'
                    : 'bg-[#35333e] hover:bg-[#3a3842] text-[#e5e0ee]'
                }`}
                onClick={() => {
                  setSelectedPayment('gpay');
                  showToast('Método seleccionado: Google Pay');
                }}
                type="button"
              >
                <span>G Pay</span>
              </button>

              <button
                className={`h-10 rounded-xl flex items-center justify-center gap-2 text-xs font-bold tracking-tight transition-all cursor-pointer active:scale-95 ${
                  selectedPayment === 'applepay'
                    ? 'bg-[#7c3aed] text-white ring-1 ring-white'
                    : 'bg-[#35333e] hover:bg-[#3a3842] text-[#e5e0ee]'
                }`}
                onClick={() => {
                  setSelectedPayment('applepay');
                  showToast('Método seleccionado: Apple Pay');
                }}
                type="button"
              >
                <span>Apple Pay</span>
              </button>
            </div>
          </section>

          {/* Resumen de Pedido */}
          <section className="rounded-2xl bg-[#1c1a24] p-4 flex flex-col gap-2.5 border border-[#2a2933]">
            <h3 className="font-semibold text-sm text-[#e5e0ee] mb-1">Resumen del pedido</h3>

            <div className="flex justify-between items-center text-xs text-[#ccc3d8]">
              <span>Subtotal ({cartItems.length} artículos)</span>
              <span className="text-[#e5e0ee] font-semibold">${subtotal.toFixed(2)} MXN</span>
            </div>

            {useZCoins && zCoinDiscountAmount > 0 && (
              <div className="flex justify-between items-center text-xs text-[#ccc3d8]">
                <span className="flex items-center gap-1.5 text-[#cebdff]">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  Recompensa Z-Coins
                </span>
                <span className="text-[#4cd7f6] font-semibold">
                  -${zCoinDiscountAmount.toFixed(2)} MXN
                </span>
              </div>
            )}

            {appliedCoupon && couponDiscount > 0 && (
              <div className="flex justify-between items-center text-xs text-[#ccc3d8]">
                <span className="flex items-center gap-1.5 text-[#d2bbff]">
                  <span className="material-symbols-outlined text-[16px]">sell</span>
                  Cupón {appliedCoupon}
                </span>
                <span className="text-[#4cd7f6] font-semibold">
                  -${couponDiscount.toFixed(2)} MXN
                </span>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-[#ccc3d8]">
              <span>Impuestos e IVA (16% incl.)</span>
              <span className="text-[#e5e0ee] font-semibold">${taxesIncluded.toFixed(2)} MXN</span>
            </div>

            <div className="h-px bg-[#35333e] my-1" />

            <div className="flex justify-between items-baseline pt-1">
              <div>
                <span className="font-bold text-base text-[#e5e0ee]">Total a Pagar</span>
                <p className="text-[11px] text-[#958da1]">Precios en Pesos Mexicanos</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-2xl text-[#d2bbff] font-headline">
                  ${total.toFixed(2)}
                </span>
                <span className="text-[11px] text-[#ccc3d8] block">MXN</span>
              </div>
            </div>
          </section>

          {/* Trust Badges & Guarantee */}
          <div className="rounded-xl bg-[#201e28]/70 p-3 flex items-center justify-between gap-2 border border-[#2a2933]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">
                verified_user
              </span>
              <span className="text-[11px] text-[#ccc3d8]">Garantía de reembolso de 14 días</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#d2bbff]">bolt</span>
              <span className="text-[11px] text-[#cebdff]">Descarga digital 24/7</span>
            </div>
          </div>

          {/* Sticky / Bottom Floating Action Area */}
          <div className="pt-2 pb-6 flex flex-col gap-2.5">
            <button
              className="w-full h-14 rounded-full bg-[#7c3aed] hover:bg-[#732ee4] text-white text-sm font-bold shadow-lg shadow-[#7c3aed]/40 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              onClick={handleConfirmPayment}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">lock</span>
              <span>Confirmar y Pagar ${total.toFixed(2)} MXN</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[#958da1]">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span className="text-[11px]">Transacción cifrada SSL 256-bit de alta seguridad</span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Change Modal */}
      {showPaymentChangeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#201e28] p-5 flex flex-col gap-4 border border-[#2a2933]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#e5e0ee]">Métodos Guardados</h3>
              <button
                onClick={() => setShowPaymentChangeModal(false)}
                className="text-[#958da1] hover:text-[#e5e0ee] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setSelectedPayment('card');
                  setShowPaymentChangeModal(false);
                  showToast('Tarjeta Visa seleccionada');
                }}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#1c1a24] hover:bg-[#2a2933] cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-xs text-[#d2bbff]">VISA</span>
                  <span className="text-xs text-[#e5e0ee]">•••• 8842</span>
                </div>
                <span className="text-[11px] text-[#4cd7f6] font-semibold">Predeterminada</span>
              </button>

              <button
                onClick={() => {
                  showToast('Formulario de nueva tarjeta abierto');
                  setShowPaymentChangeModal(false);
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-[#4a4455] text-xs font-semibold text-[#d2bbff] hover:bg-[#2a2933] cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Agregar nueva tarjeta o PayPal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Success Feedback Toast Overlay Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-3xl bg-[#2a2933] p-6 flex flex-col items-center text-center gap-3 border border-[#7c3aed]/40 shadow-2xl animate-in slide-in-from-bottom-6 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#7c3aed]/20 flex items-center justify-center text-[#d2bbff] mb-1">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>

            <h3 className="font-bold text-xl text-[#e5e0ee] font-headline">¡Compra Confirmada!</h3>
            <p className="text-xs text-[#ccc3d8] max-w-[300px]">
              Tus licencias de juego han sido añadidas a tu biblioteca. Se envió el recibo y clave de
              activación a tu correo registrado.
            </p>

            <div className="w-full flex flex-col gap-2 mt-3">
              <button
                className="w-full h-12 rounded-full bg-[#7c3aed] hover:bg-[#732ee4] text-white text-xs font-bold shadow-lg shadow-[#7c3aed]/30 active:scale-95 transition-all cursor-pointer"
                onClick={() => {
                  setShowCheckoutModal(false);
                  onNavigateToLibrary();
                }}
                type="button"
              >
                Ir a mi Biblioteca
              </button>

              <button
                className="w-full h-10 rounded-full bg-transparent text-[#cebdff] hover:text-[#e5e0ee] text-xs font-semibold cursor-pointer"
                onClick={() => {
                  setShowCheckoutModal(false);
                  onContinueShopping();
                }}
                type="button"
              >
                Continuar explorando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
