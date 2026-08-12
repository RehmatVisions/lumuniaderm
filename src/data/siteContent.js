// ─── Edit this file to customize all text, links, and images ───
import heroImg from "../assets/hero-backorund-up.jpg"
import whyChooseMainImg from "../assets/whychooseuse.png"
import whyChooseSecondaryImg from "../assets/replace.jpg"
import whyChooseTertiaryImg from "../assets/thirdimage.png"
import aboutMainImg from "../assets/ourstory.png"
import aboutSecondaryImg from "../assets/antiaging.png"
import laser2Img from "../assets/laser2.png"
import videocardImg from "../assets/videocardimage.png"
import whatWeImg1 from "../assets/what-we-item-image-1-royal.jpg"
import whatWeImg2 from "../assets/what-we-item-image-1-royal.jpg"
// ─── Service section images ───
import svc1Img from "../assets/serviceimages/first.png"
import svc2Img from "../assets/serviceimages/second.png"
import svc3Img from "../assets/serviceimages/third.png"
import svc4Img from "../assets/serviceimages/fourth.png"
import svc5Img from "../assets/serviceimages/fifth.png"
import whatWeImg3 from "../assets/what-we-item-image-1-royal.jpg"
import whatWeImg4 from "../assets/what-we-item-image-1-royal.jpg"
import whatWeImg5 from "../assets/what-we-item-image-1-royal.jpg"

