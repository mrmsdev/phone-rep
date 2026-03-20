export interface Product {
    id: string;
    categoryId: string;
    categoryName: string;
    title: string;
    description: string;
    price: number;
    imageIcon: string;
    features: string[];
    specs: Record<string, string>;
    inStock: boolean;
}

export const products: Product[] = [
    {
        id: 'oem-screen-iphone-14',
        categoryId: 'parts',
        categoryName: 'OEM Parts',
        title: 'iPhone 14 OLED Screen Replacement',
        description: 'High-quality OEM OLED display assembly for iPhone 14. Includes digitizer and glass. Restores True Tone functionality when properly programmed.',
        price: 149.99,
        imageIcon: '📱',
        features: ['OEM OLED Quality', 'Includes Digitizer', 'Perfect Fit'],
        specs: {
            'Compatibility': 'iPhone 14 (Standard)',
            'Type': 'OLED',
            'Resolution': '2532 x 1170',
        },
        inStock: true,
    },
    {
        id: 'battery-samsung-s23',
        categoryId: 'parts',
        categoryName: 'OEM Parts',
        title: 'Samsung Galaxy S23 Replacement Battery',
        description: 'Original capacity 3900mAh replacement battery for Samsung Galaxy S23. Bring your device back to 100% battery health.',
        price: 39.99,
        imageIcon: '🔋',
        features: ['3900mAh Capacity', 'Includes Adhesive Strip', '0 Cycle Count'],
        specs: {
            'Compatibility': 'Samsung Galaxy S23',
            'Capacity': '3900mAh',
            'Chemistry': 'Lithium-ion',
        },
        inStock: true,
    },
    {
        id: 'toolkit-pro-64',
        categoryId: 'tools',
        categoryName: 'Toolkits',
        title: 'Pro Repair 64-Bit Toolkit',
        description: 'Comprehensive 64-piece precision driver set perfect for phone, tablet, and laptop repair. Includes spudgers, tweezers, and suction cups.',
        price: 59.99,
        imageIcon: '🛠️',
        features: ['64 Precision Bits', 'Anti-static Wrist Strap', 'Ergonomic Handle'],
        specs: {
            'Material': 'S2 Steel Bits',
            'Case': 'Magnetic Snapping Case',
            'Pieces': '64',
        },
        inStock: true,
    },
    {
        id: 'fast-charger-30w',
        categoryId: 'accessories',
        categoryName: 'Accessories',
        title: 'MustachPhone 30W Fast Wall Adapter',
        description: 'Compact 30W USB-C power adapter. Rapidly charges iPhones, Androids, and iPads safely with over-voltage protection.',
        price: 24.99,
        imageIcon: '🔌',
        features: ['30W Power Delivery', 'Compact Size', 'Over-voltage Protection'],
        specs: {
            'Input': '100-240V',
            'Output': 'USB-C PD 3.0',
            'Wattage': '30W Max',
        },
        inStock: true,
    },
    {
        id: 'glass-protector-iphone-15',
        categoryId: 'accessories',
        categoryName: 'Accessories',
        title: 'Tempered Glass Screen Protector - iPhone 15',
        description: '9H hardness tempered glass for ultimate drop protection. Features an oleophobic coating to reduce fingerprints.',
        price: 14.99,
        imageIcon: '🛡️',
        features: ['9H Hardness', 'Oleophobic Coating', 'Easy Install Tray Included'],
        specs: {
            'Compatibility': 'iPhone 15',
            'Thickness': '0.33mm',
            'Material': 'Aluminosilicate Glass',
        },
        inStock: true,
    },
    {
        id: 'silicone-case-pixel-8',
        categoryId: 'accessories',
        categoryName: 'Accessories',
        title: 'Liquid Silicone Case - Pixel 8 Pro',
        description: 'Soft, silky liquid silicone exterior provides great grip and drop protection. Microfiber inner lining keeps your phone scratch-free.',
        price: 19.99,
        imageIcon: '📳',
        features: ['Soft-touch Finish', 'Microfiber Lining', 'Drop Tested (6ft)'],
        specs: {
            'Compatibility': 'Google Pixel 8 Pro',
            'Material': 'Liquid Silicone / PC',
            'Colors': 'Charcoal, Sage, Obsidian',
        },
        inStock: true,
    }
];

export const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter(p => p.categoryId === categoryId);
};
