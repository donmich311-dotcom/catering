// Seed data for the Catering Website
export const defaultProducts = [
  // Cakes
  {
    id: "p1",
    name: "Wedding Elegance Cake",
    category: "Cakes",
    price: 250.00,
    rating: 5,
    image: "assets/carousel-wedding.png",
    description: "A breathtaking 3-tier white fondant wedding cake decorated with gold leaf accents, delicate handmade sugar flowers, and premium vanilla/chocolate layers.",
    stock: 5,
    featured: true
  },
  {
    id: "p2",
    name: "Chocolate Decadence Birthday Cake",
    category: "Cakes",
    price: 75.00,
    rating: 4.8,
    image: "assets/carousel-birthday.png",
    description: "A rich, multi-layered chocolate fudge cake finished with dark chocolate drip, gold sprinkles, gourmet macarons, and fresh berries.",
    stock: 8,
    featured: true
  },
  {
    id: "p3",
    name: "Golden Drip Red Velvet Cake",
    category: "Cakes",
    price: 65.00,
    rating: 4.9,
    image: "assets/carousel-pastry.png",
    description: "Classic red velvet cake featuring luxurious layers of cream cheese icing, elegant gold drip details, and chocolate curl decorations.",
    stock: 12,
    featured: false
  },
  {
    id: "p4",
    name: "Dreamy Cupcake Box (Dozen)",
    category: "Cakes",
    price: 35.00,
    rating: 4.7,
    image: "assets/carousel-cupcakes.png",
    description: "A dozen assorted gourmet cupcakes including red velvet, double chocolate, vanilla bean, and salted caramel, topped with elegant piping.",
    stock: 20,
    featured: true
  },
  
  // Small Chops
  {
    id: "p5",
    name: "Standard Small Chops Platter",
    category: "Small Chops",
    price: 45.00,
    rating: 4.9,
    image: "assets/carousel-chops.png",
    description: "A beautifully arranged platter of 50 pieces of crisp spring rolls, savory beef samosas, sweet golden puff puff, and spicy chicken kebab skewers.",
    stock: 15,
    featured: true
  },
  {
    id: "p6",
    name: "Luxury Party Chops Platter",
    category: "Small Chops",
    price: 85.00,
    rating: 5,
    image: "assets/carousel-chops.png",
    description: "An extra large 100-piece catering platter featuring spring rolls, samosas, peppered beef chunks, sweet puff puff, and butterflied garlic prawns.",
    stock: 10,
    featured: false
  },
  {
    id: "p7",
    name: "Spicy Peppered Gizzdodo Box",
    category: "Small Chops",
    price: 50.00,
    rating: 4.8,
    image: "assets/carousel-chops.png",
    description: "A delicious sweet and spicy combination of peppered chicken gizzards and fried sweet plantain cubes, tossed in aromatic bell pepper sauce.",
    stock: 15,
    featured: false
  },

  // Pastries
  {
    id: "p8",
    name: "Butter Croissant Box (Half-Dozen)",
    category: "Pastries",
    price: 18.00,
    rating: 4.6,
    image: "assets/carousel-pastry.png",
    description: "Six freshly baked, incredibly flaky French croissants made with 100% grass-fed butter, crispy on the outside, soft and airy on the inside.",
    stock: 25,
    featured: false
  },
  {
    id: "p9",
    name: "Sausage Roll Catering Platter",
    category: "Pastries",
    price: 24.00,
    rating: 4.7,
    image: "assets/carousel-pastry.png",
    description: "A platter of 12 pieces of savory golden-brown puff pastry rolls stuffed with finely seasoned sausage meat, perfect for breakfast or meetings.",
    stock: 18,
    featured: false
  },
  {
    id: "p10",
    name: "Assorted Fruit Danishes (Box of 8)",
    category: "Pastries",
    price: 28.00,
    rating: 4.9,
    image: "assets/carousel-pastry.png",
    description: "Eight assorted light Danish pastries topped with vanilla custard, glazed fresh strawberries, blueberries, and baked apple slices.",
    stock: 15,
    featured: true
  },

  // Meals
  {
    id: "p11",
    name: "Signature Jollof Rice & Chicken",
    category: "Meals",
    price: 120.00,
    rating: 5,
    image: "assets/carousel-catering.png",
    description: "A rich and smoky party Jollof Rice platter served with 10 pieces of seasoned grilled chicken, sweet fried plantains, and crunchy cole slaw. Serves 10.",
    stock: 10,
    featured: true
  },
  {
    id: "p12",
    name: "Creamy Alfredo Pasta with Shrimp",
    category: "Meals",
    price: 140.00,
    rating: 4.8,
    image: "assets/carousel-catering.png",
    description: "Tender fettuccine pasta tossed in a rich, velvety garlic parmesan cream sauce, loaded with sauteed jumbo shrimp and fresh parsley. Serves 8.",
    stock: 8,
    featured: false
  },
  {
    id: "p13",
    name: "Garlic Butter Grilled Salmon",
    category: "Meals",
    price: 160.00,
    rating: 4.9,
    image: "assets/carousel-catering.png",
    description: "Six premium grilled Atlantic salmon fillets brushed with savory garlic herb butter, served over a bed of seasoned wild rice and asparagus. Serves 6.",
    stock: 6,
    featured: true
  },

  // Drinks
  {
    id: "p14",
    name: "Zobo Hibiscus Mocktail (Gallon)",
    category: "Drinks",
    price: 20.00,
    rating: 4.9,
    image: "assets/carousel-dessert.png",
    description: "A refreshing, sweet-tart gallon of house-brewed organic hibiscus tea infused with fresh ginger, sweet pineapple juice, cloves, and mint leaves.",
    stock: 30,
    featured: false
  },
  {
    id: "p15",
    name: "Citrus Sunshine Punch (Gallon)",
    category: "Drinks",
    price: 25.00,
    rating: 4.7,
    image: "assets/carousel-dessert.png",
    description: "A bright and zesty blend of freshly squeezed orange juice, cloudy lemon juice, lime wedges, and passionfruit syrup, topped with sparkling club soda.",
    stock: 25,
    featured: false
  },
  
  // Event Catering
  {
    id: "p16",
    name: "Premium Buffet Package (Per Guest)",
    category: "Event Catering",
    price: 45.00,
    rating: 5,
    image: "assets/carousel-catering.png",
    description: "A customizable, fully catered buffet setup. Includes 2 mains, 2 sides, 1 salad, 2 desserts, and full beverage station. Min order: 25 guests.",
    stock: 500,
    featured: true
  },
  {
    id: "p17",
    name: "Corporate Executive Lunch (Per Guest)",
    category: "Event Catering",
    price: 28.00,
    rating: 4.8,
    image: "assets/carousel-catering.png",
    description: "Individually packaged premium bento-style hot lunch boxes. Includes a high-end protein main, savory rice/pasta, side salad, and gourmet pastry. Min order: 15 guests.",
    stock: 300,
    featured: false
  }
];

