import { create } from 'zustand';

// TypeScript Type Definitions
export type UserRole = 'admin' | 'customer' | 'technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber?: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  category: string;
}

export interface ServiceBooking {
  id: string;
  solarCapacity: number;
  address: string;
  scheduleDate: string;
  status: 'pending' | 'assigned' | 'completed';
  assignedTechnician?: string; // name
  beforeImage?: string;
  afterImage?: string;
  price: number;
  notes?: string;
}

interface AppState {
  // Auth Slice
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;

  // Cart Slice
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Bookings Slice
  bookings: ServiceBooking[];
  addBooking: (booking: Omit<ServiceBooking, 'id' | 'status' | 'price'>) => void;
  updateBookingStatus: (
    bookingId: string, 
    status: ServiceBooking['status'], 
    beforeImage?: string, 
    afterImage?: string
  ) => void;
  fetchBookingsMock: () => void;
}

export const useStore = create<AppState>((set: any, get: any) => ({
  // Auth state implementation
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user: User, token: string) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false, cart: [] }),

  // Cart state implementation
  cart: [],
  addToCart: (item: Omit<CartItem, 'quantity'>) => set((state: AppState) => {
    const existing = state.cart.find((i: CartItem) => i.id === item.id);
    if (existing) {
      return {
        cart: state.cart.map((i: CartItem) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    }
    return { cart: [...state.cart, { ...item, quantity: 1 }] };
  }),
  removeFromCart: (itemId: string) => set((state: AppState) => ({
    cart: state.cart.filter((item: CartItem) => item.id !== itemId)
  })),
  updateQuantity: (itemId: string, quantity: number) => set((state: AppState) => ({
    cart: state.cart.map((item: CartItem) => 
      item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    return get().cart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  },

  // Service Bookings state implementation
  bookings: [
    {
      id: 'SB-101',
      solarCapacity: 5.5,
      address: '104, Green Meadows, Sector 4, Pune',
      scheduleDate: '2026-06-05T10:00:00Z',
      status: 'assigned',
      assignedTechnician: 'Rahul Verma',
      price: 440,
      notes: 'Please clean early morning.'
    },
    {
      id: 'SB-102',
      solarCapacity: 12.0,
      address: 'Shree Krishna Agro Industries, Baramati',
      scheduleDate: '2026-06-08T11:30:00Z',
      status: 'pending',
      price: 960,
    }
  ],
  addBooking: (booking: Omit<ServiceBooking, 'id' | 'status' | 'price'>) => set((state: AppState) => {
    const newBooking: ServiceBooking = {
      ...booking,
      id: `SB-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      price: booking.solarCapacity * 80, // 80 Rs per kW default calculation
    };
    return { bookings: [newBooking, ...state.bookings] };
  }),
  updateBookingStatus: (bookingId: string, status: ServiceBooking['status'], beforeImage?: string, afterImage?: string) => set((state: AppState) => ({
    bookings: state.bookings.map((booking: ServiceBooking) => {
      if (booking.id === bookingId) {
        const updated = { ...booking, status };
        if (beforeImage) updated.beforeImage = beforeImage;
        if (afterImage) updated.afterImage = afterImage;
        return updated;
      }
      return booking;
    })
  })),
  fetchBookingsMock: () => {
    // Used to refresh bookings state
  }
}));
