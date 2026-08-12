import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

const FILTERS = ["All", "Reception", "Treatment", "Lounge", "Equipment"];

const CLINIC_IMAGES = [
  // { id: 1, title: "Entrance", category: "Reception", src: "/src/assets/clinicimages/HD/clinic-001-entrance.webp" },
  { id: 2, title: "Reception Area", category: "Reception", src: "/src/assets/clinicimages/HD/clinic-002-reception.webp" },
  { id: 3, title: "Reception Detail", category: "Reception", src: "/src/assets/clinicimages/HD/clinic-003-reception-detail.webp" },
  { id: 4, title: "Waiting Area", category: "Lounge", src: "/src/assets/clinicimages/HD/clinic-004-waiting-area.webp" },
  { id: 5, title: "Seating", category: "Lounge", src: "/src/assets/clinicimages/HD/clinic-005-seating.webp" },
  { id: 6, title: "Lounge", category: "Lounge", src: "/src/assets/clinicimages/HD/clinic-006-lounge.webp" },
  { id: 7, title: "Furniture", category: "Lounge", src: "/src/assets/clinicimages/HD/clinic-007-furniture.webp" },
  { id: 8, title: "Interior", category: "Lounge", src: "/src/assets/clinicimages/HD/clinic-008-interior.webp" },
  { id: 9, title: "Treatment Room", category: "Treatment", src: "/src/assets/clinicimages/HD/clinic-009-treatment-room.webp" },
  { id: 10, title: "Procedure", category: "Treatment", src: "/src/assets/clinicimages/HD/clinic-010-procedure.webp" },
  { id: 11, title: "Equipment", category: "Equipment", src: "/src/assets/clinicimages/HD/clinic-011-equipment.webp" },
  { id: 12, title: "Procedure Detail", category: "Treatment", src: "/src/assets/clinicimages/HD/clinic-012-procedure-detail.webp" },
];

function GalleryCard({ image, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onClick={() => onOpen(image)}
    >
      <div className="aspect-square bg-gray-200 overflow-hidden rounded-lg">
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <Search className="text-white" size={32} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-sm font-medium">
        {image.title}
      </div>
    </motion.div>
  );
}

function FilterPill({ label, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
        isActive
          ? "bg-[#C4614A] text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );
}

function Lightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl mx-auto p-4"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg font-medium">{image.title}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ClinicGallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return CLINIC_IMAGES;
    return CLINIC_IMAGES.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Clinic
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our state-of-the-art facilities designed for your comfort and care
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {FILTERS.map((filter) => (
            <FilterPill
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <GalleryCard
                key={img.id}
                image={img}
                index={i}
                onOpen={setSelectedImage}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
