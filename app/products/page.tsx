'use client';

import { motion } from '@/components/Motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ShoppingCart,
  Image as ImageIcon,
  BadgeCheck,
  Leaf,
  Truck,
  ShieldCheck,
  Sparkles,
  Star,
  Package,
  Zap,
  SunMedium,
  Droplets,
} from 'lucide-react';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/components/AuthProvider';

interface Product {
  id: string;
  _id?: string;
  name: string;
  category: 'fresh' | 'dried' | 'packaging' | 'solar';
  price: string;
  unit: string;
  description: string;
  features: string[];
  image: string;
  stock: string;
  rating: number;
}

// Static fallback data (used when API is unavailable)
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'fresh-1',
    name: 'Fresh Button Mushrooms',
    category: 'fresh',
    price: '₹180',
    unit: 'per kg',
    description: 'Premium quality fresh button mushrooms, perfect for restaurants and bulk orders.',
    features: ['Farm Fresh', 'No Pesticides', 'Quick Delivery', 'Bulk Orders Welcome'],
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd27c4f?w=500&h=500&fit=crop',
    stock: '500 kg',
    rating: 4.8,
  },
  {
    id: 'fresh-2',
    name: 'Oyster Mushrooms',
    category: 'fresh',
    price: '₹220',
    unit: 'per kg',
    description: 'Delicate and flavorful oyster mushrooms, ideal for specialty cooking.',
    features: ['High Protein', 'Rich Flavor', 'Premium Quality', 'Certified Organic'],
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop',
    stock: '300 kg',
    rating: 4.9,
  },
  {
    id: 'fresh-3',
    name: 'Shiitake Mushrooms',
    category: 'fresh',
    price: '₹280',
    unit: 'per kg',
    description: 'Authentic shiitake mushrooms with exceptional umami flavor and nutritional value.',
    features: ['Premium Import', 'Umami Rich', 'Health Benefits', 'Gourmet Grade'],
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=500&fit=crop',
    stock: '200 kg',
    rating: 4.9,
  },
  {
    id: 'solar-1',
    name: 'Professional Solar Panel Cleaning',
    category: 'solar',
    price: '₹2,500',
    unit: 'per panel',
    description: 'Expert solar panel cleaning service with deionized water and professional equipment.',
    features: ['Deionized Water', 'Safe Technique', 'Efficiency Boost', 'Professional Grade'],
    image: 'https://images.unsplash.com/photo-1560994190-6ba469c88fa7?w=500&h=500&fit=crop',
    stock: 'On-Demand',
    rating: 4.9,
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type CategoryKey = 'all' | Product['category'];

const filters: Array<{ id: CategoryKey; label: string; hint: string }> = [
  { id: 'all', label: 'All Products', hint: 'Complete catalog' },
  { id: 'fresh', label: 'Fresh Mushrooms', hint: 'Daily harvest' },
  { id: 'dried', label: 'Dried Products', hint: 'Shelf stable' },
  { id: 'packaging', label: 'Packaging', hint: 'Business ready' },
  { id: 'solar', label: 'Solar Services', hint: 'Professional maintenance' },
];

export default function ProductsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const { items, addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const json = await res.json();
        if (json.status === 'success' && json.data.length > 0) {
          // Map _id to id for cart compatibility
          const mapped = json.data.map((p: any) => ({
            ...p,
            id: p._id || p.id,
          }));
          setProducts(mapped);
        }
        // If API returns empty, keep fallback data
      } catch {
        // API unreachable, use fallback data — silent
        console.log('Products API unavailable, using fallback data');
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'all' ? products : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/products');
      return;
    }
    
    addToCart({
      id: product.id || (product as any)._id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <>
      {/* Unique Product Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 mb-6 backdrop-blur">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-slate-300">Complete Product & Service Catalog</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Explore Our Premium <br/>
              <span className="bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Products & Services
              </span>
            </h1>

            <p className="text-lg text-slate-400 mb-8">
              From farm-fresh mushrooms and sustainable packaging to professional solar maintenance solutions. Everything you need for your business in one place.
            </p>
          </motion.div>

          {/* Product Category Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {/* Mushroom Products Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative group overflow-hidden rounded-[2rem] border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-900/60 p-8 backdrop-blur-xl hover:border-emerald-500/60 transition-all duration-300"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.15),_transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-xl bg-emerald-500/20 p-3">
                  <Leaf className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Mushroom Products</h2>
                  <p className="text-sm text-emerald-300">Farm Fresh • Organic • Bulk Ready</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-emerald-500/20">
                  <BadgeCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">Fresh Button & Oyster Mushrooms</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-emerald-500/20">
                  <BadgeCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">Premium Dried Varieties & Powders</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-emerald-500/20">
                  <BadgeCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">Eco-Friendly Packaging Solutions</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="#product-grid"
                  onClick={() => setSelectedCategory('fresh')}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 px-4 py-3 text-sm font-bold text-white transition-all"
                >
                  Explore Mushrooms
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-white/5 border border-emerald-500/20">
                  <p className="text-2xl font-bold text-emerald-400">9</p>
                  <p className="text-xs text-slate-400">Products</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-emerald-500/20">
                  <p className="text-2xl font-bold text-emerald-400">4.8</p>
                  <p className="text-xs text-slate-400">Avg Rating</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-emerald-500/20">
                  <p className="text-2xl font-bold text-emerald-400">1000+</p>
                  <p className="text-xs text-slate-400">Orders</p>
                </div>
              </div>
            </motion.div>

            {/* Solar Services Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group overflow-hidden rounded-[2rem] border border-primary-500/30 bg-gradient-to-br from-primary-950/40 to-slate-900/60 p-8 backdrop-blur-xl hover:border-primary-500/60 transition-all duration-300"
            >
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(50,112,242,0.15),_transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-xl bg-primary-500/20 p-3">
                  <SunMedium className="h-8 w-8 text-primary-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Solar Services</h2>
                  <p className="text-sm text-solar-300">Professional • Certified • Efficient</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-primary-500/20">
                  <BadgeCheck className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">Professional Panel Cleaning</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-primary-500/20">
                  <BadgeCheck className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">System Monitoring & Maintenance</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-primary-500/20">
                  <BadgeCheck className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">24/7 Emergency Support</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="#product-grid"
                  onClick={() => setSelectedCategory('solar')}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-solar-500 hover:from-primary-700 hover:to-solar-600 px-4 py-3 text-sm font-bold text-white transition-all"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-white/5 border border-primary-500/20">
                  <p className="text-2xl font-bold text-primary-400">6</p>
                  <p className="text-xs text-slate-400">Services</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-primary-500/20">
                  <p className="text-2xl font-bold text-solar-400">4.9</p>
                  <p className="text-xs text-slate-400">Avg Rating</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 border border-primary-500/20">
                  <p className="text-2xl font-bold text-primary-400">500+</p>
                  <p className="text-xs text-slate-400">Clients</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur text-center">
              <p className="text-2xl font-bold text-emerald-400">15+</p>
              <p className="text-xs text-slate-400 mt-1">Premium Products</p>
            </div>
            <div className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur text-center">
              <p className="text-2xl font-bold text-sky-400">₹2.5K</p>
              <p className="text-xs text-slate-400 mt-1">Starting Price</p>
            </div>
            <div className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur text-center">
              <p className="text-2xl font-bold text-amber-400">Fast</p>
              <p className="text-xs text-slate-400 mt-1">Next Day Delivery</p>
            </div>
            <div className="p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur text-center">
              <p className="text-2xl font-bold text-lime-400">24/7</p>
              <p className="text-xs text-slate-400 mt-1">Customer Support</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-container" id="product-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedCategory(filter.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                selectedCategory === filter.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
                  : 'border border-slate-200/80 bg-white/80 text-slate-600 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:bg-slate-900'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current opacity-60" />
              {filter.label}
              <span className="hidden text-[11px] font-medium opacity-70 sm:inline">• {filter.hint}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, idx) => {
            const inCart = items.some((item) => item.id === product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.14)] dark:border-slate-800 dark:bg-slate-950/70"
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.12),_transparent_40%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-4 flex items-center justify-between">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    product.category === 'solar' 
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-200'
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200'
                  }`}>
                    {product.category === 'fresh' ? 'Fresh' : product.category === 'dried' ? 'Dried' : product.category === 'packaging' ? 'Packaging' : 'Solar Service'}
                  </span>
                  <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-500/10 dark:text-amber-200">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {product.rating}
                  </div>
                </div>

                <div className="relative mb-5 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-br from-slate-50 to-slate-100 p-5 text-center dark:border-slate-800 dark:from-slate-900 dark:to-slate-800">
                  <div className="absolute right-3 top-3 rounded-full bg-white/85 p-2 shadow-sm dark:bg-slate-950/80 z-10">
                    <ImageIcon className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="flex h-36 items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/500?text=' + encodeURIComponent(product.name);
                      }}
                    />
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:bg-slate-950/80 dark:text-slate-300">
                    <Package className="h-3.5 w-3.5" />
                    {product.stock} in stock
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="flex-1 text-lg font-bold leading-tight text-slate-950 dark:text-white">{product.name}</h3>
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-950 dark:text-white">{product.price}</p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{product.unit}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{product.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                      >
                        <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="rounded-[1.25rem] border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Best for</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                          {product.category === 'packaging' ? 'Bulk packaging needs' : 'Retail and wholesale buyers'}
                        </p>
                      </div>
                      <ShoppingCart className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-xs font-bold transition-all duration-300 shadow-sm ${
                      inCart
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-none'
                        : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-primary-600/20 hover:-translate-y-0.5 hover:shadow-md'
                    }`}
                  >
                    <ShoppingCart className="h-4.5 w-4.5" />
                    {inCart ? 'Added' : 'Add to Cart'}
                  </button>

                  <Link
                    href={`/enquiry?product=${product.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    Enquire
                    <ArrowRight className="h-4.5 w-4.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section-container bg-gradient-to-r from-mushroom-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl">
        <h2 className="mb-12 text-center text-4xl font-bold gradient-text">Product Categories</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'Fresh Mushrooms',
              description:
                'Farm-fresh mushrooms harvested daily, delivered with temperature control to maintain peak quality.',
              items: ['Button Mushrooms', 'Oyster Mushrooms', 'Shiitake Mushrooms', 'Specialty Varieties'],
              icon: '🍄',
            },
            {
              title: 'Dried Products',
              description: 'Concentrated flavors with extended shelf life. Perfect for bulk orders and commercial use.',
              items: ['Dried Varieties', 'Mushroom Powder', 'Pre-packaged Mix', 'Bulk Options'],
              icon: '🥫',
            },
            {
              title: 'Eco-Friendly Packaging',
              description: 'Sustainable packaging solutions that keep your products fresh while protecting the planet.',
              items: ['Cardboard Boxes', 'Kraft Paper Bags', 'Vacuum Seal Bags', 'Custom Solutions'],
              icon: '♻️',
            },
          ].map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <div className="mb-4 text-5xl">{category.icon}</div>
              <h3 className="mb-2 text-2xl font-bold">{category.title}</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-400">{category.description}</p>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card text-center"
        >
          <h2 className="mb-4 text-4xl font-bold gradient-text">Looking for Bulk Orders?</h2>
          <p className="mx-auto mb-8 max-w-xl text-slate-600 dark:text-slate-400">
            We offer special pricing and customized packages for bulk orders. Contact us for wholesale rates and
            long-term partnership opportunities.
          </p>
          <Link href="/enquiry" className="btn-primary inline-flex items-center justify-center group">
            Request Quote
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
