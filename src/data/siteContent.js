// ─── Edit this file to customize all text, links, and images ───
import heroImg from "../assets/hero-backorund-up.jpg"
import whyChooseMainImg from "../assets/whychooseusen.png"
import whyChooseSecondaryImg from "../assets/replace.jpg"
import whyChooseTertiaryImg from "../assets/thirdimage.png"
import aboutMainImg from "../assets/ourstory.png"
import aboutSecondaryImg from "../assets/antiaging.jpg"
import laser2Img from "../assets/laser2.png"
import videocardImg from "../assets/videocardimage.jpg"
import whatWeImg1 from "../assets/what-we-item-image-1-royal.jpg"
import whatWeImg2 from "../assets/what-we-item-image-1-royal (1).jpg"
// ─── Service section images ───
import svc1Img from "../assets/serviceimages/first.png"
import svc2Img from "../assets/serviceimages/second.png"
import svc3Img from "../assets/serviceimages/third.png"
import svc4Img from "../assets/serviceimages/fourth.png"
import svc5Img from "../assets/serviceimages/fifth.png"
import whatWeImg3 from "../assets/what-we-item-image-1-royal (2).jpg"
import whatWeImg4 from "../assets/what-we-item-image-1-royal (3).jpg"
import whatWeImg5 from "../assets/what-we-item-image-1-royal (4).jpg"
import asian1 from "../assets/asian1.jpg"
import asian2 from "../assets/asian2.jpg"
import asian3 from "../assets/asian3.jpg"

export const siteContent = {
  brand: { name: "Novaderm" },

  topBar: {
    message: "Experience Medical-Grade Skin Transformation at Novaderm",
    ctaText: "Reserve Your Consultation",
    ctaHref: "#contact",
    links: [
      { label: "Help",    href: "#contact" },
      { label: "Support", href: "#contact" },
      { label: "Contact", href: "#contact" },
    ],
    social: [
      { label: "X",         href: "#",                                                                icon: "x"         },
      { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61592414917780",           icon: "facebook"  },
      { label: "Instagram", href: "https://www.instagram.com/novaderm42026/",                         icon: "instagram" },
    ],
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
    badge: "Why Choose Novaderm",
    headline: "Where Clinical Precision Meets Luxurious Care",
    description:
      "At Novaderm, every detail is intentional — from our board-certified specialists and FDA-cleared technology to our bespoke treatment protocols. We don't offer cookie-cutter solutions; we craft results designed exclusively around your skin.",

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
    description: "Every treatment at Novaderm is performed under clinical supervision, using evidence-based protocols tailored to your skin's unique biology.",
    ctaText:     "Explore All Treatments",
    ctaHref:     "#services",

    cards: [
      {
        badge:       "Acne & Scarring",
        title:       "Advanced Acne & Scar Revision",
        description: "A multi-modality approach — combining medical-grade peels, targeted topicals, and laser resurfacing — to eliminate active breakouts and visibly reduce post-acne scarring, pigmentation, and textural irregularities.",
        image:       svc1Img,
        href:        "#contact",
        icon:        "acne",
      },
      {
        badge:       "Laser Precision",
        title:       "Laser Hair Removal",
        description: "Powered by industry-leading diode and Nd:YAG technology, our laser hair removal delivers permanent reduction across all skin tones — with clinical precision, minimal discomfort, and zero downtime.",
        image:       svc2Img,
        href:        "#contact",
        icon:        "laser",
      },
      {
        badge:       "Age Reversal",
        title:       "Anti-Aging & Skin Rejuvenation",
        description: "From dermal fillers and bio-stimulators to RF microneedling and collagen-induction therapy — our anti-aging suite restores lost volume, softens deep lines, and renews your skin's structural foundation.",
        image:       svc3Img,
        href:        "#contact",
        icon:        "aging",
      },
      {
        badge:       "Radiance Therapy",
        title:       "Pigmentation Correction & Glow Treatments",
        description: "Clinically formulated chemical peels, IPL phototherapy, and brightening infusion protocols work synergistically to dissolve stubborn melasma, sun damage, and uneven tone — revealing luminous, even skin.",
        image:       svc4Img,
        href:        "#contact",
        icon:        "glow",
      },
      {
        badge:       "Hair Restoration",
        title:       "PRP Hair Restoration Therapy",
        description: "Autologous platelet-rich plasma is extracted, concentrated, and precisely injected into thinning zones to reactivate dormant follicles, dramatically reduce shedding, and stimulate measurable regrowth.",
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
      "Novaderm was founded on a single conviction: that exceptional skin outcomes require both clinical mastery and a deeply personal approach. Over twelve years, we have combined medical rigour with luxury-level care to build a clinic our patients return to — not because they have to, but because they choose to.",

    features: [
      { icon: "treatment",  title: "Evidence-Based Treatment Protocols"  },
      { icon: "health",     title: "Long-Term Skin Health Philosophy"     },
      { icon: "certified",  title: "Internationally Certified Physicians" },
      { icon: "technology", title: "FDA-Cleared Clinical Technology"      },
    ],

    stats: [
      { label: "Treatment Success Rate", value: 98 },
      { label: "Patient Satisfaction",   value: 96 },
      { label: "Client Retention Rate",  value: 91 },
    ],

    reviewScore: "4.9",
    reviewLabel: "Verified by 5,000+ Patient Reviews",
    ctaText:     "Discover Our Story",
    ctaHref:     "#about",

    images: {
      main:      aboutMainImg,
      secondary: aboutSecondaryImg,
    },

    bgImage:     heroImg,
    experience:  { years: "12+", label: "Years of Clinical Excellence" },
    specialists: { count: "45+", label: "Certified Specialists"        },

    counters: [
      { value: 3500, suffix: "+", label: "Patients Transformed",       icon: "patients"    },
      { value: 12,   suffix: "+", label: "Years of Clinical Excellence",icon: "experience"  },
      { value: 45,   suffix: "+", label: "Certified Specialists",       icon: "specialists" },
      { value: 98,   suffix: "%", label: "Treatment Success Rate",      icon: "rating"      },
    ],
  },

  // ─── WHAT WE DO ─────────────────────────────────────────────
  whatWeDo: {
    badge:    "Our Expertise",
    headline: "Precision Aesthetics Backed by Over a Decade of Clinical Mastery",
    stat: {
      value:       "8,500+",
      label:       "Laser Procedures Performed",
      description: "A decade of laser excellence — each session delivered by certified physicians using calibrated, medical-grade technology for consistently superior outcomes.",
      image:       laser2Img,
    },
    centerCard: {
      image:  videocardImg,
      quote:  "Confidence isn't given — it's carefully restored. At Novaderm, every treatment is a step toward the skin you deserve.",
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
      rating:   "4.9/5",
    },

    slides: [
      {
        image:       heroImg,
        badge:       "Trusted Skin Care Clinic",
        tag:         "Advanced Skin Treatments",
        headline:    "Get the Skin You Always Wanted.",
        description: "Expert skin treatments done by certified doctors. Safe, effective, and made just for you.",
        primaryCta:   { text: "See Our Treatments", href: "#services" },
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

    avatars: [
      asian1,
      asian2,
      asian3,
    ],
  },
}
