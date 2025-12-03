import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-hotel.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomSuperDeluxe from "@/assets/room-super-deluxe.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import restaurant from "@/assets/restaurant.jpg";
import hotelExterior from "@/assets/hotel-exterior.jpg";
import spa from "@/assets/spa.jpg";
import pool from "@/assets/pool.jpg";

const galleryImages = [
  { src: heroImage, alt: "Grand Lobby", category: "Interior" },
  { src: hotelExterior, alt: "Hotel Exterior", category: "Exterior" },
  { src: roomSuite, alt: "Maharaja Suite", category: "Rooms" },
  { src: restaurant, alt: "Heritage Restaurant", category: "Dining" },
  { src: spa, alt: "Ayurveda Spa", category: "Amenities" },
  { src: pool, alt: "Infinity Pool", category: "Amenities" },
  { src: roomDeluxe, alt: "Deluxe Room", category: "Rooms" },
  { src: roomSuperDeluxe, alt: "Super Deluxe Room", category: "Rooms" },
];

const GallerySection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  };

  return (
    <section id="gallery" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">
            Visual Journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Experience The Grand Stay
          </h2>
          <div className="luxury-divider w-24 mx-auto mb-6" />
          <p className="text-muted-foreground leading-relaxed">
            Explore our heritage property through stunning imagery. Click on any photo to view it in full size.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden rounded-xl cursor-pointer group animate-fade-up",
                index === 0 && "md:col-span-2 md:row-span-2",
                index === 3 && "md:col-span-2"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => openLightbox(index)}
            >
              <div className={cn("w-full", index === 0 ? "h-full min-h-64 md:min-h-96" : "h-48 md:h-56")}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-cream/20 backdrop-blur-sm flex items-center justify-center mb-3">
                    <Maximize2 className="w-6 h-6 text-cream" />
                  </div>
                  <p className="text-xs text-gold uppercase tracking-wider">{image.category}</p>
                  <p className="text-cream font-serif text-lg">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Photo Hint */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          <ZoomIn className="w-4 h-4 inline-block mr-2" />
          Click any image to view full photo
        </p>
      </div>

      {/* Lightbox - Full Screen View */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-charcoal/98 flex flex-col animate-fade-in"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4 md:p-6">
            <div className="text-cream">
              <p className="text-xs text-gold uppercase tracking-wider">{galleryImages[selectedIndex].category}</p>
              <p className="font-serif text-lg md:text-xl">{galleryImages[selectedIndex].alt}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-cream/60 text-sm">
                {selectedIndex + 1} / {galleryImages.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 text-cream/80 hover:text-cream transition-colors hover:bg-cream/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Image Container */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-16 pb-4">
            <button
              onClick={goPrev}
              className="absolute left-2 md:left-6 p-3 text-cream/60 hover:text-cream transition-colors hover:bg-cream/10 rounded-full z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Full Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                className="max-w-full max-h-full object-contain rounded-lg animate-scale-in"
                style={{ maxHeight: 'calc(100vh - 180px)' }}
              />
            </div>

            <button
              onClick={goNext}
              className="absolute right-2 md:right-6 p-3 text-cream/60 hover:text-cream transition-colors hover:bg-cream/10 rounded-full z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-4 md:p-6 overflow-x-auto">
            <div className="flex gap-2 justify-center">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200",
                    index === selectedIndex 
                      ? "ring-2 ring-gold ring-offset-2 ring-offset-charcoal opacity-100" 
                      : "opacity-50 hover:opacity-80"
                  )}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard Hint */}
          <p className="text-center text-cream/40 text-xs pb-4 hidden md:block">
            Use ← → arrows to navigate • ESC to close
          </p>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
