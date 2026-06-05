import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Dimensions,
  Alert,
  FlatList
} from 'react-native';
import { useStore, User, CartItem, ServiceBooking, UserRole } from '../store/useStore';
import { privacyPolicy, termsAndConditions } from '../../../lib/legalContent';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function LegalDocumentBlock({
  document,
  accentColor,
}: {
  document: typeof privacyPolicy;
  accentColor: string;
}) {
  return (
    <View style={styles.legalCard}>
      <Text style={[styles.legalBadge, { color: accentColor }]}>{document.title}</Text>
      <Text style={styles.legalUpdated}>Updated: {document.updatedAt}</Text>
      <Text style={styles.legalIntro}>{document.intro}</Text>

      {document.sections.map((section) => (
        <View key={section.title} style={styles.legalSectionBlock}>
          <Text style={styles.legalSectionTitle}>{section.title}</Text>
          {section.points.map((point) => (
            <Text key={point} style={styles.legalBullet}>
              • {point}
            </Text>
          ))}
        </View>
      ))}

      <View style={styles.legalContactBlock}>
        <Text style={styles.legalContactTitle}>Contact</Text>
        <Text style={styles.legalContactLine}>{document.contactEmail}</Text>
        <Text style={styles.legalContactLine}>{document.contactPhone}</Text>
      </View>
    </View>
  );
}

// ==========================================
// 1. AUTH SCREENS (Login & Register)
// ==========================================

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useStore((state: any) => state.login);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Role-switching mock accounts for tester convenience
    let mockUser: User = {
      id: 'usr-1',
      name: 'Customer Account',
      email: email,
      role: 'customer',
      phoneNumber: '+91 98765 43210'
    };

    if (email.toLowerCase().includes('tech')) {
      mockUser = {
        id: 'usr-2',
        name: 'Technician Dave',
        email: email,
        role: 'technician',
        phoneNumber: '+91 88888 77777'
      };
    } else if (email.toLowerCase().includes('admin')) {
      mockUser = {
        id: 'usr-3',
        name: 'Administrator',
        email: email,
        role: 'admin',
        phoneNumber: '+91 99999 99999'
      };
    }

    login(mockUser, 'mock-jwt-token-xyz');
    Alert.alert('Welcome', `Logged in as ${mockUser.name} (${mockUser.role})`);
  };

  return (
    <ScrollView contentContainerStyle={styles.authContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.authHeaderBlock}>
        <Text style={styles.brandTitle}>PRAVIN</Text>
        <Text style={styles.brandSubtitle}>Mushroom Supply & Solar Maintenance</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Sign In</Text>

        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. customer@pravin.com or tech@pravin.com"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkButton}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </Pressable>
      </View>

      <View style={styles.hintBox}>
        <Text style={styles.hintTitle}>💡 Demo Access Hints:</Text>
        <Text style={styles.hintText}>• Use email containing <Text style={{ fontWeight: 'bold' }}>'tech'</Text> to view technician panel.</Text>
        <Text style={styles.hintText}>• Use email containing <Text style={{ fontWeight: 'bold' }}>'admin'</Text> to test administrator routing.</Text>
        <Text style={styles.hintText}>• Any other email logs you in as standard Customer.</Text>
      </View>

      <View style={styles.legalSection}>
        <Text style={styles.legalHeader}>Legal</Text>
        <LegalDocumentBlock document={privacyPolicy} accentColor="#22c55e" />
        <View style={{ height: 12 }} />
        <LegalDocumentBlock document={termsAndConditions} accentColor="#38bdf8" />
      </View>
    </ScrollView>
  );
}