export const defaultCateringPackages = [
  {
    id: "pkg1",
    name: "Royal Wedding Buffet",
    tagline: "For a celebration of a lifetime",
    price: "$45 - $65 / Guest",
    features: [
      "Custom multi-tier wedding cake",
      "Full buffet layout with warm gold chafing dishes",
      "Professional tuxedo-uniformed serving staff",
      "Gourmet hot mains, custom desserts & mockup table styling",
      "Complimentary champagne toast for head table"
    ],
    image: "assets/carousel-wedding.png"
  },
  {
    id: "pkg2",
    name: "Corporate Elegance Gala",
    tagline: "Impress clients and colleagues",
    price: "$35 - $50 / Guest",
    features: [
      "Individually plated multi-course dining or premium buffet",
      "Cocktail bar set up with specialized mocktails/cocktails",
      "Flexible dietary option adjustments (vegan, gluten-free)",
      "High-end visual table arrangement and linen selections",
      "Dedicated corporate event manager"
    ],
    image: "assets/carousel-catering.png"
  },
  {
    id: "pkg3",
    name: "Intimate Social Soirée",
    tagline: "A lively feast for close friends",
    price: "$30 - $40 / Guest",
    features: [
      "Curated assortment of small chops and finger foods",
      "Interactive dessert bar with custom cupcakes and fruit tarts",
      "Signature punches and fruit-infused drinks",
      "Casual server support or delivery-only warm setup",
      "Perfect for birthday parties and bridal showers"
    ],
    image: "assets/carousel-birthday.png"
  }
];

