import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { privacyPolicy, termsAndConditions } from './lib/legalContent';

type TabKey = 'home' | 'products' | 'services' | 'enquiry' | 'profile';
type ProductCategory = 'all' | 'fresh' | 'dry' | 'powder' | 'packaging';
type ServiceCategory = 'all' | 'residential' | 'commercial' | 'inspection' | 'amc';

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  tone: 'green' | 'gold' | 'blue';
  kind: 'mushroom' | 'packaging' | 'solar';
};

type Product = {
  id: string;
  title: string;
  category: ProductCategory;
  price: string;
  description: string;
  benefits: string[];
  size: string;
  availability: string;
};

type Service = {
  id: string;
  title: string;
  category: ServiceCategory;
  price: string;
  description: string;
  benefits: string[];
  timing: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 20;
const CARD_WIDTH = SCREEN_WIDTH - H_PADDING * 2;

const tabs: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'products', label: 'Products', icon: '📦' },
  { key: 'services', label: 'Services', icon: '☀️' },
  { key: 'enquiry', label: 'Enquiry', icon: '📝' },
  { key: 'profile', label: 'About Us', icon: '👤' },
];

const stats = [
  { value: '500+', label: 'Happy Customers' },
  { value: '1000+', label: 'Solar Panels Cleaned' },
  { value: '50+', label: 'Business Clients' },
  { value: '5+ Years', label: 'Experience' },
];

const slides: Slide[] = [
  {
    id: 'mushroom',
    title: 'Fresh Mushroom Harvest',
    subtitle: 'Premium farm-fresh mushrooms for retail, bulk supply, and restaurants.',
    badge: 'Mushroom Business',
    tone: 'green',
    kind: 'mushroom',
  },
  {
    id: 'packaging',
    title: 'Dry Mushroom Packaging',
    subtitle: 'Shelf-stable dry mushroom packs, powder, and retail-ready packaging.',
    badge: 'Dry + Packaging',
    tone: 'gold',
    kind: 'packaging',
  },
  {
    id: 'solar',
    title: 'Solar Panel Cleaning',
    subtitle: 'Professional cleaning, inspection, and maintenance for better output.',
    badge: 'Solar Clean',
    tone: 'blue',
    kind: 'solar',
  },
];

const premiumCards = [
  {
    title: 'Mushroom Business',
    points: ['Fresh Mushroom', 'Dry Mushroom', 'Mushroom Powder', 'Packaging'],
    tone: 'green',
  },
  {
    title: 'Solar Clean',
    points: ['Solar Cleaning', 'Maintenance', 'Inspection', 'AMC Services'],
    tone: 'blue',
  },
] as const;

const whyChooseUs = ['Quality Products', 'Professional Service', 'Affordable Pricing', 'Customer Support'];

const galleryItems = [
  { title: 'Fresh Mushroom Farm', tag: 'Photos' },
  { title: 'Dry Mushroom Packs', tag: 'Packaging' },
  { title: 'Mushroom Powder Line', tag: 'Client Work' },
  { title: 'Solar Panel Cleaning', tag: 'Completed Projects' },
  { title: 'Solar Inspection', tag: 'Reports' },
  { title: 'AMC Maintenance', tag: 'Videos' },
];

const products: Product[] = [
  {
    id: 'fresh',
    title: 'Fresh Mushroom',
    category: 'fresh',
    price: 'From Rs. 180/kg',
    description: 'Fresh, clean, and carefully packed mushrooms for wholesale and recurring orders.',
    benefits: ['Farm fresh', 'Bulk supply', 'Carefully packed'],
    size: '1 kg / 5 kg / bulk',
    availability: 'In stock',
  },
  {
    id: 'dry',
    title: 'Dry Mushroom',
    category: 'dry',
    price: 'From Rs. 950/kg',
    description: 'Long shelf-life dried mushrooms for retail, hotel use, and export orders.',
    benefits: ['Long shelf life', 'Easy storage', 'Export ready'],
    size: '250 g / 500 g / 1 kg',
    availability: 'Limited stock',
  },
  {
    id: 'powder',
    title: 'Mushroom Powder',
    category: 'powder',
    price: 'From Rs. 890/kg',
    description: 'Fine mushroom powder for cooking, seasoning, and product development.',
    benefits: ['Fine grind', 'Kitchen friendly', 'Bulk supply'],
    size: '100 g / 500 g / 1 kg',
    availability: 'In stock',
  },
  {
    id: 'box',
    title: 'Packaging Box',
    category: 'packaging',
    price: 'MOQ on request',
    description: 'Strong packaging boxes for safe movement, storage, and product presentation.',
    benefits: ['Durable', 'Custom sizes', 'Brandable'],
    size: 'Custom',
    availability: 'Made to order',
  },
  {
    id: 'pouch',
    title: 'Packaging Pouch',
    category: 'packaging',
    price: 'MOQ on request',
    description: 'High-quality pouches for mushroom packs, powder packs, and retail use.',
    benefits: ['Retail ready', 'Sealed packs', 'Moisture safe'],
    size: 'Custom',
    availability: 'Made to order',
  },
  {
    id: 'bulk',
    title: 'Bulk Supply',
    category: 'fresh',
    price: 'Custom quote',
    description: 'Large quantity supply for hotels, retailers, and distributors.',
    benefits: ['Best rates', 'Regular supply', 'Priority support'],
    size: 'Project basis',
    availability: 'On enquiry',
  },
];

