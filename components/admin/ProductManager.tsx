'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Package,
  Trash2,
  Edit3,
  X,
  Save,
  Loader2,
  ImageIcon,
  Star,
  AlertCircle,
  CheckCircle2,
  Leaf,
  Sun,
  Box,
  Sparkles,
  Upload,
  Camera,
} from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  category: 'fresh' | 'dried' | 'packaging' | 'solar';
  price: string;
  unit: string;
  description: string;
  features: string[];
  image: string;
  stock: string;
  rating: number;
  isActive: boolean;
  createdAt: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type ProductType = 'mushroom' | 'solar';

const PRODUCT_TYPES: { id: ProductType; label: string; icon: any; color: string; categories: string[] }[] = [
  {
    id: 'mushroom',
    label: 'Mushroom Products',
    icon: Leaf,
    color: 'emerald',
    categories: ['fresh', 'dried', 'packaging'],
  },
  {
    id: 'solar',
    label: 'Solar Services',
    icon: Sun,
    color: 'orange',
    categories: ['solar'],
  },
];

const CATEGORIES = [
  { id: 'fresh', label: 'Fresh Mushrooms', type: 'mushroom' },
  { id: 'dried', label: 'Dried Products', type: 'mushroom' },
  { id: 'packaging', label: 'Packaging', type: 'mushroom' },
  { id: 'solar', label: 'Solar Services', type: 'solar' },
] as const;

