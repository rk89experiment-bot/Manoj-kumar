import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  ShoppingBag, 
  MessageSquare, 
  Info, 
  ChevronRight, 
  Star, 
  Phone, 
  ArrowLeft,
  CheckCircle2,
  Leaf,
  Sparkles,
  Activity,
  Menu,
  User,
  Instagram,
  X,
  MapPin,
  Truck
} from 'lucide-react';
import { PRODUCTS, REVIEWS, CATEGORIES } from './constants';
import { Product, Review } from './types';

type Screen = 'home' | 'products' | 'product-detail' | 'consult' | 'about';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const navigateTo = (screen: Screen, product: Product | null = null) => {
    if (product) setSelectedProduct(product);
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#2D5A27]/20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-50 flex items-center justify-between px-6 border-b border-[#2D5A27]/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2D5A27] rounded-lg flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#2D5A27]">AAYURVEDA</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-24">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <div key="home">
              <HomeScreen navigateTo={navigateTo} />
            </div>
          )}
          {currentScreen === 'products' && (
            <div key="products">
              <ProductListScreen navigateTo={navigateTo} />
            </div>
          )}
          {currentScreen === 'product-detail' && selectedProduct && (
            <div key="product-detail">
              <ProductDetailScreen 
                product={selectedProduct} 
                navigateTo={navigateTo} 
                onBuyNow={() => setShowCheckout(true)}
              />
            </div>
          )}
          {currentScreen === 'consult' && (
            <div key="consult">
              <ConsultationScreen navigateTo={navigateTo} />
            </div>
          )}
          {currentScreen === 'about' && (
            <div key="about">
              <AboutUsScreen />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && selectedProduct && (
          <CheckoutModal 
            product={selectedProduct} 
            onClose={() => setShowCheckout(false)} 
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 px-6 flex items-center justify-between z-50">
        <NavItem 
          icon={<HomeIcon />} 
          label="Home" 
          active={currentScreen === 'home'} 
          onClick={() => navigateTo('home')} 
        />
        <NavItem 
          icon={<ShoppingBag />} 
          label="Products" 
          active={currentScreen === 'products' || currentScreen === 'product-detail'} 
          onClick={() => navigateTo('products')} 
        />
        <NavItem 
          icon={<MessageSquare />} 
          label="Consult" 
          active={currentScreen === 'consult'} 
          onClick={() => navigateTo('consult')} 
        />
        <NavItem 
          icon={<Info />} 
          label="About" 
          active={currentScreen === 'about'} 
          onClick={() => navigateTo('about')} 
        />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-[#2D5A27]' : 'text-gray-400'}`}
    >
      <div className={`p-1 rounded-xl transition-all ${active ? 'bg-[#2D5A27]/10 scale-110' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
    </button>
  );
}

function HomeScreen({ navigateTo }: { navigateTo: (screen: Screen, product?: Product) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Hero Banner */}
      <section className="px-6">
        <div className="relative h-56 rounded-3xl overflow-hidden bg-[#2D5A27] flex items-center px-8">
          <div className="relative z-10 space-y-3 max-w-[65%]">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white text-[10px] font-bold uppercase tracking-wider">Special Offer</span>
            </div>
            <h2 className="text-white text-2xl font-bold leading-tight">Relieve Body Pain Instantly</h2>
            <p className="text-white/80 text-sm">Follow on <span className="text-white font-bold">Instagram</span> for ₹39 OFF!</p>
            <button 
              onClick={() => window.open('https://www.instagram.com/gm.musicworld?igsh=YjBmcGFmeXBrZ2kw', '_blank')}
              className="bg-white text-[#2D5A27] px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" /> Follow Now
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#2D5A27] to-transparent z-0">
            <img 
              src="https://picsum.photos/seed/massage/800/600" 
              alt="Massage" 
              className="h-full w-full object-cover opacity-60 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Delivery Info Banner */}
      <section className="px-6">
        <button 
          onClick={() => window.open('https://www.instagram.com/gm.musicworld?igsh=YjBmcGFmeXBrZ2kw', '_blank')}
          className="w-full bg-[#E1306C]/10 border border-[#E1306C]/20 p-4 rounded-2xl flex items-center gap-4 text-left"
        >
          <div className="w-10 h-10 bg-[#E1306C] rounded-full flex items-center justify-center text-white">
            <Instagram className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#E1306C]">Follow us on Instagram</p>
            <p className="text-[11px] text-[#E1306C]/70">Follow & DM for <span className="font-bold">₹39 OFF</span> on your order!</p>
          </div>
        </button>
      </section>

      {/* Categories */}
      <section className="px-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Categories</h3>
          <button onClick={() => navigateTo('products')} className="text-[#2D5A27] text-sm font-semibold flex items-center gap-1">
            See All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => navigateTo('products')}
              className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#2D5A27]/30 transition-all shadow-sm"
            >
              <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center text-[#2D5A27]">
                {cat.icon === 'Leaf' && <Leaf className="w-6 h-6" />}
                {cat.icon === 'Sparkles' && <Sparkles className="w-6 h-6" />}
                {cat.icon === 'Activity' && <Activity className="w-6 h-6" />}
              </div>
              <span className="text-xs font-bold text-gray-600">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Featured Products</h3>
          <button onClick={() => navigateTo('products')} className="text-[#2D5A27] text-sm font-semibold flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
          {PRODUCTS.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} onClick={() => navigateTo('product-detail', product)} />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 space-y-4 bg-[#2D5A27]/5 py-8 -mx-6 px-6">
        <h3 className="text-lg font-bold px-6">What Our Customers Say</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-6">
          {REVIEWS.map((review) => (
            <div key={review.id}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function ProductCard({ product, onClick }: { product: Product, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="min-w-[180px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-bold">{product.rating}</span>
        </div>
      </div>
      <div className="p-4 space-y-1">
        <span className="text-[10px] uppercase tracking-wider text-[#2D5A27] font-bold">{product.category}</span>
        <h4 className="font-bold text-sm line-clamp-1">{product.name}</h4>
        <div className="flex items-center justify-between pt-2">
          <span className="text-[#2D5A27] font-bold">₹{product.price}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-8 h-8 bg-[#2D5A27] text-white rounded-full flex items-center justify-center hover:bg-[#1E3D1A] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="min-w-[280px] bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#2D5A27]">
            {review.userName.charAt(0)}
          </div>
          <div>
            <h5 className="text-sm font-bold">{review.userName}</h5>
            <span className="text-[10px] text-gray-400">{review.date}</span>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'}`} />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 italic leading-relaxed">{review.comment}</p>
    </div>
  );
}

function ProductListScreen({ navigateTo }: { navigateTo: (screen: Screen, product?: Product) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 space-y-6"
    >
      <div className="flex items-center gap-4">
        <button onClick={() => navigateTo('home')} className="p-2 bg-white rounded-full border border-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold">Our Products</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {PRODUCTS.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} onClick={() => navigateTo('product-detail', product)} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ProductDetailScreen({ product, navigateTo, onBuyNow }: { product: Product, navigateTo: (screen: Screen, product?: Product) => void, onBuyNow: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-0"
    >
      <div className="relative h-[400px]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={() => navigateTo('products')}
          className="absolute top-6 left-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-t-[40px] -mt-10 relative z-10 p-8 space-y-6 shadow-2xl min-h-[500px]">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#2D5A27] font-bold uppercase tracking-widest text-xs">{product.category}</span>
            <div className="flex items-center gap-1 bg-[#2D5A27]/5 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold">{product.rating}</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold leading-tight">{product.name}</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#2D5A27]">₹{product.price}</span>
              <span className="text-gray-400 font-medium">/ {product.quantity}</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Delivery: <span className="font-bold">₹39</span></p>
              <button 
                onClick={() => window.open('https://www.instagram.com/gm.musicworld?igsh=YjBmcGFmeXBrZ2kw', '_blank')}
                className="text-[10px] text-[#E1306C] font-bold flex items-center gap-1 justify-end"
              >
                <Instagram className="w-3 h-3" /> Follow for ₹39 OFF
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">Benefits</h3>
          <div className="grid grid-cols-1 gap-3">
            {product.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A27]" />
                <span className="text-gray-600 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {product.ingredients.map((ing, i) => (
              <span key={i} className="bg-gray-50 px-4 py-2 rounded-full text-xs font-medium text-gray-600 border border-gray-100">
                {ing}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg">Usage</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{product.usage}</p>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            onClick={onBuyNow}
            className="flex-1 bg-[#2D5A27] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#2D5A27]/20 hover:bg-[#1E3D1A] transition-colors"
          >
            Buy Now
          </button>
          <button 
            onClick={() => window.open(`https://wa.me/918955932061?text=I'm interested in ${product.name}`, '_blank')}
            className="w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#25D366]/20 hover:opacity-90 transition-opacity"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CheckoutModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [hasFollowed, setHasFollowed] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    pincode: '',
    landmark: ''
  });

  const totalPrice = hasFollowed === true ? product.price : product.price + 39;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = `*New Order Details*%0A` +
      `--------------------------%0A` +
      `*Product:* ${product.name}%0A` +
      `*Price:* ₹${totalPrice} ${hasFollowed ? '(₹39 Discount Applied)' : '(Inc. Delivery)'}%0A` +
      `--------------------------%0A` +
      `*Customer Details:*%0A` +
      `- Name: ${formData.name}%0A` +
      `- Phone: ${formData.phone}%0A` +
      `- City: ${formData.city}%0A` +
      `- Pin Code: ${formData.pincode}%0A` +
      `- Landmark: ${formData.landmark}%0A` +
      `--------------------------%0A` +
      `*Payment Status:* Initiated via UPI Link%0A` +
      `*Instagram Follow:* ${hasFollowed ? 'Yes (Discounted)' : 'No'}`;

    // Open WhatsApp
    window.open(`https://wa.me/918955932061?text=${message}`, '_blank');
    
    // Close modal
    onClose();
  };

  const handlePayment = () => {
    window.open('https://upilinks.in/payment-link/upi1767056252', '_blank');
    setStep(2);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] p-8 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl" referrerPolicy="no-referrer" />
          <div className="flex-1">
            <h4 className="font-bold text-sm">{product.name}</h4>
            <div className="flex items-center justify-between">
              <p className="text-[#2D5A27] font-bold">₹{totalPrice}</p>
              {hasFollowed === true && (
                <span className="text-[10px] bg-[#2D5A27]/10 text-[#2D5A27] px-2 py-0.5 rounded-full font-bold">₹39 OFF Applied</span>
              )}
            </div>
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-6 py-4">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#2D5A27]/10 rounded-full flex items-center justify-center mx-auto text-[#2D5A27]">
                <Instagram className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg">Instagram Discount</h3>
              <p className="text-sm text-gray-500">Did you follow us on Instagram for ₹39 discount?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setHasFollowed(true)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${hasFollowed === true ? 'border-[#2D5A27] bg-[#2D5A27]/5' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${hasFollowed === true ? 'bg-[#2D5A27] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold">I Followed</span>
              </button>
              <button 
                onClick={() => setHasFollowed(false)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${hasFollowed === false ? 'border-gray-400 bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${hasFollowed === false ? 'bg-gray-400 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <X className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold">No Follow</span>
              </button>
            </div>

            {hasFollowed !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-2"
              >
                <div className="p-4 bg-[#2D5A27]/5 rounded-2xl border border-[#2D5A27]/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Product Price</span>
                    <span className="font-bold">₹{product.price}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Delivery Charge</span>
                    <span className={`font-bold ${hasFollowed ? 'line-through text-gray-400' : ''}`}>₹39</span>
                  </div>
                  {hasFollowed && (
                    <div className="flex justify-between text-sm mb-2 text-[#2D5A27]">
                      <span>Instagram Discount</span>
                      <span className="font-bold">-₹39</span>
                    </div>
                  )}
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-[#2D5A27]">₹{totalPrice}</span>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  className="w-full bg-[#2D5A27] text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  Pay Now (₹{totalPrice}) <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
            
            <p className="text-[10px] text-center text-gray-400 italic">After payment, you will enter your delivery details.</p>
          </div>
        ) : (
          <form onSubmit={handleOrder} className="space-y-4">
            <div className="text-center space-y-1 pb-2">
              <h3 className="font-bold text-lg">Step 2: Delivery Details</h3>
              <p className="text-xs text-gray-500">Enter where you want the product delivered.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    type="tel" 
                    placeholder="Your Phone" 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">City</label>
                  <input 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    type="text" 
                    placeholder="City" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">Pin Code</label>
                  <input 
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    type="text" 
                    placeholder="Pin Code" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase ml-2">Landmark / Full Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
                  <textarea 
                    required
                    value={formData.landmark}
                    onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                    rows={2}
                    placeholder="Nearby landmark or full address" 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 resize-none"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#2D5A27] text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              <Truck className="w-5 h-5" /> Order Now on WhatsApp
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function ConsultationScreen({ navigateTo }: { navigateTo: (screen: Screen) => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="px-6 py-20 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-[#2D5A27] rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#2D5A27]/20">
          <CheckCircle2 className="text-white w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold">Consultation Booked!</h2>
        <p className="text-gray-600">Our Ayurvedic expert will contact you shortly on your provided phone number.</p>
        <button 
          onClick={() => navigateTo('home')}
          className="bg-[#2D5A27] text-white px-8 py-3 rounded-xl font-bold"
        >
          Back to Home
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="px-6 space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Free Consultation</h2>
        <p className="text-gray-500">Get personalized advice from our Ayurvedic experts.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Full Name</label>
          <input 
            required
            type="text" 
            placeholder="Enter your name" 
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27] transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Phone Number</label>
          <input 
            required
            type="tel" 
            placeholder="Enter your phone number" 
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27] transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">Describe Your Problem</label>
          <textarea 
            required
            rows={4}
            placeholder="How can we help you?" 
            className="w-full p-4 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27] transition-all resize-none"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-[#2D5A27] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#2D5A27]/20 hover:bg-[#1E3D1A] transition-colors"
        >
          Submit Request
        </button>
      </form>
    </motion.div>
  );
}

function AboutUsScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-6 space-y-10"
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Our Story</h2>
        <div className="relative h-48 rounded-3xl overflow-hidden">
          <img 
            src="https://picsum.photos/seed/tradition/800/600" 
            alt="Tradition" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <span className="text-white font-bold text-lg">AAYURVEDA</span>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">
          AAYURVEDA was founded with a simple mission: to bring the ancient wisdom of Ayurveda to the modern world. Our oils are crafted using traditional methods and pure herbal extracts, ensuring maximum potency and safety.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold">Why Trust Us?</h3>
        <div className="grid grid-cols-2 gap-4">
          <TrustBadge icon={<CheckCircle2 className="w-6 h-6" />} label="100% Natural" />
          <TrustBadge icon={<CheckCircle2 className="w-6 h-6" />} label="GMP Certified" />
          <TrustBadge icon={<CheckCircle2 className="w-6 h-6" />} label="No Chemicals" />
          <TrustBadge icon={<CheckCircle2 className="w-6 h-6" />} label="Expert Tested" />
        </div>
      </div>

      <div className="p-8 bg-[#2D5A27] rounded-[40px] text-white space-y-4">
        <h3 className="text-xl font-bold">Visit Our Store</h3>
        <p className="text-white/80 text-sm">near Dadhich bhawan, jhareli, nagaur, Rajasthan, IN</p>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span className="font-bold">+91 89559 32061</span>
        </div>
      </div>
    </motion.div>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
      <div className="text-[#2D5A27]">{icon}</div>
      <span className="text-xs font-bold text-gray-600 text-center">{label}</span>
    </div>
  );
}
