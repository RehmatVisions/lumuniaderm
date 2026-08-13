import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ======================================================
// CLINIC IMAGES
// ======================================================

import clinic003 from "../../assets/clinicimages/HD/clinic-002-reception.webp";
import clinic008 from "../../assets/clinicimages/HD/clinic-003-reception-detail.webp";
import clinic010 from "../../assets/clinicimages/HD/clinic-008-interior.webp";

import backgroundImg from "../../assets/backgroundall/bacrkound.webp";

// ======================================================
// GALLERY DATA
// ======================================================

const SHOWCASE_IMAGES = [
  {
    id: 1,
    title: "Reception",
    src: clinic003,
  },
  {
    id: 2,
    title: "Seating Lounge",
    src: clinic008,
  },
  {
    id: 3,
    title: "Procedure Room",
    src: clinic010,
  },
];

const EASE_EXPO = [0.16, 1, 0.3, 1];

// ======================================================
// PREMIUM GALLERY CARD
// ======================================================

function GalleryCard({ image, index, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleClick = () => {
    onOpen(index);
  };

  return (
    <motion.article
      className="group relative h-full w-full cursor-pointer overflow-hidden"
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: EASE_EXPO,
      }}
      onClick={handleClick}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      tabIndex={0}
      role="button"
      aria-label={`View ${image.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        borderRadius: 24,
        background: "#eee4dd",
        minHeight: "100%",
      }}
    >
      {/* ==================================================
          IMAGE LOADING PLACEHOLDER
      ================================================== */}

      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "linear-gradient(110deg,#e9ddd5 8%,#f7f1ec 18%,#e9ddd5 33%)",
            backgroundSize: "200% 100%",
          }}
        />
      )}

      {/* ==================================================
          IMAGE
      ================================================== */}

      <motion.img
        src={image.src}
        alt={image.title}
        loading={index < 2 ? "eager" : "lazy"}
        decoding="async"
        onLoad={onLoad}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        animate={{
          scale: active ? 1.035 : 1,
        }}
        transition={{
          duration: 0.8,
          ease: EASE_EXPO,
        }}
        style={{
          opacity: loaded ? 1 : 0,
        }}
      />

      {/* ==================================================
          HOVER / TAP CONTENT
      ================================================== */}

      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between gap-4 p-5 sm:p-6"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 8,
            }}
            transition={{
              duration: 0.25,
              ease: EASE_EXPO,
            }}
          >
            {/* WHITE TITLE */}

            <motion.h3
              className="text-base font-semibold tracking-tight text-white sm:text-lg"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              {image.title}
            </motion.h3>

            {/* SMALL ARROW */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.25,
                delay: 0.04,
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "rgba(255,255,255,0.92)",
              }}
            >
              <ArrowUpRight
                size={17}
                strokeWidth={2}
                style={{
                  color: "#a34b37",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

// ======================================================
// LIGHTBOX
// ======================================================

function Lightbox({
  image,
  allImages,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}) {
  if (!image) return null;

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center p-4 sm:p-8"
          style={{
            background: "rgba(12,8,6,0.94)",
            backdropFilter: "blur(10px)",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={onClose}
        >
          {/* ==================================================
              CLOSE BUTTON
          ================================================== */}

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:bg-white/20"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff",
            }}
            aria-label="Close gallery"
          >
            <X size={21} />
          </button>

          {/* ==================================================
              IMAGE COUNTER
          ================================================== */}

          <div
            className="absolute left-5 top-6 z-30 text-xs font-medium tracking-[0.2em]"
            style={{
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(allImages.length).padStart(2, "0")}
          </div>

          {/* ==================================================
              PREVIOUS BUTTON
          ================================================== */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-3 z-30 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 sm:left-6"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff",
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>

          {/* ==================================================
              LIGHTBOX IMAGE
          ================================================== */}

          <motion.div
            className="relative flex max-h-[86vh] max-w-[88vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              ease: EASE_EXPO,
            }}
          >
            <img
              key={image.id}
              src={image.src}
              alt={image.title}
              className="max-h-[82vh] max-w-[86vw] rounded-2xl object-contain"
              draggable={false}
              loading="eager"
            />
          </motion.div>

          {/* ==================================================
              NEXT BUTTON
          ================================================== */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-3 z-30 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 sm:right-6"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff",
            }}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ======================================================
// MAIN CLINIC GALLERY
// ======================================================

export default function ClinicGallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const navigate = useNavigate();

  // ======================================================
  // LIGHTBOX CONTROLS
  // ======================================================

  const openLightbox = (index) => {
    setSelectedIdx(index);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const prevPhoto = () => {
    setSelectedIdx(
      (current) =>
        (current - 1 + SHOWCASE_IMAGES.length) %
        SHOWCASE_IMAGES.length
    );
  };

  const nextPhoto = () => {
    setSelectedIdx(
      (current) =>
        (current + 1) % SHOWCASE_IMAGES.length
    );
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden px-4 py-24 sm:px-8 lg:px-12 lg:py-32"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f7f1eb",
      }}
    >
      {/* ==================================================
          BACKGROUND OVERLAY
          LIGHT SO BACKGROUND IMAGE REMAINS VISIBLE
      ================================================== */}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(247,241,235,0.48))",
        }}
      />

      {/* ==================================================
          SUBTLE DECORATIVE LIGHT
      ================================================== */}

      <div
        className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(196,97,74,0.08) 0%, transparent 68%)",
          filter: "blur(25px)",
        }}
      />

      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(181,139,104,0.08) 0%, transparent 68%)",
          filter: "blur(25px)",
        }}
      />

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="relative mx-auto max-w-[1440px]">

        {/* ==================================================
            SECTION HEADER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            ease: EASE_EXPO,
          }}
          className="mb-16 text-center sm:mb-20"
        >
          {/* EYEBROW */}

          <div
            className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full px-4 py-2"
            style={{
              background: "rgba(196,97,74,0.07)",
              border:
                "1px solid rgba(196,97,74,0.13)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "#C4614A",
              }}
            />

            <span
              className="text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{
                color: "#a64d39",
              }}
            >
              Inside Nova Derm
            </span>

            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "#C4614A",
              }}
            />
          </div>

          {/* HEADING */}

          <h2
            className="mx-auto mb-6 max-w-[800px] font-bold leading-[1.08] tracking-[-0.035em]"
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 4.6rem)",
              color: "#1b100b",
              fontFamily:
                "'Nunito', system-ui, sans-serif",
            }}
          >
            A Space Designed
            <br />

            <span
              style={{
                background:
                  "linear-gradient(135deg,#C4614A 0%,#9d402d 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Around You
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="mx-auto max-w-[650px] leading-[1.85]"
            style={{
              color: "#5d4436",
              fontSize:
                "clamp(0.94rem,1.1vw,1.06rem)",
              fontFamily:
                "'Nunito', system-ui, sans-serif",
            }}
          >
            Step inside a thoughtfully designed
            environment where clinical precision
            meets warmth, privacy and refined
            comfort.
          </p>
        </motion.div>

        {/* ==================================================
            GALLERY
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 0.8,
          }}
        >
          {/* ==================================================
              DESKTOP BENTO
          ================================================== */}

          <div className="hidden gap-5 lg:grid lg:grid-cols-12 lg:grid-rows-[360px_360px]">

            {/* 01 - RECEPTION */}

            <div className="col-span-7 row-span-2">
              <GalleryCard
                image={SHOWCASE_IMAGES[0]}
                index={0}
                onOpen={openLightbox}
              />
            </div>

            {/* 02 - SEATING */}

            <div className="col-span-5">
              <GalleryCard
                image={SHOWCASE_IMAGES[1]}
                index={1}
                onOpen={openLightbox}
              />
            </div>

            {/* 03 - PROCEDURE */}

            <div className="col-span-5">
              <GalleryCard
                image={SHOWCASE_IMAGES[2]}
                index={2}
                onOpen={openLightbox}
              />
            </div>
          </div>

          {/* ==================================================
              TABLET
          ================================================== */}

          <div className="hidden grid-cols-2 gap-5 md:grid lg:hidden">
            {SHOWCASE_IMAGES.map((image, index) => (
              <div
                key={image.id}
                className="aspect-[4/3]"
              >
                <GalleryCard
                  image={image}
                  index={index}
                  onOpen={openLightbox}
                />
              </div>
            ))}
          </div>

          {/* ==================================================
              MOBILE
          ================================================== */}

          <div className="grid gap-4 md:hidden">
            {SHOWCASE_IMAGES.map((image, index) => (
              <motion.div
                key={image.id}
                className="aspect-[4/3]"
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.06,
                  ease: EASE_EXPO,
                }}
              >
                <GalleryCard
                  image={image}
                  index={index}
                  onOpen={openLightbox}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ==================================================
            CTA
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: EASE_EXPO,
          }}
          className="mt-14 flex flex-col items-center gap-4 sm:mt-16"
        >
          <motion.button
            onClick={() => navigate("/gallery")}
            className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white"
            style={{
              background:
                "linear-gradient(135deg,#C4614A 0%,#9f402d 100%)",
              boxShadow:
                "0 14px 35px rgba(159,64,45,0.22)",
            }}
            whileHover={{
              scale: 1.04,
              boxShadow:
                "0 18px 45px rgba(159,64,45,0.30)",
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            Explore Full Gallery

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </motion.button>

          <p
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{
              color: "#80685a",
            }}
          >
            3 Curated Spaces • Full HD
          </p>
        </motion.div>
      </div>

      {/* ==================================================
          LIGHTBOX
      ================================================== */}

      <Lightbox
        image={
          selectedIdx !== null
            ? SHOWCASE_IMAGES[selectedIdx]
            : null
        }
        allImages={SHOWCASE_IMAGES}
        selectedIndex={selectedIdx ?? 0}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </section>
  );
}