const services: Service[] = [
  {
    id: 'residential',
    title: 'Residential Cleaning',
    category: 'residential',
    price: 'From Rs. 500',
    description: 'House solar systems cleaned safely and professionally.',
    benefits: ['House solar systems', 'Safe cleaning', 'Quick service'],
    timing: 'Same day',
  },
  {
    id: 'commercial',
    title: 'Commercial Cleaning',
    category: 'commercial',
    price: 'Custom quote',
    description: 'Factory and commercial solar cleaning for larger installations.',
    benefits: ['Factory solar systems', 'Scheduled visits', 'Large scale support'],
    timing: 'Planned visits',
  },
  {
    id: 'inspection',
    title: 'Solar Inspection',
    category: 'inspection',
    price: 'From Rs. 999',
    description: 'Performance analysis and inspection for panels and wiring health.',
    benefits: ['Output review', 'Issue detection', 'Report summary'],
    timing: '1 visit',
  },
  {
    id: 'amc',
    title: 'AMC Maintenance',
    category: 'amc',
    price: 'Yearly contract',
    description: 'Annual maintenance plan for regular cleaning and performance checks.',
    benefits: ['Yearly plan', 'Priority support', 'Performance care'],
    timing: '12 months',
  },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Business Client',
    text: 'The mushrooms were fresh and the packaging looked very professional.',
  },
  {
    name: 'Priya Singh',
    role: 'Hotel Owner',
    text: 'Dried mushroom quality is excellent, and the solar service was prompt.',
  },
  {
    name: 'Amit Patel',
    role: 'Facility Manager',
    text: 'After cleaning, our solar output improved noticeably. Strong communication too.',
  },
];

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function PillButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        active ? styles.pillActive : styles.pillInactive,
        pressed && styles.pillPressed,
      ]}
    >
      <Text style={[styles.pillText, active ? styles.pillTextActive : styles.pillTextInactive]}>{label}</Text>
    </Pressable>
  );
}

function ActionButton({
  label,
  href,
  onPress,
}: {
  label: string;
  href?: string;
  onPress?: () => void;
}) {
  const handlePress = async () => {
    if (onPress) {
      onPress();
      return;
    }

    if (!href) {
      return;
    }

    try {
      const canOpen = await Linking.canOpenURL(href);
      if (!canOpen) {
        Alert.alert('Unavailable', `Can't open ${label.toLowerCase()} on this device.`);
        return;
      }
      await Linking.openURL(href);
    } catch {
      Alert.alert('Error', `Unable to open ${label.toLowerCase()}.`);
    }
  };

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}>
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

function TabButton({
  icon,
  label,
  active,
  large,
  onPress,
}: {
  icon: string;
  label: string;
  active: boolean;
  large?: boolean;
  onPress: () => void;
}) {
  return (
      <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tabButton,
        large && styles.tabButtonLarge,
        active ? styles.tabButtonActive : styles.tabButtonInactive,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.tabIcon, active ? styles.tabTextActive : styles.tabTextInactive]}>{icon}</Text>
      <Text style={[styles.tabLabel, active ? styles.tabTextActive : styles.tabTextInactive]}>{label}</Text>
    </Pressable>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ReviewCard({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewStars}>★★★★★</Text>
      <Text style={styles.reviewText}>"{text}"</Text>
      <Text style={styles.reviewName}>{name}</Text>
      <Text style={styles.reviewRole}>{role}</Text>
    </View>
  );
}

function StepCard({ step, title, text }: { step: string; title: string; text: string }) {
  return (
    <View style={styles.stepCard}>
      <Text style={styles.stepNumber}>{step}</Text>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
}

function PlanCard({
  title,
  subtitle,
  price,
  items,
  highlighted,
}: {
  title: string;
  subtitle: string;
  price: string;
  items: string[];
  highlighted?: boolean;
}) {
  return (
    <View style={[styles.planCard, highlighted && styles.planCardHighlighted]}>
      <Text style={styles.planSubtitle}>{subtitle}</Text>
      <Text style={styles.planTitle}>{title}</Text>
      <Text style={styles.planPrice}>{price}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.planItem}>
          - {item}
        </Text>
      ))}
    </View>
  );
}

function GalleryTile({ title, tag }: { title: string; tag: string }) {
  return (
    <View style={styles.galleryTile}>
      <View style={styles.galleryPreview}>
        <Text style={styles.galleryPreviewText}>{title}</Text>
      </View>
      <Text style={styles.galleryTag}>{tag}</Text>
      <Text style={styles.galleryTitle}>{title}</Text>
    </View>
  );
}

function TeamMember({ name, role }: { name: string; role: string }) {
  return (
    <View style={styles.teamCard}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
      </View>
      <Text style={styles.teamName}>{name}</Text>
      <Text style={styles.teamRole}>{role}</Text>
    </View>
  );
}

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

function MushroomVisual() {
  return (
    <View style={styles.visualPanel}>
      <View style={styles.mushroomGlow} />
      <View style={styles.mushroomCluster}>
        <View style={styles.mushroomStem} />
        <View style={styles.mushroomCapLarge} />
        <View style={styles.mushroomCapSmallLeft} />
        <View style={styles.mushroomCapSmallRight} />
        <View style={styles.leafOne} />
        <View style={styles.leafTwo} />
      </View>
    </View>
  );
}