export function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const login = useStore((state: any) => state.login);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newUser: User = {
      id: `usr-${Math.random()}`,
      name,
      email,
      role,
      phoneNumber: '+91 99999 88888'
    };

    login(newUser, 'mock-jwt-token-new');
    Alert.alert('Success', `Registered account: ${newUser.name}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.authContainer}>
      <View style={styles.authHeaderBlock}>
        <Text style={styles.brandTitle}>PRAVIN</Text>
        <Text style={styles.brandSubtitle}>Join the Platform</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Create Account</Text>

        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          placeholderTextColor="#94a3b8"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="john@example.com"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.inputLabel}>Choose Account Type</Text>
        <View style={styles.roleSelectRow}>
          <Pressable
            style={[styles.roleSelectButton, role === 'customer' && styles.roleActiveCustomer]}
            onPress={() => setRole('customer')}
          >
            <Text style={[styles.roleSelectText, role === 'customer' && styles.textWhite]}>Customer</Text>
          </Pressable>
          <Pressable
            style={[styles.roleSelectButton, role === 'technician' && styles.roleActiveTechnician]}
            onPress={() => setRole('technician')}
          >
            <Text style={[styles.roleSelectText, role === 'technician' && styles.textWhite]}>Technician</Text>
          </Pressable>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Login')} style={styles.linkButton}>
          <Text style={styles.linkText}>Already have an account? Sign In</Text>
        </Pressable>
      </View>

      <View style={styles.legalSection}>
        <Text style={styles.legalHeader}>Legal</Text>
        <LegalDocumentBlock document={privacyPolicy} accentColor="#22c55e" />
        <View style={{ height: 12 }} />
        <LegalDocumentBlock document={termsAndConditions} accentColor="#38bdf8" />
      </View>
    </ScrollView>
  );
}

// ==========================================
// 2. MAIN CUSTOMER CUSTOM APP SCREENS
// ==========================================

export function HomeScreen({ navigation }: any) {
  const user = useStore((state: any) => state.user);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.homeHero}>
        <Text style={styles.heroGreeting}>Welcome back,</Text>
        <Text style={styles.heroUser}>{user?.name || 'Valued Client'}</Text>
        <Text style={styles.heroCaption}>E-commerce traceability & solar panel upkeep at your fingertips.</Text>
      </View>

      <Text style={styles.sectionHeader}>Featured Businesses</Text>

      {/* Card 1: Mushrooms */}
      <View style={[styles.businessCard, { borderLeftColor: '#22c55e' }]}>
        <Text style={[styles.bizBadge, { backgroundColor: '#dcfce7', color: '#15803d' }]}>Mushroom Farm</Text>
        <Text style={styles.bizTitle}>Premium Shroom Packaging</Text>
        <Text style={styles.bizDesc}>
          Purchase fresh white button, oyster, and premium dry mushroom packs. Trace your batch codes back to cultivation roots.
        </Text>
        <Pressable
          style={[styles.bizBtn, { backgroundColor: '#22c55e' }]}
          onPress={() => navigation.navigate('ShopTab')}
        >
          <Text style={styles.btnText}>Browse Shop</Text>
        </Pressable>
      </View>

      {/* Card 2: Solar */}
      <View style={[styles.businessCard, { borderLeftColor: '#f97316' }]}>
        <Text style={[styles.bizBadge, { backgroundColor: '#ffedd5', color: '#c2410c' }]}>Solar Upkeep</Text>
        <Text style={styles.bizTitle}>Solar Panel Service Dispatch</Text>
        <Text style={styles.bizDesc}>
          Ensure high electricity yield by scheduling recurring cleanings or expert technical checkups.
        </Text>
        <Pressable
          style={[styles.bizBtn, { backgroundColor: '#f97316' }]}
          onPress={() => navigation.navigate('ShopTab')}
        >
          <Text style={styles.btnText}>Book Cleaning</Text>
        </Pressable>
      </View>

      {/* Core Statistics banner */}
      <View style={styles.metricsBox}>
        <View style={styles.metricItem}>
          <Text style={styles.metricVal}>99.4%</Text>
          <Text style={styles.metricLbl}>Solar Yield Boost</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricVal}>100%</Text>
          <Text style={styles.metricLbl}>Organic Batches</Text>
        </View>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const MOCK_PRODUCTS = [
  { id: 'p1', title: 'Organic Fresh Oyster Mushrooms', price: 180, size: '500g Pouch', category: 'fresh' },
  { id: 'p2', title: 'Gourmet Dehydrated Shiitake', price: 350, size: '200g Pack', category: 'dry' },
  { id: 'p3', title: 'Premium Mushroom Seasoning Powder', price: 290, size: '150g Jar', category: 'powder' },
];

const MOCK_SOLAR_PLANS = [
  { kw: 3, title: 'Residential Small Array', price: 400, notes: 'Ideal for 3kW rooftop setups.' },
  { kw: 8, title: 'Medium Domestic System', price: 800, notes: 'Ideal for 8kW duplex setups.' },
  { kw: 15, title: 'Commercial Large Array', price: 1500, notes: 'Industrial grade inspection & washing.' },
];

export function ShopScreen() {
  const addToCart = useStore((state: any) => state.addToCart);
  const addBooking = useStore((state: any) => state.addBooking);
  const [selectedTab, setSelectedTab] = useState<'mushroom' | 'solar'>('mushroom');

  const [bookingAddress, setBookingAddress] = useState('');
  const [bookingCapacity, setBookingCapacity] = useState('5.0');
  const [bookingDate, setBookingDate] = useState('2026-06-15');

  const handleCreateBooking = () => {
    if (!bookingAddress) {
      Alert.alert('Error', 'Please fill in the service address.');
      return;
    }
    const cap = parseFloat(bookingCapacity);
    if (isNaN(cap) || cap <= 0) {
      Alert.alert('Error', 'Invalid solar capacity.');
      return;
    }

    addBooking({
      solarCapacity: cap,
      address: bookingAddress,
      scheduleDate: `${bookingDate}T09:00:00Z`,
      notes: 'Scheduled via Expo App Boilerplate.'
    });

    Alert.alert('Success', `Solar booking successfully scheduled for ${bookingDate}! Check details in the Bookings tab.`);
    setBookingAddress('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabButtonsWrapper}>
        <Pressable
          style={[styles.shopTabBtn, selectedTab === 'mushroom' && styles.shopActiveMushroomTab]}
          onPress={() => setSelectedTab('mushroom')}
        >
          <Text style={[styles.shopTabBtnText, selectedTab === 'mushroom' && styles.textWhite]}>📦 Mushroom Shop</Text>
        </Pressable>
        <Pressable
          style={[styles.shopTabBtn, selectedTab === 'solar' && styles.shopActiveSolarTab]}
          onPress={() => setSelectedTab('solar')}
        >
          <Text style={[styles.shopTabBtnText, selectedTab === 'solar' && styles.textWhite]}>☀️ Solar Services</Text>
        </Pressable>
      </View>

      {selectedTab === 'mushroom' ? (
        <View style={styles.shopContentSection}>
          <Text style={styles.shopSectionHeader}>Harvest Packaging & Supplies</Text>
          {MOCK_PRODUCTS.map((prod) => (
            <View key={prod.id} style={styles.shopProductCard}>
              <View style={styles.shopProductDetails}>
                <Text style={styles.shopProductTitle}>{prod.title}</Text>
                <Text style={styles.shopProductSize}>Size: {prod.size}</Text>
                <Text style={styles.shopProductPrice}>Rs. {prod.price}</Text>
              </View>
              <Pressable
                style={styles.addToCartBtn}
                onPress={() => {
                  addToCart(prod);
                  Alert.alert('Added', `${prod.title} added to cart!`);
                }}
              >
                <Text style={styles.addToCartBtnText}>Add +</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.shopContentSection}>
          <Text style={styles.shopSectionHeader}>Schedule Dynamic Dispatch</Text>

          <View style={styles.bookingFormCard}>
            <Text style={styles.formTitle}>Instant Service Booking</Text>

            <Text style={styles.inputLabel}>Solar Array Capacity (kW)</Text>
            <TextInput
              style={styles.input}
              value={bookingCapacity}
              onChangeText={setBookingCapacity}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Property Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Full address of panel location"
              placeholderTextColor="#94a3b8"
              value={bookingAddress}
              onChangeText={setBookingAddress}
            />

            <Text style={styles.inputLabel}>Scheduled Inspection Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#94a3b8"
              value={bookingDate}
              onChangeText={setBookingDate}
            />

            <Pressable style={styles.solarBookBtn} onPress={handleCreateBooking}>
              <Text style={styles.solarBookBtnText}>Book Washing / Assessment</Text>
            </Pressable>
          </View>

          <Text style={styles.shopSectionHeader}>AMC Pricing Tiers</Text>
          {MOCK_SOLAR_PLANS.map((plan, idx) => (
            <View key={idx} style={styles.solarPlanTile}>
              <View>
                <Text style={styles.planHeadline}>{plan.title} ({plan.kw} kW)</Text>
                <Text style={styles.planSubtext}>{plan.notes}</Text>
              </View>
              <Text style={styles.planPriceTag}>Rs. {plan.price}</Text>
            </View>
          ))}
        </View>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

export function BookingsScreen() {
  const { cart, getCartTotal, clearCart, removeFromCart } = useStore();
  const bookings = useStore((state: any) => state.bookings);

  const handleCheckout = () => {
    Alert.alert('Checkout Complete', 'Mushroom order successfully completed! Tracking code issued.');
    clearCart();
  };

  return (
    <ScrollView style={styles.container}>
      {/* SECTION 1: ACTIVE SOLAR PANEL DISPATCHES */}
      <Text style={styles.shopSectionHeader}>☀️ Active Service Bookings</Text>
      {bookings.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No upcoming solar services booked.</Text>
        </View>
      ) : (
        bookings.map((booking: any) => (
          <View key={booking.id} style={styles.bookingStatusCard}>
            <View style={styles.bookingRow}>
              <Text style={styles.bookingId}>{booking.id}</Text>
              <View style={[
                styles.badgeContainer,
                booking.status === 'completed' ? styles.badgeGreen : 
                booking.status === 'assigned' ? styles.badgeBlue : styles.badgeYellow
              ]}>
                <Text style={styles.badgeLabel}>{booking.status.toUpperCase()}</Text>
              </View>
            </View>

            <Text style={styles.bookingDetail}><Text style={{ fontWeight: 'bold' }}>Capacity:</Text> {booking.solarCapacity} kW</Text>
            <Text style={styles.bookingDetail}><Text style={{ fontWeight: 'bold' }}>Location:</Text> {booking.address}</Text>
            <Text style={styles.bookingDetail}><Text style={{ fontWeight: 'bold' }}>Date:</Text> {new Date(booking.scheduleDate).toLocaleDateString()}</Text>
            {booking.assignedTechnician && (
              <Text style={styles.bookingDetail}><Text style={{ fontWeight: 'bold' }}>Tech Assigned:</Text> {booking.assignedTechnician}</Text>
            )}
            
            {booking.beforeImage && (
              <View style={styles.imageMockContainer}>
                <Text style={styles.imageMockText}>📷 Before Clean: {booking.beforeImage}</Text>
              </View>
            )}
            {booking.afterImage && (
              <View style={styles.imageMockContainer}>
                <Text style={styles.imageMockText}>📷 After Clean: {booking.afterImage}</Text>
              </View>
            )}
          </View>
        ))
      )}

      {/* SECTION 2: SHOPPING CART */}
      <Text style={styles.shopSectionHeader}>📦 Mushroom Shopping Cart</Text>
      {cart.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Cart is currently empty.</Text>
        </View>
      ) : (
        <View style={styles.card}>
          {cart.map((item: any) => (
            <View key={item.id} style={styles.cartItemRow}>
              <View>
                <Text style={styles.cartItemTitle}>{item.title}</Text>
                <Text style={styles.cartItemSub}>Rs. {item.price} x {item.quantity}</Text>
              </View>
              <Pressable onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeCartText}>Remove</Text>
              </Pressable>
            </View>
          ))}

          <View style={styles.divider} />
          
          <View style={styles.cartTotalRow}>
            <Text style={styles.totalLabel}>Cart Total:</Text>
            <Text style={styles.totalPrice}>Rs. {getCartTotal()}</Text>
          </View>

          <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutBtnText}>Checkout Order</Text>
          </Pressable>
        </View>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

export function ProfileScreen() {
  const { user, logout } = useStore();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.avatarLabel}>{user?.name?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={styles.profileName}>{user?.name || 'User Profile'}</Text>
        <Text style={styles.profileRole}>Role: {user?.role?.toUpperCase() || 'CLIENT'}</Text>
        <Text style={styles.profileEmail}>{user?.email || 'email@example.com'}</Text>
        {user?.phoneNumber && <Text style={styles.profilePhone}>{user.phoneNumber}</Text>}

        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Log Out Account</Text>
        </Pressable>
      </View>

      <Text style={styles.shopSectionHeader}>Legal Information</Text>
      <View style={styles.legalSection}>
        <LegalDocumentBlock document={privacyPolicy} accentColor="#22c55e" />
        <View style={{ height: 12 }} />
        <LegalDocumentBlock document={termsAndConditions} accentColor="#38bdf8" />
      </View>
    </ScrollView>
  );
}

// ==========================================
// 3. TECHNICIAN-SPECIFIC COCKPIT SCREEN
// ==========================================

export function TechnicianDashboard() {
  const { user, logout, bookings, updateBookingStatus } = useStore();

  // Filter bookings assigned to this technician
  const assignedJobs = bookings.filter((b: any) => b.status !== 'completed');
  const completedJobs = bookings.filter((b: any) => b.status === 'completed');

  const triggerStatusUpdate = (jobId: string, status: 'pending' | 'assigned' | 'completed') => {
    if (status === 'completed') {
      updateBookingStatus(
        jobId, 
        'completed', 
        'mock-storage-uri-before-wash.png', 
        'mock-storage-uri-after-wash.png'
      );
      Alert.alert('Job Complete', `Solar Job ${jobId} updated to Completed! Mock camera images attached.`);
    } else {
      updateBookingStatus(jobId, status);
      Alert.alert('Status Sync', `Job ${jobId} marked as ${status}.`);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#090d16' }]}>
      <View style={styles.techHeader}>
        <View>
          <Text style={styles.techGreeting}>Technician Portal</Text>
          <Text style={styles.techName}>{user?.name}</Text>
        </View>
        <Pressable style={styles.techLogoutBtn} onPress={logout}>
          <Text style={styles.techLogoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.techMetricsContainer}>
        <View style={styles.techMetricCell}>
          <Text style={styles.techMetricValue}>{assignedJobs.length}</Text>
          <Text style={styles.techMetricLabel}>Pending Tasks</Text>
        </View>
        <View style={styles.techMetricCell}>
          <Text style={styles.techMetricValue}>{completedJobs.length}</Text>
          <Text style={styles.techMetricLabel}>Completed</Text>
        </View>
      </View>

      <Text style={styles.techSectionHeader}>📋 Assigned Service Orders</Text>

      {assignedJobs.length === 0 ? (
        <View style={styles.emptyStateDark}>
          <Text style={styles.emptyTextDark}>Great job! All assigned solar panel systems have been cleaned.</Text>
        </View>
      ) : (
        assignedJobs.map((job: any) => (
          <View key={job.id} style={styles.techJobCard}>
            <View style={styles.techJobHeader}>
              <Text style={styles.techJobId}>{job.id}</Text>
              <Text style={styles.techJobCapacity}>{job.solarCapacity} kW Array</Text>
            </View>

            <Text style={styles.techJobAddress}>📍 {job.address}</Text>
            <Text style={styles.techJobDate}>📅 Date: {new Date(job.scheduleDate).toLocaleDateString()}</Text>
            {job.notes && <Text style={styles.techJobNotes}>Note: "{job.notes}"</Text>}

            <Text style={styles.techActionsLabel}>Update Dispatch Progress:</Text>
            <View style={styles.techButtonRow}>
              <Pressable
                style={[styles.techActionButton, styles.techBtnYellow]}
                onPress={() => triggerStatusUpdate(job.id, 'pending')}
              >
                <Text style={styles.techBtnText}>Pending</Text>
              </Pressable>
              <Pressable
                style={[styles.techActionButton, styles.techBtnBlue]}
                onPress={() => triggerStatusUpdate(job.id, 'assigned')}
              >
                <Text style={styles.techBtnText}>Assigned</Text>
              </Pressable>
              <Pressable
                style={[styles.techActionButton, styles.techBtnGreen]}
                onPress={() => triggerStatusUpdate(job.id, 'completed')}
              >
                <Text style={styles.techBtnText}>Complete Job</Text>
              </Pressable>
            </View>
          </View>
        ))
      )}

      <Text style={styles.techSectionHeader}>✅ Completed Service History</Text>
      {completedJobs.map((job: any) => (
        <View key={job.id} style={[styles.techJobCard, { opacity: 0.7 }]}>
          <View style={styles.techJobHeader}>
            <Text style={styles.techJobId}>{job.id}</Text>
            <Text style={[styles.techJobCapacity, { color: '#22c55e' }]}>Completed</Text>
          </View>
          <Text style={styles.techJobAddress}>📍 {job.address}</Text>
          <Text style={styles.techJobDate}>Cleaned Array: {job.solarCapacity} kW</Text>
        </View>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ==========================================
// 4. STYLE SHEET SPECIFICATION
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  authContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0f172a', // Slate 900
  },
  authHeaderBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3b82f6', // Premium Light Blue
    letterSpacing: 2,
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  primaryButton: {
    backgroundColor: '#2563eb', // Indigo Blue
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#2563eb',
    fontSize: 14,
  },
  hintBox: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  hintTitle: {
    color: '#38bdf8',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hintText: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  legalSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  legalHeader: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  legalCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    padding: 16,
  },
  legalBadge: {
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  legalUpdated: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 10,
  },
  legalIntro: {
    color: '#e2e8f0',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  legalSectionBlock: {
    marginTop: 8,
  },
  legalSectionTitle: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  legalBullet: {
    color: '#cbd5e1',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 4,
  },
  legalContactBlock: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(148, 163, 184, 0.16)',
  },
  legalContactTitle: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  legalContactLine: {
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: 17,
  },
  roleSelectRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 12,
  },
  roleSelectButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  roleSelectText: {
    color: '#475569',
    fontWeight: '600',
  },
  roleActiveCustomer: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  roleActiveTechnician: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  textWhite: {
    color: '#ffffff',
  },
  // Home Screen Styles
  homeHero: {
    backgroundColor: '#0f172a',
    padding: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  heroGreeting: {
    color: '#94a3b8',
    fontSize: 16,
  },
  heroUser: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  heroCaption: {
    color: '#cbd5e1',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginHorizontal: 24,
    marginTop: 28,
    marginBottom: 12,
  },
  businessCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 16,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bizBadge: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  bizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  bizDesc: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
    lineHeight: 20,
  },
  bizBtn: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  metricsBox: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 16,
    gap: 16,
  },
  metricItem: {
    flex: 1,
    backgroundColor: '#edf2f7',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
  },
  metricLbl: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
    textAlign: 'center',
  },
  // Shop Screen Styles
  tabButtonsWrapper: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 4,
  },
  shopTabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  shopActiveMushroomTab: {
    backgroundColor: '#22c55e',
  },
  shopActiveSolarTab: {
    backgroundColor: '#f97316',
  },
  shopTabBtnText: {
    color: '#475569',
    fontWeight: 'bold',
    fontSize: 15,
  },
  shopContentSection: {
    paddingHorizontal: 20,
  },
  shopSectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16,
    marginTop: 12,
  },
  shopProductCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  shopProductDetails: {
    flex: 1,
  },
  shopProductTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  shopProductSize: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  shopProductPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#22c55e',
    marginTop: 6,
  },
  addToCartBtn: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addToCartBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  bookingFormCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 12,
  },
  solarBookBtn: {
    backgroundColor: '#f97316',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  solarBookBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  solarPlanTile: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f97316',
  },
  planHeadline: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  planSubtext: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  planPriceTag: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c2410c',
  },
  // Bookings Tab Styles
  emptyState: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  bookingStatusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bookingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookingId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeGreen: { backgroundColor: '#dcfce7' },
  badgeBlue: { backgroundColor: '#dbeafe' },
  badgeYellow: { backgroundColor: '#fef9c3' },
  badgeLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  bookingDetail: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
  },
  imageMockContainer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  imageMockText: {
    fontSize: 12,
    color: '#475569',
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  cartItemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  cartItemSub: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  removeCartText: {
    color: '#ef4444',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#cbd5e1',
    marginVertical: 12,
  },
  cartTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  checkoutBtn: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Profile styles
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  profileRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
    marginTop: 4,
    letterSpacing: 1,
  },
  profileEmail: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
  },
  profilePhone: {
    fontSize: 14,
    color: '#475569',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  // Technician styles
  techHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#111827',
  },
  techGreeting: {
    fontSize: 13,
    color: '#94a3b8',
  },
  techName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  techLogoutBtn: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  techLogoutText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  techMetricsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
    backgroundColor: '#111827',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  techMetricCell: {
    flex: 1,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  techMetricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  techMetricLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 4,
  },
  techSectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cbd5e1',
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  emptyStateDark: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    alignItems: 'center',
  },
  emptyTextDark: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'center',
  },
  techJobCard: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  techJobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  techJobId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  techJobCapacity: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  techJobAddress: {
    color: '#e2e8f0',
    fontSize: 14,
    marginTop: 8,
  },
  techJobDate: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  techJobNotes: {
    color: '#fcd34d',
    fontSize: 12,
    marginTop: 6,
    fontStyle: 'italic',
  },
  techActionsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1',
    marginTop: 16,
    marginBottom: 8,
  },
  techButtonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  techActionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  techBtnYellow: { backgroundColor: '#eab308' },
  techBtnBlue: { backgroundColor: '#3b82f6' },
  techBtnGreen: { backgroundColor: '#22c55e' },
  techBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 11,
  },
});
