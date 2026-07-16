import React, { useState, useMemo } from 'react';
import { Search, Info, Flame, Target, Utensils, CheckCircle, Star } from 'lucide-react';

const MENU_DATA = [
  {
    id: 1,
    title: "Double-Decker Naked Grilled Club + Mac",
    source: "Chick-fil-A (Frisco)",
    category: "Full Meals",
    calories: 840,
    protein: 101,
    description: "2 Grilled Filets, 2 slices Pepper Jack cheese melted on top, wrapped in lettuce/tomato, plus a 12-count Grilled Nugget and a small Mac & Cheese side. Hack: use Buffalo sauce for the dressing.",
    imageKeyword: "grilled-chicken"
  },
  {
    id: 2,
    title: "The Double-Chicken 'Clean' Bowl",
    source: "Chipotle",
    category: "Quick Grab / Restaurant",
    calories: 410,
    protein: 66,
    description: "Double chicken, fajita veggies, tomato salsa, romaine lettuce, light cheese. NO rice, NO beans, NO guac.",
    imageKeyword: "mexican-bowl"
  },
  {
    id: 3,
    title: "Blackened Shrimp Naked Taco (x3)",
    source: "Velvet Taco (Parkwood Blvd)",
    category: "Quick Grab / Restaurant",
    calories: 330,
    protein: 36,
    description: "Ordered as a 3-taco bundle: Blackened shrimp, napa slaw, and corn pico wrapped tightly in lettuce leaves. Hold the sriracha aioli and avocado.",
    imageKeyword: "shrimp-taco"
  },
  {
    id: 4,
    title: "Black Lentil Double Chicken Power Bowl",
    source: "CAVA (Eldorado Pkwy)",
    category: "Full Meals",
    calories: 830,
    protein: 78,
    description: "Supergreens base, 1 scoop Black Lentils, double grilled chicken, tzatziki, cucumber tomato salad, pickled onions. No hummus, no feta.",
    imageKeyword: "mediterranean-food"
  },
  {
    id: 5,
    title: "The Gym-Style Chicken Platter",
    source: "Shah's Halal Food (Preston Rd)",
    category: "Quick Grab / Restaurant",
    calories: 450,
    protein: 50,
    description: "Chicken over lettuce and salad mix only. Skip the rice, pita bread, and white sauce. Top with hot sauce or green sauce.",
    imageKeyword: "halal-chicken"
  },
  {
    id: 6,
    title: "Flying Dutchman Mod (x3 Patties)",
    source: "In-N-Out",
    category: "Quick Grab / Restaurant",
    calories: 300,
    protein: 30,
    description: "3 a la carte beef patties served plain or wrapped in lettuce (Protein Style). Skip the standard spread and processed cheese slices.",
    imageKeyword: "burger-patty"
  },
  {
    id: 7,
    title: "Buffalo Chicken 'Cloud' Dip",
    source: "Walmart (At Home)",
    category: "Assembled Snacks",
    calories: 160,
    protein: 29,
    description: "Blend 1/2 cup Great Value Fat-Free Cottage cheese with 1 pouch of Starkist White Chicken and 2 tbsp Frank's RedHot. Dip with raw celery or cucumber slices.",
    imageKeyword: "chicken-dip"
  },
  {
    id: 8,
    title: "Pro-FroYo Peanut Butter Bark",
    source: "Walmart (At Home)",
    category: "Assembled Snacks",
    calories: 175,
    protein: 30,
    description: "Mix 1 cup plain nonfat Greek yogurt with 1 tbsp Powdered Peanut Butter and stevia. Spread flat on parchment paper and freeze for 25 minutes.",
    imageKeyword: "frozen-yogurt"
  },
  {
    id: 9,
    title: "Quest Tortilla Style Chips",
    source: "Walmart (Pantry)",
    category: "Grocery Store",
    calories: 140,
    protein: 19,
    description: "Chili Lime or Loaded Taco protein chips. Made from high-quality dairy protein isolates to scratch the savory chip itch.",
    imageKeyword: "chips"
  },
  {
    id: 10,
    title: "90-Second Sweet Egg White Crepe",
    source: "Walmart (At Home)",
    category: "Assembled Snacks",
    calories: 60,
    protein: 12,
    description: "Pour 1/2 cup liquid egg whites into a skillet with cinnamon and stevia. Roll it up and drizzle generously with Walden Farms Zero-Calorie Pancake Syrup.",
    imageKeyword: "crepe"
  },
  {
    id: 11,
    title: "Premier Protein Shake (11oz)",
    source: "Walmart (Fridge)",
    category: "Drinks",
    calories: 160,
    protein: 30,
    description: "Ready-to-drink vanilla or chocolate shake. The perfect cold safety net to grab on the way out the door.",
    imageKeyword: "protein-shake"
  }
];

const CATEGORIES = ["All", "Quick Grab / Restaurant", "Grocery Store", "Assembled Snacks", "Full Meals", "Drinks"];

// Fallback high-quality images mapping using standard unsplash images
const IMAGE_MAP = {
  "grilled-chicken": "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=600&q=80",
  "mexican-bowl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
  "shrimp-taco": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80",
  "mediterranean-food": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80",
  "halal-chicken": "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=600&q=80",
  "burger-patty": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  "chicken-dip": "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=600&q=80",
  "frozen-yogurt": "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80",
  "chips": "https://images.unsplash.com/photo-1566478989037-e124c1507008?auto=format&fit=crop&w=600&q=80",
  "crepe": "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80",
  "protein-shake": "https://images.unsplash.com/photo-1620189507195-68309c04c4d0?auto=format&fit=crop&w=600&q=80",
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
        item.source.toLowerCase().includes(lowerQuery);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
      {/* Header Area */}
      <header className="sticky top-0 z-20 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
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
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search meals, sources, or ingredients..."
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
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
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
            <p className="mt-1 text-slate-500">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((item) => {
              const ratio = (item.calories / item.protein).toFixed(1);
              const isElite = parseFloat(ratio) <= 7.0;

              return (
                <div
                  key={item.id}
                  className="group relative bg-slate-800/80 rounded-2xl border border-slate-700/50 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Image Header */}
                  <div className="h-48 relative overflow-hidden bg-slate-700">
                    <img
                      src={IMAGE_MAP[item.imageKeyword] || `https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80`}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
                    
                    {/* Source Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-slate-200 backdrop-blur-md border border-slate-700">
                        {item.source}
                      </span>
                    </div>

                    {/* Ratio Badge */}
                    <div className="absolute top-4 right-4">
                      {isElite ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                          <Star className="w-3.5 h-3.5" />
                          Elite ({ratio}:1)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Approved ({ratio}:1)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-2">
                      <p className="text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-xl font-bold text-white leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-slate-400 text-sm mt-3 mb-6 flex-1">
                      {item.description}
                    </p>

                    {/* Macro Stats Footer */}
                    <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Calories</span>
                        <div className="flex items-center gap-1.5 mt-1 text-slate-200 font-bold">
                          <Flame className="w-4 h-4 text-orange-500" />
                          {item.calories}
                        </div>
                      </div>
                      
                      <div className="h-8 w-px bg-slate-700/50" />
                      
                      <div className="flex flex-col items-end">
                        <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">Protein</span>
                        <div className="flex items-center gap-1.5 mt-1 text-slate-200 font-bold">
                          {item.protein}g
                        </div>
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
