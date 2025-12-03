import { Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import restaurantImage from "@/assets/restaurant.jpg";
import dalMakhani from "@/assets/dal-makhani.jpg";
import pyaazKachori from "@/assets/pyaaz-kachori.jpg";
import laalMaas from "@/assets/laal-maas.jpg";
import murghMakhani from "@/assets/murgh-makhani.jpg";
import gattaCurry from "@/assets/gatta-curry.jpg";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "appetizer" | "entree";
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Paneer Tikka",
    description: "Marinated cottage cheese grilled in tandoor with mint chutney and onion rings",
    price: 495,
    category: "appetizer",
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    name: "Dal Makhani",
    description: "Slow-cooked black lentils with tomato, butter, and aromatic spices",
    price: 425,
    category: "appetizer",
    image: dalMakhani,
  },
  {
    id: "3",
    name: "Laal Maas",
    description: "Traditional Rajasthani mutton curry with fiery red chillies and garlic",
    price: 895,
    category: "entree",
    image: laalMaas,
  },
  {
    id: "4",
    name: "Murgh Makhani",
    description: "Butter chicken in rich tomato-cream gravy with kasuri methi",
    price: 695,
    category: "entree",
    image: murghMakhani,
  },
  {
    id: "5",
    name: "Gatta Curry",
    description: "Gram flour dumplings in tangy yogurt gravy - authentic Rajasthani specialty",
    price: 445,
    category: "entree",
    image: gattaCurry,
  },
  {
    id: "6",
    name: "Pyaaz Kachori",
    description: "Crispy pastry stuffed with spiced onions, served with tamarind chutney",
    price: 295,
    category: "appetizer",
    image: pyaazKachori,
  },
];

interface DiningSectionProps {
  onAddToOrder: (item: MenuItem) => void;
}

const DiningSection = ({ onAddToOrder }: DiningSectionProps) => {
  const appetizers = menuItems.filter((item) => item.category === "appetizer");
  const entrees = menuItems.filter((item) => item.category === "entree");

  return (
    <section id="dining" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">
              Fine Dining
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Royal Rajasthani Cuisine
            </h2>
            <div className="luxury-divider w-24 mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Experience authentic flavors at our signature restaurant. Our master chefs 
              craft each dish using traditional recipes passed down through generations, 
              creating memorable royal dining experiences.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                <span>Breakfast: 7AM - 11AM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                <span>Dinner: 7PM - 11PM</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={restaurantImage}
              alt="Fine dining restaurant"
              className="w-full h-80 object-cover rounded-xl shadow-elevated"
            />
            <div className="absolute -bottom-4 -left-4 bg-gold text-charcoal px-6 py-3 rounded-lg shadow-gold">
              <p className="font-serif text-lg font-semibold">Heritage Kitchen</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-12">
          {/* Appetizers */}
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-4">
              <span>Starters</span>
              <div className="flex-1 h-px bg-border" />
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appetizers.map((item, index) => (
                <MenuCard key={item.id} item={item} onAdd={onAddToOrder} index={index} />
              ))}
            </div>
          </div>

          {/* Entrees */}
          <div>
            <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-4">
              <span>Main Course</span>
              <div className="flex-1 h-px bg-border" />
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entrees.map((item, index) => (
                <MenuCard key={item.id} item={item} onAdd={onAddToOrder} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  index: number;
}

const MenuCard = ({ item, onAdd, index }: MenuCardProps) => {
  return (
    <div
      className="group bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
        <span className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground font-serif text-lg px-3 py-1 rounded-full">
          ₹{item.price}
        </span>
      </div>
      <div className="p-5">
        <h4 className="font-serif text-xl text-foreground mb-2">{item.name}</h4>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary"
          onClick={() => onAdd(item)}
        >
          <Plus className="w-4 h-4 mr-1 transition-transform group-hover/btn:rotate-90" />
          Add to Order
        </Button>
      </div>
    </div>
  );
};

export default DiningSection;
export type { MenuItem };