export const defaultReviews = [
  {
    id: "r1",
    name: "Sarah Jenkins",
    rating: 5,
    comment: "The wedding cake was not only gorgeous, but it tasted phenomenal! The layers were incredibly moist and the gold leaf detail looked absolute premium. Thank you for making our big day so sweet!",
    date: "2026-06-25",
    event: "Wedding Celebration"
  },
  {
    id: "r2",
    name: "Marcus Adebayo",
    rating: 5,
    comment: "We ordered the standard small chops and the signature Jollof rice for our house warming. The Jollof has that authentic smoky party flavor. Small chops were crispy and piping hot on arrival!",
    date: "2026-07-02",
    event: "House Warming"
  },
  {
    id: "r3",
    name: "Elizabeth Stone",
    rating: 4,
    comment: "Excellent customer service and prompt delivery. The cupcakes were incredibly light and had the perfect balance of sweetness. The corporate lunch boxes were a hit with our executive board.",
    date: "2026-07-04",
    event: "Corporate Board Meeting"
  },
  {
    id: "r4",
    name: "Daniel Villa",
    rating: 5,
    comment: "Their customized cake builder is brilliant. I designed a birthday cake online, got an instant estimate, and the cake looked EXACTLY like the details I specified. Super convenient!",
    date: "2026-07-06",
    event: "Birthday Party"
  }
];

export const faqs = [
  {
    question: "How far in advance do I need to book catering services?",
    answer: "For standard menu orders and cakes, we recommend ordering at least 48-72 hours in advance. For large event catering packages (weddings, corporate galas), we suggest booking 2-4 weeks prior to the event date to secure your date and ensure customized menu consultation."
  },
  {
    question: "Can you accommodate dietary restrictions or food allergies?",
    answer: "Yes, absolutely! We offer vegetarian, vegan, gluten-free, and nut-free options across our menus. Please specify any severe allergies in the comment section during online order checkout, or discuss them with your event manager when customizing your service package."
  },
  {
    question: "Is there a minimum order amount for delivery?",
    answer: "Yes, our minimum online order for home delivery is $30.00. Orders below this amount can be collected at our central kitchen location. Deliveries within a 15-mile radius are charged a flat $10.00 fee, while custom quotes are provided for longer distances."
  },
  {
    question: "How does the custom cake designer work?",
    answer: "Navigate to the 'Cakes' section where you can use our Interactive Cake Customizer. Select your base design, number of tiers, sizing, flavors, frosting type, and custom text. You will get an instant price estimation. Submit the form, and our lead baker will contact you to finalize details."
  },
  {
    question: "What is your cancellation and refund policy?",
    answer: "For general menu orders, cancellations made at least 24 hours prior to delivery qualify for a full refund. For custom cakes and event catering, cancellations must be made 7 days in advance. Deposits for weddings and large corporate events are non-refundable but can be credited towards a rescheduled date."
  }
];

export const teamMembers = [
  {
    name: "Chef Aurelia Dupont",
    role: "Founder & Lead Executive Chef",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400",
    bio: "With over 15 years of experience in Michelin-starred French bistros and luxury hotel dining, Aurelia creates catering masterpieces with classic European techniques and local flavors."
  },
  {
    name: "Samuel Carter",
    role: "Head Pastry Chef & Designer",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
    bio: "Samuel is our cake artist. His creative cake sculptures and delicate sugar flower decorations have been featured in premier lifestyle magazines across the nation."
  },
  {
    name: "Ngozi Okafor",
    role: "Events Coordination Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: "Ngozi guarantees your event flows seamlessly. She handles space layout, table settings, server coordination, and acts as your direct point of contact from proposal to dessert."
  }
];
