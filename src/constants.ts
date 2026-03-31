import { Product, Review, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Yogita Ayurvedic Oil (योगिता ऑयल)',
    price: 199,
    quantity: '100 ml',
    description: 'जोड़ो के दर्द, कमर दर्द और शरीर के किसी भी दर्द का एकमात्र उपाय। यह तेल गहराई तक जाकर दर्द से तुरंत राहत दिलाता है।',
    benefits: [
      'जोड़ो के दर्द में तुरंत राहत',
      'कमर दर्द से छुटकारा',
      'मांसपेशियों की सूजन कम करे',
      '100% आयुर्वेदिक और सुरक्षित'
    ],
    ingredients: [
      'Mahanarayan Oil',
      'Vishagarbha Oil',
      'Gandhapura Oil',
      'Nilgiri Oil',
      'Til Oil'
    ],
    usage: 'दर्द वाली जगह पर 5-10 मिली तेल लगाएं और 10-15 मिनट तक हल्के हाथों से मालिश करें। बेहतर परिणाम के लिए दिन में दो बार इस्तेमाल करें।',
    image: 'https://picsum.photos/seed/ayurveda/800/800',
    category: 'Treatment',
    rating: 4.9
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    userName: 'Rajesh Kumar',
    rating: 5,
    comment: 'Bhai bahut badiya tel hai, mere ghutno ka dard 2 din mein thik ho gaya. Best pain relief oil.',
    date: 'March 15, 2026'
  },
  {
    id: '2',
    userName: 'Priya Sharma',
    rating: 5,
    comment: 'Back pain ke liye best hai, delivery bhi fast hai. I am very happy with the results.',
    date: 'March 10, 2026'
  },
  {
    id: '3',
    userName: 'Amit Singh',
    rating: 5,
    comment: 'Joint pain mein bahut rahat mili. Natural aur effective product hai. Sabko use karna chahiye.',
    date: 'March 5, 2026'
  }
];

export const CATEGORIES: Category[] = [
  { id: 'joint', name: 'Joint Pain', icon: 'Activity' },
  { id: 'back', name: 'Back Pain', icon: 'Sparkles' },
  { id: 'muscle', name: 'Muscle Pain', icon: 'Leaf' }
];