function PackagingVisual() {
  return (
    <View style={styles.visualPanel}>
      <View style={styles.packageGlow} />
      <View style={styles.packageStack}>
        <View style={[styles.packageBox, styles.packageBoxBack]} />
        <View style={[styles.packageBox, styles.packageBoxFront]} />
        <View style={styles.packageTape} />
        <View style={styles.packageLabel}>
          <Text style={styles.packageLabelText}>PACKAGED</Text>
        </View>
      </View>
    </View>
  );
}

function SolarVisual() {
  return (
    <View style={styles.visualPanel}>
      <Image source={require('./public/solar.png')} style={styles.solarImage} resizeMode="contain" />
    </View>
  );
}

function SlideCard({ item }: { item: Slide }) {
  const background =
    item.tone === 'green' ? styles.accentGreen : item.tone === 'gold' ? styles.accentGold : styles.accentBlue;

  return (
    <View style={[styles.slideCard, background]}>
      <View style={styles.slideTextWrap}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
      </View>
      <View style={styles.slideVisualWrap}>
        {item.kind === 'mushroom' ? <MushroomVisual /> : item.kind === 'packaging' ? <PackagingVisual /> : <SolarVisual />}
      </View>
    </View>
  );
}

function ProductTile({ item, onEnquiry }: { item: Product; onEnquiry: () => void }) {
  const tone =
    item.category === 'fresh'
      ? styles.productFresh
      : item.category === 'dry'
        ? styles.productDry
        : item.category === 'powder'
          ? styles.productPowder
          : styles.productPackaging;

  return (
    <View style={[styles.productCard, tone]}>
      <View style={styles.productImagePlaceholder}>
        <Text style={styles.productImageText}>{item.title}</Text>
      </View>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productMeta}>Packaging Size: {item.size}</Text>
      <Text style={styles.productMeta}>Availability: {item.availability}</Text>
      <View style={styles.benefitWrap}>
        {item.benefits.map((benefit) => (
          <View key={benefit} style={styles.benefitPill}>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
      <Pressable onPress={onEnquiry} style={({ pressed }) => [styles.enquiryButton, pressed && styles.pressed]}>
        <Text style={styles.enquiryButtonText}>Enquiry</Text>
      </Pressable>
    </View>
  );
}

function ServiceTile({ item, onBook }: { item: Service; onBook: () => void }) {
  return (
    <View style={styles.serviceCard}>
      <Text style={styles.productPrice}>{item.price}</Text>
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productMeta}>Timing: {item.timing}</Text>
      <View style={styles.benefitWrap}>
        {item.benefits.map((benefit) => (
          <View key={benefit} style={styles.benefitPill}>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
      <Pressable onPress={onBook} style={({ pressed }) => [styles.enquiryButton, pressed && styles.pressed]}>
        <Text style={styles.enquiryButtonText}>Book Service</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [tab, setTab] = useState<TabKey>('home');
  const [slideIndex, setSlideIndex] = useState(0);
  const [productCategory, setProductCategory] = useState<ProductCategory>('all');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('all');
  const [businessType, setBusinessType] = useState<'mushroom' | 'solar'>('mushroom');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    quantity: '',
    message: '',
  });
  const carouselRef = useRef<FlatList<Slide>>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    carouselRef.current?.scrollToIndex({ index: slideIndex, animated: true });
  }, [slideIndex]);

  const filteredProducts = useMemo(
    () => products.filter((item) => productCategory === 'all' || item.category === productCategory),
    [productCategory],
  );

  const filteredServices = useMemo(
    () => services.filter((item) => serviceCategory === 'all' || item.category === serviceCategory),
    [serviceCategory],
  );

  const homeTab = (
    <>
      <View style={styles.heroBanner}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <View style={styles.heroLeft}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Two businesses. One platform.</Text>
            </View>
            <Text style={styles.heroTitle}>Grow with Nature & Power with Solar</Text>
            <Text style={styles.heroSubtitle}>
              Mushroom Production, Packaging Solutions and Solar Panel Cleaning Services Under One Platform
            </Text>
            <View style={styles.heroActions}>
              <ActionButton label="View Products" onPress={() => setTab('products')} />
              <ActionButton label="Book Service" onPress={() => setTab('services')} />
              <ActionButton label="Our Businesses" onPress={() => setTab('profile')} />
            </View>
          </View>
          <View style={styles.heroRight}>
            <View style={styles.heroVisualCard}>
              <Text style={styles.heroVisualKicker}>Fresh Harvest</Text>
              <Text style={styles.heroVisualTitle}>Mushroom</Text>
            </View>
            <View style={styles.heroVisualCardAlt}>
              <Text style={styles.heroVisualKicker}>Power Care</Text>
              <Text style={styles.heroVisualTitle}>Solar</Text>
            </View>
          </View>
        </View>
      </View>

      <FlatList
        ref={carouselRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SlideCard item={item} />}
        horizontal
        pagingEnabled
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContent}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH + 12));
          setSlideIndex(Math.max(0, Math.min(index, slides.length - 1)));
        }}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + 12,
          offset: (CARD_WIDTH + 12) * index,
          index,
        })}
      />

      <View style={styles.dotRow}>
        {slides.map((slide, index) => (
          <Pressable
            key={slide.id}
            onPress={() => setSlideIndex(index)}
            style={[styles.dot, index === slideIndex ? styles.dotActive : styles.dotInactive]}
          />
        ))}
      </View>

      <View style={styles.dualGrid}>
        {premiumCards.map((card) => (
          <View
            key={card.title}
            style={[
              styles.dualCard,
              card.title === 'Mushroom Business' ? styles.dualCardGreen : styles.dualCardBlue,
            ]}
          >
            <Text style={styles.dualCardTitle}>{card.title}</Text>
            {card.points.map((point) => (
              <Text key={point} style={styles.dualCardPoint}>
                - {point}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <SectionTitle title="Why Choose Us" />
      <View style={styles.whyGrid}>
        {whyChooseUs.map((item) => (
          <View key={item} style={styles.whyCard}>
            <Text style={styles.whyText}>- {item}</Text>
          </View>
        ))}
      </View>

      <SectionTitle title="Statistics" />
      <View style={styles.statsGrid}>
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </View>

      <SectionTitle title="Featured Products" subtitle="Show 6 products." />
      <View style={styles.grid}>
        {products.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <Text style={styles.gridItemLabel}>{item.title}</Text>
            <Text style={styles.gridItemMeta}>{item.price}</Text>
          </View>
        ))}
      </View>

      <SectionTitle title="Featured Services" subtitle="Show 4 services." />
      <View style={styles.grid}>
        {services.map((item) => (
          <View key={item.id} style={styles.gridItem}>
            <Text style={styles.gridItemLabel}>{item.title}</Text>
            <Text style={styles.gridItemMeta}>{item.price}</Text>
          </View>
        ))}
      </View>

      <SectionTitle title="Customer Testimonials" subtitle="Customer reviews slider." />
      <FlatList
        data={testimonials}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ReviewCard {...item} />}
      />

      <View style={styles.ctaBlock}>
        <Text style={styles.ctaTitle}>Need Products or Services?</Text>
        <View style={styles.heroActions}>
          <ActionButton label="Call Now" href="tel:+919876543210" />
          <ActionButton label="Send Enquiry" onPress={() => setTab('enquiry')} />
        </View>
      </View>
    </>
  );

  const productsTab = (
    <>
      <View style={styles.pageBanner}>
        <Text style={styles.pageBannerTitle}>Mushroom & Packaging Products</Text>
        <Text style={styles.pageBannerSubtitle}>
          Fresh Mushroom, Dry Mushroom, Mushroom Powder and Packaging Solutions for bulk and retail needs.
        </Text>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'fresh', 'dry', 'powder', 'packaging'] as ProductCategory[]).map((category) => (
          <PillButton key={category} label={category.toUpperCase()} active={productCategory === category} onPress={() => setProductCategory(category)} />
        ))}
      </View>

      <SectionTitle title="Product Cards" subtitle="Image, price, description and enquiry button." />
      {filteredProducts.map((item) => (
        <ProductTile key={item.id} item={item} onEnquiry={() => setTab('enquiry')} />
      ))}

      <SectionTitle title="Product Details" subtitle="Each product gets image, benefits, packaging size and availability." />
      {filteredProducts.map((item) => (
        <View key={`${item.id}-details`} style={styles.detailCard}>
          <Text style={styles.detailTitle}>{item.title}</Text>
          <Text style={styles.detailLine}>Product Description: {item.description}</Text>
          <Text style={styles.detailLine}>Benefits: {item.benefits.join(', ')}</Text>
          <Text style={styles.detailLine}>Packaging Size: {item.size}</Text>
          <Text style={styles.detailLine}>Price: {item.price}</Text>
          <Text style={styles.detailLine}>Availability: {item.availability}</Text>
        </View>
      ))}

      <SectionTitle title="Product Gallery" subtitle="Grid gallery." />
      <View style={styles.galleryGrid}>
        {['Fresh Mushroom', 'Dry Mushroom', 'Mushroom Powder', 'Packaging Box', 'Packaging Pouch', 'Bulk Supply'].map(
          (item) => (
            <View key={item} style={styles.galleryGridTile}>
              <Text style={styles.galleryGridTileText}>{item}</Text>
            </View>
          ),
        )}
      </View>

      <View style={styles.ctaBlock}>
        <Text style={styles.ctaTitle}>Request Bulk Order</Text>
        <ActionButton label="Request Bulk Order" onPress={() => setTab('enquiry')} />
      </View>
    </>
  );

  const servicesTab = (
    <>
      <View style={styles.pageBannerBlue}>
        <Text style={styles.pageBannerTitle}>Solar Panel Cleaning & Maintenance</Text>
        <Text style={styles.pageBannerSubtitle}>
          Residential cleaning, commercial cleaning, solar inspection and AMC maintenance.
        </Text>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'residential', 'commercial', 'inspection', 'amc'] as ServiceCategory[]).map((category) => (
          <PillButton key={category} label={category.toUpperCase()} active={serviceCategory === category} onPress={() => setServiceCategory(category)} />
        ))}
      </View>

      <SectionTitle title="Services Grid" />
      {filteredServices.map((item) => (
        <ServiceTile key={item.id} item={item} onBook={() => setTab('enquiry')} />
      ))}

      <SectionTitle title="Service Process" subtitle="Step-by-step workflow." />
      <View style={styles.stepsGrid}>
        <StepCard step="1" title="Book Service" text="Share your panel count and location." />
        <StepCard step="2" title="Site Visit" text="Our team inspects panels and site conditions." />
        <StepCard step="3" title="Cleaning" text="We clean carefully to remove dust and spots." />
        <StepCard step="4" title="Performance Report" text="You get a result summary after the job." />
      </View>

      <SectionTitle title="Benefits Section" />
      <View style={styles.whyGrid}>
        {['Increase Efficiency', 'Longer Panel Life', 'Better Power Output', 'Dust Removal', 'Water Spot Removal'].map((item) => (
          <View key={item} style={styles.whyCard}>
            <Text style={styles.whyText}>- {item}</Text>
          </View>
        ))}
      </View>

      <SectionTitle title="Pricing Plans" />
      <View style={styles.planGrid}>
        <PlanCard title="Basic" subtitle="Single Visit" price="Rs. 500+" items={['One time visit', 'House solar system']} />
        <PlanCard title="Standard" subtitle="Quarterly" price="Rs. 1999+" items={['Quarterly cleaning', 'Priority scheduling']} highlighted />
        <PlanCard title="Premium" subtitle="AMC Plan" price="Custom" items={['Annual maintenance', 'Inspection', 'Priority support']} />
      </View>

      <SectionTitle title="Before / After Gallery" subtitle="Solar cleaning images." />
      <View style={styles.galleryGrid}>
        <View style={styles.galleryGridTileDark}>
          <Text style={styles.galleryGridTileText}>Before Cleaning</Text>
        </View>
        <View style={styles.galleryGridTileBlue}>
          <Text style={styles.galleryGridTileText}>After Cleaning</Text>
        </View>
      </View>

      <SectionTitle title="FAQ Section" subtitle="Common questions." />
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>How often should solar panels be cleaned?</Text>
        <Text style={styles.infoText}>Usually every few months depending on dust, weather and site conditions.</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Do you offer AMC maintenance?</Text>
        <Text style={styles.infoText}>Yes, we offer annual maintenance contracts for regular service and support.</Text>
      </View>
    </>
  );

  const enquiryTab = (
    <>
      <View style={styles.pageBanner}>
        <Text style={styles.pageBannerTitle}>Enquiry Page</Text>
        <Text style={styles.pageBannerSubtitle}>
          Name, Mobile Number, Email, Business Type, Product/Service Selection, Quantity and Message.
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formLabel}>Name</Text>
        <TextInput
          placeholder="Your name"
          placeholderTextColor="#64748b"
          style={styles.input}
          value={form.name}
          onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
        />

        <Text style={styles.formLabel}>Mobile Number</Text>
        <TextInput
          placeholder="10 digit mobile number"
          placeholderTextColor="#64748b"
          keyboardType="phone-pad"
          style={styles.input}
          value={form.mobile}
          onChangeText={(value) => setForm((prev) => ({ ...prev, mobile: value }))}
        />

        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          placeholder="Email address"
          placeholderTextColor="#64748b"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={form.email}
          onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
        />

        <Text style={styles.formLabel}>Business Type</Text>
        <View style={styles.switchRow}>
          <PillButton label="Mushroom Product" active={businessType === 'mushroom'} onPress={() => setBusinessType('mushroom')} />
          <PillButton label="Solar Service" active={businessType === 'solar'} onPress={() => setBusinessType('solar')} />
        </View>

        <Text style={styles.formLabel}>Product / Service Selection</Text>
        <View style={styles.switchRow}>
          {(businessType === 'mushroom'
            ? ['Fresh Mushroom', 'Dry Mushroom', 'Mushroom Powder', 'Packaging Box']
            : ['Solar Panel Cleaning', 'Solar Inspection', 'AMC Maintenance', 'Performance Check']
          ).map((item) => (
            <PillButton key={item} label={item} active={selectedProduct === item} onPress={() => setSelectedProduct(item)} />
          ))}
        </View>

        <Text style={styles.formLabel}>Quantity</Text>
        <TextInput
          placeholder="Quantity required"
          placeholderTextColor="#64748b"
          style={styles.input}
          value={form.quantity}
          onChangeText={(value) => setForm((prev) => ({ ...prev, quantity: value }))}
        />

        <Text style={styles.formLabel}>Message</Text>
        <TextInput
          placeholder="Tell us more about your requirement"
          placeholderTextColor="#64748b"
          multiline
          numberOfLines={4}
          style={[styles.input, styles.textArea]}
          value={form.message}
          onChangeText={(value) => setForm((prev) => ({ ...prev, message: value }))}
        />

        <Pressable style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </View>
    </>
  );

  const profileTab = (
    <>
      <View style={styles.pageBannerBlue}>
        <Text style={styles.pageBannerTitle}>About Us / Profile</Text>
        <Text style={styles.pageBannerSubtitle}>
          Company logo, mission, vision, story, team members and contact details.
        </Text>
      </View>

      <View style={styles.logoCard}>
        <Image source={require('./public/solar.png')} style={styles.logoImage} resizeMode="contain" />
        <Text style={styles.logoTitle}>Business Hub</Text>
      </View>

      <SectionTitle title="Mission" />
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Deliver premium mushroom products and reliable solar services with professional support and clean execution.
        </Text>
      </View>

      <SectionTitle title="Vision" />
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Build a trusted platform where food supply and solar maintenance can be managed with one simple conversation.
        </Text>
      </View>

      <SectionTitle title="Our Story" />
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          We started with a focus on agriculture and expanded into solar care because both businesses need quality and trust.
        </Text>
      </View>

      <SectionTitle title="Team Members" />
      <View style={styles.teamGrid}>
        <TeamMember name="Rahul" role="Founder" />
        <TeamMember name="Priya" role="Operations" />
        <TeamMember name="Amit" role="Service Lead" />
      </View>

      <SectionTitle title="Office Address" />
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>New Delhi, India</Text>
        <Text style={styles.infoText}>Office hours: Monday to Saturday, 9:00 AM to 6:00 PM</Text>
      </View>

      <SectionTitle title="Contact Details" />
      <View style={styles.contactRow}>
        <ActionButton label="WhatsApp" href="https://wa.me/919876543210" />
        <ActionButton label="Call" href="tel:+919876543210" />
        <ActionButton label="Email" href="mailto:info@businesshub.com" />
      </View>

      <SectionTitle title="Legal Information" subtitle="Privacy Policy and Terms and Conditions used across web and mobile." />
      <View style={styles.legalSection}>
        <LegalDocumentBlock document={privacyPolicy} accentColor="#22c55e" />
        <View style={{ height: 12 }} />
        <LegalDocumentBlock document={termsAndConditions} accentColor="#38bdf8" />
      </View>

      <SectionTitle title="Social Media Links" />
      <View style={styles.contactRow}>
        <ActionButton label="Instagram" href="https://instagram.com" />
        <ActionButton label="Facebook" href="https://facebook.com" />
        <ActionButton label="LinkedIn" href="https://linkedin.com" />
      </View>
      
      <SectionTitle title="Gallery" subtitle="Photos, videos, completed projects and client work." />
      <View style={styles.galleryGrid}>
        {galleryItems.map((item) => (
          <GalleryTile key={item.title} title={item.title} tag={item.tag} />
        ))}
      </View>

      <SectionTitle title="Solar Cleaning Gallery" />
      <View style={styles.galleryGrid}>
        <View style={styles.galleryGridTileDark}>
          <Text style={styles.galleryGridTileText}>Solar Cleaning 1</Text>
        </View>
        <View style={styles.galleryGridTileBlueSoft}>
          <Text style={styles.galleryGridTileText}>Solar Cleaning 2</Text>
        </View>
      </View>

      <SectionTitle title="Mushroom Packaging Gallery" />
      <View style={styles.galleryGrid}>
        <View style={styles.galleryGridTileGreen}>
          <Text style={styles.galleryGridTileText}>Packaging 1</Text>
        </View>
        <View style={styles.galleryGridTileGold}>
          <Text style={styles.galleryGridTileText}>Packaging 2</Text>
        </View>
      </View>

      <SectionTitle title="Completed Projects" />
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>- Mushroom supply projects for bulk clients</Text>
        <Text style={styles.infoText}>- Solar maintenance and cleaning contracts</Text>
        <Text style={styles.infoText}>- Packaging and distribution work</Text>
      </View>

      <SectionTitle title="Client Work" />
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>Photos and reports from repeat client deliveries and solar service visits.</Text>
      </View>
    </>
  );

  const content =
    tab === 'home'
      ? homeTab
      : tab === 'products'
        ? productsTab
        : tab === 'services'
          ? servicesTab
          : tab === 'enquiry'
            ? enquiryTab
      : profileTab;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.backdropTop} />
      <View style={styles.backdropBottom} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {content}
      </ScrollView>

      <View style={styles.bottomBar}>
        {tabs.map((item, index) => (
          <TabButton
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={tab === item.key}
            large={index === 2}
            onPress={() => setTab(item.key)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#07111f',
  },
  backdropTop: {
    position: 'absolute',
    top: -80,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
  },
  backdropBottom: {
    position: 'absolute',
    bottom: 110,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 180,
    backgroundColor: 'rgba(14, 165, 233, 0.16)',
  },
  scrollContent: {
    padding: H_PADDING,
    paddingBottom: 118,
  },
  heroBanner: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#0f172a',
    borderColor: 'rgba(148, 163, 184, 0.16)',
    borderWidth: 1,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.5)',
  },
  heroContent: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  heroLeft: {
    flex: 1,
  },
  heroRight: {
    width: 112,
    justifyContent: 'space-between',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginBottom: 12,
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  heroTitle: {
    color: '#f8fafc',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    marginBottom: 12,
  },
  heroSubtitle: {
    color: '#dbeafe',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  heroVisualCard: {
    backgroundColor: 'rgba(34, 197, 94, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(134, 239, 172, 0.35)',
    borderRadius: 18,
    padding: 12,
    minHeight: 96,
  },
  heroVisualCardAlt: {
    backgroundColor: 'rgba(59, 130, 246, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(147, 197, 253, 0.35)',
    borderRadius: 18,
    padding: 12,
    minHeight: 96,
    marginTop: 12,
  },
  heroVisualKicker: {
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroVisualTitle: {
    color: '#f8fafc',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  actionButton: {
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  actionPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  actionText: {
    color: '#0f172a',
    fontWeight: '800',
    fontSize: 13,
  },
  carouselContent: {
    paddingRight: 2,
  },
  slideCard: {
    width: CARD_WIDTH,
    minHeight: 220,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accentGreen: { backgroundColor: '#134e4a' },
  accentGold: { backgroundColor: '#78350f' },
  accentBlue: { backgroundColor: '#1e3a8a' },
  slideTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
    marginBottom: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  slideTitle: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    marginBottom: 10,
  },
  slideSubtitle: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 14,
    lineHeight: 21,
  },
  slideVisualWrap: {
    width: 132,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualPanel: {
    width: 132,
    height: 170,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  solarImage: {
    width: 150,
    height: 150,
  },
  mushroomGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: 20,
    left: 6,
  },
  mushroomCluster: {
    width: 100,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mushroomStem: {
    position: 'absolute',
    bottom: 20,
    width: 28,
    height: 58,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
  },
  mushroomCapLarge: {
    position: 'absolute',
    bottom: 54,
    width: 84,
    height: 52,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#fca5a5',
    transform: [{ rotate: '-8deg' }],
  },
  mushroomCapSmallLeft: {
    position: 'absolute',
    bottom: 62,
    left: 6,
    width: 48,
    height: 32,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: '#fdba74',
    transform: [{ rotate: '-16deg' }],
  },
  mushroomCapSmallRight: {
    position: 'absolute',
    bottom: 58,
    right: 6,
    width: 42,
    height: 28,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#f9a8d4',
    transform: [{ rotate: '15deg' }],
  },
  leafOne: {
    position: 'absolute',
    left: 10,
    bottom: 18,
    width: 32,
    height: 18,
    backgroundColor: '#34d399',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    transform: [{ rotate: '-24deg' }],
  },
  leafTwo: {
    position: 'absolute',
    right: 10,
    bottom: 14,
    width: 30,
    height: 16,
    backgroundColor: '#22c55e',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    transform: [{ rotate: '18deg' }],
  },
  packageGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: 14,
    right: 4,
  },
  packageStack: {
    width: 100,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageBox: {
    position: 'absolute',
    width: 76,
    height: 54,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.78)',
  },
  packageBoxBack: {
    backgroundColor: 'rgba(251, 191, 36, 0.34)',
    top: 20,
    right: 10,
    transform: [{ rotate: '10deg' }],
  },
  packageBoxFront: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    bottom: 18,
    left: 8,
    transform: [{ rotate: '-8deg' }],
  },
  packageTape: {
    position: 'absolute',
    width: 14,
    height: 92,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    transform: [{ rotate: '18deg' }],
  },
  packageLabel: {
    position: 'absolute',
    bottom: 18,
    right: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.22)',
    borderRadius: 999,
  },
  packageLabelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    marginBottom: 6,
  },
  dot: {
    height: 8,
    borderRadius: 999,
  },
  dotActive: {
    width: 22,
    backgroundColor: '#f8fafc',
  },
  dotInactive: {
    width: 8,
    backgroundColor: 'rgba(148,163,184,0.6)',
  },
  sectionHeading: {
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
  dualGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 6,
  },
  dualCard: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderColor: 'rgba(148, 163, 184, 0.16)',
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
  },
  dualCardGreen: {
    backgroundColor: 'rgba(20, 83, 45, 0.9)',
    borderColor: 'rgba(34, 197, 94, 0.22)',
  },
  dualCardBlue: {
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderColor: 'rgba(59, 130, 246, 0.22)',
  },
  dualCardTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  dualCardPoint: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 20,
  },
  detailCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderColor: 'rgba(148, 163, 184, 0.16)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  detailTitle: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  detailLine: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 4,
  },
  whyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  whyCard: {
    width: '48%',
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderColor: 'rgba(148, 163, 184, 0.16)',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },
  whyText: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  statCard: {
    width: '48%',
    minHeight: 90,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderColor: 'rgba(148, 163, 184, 0.16)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
  },
  statValue: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 6,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 6,
  },
  gridItem: {
    width: '48%',
    minHeight: 86,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
    padding: 14,
    justifyContent: 'center',
  },
  gridItemLabel: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  gridItemMeta: {
    color: '#94a3b8',
    fontSize: 13,
  },
  reviewCard: {
    width: CARD_WIDTH,
    borderRadius: 22,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderColor: 'rgba(148, 163, 184, 0.14)',
    borderWidth: 1,
    padding: 16,
    marginRight: 12,
  },
  reviewStars: {
    color: '#fbbf24',
    fontSize: 18,
    marginBottom: 10,
  },
  reviewText: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  reviewName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  reviewRole: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  ctaBlock: {
    marginTop: 12,
    borderRadius: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderColor: 'rgba(148, 163, 184, 0.16)',
    borderWidth: 1,
    padding: 18,
  },
  ctaTitle: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },
  pageBanner: {
    borderRadius: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 18,
    marginBottom: 14,
  },
  pageBannerBlue: {
    borderRadius: 24,
    backgroundColor: 'rgba(30, 58, 138, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(147, 197, 253, 0.24)',
    padding: 18,
    marginBottom: 14,
  },
  pageBannerTitle: {
    color: '#f8fafc',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    marginBottom: 8,
  },
  pageBannerSubtitle: {
    color: '#dbeafe',
    fontSize: 14,
    lineHeight: 21,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: '#f8fafc',
    borderColor: '#f8fafc',
  },
  pillInactive: {
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    borderColor: 'rgba(148, 163, 184, 0.22)',
  },
  pillPressed: {
    opacity: 0.88,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  pillTextActive: {
    color: '#0f172a',
  },
  pillTextInactive: {
    color: '#e2e8f0',
  },
  productCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
    padding: 14,
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
  },
  productFresh: { borderColor: 'rgba(34, 197, 94, 0.28)' },
  productDry: { borderColor: 'rgba(245, 158, 11, 0.28)' },
  productPowder: { borderColor: 'rgba(168, 85, 247, 0.28)' },
  productPackaging: { borderColor: 'rgba(59, 130, 246, 0.28)' },
  productImagePlaceholder: {
    height: 150,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 10,
  },
  productImageText: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  productPrice: {
    color: '#86efac',
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 6,
  },
  productName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  productDescription: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  productMeta: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 3,
  },
  benefitWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  benefitPill: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  benefitText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '700',
  },
  enquiryButton: {
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    alignItems: 'center',
  },
  enquiryButtonText: {
    color: '#0f172a',
    fontWeight: '900',
    fontSize: 13,
  },
  serviceCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
    padding: 14,
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
  },
  stepsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  stepCard: {
    width: '48%',
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderColor: 'rgba(148, 163, 184, 0.16)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
  },
  stepNumber: {
    color: '#93c5fd',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  stepTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  stepText: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 18,
  },
  planGrid: {
    gap: 10,
    marginBottom: 8,
  },
  planCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
  },
  planCardHighlighted: {
    borderColor: 'rgba(249, 115, 22, 0.4)',
  },
  planSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  planTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  },
  planPrice: {
    color: '#86efac',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 10,
  },
  planItem: {
    color: '#e2e8f0',
    fontSize: 13,
    lineHeight: 18,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  galleryGridTile: {
    width: '48%',
    minHeight: 120,
    borderRadius: 22,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderColor: 'rgba(148, 163, 184, 0.14)',
    borderWidth: 1,
    padding: 14,
    justifyContent: 'flex-end',
  },
  galleryGridTileDark: {
    width: '48%',
    minHeight: 120,
    borderRadius: 22,
    backgroundColor: '#0f172a',
    borderColor: 'rgba(148, 163, 184, 0.14)',
    borderWidth: 1,
    padding: 14,
    justifyContent: 'flex-end',
  },
  galleryGridTileBlue: {
    width: '48%',
    minHeight: 120,
    borderRadius: 22,
    backgroundColor: '#1e3a8a',
    borderColor: 'rgba(147, 197, 253, 0.24)',
    borderWidth: 1,
    padding: 14,
    justifyContent: 'flex-end',
  },
  galleryGridTileBlueSoft: {
    width: '48%',
    minHeight: 120,
    borderRadius: 22,
    backgroundColor: '#0f4c81',
    borderColor: 'rgba(147, 197, 253, 0.24)',
    borderWidth: 1,
    padding: 14,
    justifyContent: 'flex-end',
  },
  galleryGridTileGreen: {
    width: '48%',
    minHeight: 120,
    borderRadius: 22,
    backgroundColor: '#14532d',
    borderColor: 'rgba(74, 222, 128, 0.24)',
    borderWidth: 1,
    padding: 14,
    justifyContent: 'flex-end',
  },
  galleryGridTileGold: {
    width: '48%',
    minHeight: 120,
    borderRadius: 22,
    backgroundColor: '#92400e',
    borderColor: 'rgba(251, 191, 36, 0.24)',
    borderWidth: 1,
    padding: 14,
    justifyContent: 'flex-end',
  },
  galleryGridTileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  galleryTile: {
    width: '48%',
    marginBottom: 10,
  },
  galleryPreview: {
    height: 120,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  galleryPreviewText: {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  galleryTag: {
    color: '#86efac',
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    marginTop: 8,
  },
  galleryTitle: {
    color: '#e2e8f0',
    fontSize: 13,
    marginTop: 4,
  },
  formCard: {
    borderRadius: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 16,
  },
  formLabel: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(148, 163, 184, 0.18)',
    borderWidth: 1,
    borderRadius: 16,
    color: '#f8fafc',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  textArea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    paddingVertical: 13,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
  },
  logoCard: {
    borderRadius: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.16)',
    padding: 18,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoImage: {
    width: 140,
    height: 140,
    marginBottom: 10,
  },
  logoTitle: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '900',
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  teamCard: {
    width: '31%',
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
    padding: 12,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 48,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  teamName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  teamRole: {
    color: '#94a3b8',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderColor: 'rgba(148, 163, 184, 0.16)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginTop: 4,
    marginBottom: 10,
  },
  infoTitle: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  infoText: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 4,
  },
  legalSection: {
    marginTop: 6,
    marginBottom: 10,
  },
  legalCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderRadius: 20,
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
  featureCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderColor: 'rgba(148, 163, 184, 0.16)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    marginBottom: 10,
  },
  featureDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginTop: 4,
  },
  featureTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 2,
  },
  featureMeta: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
  },
  featureDetail: {
    color: '#cbd5e1',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  bottomBar: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(8, 17, 31, 0.96)',
    borderColor: 'rgba(148, 163, 184, 0.18)',
    borderWidth: 1,
    borderRadius: 24,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    paddingVertical: 9,
    marginHorizontal: 2,
  },
  tabButtonLarge: {
    flex: 1.18,
    minHeight: 62,
    paddingVertical: 12,
    marginTop: -4,
  },
  tabButtonActive: {
    backgroundColor: 'rgba(248, 250, 252, 0.12)',
  },
  tabButtonInactive: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.85,
  },
  tabIcon: {
    fontSize: 17,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '800',
  },
  tabTextActive: {
    color: '#f8fafc',
  },
  tabTextInactive: {
    color: '#94a3b8',
  },
});
