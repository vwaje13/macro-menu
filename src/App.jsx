import React, { useState, useMemo } from 'react';
import { Search, Info, Flame, Target, Utensils, CheckCircle, Star, Store, MapPin } from 'lucide-react';

const MENU_DATA = [
  {
    id: 1,
    title: "Double-Decker Naked Grilled Club + Mac",
    source: "Chick-fil-A",
    category: "RESTAURANT MEALS",
    calories: 840,
    protein: 101,
    description: "Full balanced meal stack: 2 Grilled Filets + 2 slices Pepper Jack cheese melted on top wrapped in lettuce, paired with a 12-count Grilled Nugget and a small Mac & Cheese side. The ultra-lean nuggets pull the entire meal's macro profile back into safety.",
    imageUrl: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop&q=80",
    brand: "Chick-fil-A",
    stores: []
  },
  {
    id: 2,
    title: "12-Count Grilled Nuggets",
    source: "Chick-fil-A",
    category: "RESTAURANT INDIVIDUAL ITEMS",
    calories: 200,
    protein: 38,
    description: "Standalone juicy, pure grilled chicken breast nuggets. An elite macro shield tool.",
    imageUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80",
    brand: "Chick-fil-A",
    stores: []
  },
  {
    id: 3,
    title: "The Double-Chicken 'Clean' Bowl",
    source: "Chipotle",
    category: "RESTAURANT MEALS",
    calories: 410,
    protein: 66,
    description: "Double chicken, fajita veggies, fresh tomato salsa, romaine lettuce, and a light sprinkle of cheese. Absolutely no rice, beans, or guacamole.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    brand: "Chipotle",
    stores: []
  },
  {
    id: 4,
    title: "Blackened Shrimp Naked Taco Bundle",
    source: "Velvet Taco",
    category: "RESTAURANT MEALS",
    calories: 330,
    protein: 36,
    description: "3-taco custom order: Clean blackened shrimp, crisp napa slaw, and corn pico wrapped tightly inside lettuce leaves. Must hold the high-fat sriracha aioli and avocado.",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80",
    brand: "Velvet Taco",
    stores: []
  },
  {
    id: 5,
    title: "Black Lentil Double Chicken Bowl",
    source: "CAVA",
    category: "RESTAURANT MEALS",
    calories: 830,
    protein: 78,
    description: "Supergreens base, 1 scoop of high-protein Black Lentils, double grilled chicken, tzatziki, cucumber tomato salad, and pickled onions.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
    brand: "CAVA",
    stores: []
  },
  {
    id: 6,
    title: "Quest Tortilla Style Protein Chips",
    source: "Quest Nutrition",
    category: "GROCERY STORE INDIVIDUAL ITEMS",
    calories: 140,
    protein: 19,
    description: "Chili Lime or Loaded Taco crispy protein chips made from high-grade dairy protein isolates.",
    imageUrl: "https://images.unsplash.com/photo-1518047601542-79f18c655718?w=600&auto=format&fit=crop&q=80",
    brand: "Quest",
    stores: ["Walmart", "H-E-B", "Target"]
  },
  {
    id: 7,
    title: "Fat-Free Cottage Cheese",
    source: "Great Value / Generic",
    category: "GROCERY STORE INDIVIDUAL ITEMS",
    calories: 80,
    protein: 12,
    description: "Per 1/2 cup serving. Pure, slow-digesting casein protein block with zero fat content.",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=80",
    brand: "Generic",
    stores: ["Walmart", "H-E-B", "Kroger"]
  },
  {
    id: 8,
    title: "Buffalo Chicken 'Cloud' Dip",
    source: "Home Prepared",
    category: "ASSEMBLED SNACKS",
    calories: 160,
    protein: 29,
    description: "Blended combination snack: Mix 1/2 cup Fat-Free Cottage cheese with 1 canned pouch of premium chicken breast and 2 tbsp Frank's RedHot. Serve with raw celery sticks.",
    imageUrl: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&auto=format&fit=crop&q=80",
    brand: "Home Cooked",
    stores: ["Walmart", "H-E-B"]
  },
  {
    id: 9,
    title: "90-Second Sweet Egg White Crepe",
    source: "Home Prepared",
    category: "ASSEMBLED SNACKS",
    calories: 60,
    protein: 12,
    description: "Pan-fried 1/2 cup liquid egg whites dusted with cinnamon and stevia, rolled up thin and covered in zero-calorie maple syrup.",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80",
    brand: "Home Cooked",
    stores: ["Walmart", "H-E-B", "Kroger"]
  },
  {
    id: 10,
    title: "Premier Protein Shake (11oz)",
    source: "Premier Protein",
    category: "GROCERY STORE INDIVIDUAL ITEMS",
    calories: 160,
    protein: 30,
    description: "Pre-made convenience shake hitting a sleek ~5.3:1 macro profile. Keep chilled.",
    imageUrl: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80",
    brand: "Premier Protein",
    stores: ["Walmart", "Target", "Kroger"]
  }
];