const EMPTY_FORM = {
  name: '',
  category: 'fresh' as Product['category'],
  price: '',
  unit: '',
  description: '',
  features: '',
  image: '',
  stock: '',
  rating: 4.5,
};

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeType, setActiveType] = useState<ProductType>('mushroom');

  // Image upload state
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/products`);
      const json = await res.json();
      if (json.status === 'success') {
        setProducts(json.data);
      }
    } catch {
      showToast('error', 'Failed to fetch products. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  // =========== IMAGE UPLOAD ===========
  const handleImageUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      showToast('error', 'Only JPEG, PNG, WebP, GIF images allowed');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'Image must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${API_BASE}/api/products/upload/image`, {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json.status === 'success') {
        const fullUrl = `${API_BASE}${json.data.url}`;
        setForm((prev) => ({ ...prev, image: fullUrl }));
        setImagePreview(fullUrl);
        showToast('success', 'Image uploaded successfully!');
      } else {
        showToast('error', json.message || 'Upload failed');
      }
    } catch {
      showToast('error', 'Image upload failed. Check backend connection.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const removeImage = () => {
    setForm((prev) => ({ ...prev, image: '' }));
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // =========== CRUD OPERATIONS ===========
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.unit || !form.description) {
      showToast('error', 'Please fill all required fields');
      return;
    }

    setSaving(true);
    try {
      const body = {
        ...form,
        features: form.features
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean),
      };

      const url = editingId ? `${API_BASE}/api/products/${editingId}` : `${API_BASE}/api/products`;
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (json.status === 'success') {
        showToast('success', editingId ? 'Product updated!' : 'Product added!');
        cancelForm();
        fetchProducts();
      } else {
        showToast('error', json.message || 'Something went wrong');
      }
    } catch {
      showToast('error', 'Network error. Check backend connection.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this product?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.status === 'success') {
        showToast('success', 'Product removed');
        fetchProducts();
      }
    } catch {
      showToast('error', 'Failed to delete product');
    }
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit,
      description: product.description,
      features: product.features.join(', '),
      image: product.image,
      stock: product.stock,
      rating: product.rating,
    });
    setImagePreview(product.image);
    setEditingId(product._id);

    // Switch to correct type tab
    const catInfo = CATEGORIES.find((c) => c.id === product.category);
    if (catInfo) setActiveType(catInfo.type as ProductType);

    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // When switching product type, update category default
  const handleTypeSwitch = (type: ProductType) => {
    setActiveType(type);
    if (!showForm) return;
    const typeInfo = PRODUCT_TYPES.find((t) => t.id === type);
    if (typeInfo) {
      setForm((prev) => ({
        ...prev,
        category: typeInfo.categories[0] as Product['category'],
      }));
    }
  };

  // Filter products by active type
  const currentTypeInfo = PRODUCT_TYPES.find((t) => t.id === activeType)!;
  const filteredProducts = products.filter((p) => currentTypeInfo.categories.includes(p.category));
  const availableCategories = CATEGORIES.filter((c) => c.type === activeType);

  const categoryBadge = (cat: string) => {
    const colorMap: Record<string, string> = {
      fresh: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dried: 'bg-amber-50 text-amber-700 border-amber-200',
      packaging: 'bg-sky-50 text-sky-700 border-sky-200',
      solar: 'bg-orange-50 text-orange-700 border-orange-200',
    };
    const labelMap: Record<string, string> = {
      fresh: 'Fresh Mushrooms',
      dried: 'Dried Products',
      packaging: 'Packaging',
      solar: 'Solar Services',
    };
    return (
      <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${colorMap[cat] || ''}`}>
        {labelMap[cat] || cat}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-bold border ${
            toast.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
          style={{ animation: 'slideIn 0.3s ease' }}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          {toast.message}
        </div>
      )}

      {/* ========== Product Type Tabs (Mushroom / Solar) ========== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600" />
            Product Catalog Manager
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {products.length} product{products.length !== 1 ? 's' : ''} total • {filteredProducts.length} in{' '}
            {currentTypeInfo.label}
          </p>
        </div>
        <button
          onClick={() => {
            cancelForm();
            // Set correct default category based on active type
            const typeInfo = PRODUCT_TYPES.find((t) => t.id === activeType);
            setForm({
              ...EMPTY_FORM,
              category: (typeInfo?.categories[0] || 'fresh') as Product['category'],
            });
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          Add {activeType === 'mushroom' ? 'Mushroom Product' : 'Solar Service'}
        </button>
      </div>

      {/* Product Type Toggle */}
      <div className="flex gap-3">
        {PRODUCT_TYPES.map((type) => {
          const Icon = type.icon;
          const count = products.filter((p) => type.categories.includes(p.category)).length;
          const isActive = activeType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => handleTypeSwitch(type.id)}
              className={`flex-1 flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                isActive
                  ? type.id === 'mushroom'
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100'
                    : 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-100'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isActive
                    ? type.id === 'mushroom'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-orange-500 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className={`font-bold text-sm ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>{type.label}</p>
                <p className="text-xs text-slate-400">
                  {count} product{count !== 1 ? 's' : ''}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========== Add / Edit Form ========== */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          <div
            className={`px-6 py-4 flex items-center justify-between ${
              activeType === 'mushroom'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700'
                : 'bg-gradient-to-r from-orange-500 to-orange-600'
            }`}
          >
            <h4 className="text-white font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {editingId ? 'Edit' : 'Add New'} {activeType === 'mushroom' ? 'Mushroom Product' : 'Solar Service'}
            </h4>
            <button onClick={cancelForm} className="text-white/70 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* ========= IMAGE UPLOAD SECTION ========= */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Product Image
              </label>
              <div className="flex gap-5 items-start">
                {/* Upload Zone */}
                <div
                  className={`flex-1 relative border-2 border-dashed rounded-2xl transition-all cursor-pointer ${
                    dragActive
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <div className="p-8 text-center">
                    {uploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                        <p className="text-sm font-semibold text-slate-500">Uploading image...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            Drop image here or <span className="text-emerald-600">browse</span>
                          </p>
                          <p className="text-xs text-slate-400 mt-1">JPEG, PNG, WebP, GIF • Max 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview */}
                <div className="w-40 shrink-0">
                  <div className="w-40 h-40 rounded-2xl border-2 border-slate-200 bg-slate-50 overflow-hidden relative">
                    {imagePreview || form.image ? (
                      <>
                        <img
                          src={imagePreview || form.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-300">
                        <Camera className="w-8 h-8 mb-1" />
                        <span className="text-[10px] font-semibold">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* OR: Paste URL */}
              <div className="mt-3 flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Or paste URL:</span>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => {
                    setForm({ ...form, image: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Row 1: Name + Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={activeType === 'mushroom' ? 'e.g. Fresh Oyster Mushrooms' : 'e.g. Solar Panel Cleaning'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Product['category'] })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                >
                  {availableCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Price + Unit + Stock + Rating */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Price *</label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="₹180"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Unit *</label>
                <input
                  type="text"
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  placeholder={activeType === 'mushroom' ? 'per kg' : 'per service'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Stock</label>
                <input
                  type="text"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder={activeType === 'mushroom' ? '500 kg' : 'On-Demand'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Rating</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Row 3: Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Description *
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Write a short product description..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"
                required
              />
            </div>

            {/* Row 4: Features */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Features (comma-separated)
              </label>
              <input
                type="text"
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder={
                  activeType === 'mushroom'
                    ? 'Farm Fresh, Organic, No Pesticides, Quick Delivery'
                    : 'Professional Grade, Certified Technicians, 24/7 Support'
                }
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className={`inline-flex items-center gap-2 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-lg transition-all ${
                  activeType === 'mushroom'
                    ? 'bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 shadow-emerald-600/20'
                    : 'bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 shadow-orange-500/20'
                }`}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="text-sm font-bold text-slate-500 hover:text-slate-700 px-4 py-2.5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========== Products Grid ========== */}
      {loading ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center space-y-3">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
              activeType === 'mushroom' ? 'bg-emerald-100' : 'bg-orange-100'
            }`}
          >
            {activeType === 'mushroom' ? (
              <Leaf className="w-8 h-8 text-emerald-500" />
            ) : (
              <Sun className="w-8 h-8 text-orange-500" />
            )}
          </div>
          <h4 className="text-lg font-bold text-slate-900">
            No {activeType === 'mushroom' ? 'Mushroom Products' : 'Solar Services'} Yet
          </h4>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Click &quot;Add {activeType === 'mushroom' ? 'Mushroom Product' : 'Solar Service'}&quot; to add your first product.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-12 h-12 text-slate-300" />
                  </div>
                )}

                {/* Category badge overlay */}
                <div className="absolute top-3 left-3">{categoryBadge(product.category)}</div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {product.rating}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 leading-tight">{product.name}</h4>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-black text-slate-900">{product.price}</p>
                    <p className="text-[10px] text-slate-400">{product.unit}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>

                {/* Features */}
                {product.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {product.features.slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                    {product.features.length > 3 && (
                      <span className="text-[10px] font-semibold text-slate-400 px-1">+{product.features.length - 3}</span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500">
                    Stock: <span className="text-slate-700">{product.stock || 'N/A'}</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
