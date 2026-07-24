// ─── Edit this file to customize all text, links, and images ───
import heroImg from "../assets/hero-backround.jpg"
import antiAgingImg from "../assets/antiaging.jpg"
import laserImg from "../assets/laserimage.jpg"
import prpHairImg from "../assets/PRPHairTreatment.jpg"
import acneImg from "../assets/acenetreament.jpg"
import pigmentationImg from "../assets/pigmentationglowcard.jpg"
import whyChooseMainImg from "../assets/whychooseus.jpg"
import whyChooseSecondaryImg from "../assets/why-choose-image-2-royal.jpg"
import aboutMainImg from "../assets/post-1.jpg"
import aboutSecondaryImg from "../assets/antiaging.jpg"
import laser2Img from "../assets/laser2.jpg"
import whatWeImg1 from "../assets/what-we-item-image-1-royal.jpg"
import whatWeImg2 from "../assets/what-we-item-image-1-royal (1).jpg"
import whatWeImg3 from "../assets/what-we-item-image-1-royal (2).jpg"
import whatWeImg4 from "../assets/what-we-item-image-1-royal (3).jpg"
import whatWeImg5 from "../assets/what-we-item-image-1-royal (4).jpg"

export const siteContent = {
  brand: { name: "Novaderm" },

  topBar: {
    message: "Ready to Transform Your Skin?",
    ctaText: "Consult Our Specialists Now",
    ctaHref: "#contact",
    links: [
      { label: "Help",    href: "#" },
      { label: "Support", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
    social: [
      { label: "X",         href: "#", icon: "x"         },
      { label: "Facebook",  href: "#", icon: "facebook"  },
      { label: "Instagram", href: "#", icon: "instagram" },
    ],
  },

  nav: {
    links: [
      { label: "Home",       href: "#",        hasDropdown: true  },
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
    badge: "Why Choose Us",
    headline: "Trusted expertise, advance care, and visible results",
    description:
      "Our experienced specialists focus on personalized care, advanced technology, and long-term skin health to ensure every patient achieves confident, glowing skin.",

    images: {
      main:      whyChooseMainImg,
      secondary: whyChooseSecondaryImg,
      tertiary:  acneImg,
    },

    ctaText: "Contact Us",
    ctaHref: "#contact",

    accordion: [
      {
        number: "01",
        title:  "Qualified & Experienced Specialists",
        body:   "Our team consists of board-certified dermatologists and cosmetologists with extensive experience treating a wide range of skin and hair concerns.",
      },
      {
        number: "02",
        title:  "Advanced Technology & Techniques",
        body:   "We invest in the latest clinical-grade equipment and stay current with evolving dermatological science to deliver results that last.",
      },
      {
        number: "03",
        title:  "Personalized Treatment Plans",
        body:   "No two skins are alike. Every patient receives a fully customised plan built around their unique concerns, lifestyle, and goals.",
      },
      {
        number: "04",
        title:  "Safe, Proven & Clinically Tested",
        body:   "All procedures follow evidence-based protocols with rigorous safety standards, ensuring minimal downtime and maximum effectiveness.",
      },
    ],
  },

  // ─── SERVICES ────────────────────────────────────────────────
  services: {
    badge:       "Our Services",
    headline:    "Advanced dermatology and personalized treatments",
    description: "We offer a comprehensive range of medical and cosmetic skin treatments tailored to your unique concerns.",
    ctaText:     "View All Services",
    ctaHref:     "#services",

    cards: [
      {
        badge:       "Scar Removal",
        title:       "Acne & Scar Treatment",
        description: "We provide targeted treatment to reduce active acne, control breakouts, and visibly fade post-acne scars.",
        image:       acneImg,
        href:        "#services",
        icon:        "acne",
      },
      {
        badge:       "Laser Therapy",
        title:       "Laser Hair Removal",
        description: "Using safe and modern laser systems, we offer long-lasting hair reduction for all skin types.",
        image:       laserImg,
        href:        "#services",
        icon:        "laser",
      },
      {
        badge:       "Wrinkle Reduction",
        title:       "Anti-Aging Solutions",
        description: "Our anti-aging treatments are designed to reduce fine lines, restore volume, and rejuvenate skin texture.",
        image:       antiAgingImg,
        href:        "#services",
        icon:        "aging",
      },
      {
        badge:       "Skin Brightening",
        title:       "Pigmentation & Glow",
        description: "Advanced peels and brightening therapies to even skin tone, tackle melasma and restore natural radiance.",
        image:       pigmentationImg,
        href:        "#services",
        icon:        "glow",
      },
      {
        badge:       "Hair Restoration",
        title:       "PRP Hair Treatment",
        description: "Platelet-rich plasma therapy to stimulate hair follicles, reduce hair loss and promote dense regrowth.",
        image:       prpHairImg,
        href:        "#services",
        icon:        "hair",
      },
    ],
  },

  // ─── ABOUT ───────────────────────────────────────────────────
  about: {
    badge:       "About Us",
    headline:    "Focused on delivering visible results with expert skin care",
    description: "Our expert team carefully evaluates each patient's skin & hair concerns to create personalized treatment plans using modern techniques and clinically proven methods.",

    features: [
      { icon: "treatment",  title: "Result Driven Treatment Approach" },
      { icon: "health",     title: "Focus on Long Term Skin Health"   },
      { icon: "certified",  title: "Board Certified Dermatologists"   },
      { icon: "technology", title: "Advanced Medical Technology"      },
    ],

    stats: [
      { label: "Treatment Effectiveness", value: 98 },
      { label: "Patient Satisfaction",    value: 95 },
      { label: "Repeat Visit Rate",       value: 89 },
    ],

    reviewScore: "4.9",
    reviewLabel: "More Than 5K+ Reviews",
    ctaText:     "More About Us",
    ctaHref:     "#about",

    images: {
      main:      aboutMainImg,
      secondary: aboutSecondaryImg,
    },

    bgImage:     heroImg,
    experience:  { years: "12+", label: "Years of Excellence" },
    specialists: { count: "45+", label: "Specialist Doctors"  },

    counters: [
      { value: 3500, suffix: "+", label: "Happy Patients",        icon: "patients"    },
      { value: 12,   suffix: "+", label: "Years of Excellence",   icon: "experience"  },
      { value: 45,   suffix: "+", label: "Specialist Doctors",    icon: "specialists" },
      { value: 98,   suffix: "%", label: "Treatment Effectiveness",icon: "rating"     },
    ],
  },

  // ─── WHAT WE DO ─────────────────────────────────────────────
  whatWeDo: {
    badge:    "What We Do",
    headline: "Combining clinical expertise with aesthetic excellence",
    stat: {
      value:       "8500+",
      label:       "Laser Treatments",
      description: "We have successfully perform thousands laser procedures",
      image:       laser2Img,
    },
    centerCard: {
      image:  whatWeImg2,
      quote:  "True faith shines brightest when it moves beyond words and touches the lives.",
      author: "Wade Warren",
      role:   "Co-Founder",
    },
    contactCard: {
      title:       "Contact Us",
      description: "We're here to help you achieve your skin goals.",
      phone:       "+(123) 456-789",
      avatar:      whatWeImg3,
    },
    // extra images for the animated collage background cells
    images: [whatWeImg1, whatWeImg2, whatWeImg4, whatWeImg5],
  },

  // ─── HERO ────────────────────────────────────────────────────
  hero: {
    stats: {
      patients: "3,500+ Happy Patients Treated",
      rating:   "4.9/5",
    },

    slides: [
      {
        image:       heroImg,
        badge:       "Art Of Advanced Skin Perfection",
        tag:         "Advanced Skin Treatments",
        headline:    "Personalized Dermatology & Beauty Solutions for Every Skin Type",
        description: "We help you achieve clearer, brighter, and more youthful-looking skin through customized treatment plans tailored to your unique needs.",
        primaryCta:   { text: "View Our Treatments", href: "#services" },
        secondaryCta: { text: "Watch Our Story",      href: "#"         },
      },
      {
        image:       heroImg,
        badge:       "Precision Laser Technology",
        tag:         "Laser & Aesthetic Procedures",
        headline:    "Next-Gen Laser Treatments for Flawless, Hair-Free Skin",
        description: "Our FDA-cleared laser systems deliver permanent hair reduction and skin resurfacing with zero downtime and visible results after just one session.",
        primaryCta:   { text: "Explore Laser Services", href: "#services" },
        secondaryCta: { text: "See Real Results",        href: "#"         },
      },
      {
        image:       heroImg,
        badge:       "Expert Dermatology Consultations",
        tag:         "Specialist Consultations",
        headline:    "Board-Certified Specialists Dedicated to Your Skin Health",
        description: "Every visit starts with a thorough skin analysis. Our dermatologists craft a science-backed plan targeting your exact concerns — from acne to ageing.",
        primaryCta:   { text: "Book a Consultation",  href: "#contact"  },
        secondaryCta: { text: "Meet Our Specialists",  href: "#about"    },
      },
      {
        image:       heroImg,
        badge:       "Premium Clinic Experience",
        tag:         "Anti-Aging & Rejuvenation",
        headline:    "Turn Back Time with Our Cutting-Edge Anti-Aging Solutions",
        description: "From Botox to PRP and skin boosters — our rejuvenation treatments restore volume, reduce wrinkles, and leave your skin looking years younger.",
        primaryCta:   { text: "Anti-Aging Treatments", href: "#services" },
        secondaryCta: { text: "Watch Transformations",  href: "#"         },
      },
    ],

    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    ],
  },
}