const CATEGORIES = [
  "All", 
  "RESTAURANT INDIVIDUAL ITEMS", 
  "RESTAURANT MEALS", 
  "GROCERY STORE INDIVIDUAL ITEMS", 
  "ASSEMBLED SNACKS"
];

const BRAND_COLORS = {
  "Chick-fil-A": "bg-red-500/20 text-red-400 border-red-500/30",
  "Chipotle": "bg-amber-700/20 text-amber-500 border-amber-700/30",
  "Velvet Taco": "bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-600/30",
  "CAVA": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Quest": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Premier Protein": "bg-indigo-600/20 text-indigo-400 border-indigo-600/30",
  "Generic": "bg-slate-500/20 text-slate-300 border-slate-500/30",
  "Home Cooked": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
};

const STORE_COLORS = {
  "Walmart": "bg-[#0071ce]/20 text-[#0071ce] border-[#0071ce]/30",
  "Target": "bg-[#e31837]/20 text-[#e31837] border-[#e31837]/30",
  "H-E-B": "bg-[#ed1c24]/20 text-[#ed1c24] border-[#ed1c24]/30",
  "Kroger": "bg-[#00529b]/20 text-[#4a90e2] border-[#00529b]/30"
};

const BrandBadge = ({ brand }) => {
  const colorClass = BRAND_COLORS[brand] || "bg-slate-700/50 text-slate-300 border-slate-600";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${colorClass}`}>
      <MapPin className="w-3 h-3" />
      {brand}
    </span>
  );
};

const StoreBadge = ({ store }) => {
  const colorClass = STORE_COLORS[store] || "bg-slate-700/50 text-slate-300 border-slate-600";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${colorClass}`}>
      <Store className="w-2.5 h-2.5" />
      {store}
    </span>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredData = useMemo(() => {
    return MENU_DATA.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.brand.toLowerCase().includes(lowerQuery) ||
        item.stores.some(s => s.toLowerCase().includes(lowerQuery));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header Area */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <Target className="w-8 h-8 text-indigo-400" />
                The 10:1 Macro Menu
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Personal catalog of high-protein, low-calorie options.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search meals, brands, or stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl leading-5 bg-slate-800/50 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <Utensils className="mx-auto h-12 w-12 text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-slate-300">No items found</h3>
            <p className="mt-1 text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredData.map((item) => {
              const ratio = (item.calories / item.protein).toFixed(1);
              const isElite = parseFloat(ratio) <= 7.0;

              return (
                <div
                  key={item.id}
                  className="group relative bg-slate-800/80 rounded-2xl border border-slate-700/50 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image Header */}
                  <div className="h-56 relative overflow-hidden bg-slate-700">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90" />
                    
                    {/* Logos Area (Top Left Overlay) */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 max-w-[80%]">
                      {item.brand && <BrandBadge brand={item.brand} />}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <p className="text-indigo-400 text-[10px] font-bold tracking-wider uppercase mb-1.5">
                        {item.category}
                      </p>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-slate-400 text-sm mt-2 mb-4 flex-1">
                      {item.description}
                    </p>

                    {/* Store Logos Row (if applicable) */}
                    {item.stores && item.stores.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {item.stores.map((store) => (
                          <StoreBadge key={store} store={store} />
                        ))}
                      </div>
                    )}

                    {/* Macro Stats Footer (Refactored to single row) */}
                    <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4">
                        {/* Calories */}
                        <div className="flex flex-col">
                          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Cals</span>
                          <div className="flex items-center gap-1 mt-0.5 text-slate-200 font-bold text-lg">
                            <Flame className="w-4 h-4 text-orange-500" />
                            {item.calories}
                          </div>
                        </div>
                        
                        <div className="h-8 w-px bg-slate-700/50" />
                        
                        {/* Protein */}
                        <div className="flex flex-col">
                          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Protein</span>
                          <div className="flex items-center gap-1 mt-0.5 text-slate-200 font-bold text-lg">
                            <Target className="w-4 h-4 text-indigo-400" />
                            {item.protein}g
                          </div>
                        </div>
                      </div>

                      {/* Ratio Badge (Moved here) */}
                      <div className="flex flex-col items-end shrink-0 pl-2">
                        {isElite ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                            <Star className="w-3.5 h-3.5" />
                            {ratio}:1
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            <CheckCircle className="w-3.5 h-3.5" />
                            {ratio}:1
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
