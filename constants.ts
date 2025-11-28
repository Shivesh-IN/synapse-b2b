import { Product, ProductCategory, SalesDataPoint, Order, OrderStatus } from './types';

// Unified "AI Generated" Style Image for consistency across entire catalog
const PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&q=80&w=800';

export const MOCK_PRODUCTS: Product[] = [
  // --- Category: Disc Brake Pads ---
  {
    id: 'DP-OLA-001',
    name: 'Ola Electric Ola S1 / S1 Pro Brake Pad',
    sku: 'DP-OLA-S1-001',
    category: ProductCategory.DISC_PADS,
    price: 184.00,
    stock: 120,
    description: 'High-performance ceramic brake pads designed specifically for Ola S1 and S1 Pro electric scooters.',
    vehicleCompatibility: ['Ola S1', 'Ola S1 Pro'],
    imageUrl: PRODUCT_IMAGE,
    tags: ['EV']
  },
  {
    id: 'DP-OLA-002',
    name: 'Ola Electric Ola S1 / S1 Pro Brake Pad (2nd listing – same product)',
    sku: 'DP-OLA-S1-002',
    category: ProductCategory.DISC_PADS,
    price: 184.00,
    stock: 85,
    description: 'Alternative listing for Ola S1/S1 Pro brake pads.',
    vehicleCompatibility: ['Ola S1', 'Ola S1 Pro'],
    imageUrl: PRODUCT_IMAGE,
    tags: ['EV']
  },
  {
    id: 'DP-HON-003',
    name: 'Honda Unicorn Brake Pad',
    sku: 'DP-HON-UNI-003',
    category: ProductCategory.DISC_PADS,
    price: 168.00,
    stock: 200,
    description: 'Premium front disc brake pads for Honda Unicorn.',
    vehicleCompatibility: ['Honda Unicorn'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-YAM-004',
    name: 'Yamaha Aerox 155 Brake Pad',
    sku: 'DP-YAM-AER-004',
    category: ProductCategory.DISC_PADS,
    price: 170.00,
    stock: 90,
    description: 'Sport-grade brake pads for Yamaha Aerox 155.',
    vehicleCompatibility: ['Yamaha Aerox 155'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-HON-005',
    name: 'Honda Shine Brake Pad',
    sku: 'DP-HON-SHI-005',
    category: ProductCategory.DISC_PADS,
    price: 169.00,
    stock: 150,
    description: 'Reliable brake pads for Honda Shine.',
    vehicleCompatibility: ['Honda Shine'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-YAM-006',
    name: 'Yamaha Rayzr 125 Fi Hybrid Brake Pad',
    sku: 'DP-YAM-RAY-006',
    category: ProductCategory.DISC_PADS,
    price: 169.00,
    stock: 100,
    description: 'Optimized for Yamaha Rayzr 125 Fi Hybrid.',
    vehicleCompatibility: ['Yamaha Rayzr 125'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-YAM-007',
    name: 'Yamaha R15 V4 Brake Pad',
    sku: 'DP-YAM-R15-007',
    category: ProductCategory.DISC_PADS,
    price: 158.00,
    stock: 60,
    description: 'High-friction brake pads for Yamaha R15 V4.',
    vehicleCompatibility: ['Yamaha R15 V4'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-TVS-008',
    name: 'TVS Ntorq 125 Brake Pad',
    sku: 'DP-TVS-NTO-008',
    category: ProductCategory.DISC_PADS,
    price: 171.00,
    stock: 110,
    description: 'Genuine-spec brake pads for TVS Ntorq 125.',
    vehicleCompatibility: ['TVS Ntorq 125'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-TVS-009',
    name: 'TVS Jupiter O/M Brake Pad',
    sku: 'DP-TVS-JUP-009',
    category: ProductCategory.DISC_PADS,
    price: 168.00,
    stock: 140,
    description: 'Front disc brake pads for TVS Jupiter.',
    vehicleCompatibility: ['TVS Jupiter'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-SUZ-010',
    name: 'Suzuki Gixxer 150 Brake Pad',
    sku: 'DP-SUZ-GIX-010',
    category: ProductCategory.DISC_PADS,
    price: 168.00,
    stock: 80,
    description: 'Durable pads for Suzuki Gixxer 150.',
    vehicleCompatibility: ['Suzuki Gixxer 150'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-YAM-011',
    name: 'Yamaha FZS-Fi V3 Brake Pad',
    sku: 'DP-YAM-FZS-011',
    category: ProductCategory.DISC_PADS,
    price: 188.00,
    stock: 95,
    description: 'Premium brake pads for Yamaha FZS-Fi V3.',
    vehicleCompatibility: ['Yamaha FZS-Fi V3'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-YAM-012',
    name: 'Yamaha FZS-Fi V3 Brake Pad (2nd listing – same price)',
    sku: 'DP-YAM-FZS-012',
    category: ProductCategory.DISC_PADS,
    price: 188.00,
    stock: 50,
    description: 'Alternative listing for FZS-Fi V3 pads.',
    vehicleCompatibility: ['Yamaha FZS-Fi V3'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-TVS-013',
    name: 'TVS Apache RTR Brake Pad',
    sku: 'DP-TVS-APA-013',
    category: ProductCategory.DISC_PADS,
    price: 168.00,
    stock: 130,
    description: 'Performance brake pads for TVS Apache RTR.',
    vehicleCompatibility: ['TVS Apache RTR'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-BAJ-014',
    name: 'Bajaj Pulsar 125 Brake Pad',
    sku: 'DP-BAJ-PUL-014',
    category: ProductCategory.DISC_PADS,
    price: 168.00,
    stock: 140,
    description: 'Standard front disc brake pads for Bajaj Pulsar 125.',
    vehicleCompatibility: ['Bajaj Pulsar 125'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'DP-HON-015',
    name: 'Honda Activa 6G Brake Pad',
    sku: 'DP-HON-ACT-015',
    category: ProductCategory.DISC_PADS,
    price: 189.00,
    stock: 180,
    description: 'Front disc pads for Honda Activa 6G.',
    vehicleCompatibility: ['Honda Activa 6G'],
    imageUrl: PRODUCT_IMAGE
  },

  // --- Category: Brake Shoe ---
  {
    id: 'BS-TVS-001',
    name: 'TVS Jupiter O/M Brake Shoe',
    sku: 'BS-TVS-JUP-001',
    category: ProductCategory.BRAKE_SHOE,
    price: 195.00,
    originalPrice: 200.00,
    stock: 200,
    description: 'High-durability rear brake shoe for TVS Jupiter.',
    vehicleCompatibility: ['TVS Jupiter'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-BAJ-002',
    name: 'Bajaj CT 100 Brake Shoe',
    sku: 'BS-BAJ-CT-002',
    category: ProductCategory.BRAKE_SHOE,
    price: 176.00,
    originalPrice: 200.00,
    stock: 150,
    description: 'Reliable brake shoe for Bajaj CT 100.',
    vehicleCompatibility: ['Bajaj CT 100'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-BAJ-003',
    name: 'Bajaj Platina 110 Brake Shoe',
    sku: 'BS-BAJ-PLA-003',
    category: ProductCategory.BRAKE_SHOE,
    price: 176.00,
    originalPrice: 200.00,
    stock: 160,
    description: 'Brake shoe kit for Bajaj Platina 110.',
    vehicleCompatibility: ['Bajaj Platina 110'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-SUZ-004',
    name: 'Suzuki Access Brake Shoe',
    sku: 'BS-SUZ-ACC-004',
    category: ProductCategory.BRAKE_SHOE,
    price: 186.00,
    originalPrice: 200.00,
    stock: 110,
    description: 'Rear brake shoe for Suzuki Access 125.',
    vehicleCompatibility: ['Suzuki Access 125'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-BAJ-005',
    name: 'Bajaj Pulsar 125 Brake Shoe',
    sku: 'BS-BAJ-PUL-005',
    category: ProductCategory.BRAKE_SHOE,
    price: 186.00,
    originalPrice: 200.00,
    stock: 130,
    description: 'Rear drum brake shoe for Bajaj Pulsar 125.',
    vehicleCompatibility: ['Bajaj Pulsar 125'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-HER-006',
    name: 'Hero Splendor Plus Brake Shoe',
    sku: 'BS-HER-SPL-006',
    category: ProductCategory.BRAKE_SHOE,
    price: 175.00,
    originalPrice: 200.00,
    stock: 300,
    description: 'Standard brake shoe for Hero Splendor Plus.',
    vehicleCompatibility: ['Hero Splendor Plus'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-HER-007',
    name: 'Hero HF Deluxe Brake Shoe',
    sku: 'BS-HER-HF-007',
    category: ProductCategory.BRAKE_SHOE,
    price: 186.00,
    originalPrice: 200.00,
    stock: 250,
    description: 'Brake shoe suitable for Hero HF Deluxe.',
    vehicleCompatibility: ['Hero HF Deluxe'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-BAJ-008',
    name: 'Bajaj KB4S Brake Shoe',
    sku: 'BS-BAJ-KB4-008',
    category: ProductCategory.BRAKE_SHOE,
    price: 176.00,
    originalPrice: 200.00,
    stock: 90,
    description: 'Legacy brake shoe for Bajaj KB4S models.',
    vehicleCompatibility: ['Bajaj KB4S'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-HER-009',
    name: 'Hero Splendor Plus Brake Shoe (2nd listing – discounted variant)',
    sku: 'BS-HER-SPL-009',
    category: ProductCategory.BRAKE_SHOE,
    price: 178.00,
    originalPrice: 200.00,
    stock: 150,
    description: 'Discounted variant of the Splendor Plus brake shoe.',
    vehicleCompatibility: ['Hero Splendor Plus'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-HON-010',
    name: 'Honda Activa 6G Brake Shoe',
    sku: 'BS-HON-ACT-010',
    category: ProductCategory.BRAKE_SHOE,
    price: 188.00,
    originalPrice: 220.00,
    stock: 220,
    description: 'Rear brake shoe for Honda Activa 6G.',
    vehicleCompatibility: ['Honda Activa 6G'],
    imageUrl: PRODUCT_IMAGE
  },
  {
    id: 'BS-OKI-011',
    name: 'Electrical Bike Okinawa Brake Shoe',
    sku: 'BS-EV-OKI-011',
    category: ProductCategory.BRAKE_SHOE,
    price: 178.00,
    originalPrice: 240.00,
    stock: 80,
    description: 'Specialized brake shoe for Okinawa electric scooters.',
    vehicleCompatibility: ['Okinawa Ridge', 'Okinawa Praise'],
    imageUrl: PRODUCT_IMAGE,
    tags: ['EV']
  }
];

export const MOCK_SALES_DATA: SalesDataPoint[] = [
  { month: 'Jan', revenue: 450000, orders: 120 },
  { month: 'Feb', revenue: 480000, orders: 135 },
  { month: 'Mar', revenue: 520000, orders: 150 },
  { month: 'Apr', revenue: 510000, orders: 145 },
  { month: 'May', revenue: 560000, orders: 160 },
  { month: 'Jun', revenue: 610000, orders: 180 },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-7782',
    date: '2023-10-25',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 20 },
      { ...MOCK_PRODUCTS[2], quantity: 50 }
    ],
    total: 41500,
    status: OrderStatus.SHIPPED,
    customerName: 'AutoWorld Distributors'
  },
  {
    id: 'ORD-7783',
    date: '2023-10-26',
    items: [
      { ...MOCK_PRODUCTS[1], quantity: 4 }
    ],
    total: 9600,
    status: OrderStatus.PROCESSING,
    customerName: 'Speedy Spares'
  }
];