export const siteContent = {
  brand: { name: "Auroraderm" },

  topBar: {
    message: "Experience Medical-Grade Skin Transformation at Auroraderm",
    ctaText: "Reserve Your Consultation",
    ctaHref: "#contact",
    links: [
      { label: "Help",    href: "#contact" },
      { label: "Support", href: "#contact" },
      { label: "Contact", href: "#contact" },
    ],
    social: [],
  },

  nav: {
    links: [
      { label: "Home",       href: "#"                            },
      { label: "About Us",   href: "#about"                       },
      { label: "Services",   href: "#services"                    },
      { label: "Why Us",     href: "#why-us"                      },
      { label: "Gallery",    href: "#gallery"                     },
      { label: "Contact Us", href: "#contact"                     },
    ],
    ctaText: "Book An Appointment",
    ctaHref: "#contact",
  },

  // ─── WHY CHOOSE US ───────────────────────────────────────────
  whyUs: {
    badge: "Why Choose Auroraderm",
    headline: "Where Clinical Precision Meets Luxurious Care",
    description:
      "At Auroraderm, every detail is designed with your skin in mind — from our expert specialists and advanced technology to our personalized treatment plans. We don’t believe in one-size-fits-all solutions; we create customized care plans to deliver natural, beautiful results that are unique to you.",

    images: {
      main:      whyChooseMainImg,
      secondary: whyChooseSecondaryImg,
      tertiary:  whyChooseTertiaryImg,
    },

    ctaText: "Book Your Consultation",
    ctaHref: "#contact",

    accordion: [
      {
        number: "01",
        title:  "Board-Certified Specialists You Can Trust",
        body:   "Our dermatologists and aesthetic physicians hold international certifications and bring over a decade of combined clinical experience. Every procedure is performed by a qualified medical professional — never delegated to unsupervised staff.",
      },
      {
        number: "02",
        title:  "FDA-Cleared Technology, Clinically Proven Results",
        body:   "We invest exclusively in gold-standard equipment — from fractional laser platforms to medical-grade PRP systems — so your results are measurable, safe, and built to last well beyond your treatment course.",
      },
      {
        number: "03",
        title:  "Your Skin Is One of a Kind — Your Plan Should Be Too",
        body:   "We begin with a comprehensive skin analysis before recommending a single treatment. Your personalised protocol accounts for your Fitzpatrick skin type, lifestyle, hormonal factors, and long-term goals — because real results require real precision.",
      },
      {
        number: "04",
        title:  "Transparent, Evidence-Based Care With Zero Pressure",
        body:   "We follow strict clinical protocols and present honest expectations — including realistic timelines and likely number of sessions. Our consultations are educational, not sales-driven, so you leave with clarity and confidence.",
      },
    ],
  },

  // ─── SERVICES ────────────────────────────────────────────────
  services: {
    badge:       "Signature Treatments",
    headline:    "Medical Aesthetics Crafted for Visible Transformation",
    description: "Every treatment at Auroraderm is performed under clinical supervision, using evidence-based protocols tailored to your skin's unique biology.",
    ctaText:     "GET STARTED",
    ctaHref:     "#services",

    cards: [
      {
        badge:       "Acne & Scarring",
        title:       "Advanced Acne & Scar Revision",
        description: "Clear active acne and improve the appearance of old acne marks and scars with safe medical peels and advanced laser treatments for smoother, healthier-looking skin.",
        image:       svc1Img,
        href:        "#contact",
        icon:        "acne",
      },
      {
        badge:       "Laser Precision",
        title:       "Laser Hair Removal",
        description: "Get rid of unwanted facial and body hair with advanced laser technology, offering a comfortable, effective, and long-lasting hair reduction experience.",
        image:       svc2Img,
        href:        "#contact",
        icon:        "laser",
      },
      {
        badge:       "Age Reversal",
        title:       "Anti-Aging & Skin Rejuvenation",
        description: "Reduce wrinkles and signs of aging while restoring firm, fresh, and youthful-looking skin with expert doctor-led rejuvenation treatments.",
        image:       svc3Img,
        href:        "#contact",
        icon:        "aging",
      },
      {
        badge:       "Radiance Therapy",
        title:       "Pigmentation & Glow Treatments",
        description: "Treat melasma, dark spots, and sun damage to achieve a more even skin tone with customized treatments for a natural, radiant glow.",
        image:       svc4Img,
        href:        "#contact",
        icon:        "glow",
      },
      {
        badge:       "Hair Restoration",
        title:       "PRP Hair Restoration Therapy",
        description: "Reduce hair fall and support natural hair growth with doctor-guided PRP therapy that strengthens weak hair roots and improves hair health.",
        image:       svc5Img,
        href:        "#contact",
        icon:        "hair",
      },
    ],
  },

  // ─── ABOUT ───────────────────────────────────────────────────
  about: {
    badge:       "Our Story",
    headline:    "Real Results. Trusted Care. Designed Around You.",
    description:
      "Auroraderm was built on one belief: exceptional skin results come from expert dermatology and a personalized approach. For over 8+ years, we have delivered premium care in a trusted clinic where patients experience confidence, comfort, and results they love.",

    features: [
      { icon: "treatment",  title: "Evidence-Based Treatment Protocols"  },
      { icon: "health",     title: "Long-Term Skin Health Philosophy"     },
      { icon: "certified",  title: "Internationally Certified Physicians" },
      { icon: "technology", title: "FDA-Cleared Clinical Technology"      },
    ],

    stats: [
      { label: "Treatment Success Rate", value: 94 },
      { label: "Patient Satisfaction",   value: 94 },
      { label: "Client Retention Rate",  value: 88 },
    ],

    reviewScore: "4.7",
    reviewLabel: "Verified by 3,570+ Patient Reviews",
    ctaText:     "Discover Our Story",
    ctaHref:     "#about",

    images: {
      main:      aboutMainImg,
      secondary: aboutSecondaryImg,
    },

    bgImage:     heroImg,
    experience:  { years: "8+", label: "Years of Clinical Excellence" },
    specialists: { count: "12+", label: "Certified Specialists"        },

    counters: [
      { value: 3570, suffix: "+", label: "Patients Transformed",        icon: "patients"    },
      { value: 8,    suffix: "+", label: "Years of Clinical Excellence", icon: "experience"  },
      { value: 12,   suffix: "+", label: "Certified Specialists",        icon: "specialists" },
      { value: 94,   suffix: "%", label: "Treatment Success Rate",       icon: "rating"      },
    ],
  },

  // ─── WHAT WE DO ─────────────────────────────────────────────
  whatWeDo: {
    badge:    "Our Expertise",
    headline: "Precision Aesthetics Backed by Over a Decade of Clinical Mastery",
    stat: {
      value:       "",
      label:       "",
      description: "A decade of laser excellence — each session delivered by certified physicians using calibrated, medical-grade technology for consistently superior outcomes.",
      image:       laser2Img,
    },
    centerCard: {
      image:  videocardImg,
      quote:  "Confidence isn't given — it's carefully restored. At Auroraderm, every treatment is a step toward the skin you deserve.",
      author: "Dr. Sarah Al-Rashid",
      role:   "Founder & Lead Dermatologist",
    },
    contactCard: {
      title:       "Begin Your Transformation",
      description: "Our specialists are ready to design a personalised treatment plan for you.",
      phone:       "+(123) 456-789",
      avatar:      whatWeImg3,
    },
    images: [whatWeImg1, whatWeImg2, whatWeImg4, whatWeImg5],
  },

  // ─── HERO ────────────────────────────────────────────────────
  hero: {
    stats: {
      patients: "3,500+ Happy Patients",
      rating:   "4.7/5",
    },

    slides: [
      {
        image:       heroImg,
        badge:       "Trusted Skin Care Clinic",
        tag:         "Advanced Skin Treatments",
        headline:    "Get the Skin You Always Deserve.",
description: "Advanced skin care in Dubai by certified doctors. Safe, effective, and built for you",
        primaryCta:   { text: "Our Treatments", href: "#services" },
        secondaryCta: { text: "View Results",       href: "#transformations" },
      },
      {
        image:       heroImg,
        badge:       "Laser Hair Removal",
        tag:         "Laser Treatments",
        headline:    "Smooth Skin. No More Unwanted Hair.",
        description: "Advanced laser technology for permanent hair removal. Works on all skin types. Quick and painless.",
        primaryCta:   { text: "Book Laser Session", href: "#contact"  },
        secondaryCta: { text: "Before & After",     href: "#transformations" },
      },
      {
        image:       heroImg,
        badge:       "Free Skin Consultation",
        tag:         "Skin Analysis",
        headline:    "Not Sure What Your Skin Needs?",
        description: "Talk to our skin specialists. We will check your skin and create a plan that gives real results.",
        primaryCta:   { text: "Book Free Consultation", href: "#contact" },
        secondaryCta: { text: "Meet Our Doctors",       href: "#about"   },
      },
      {
        image:       heroImg,
        badge:       "Anti-Aging Treatments",
        tag:         "Look Younger, Feel Better",
        headline:    "Look Younger. Feel Confident Again.",
        description: "Fillers, PRP, and skin boosters that remove wrinkles and bring back your glow — naturally and safely.",
        primaryCta:   { text: "Explore Anti-Aging",  href: "#services"        },
        secondaryCta: { text: "See Transformations", href: "#transformations"  },
      },
    ],
  },
}
