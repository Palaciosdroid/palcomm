// Content-Schema der Website.
//
// Alles hier ist im Admin-Bereich änderbar. Was NICHT hier steht (Layout,
// Reihenfolge der Sektionen, Abstände), ist bewusst festgelegt — so kann beim
// Bearbeiten nichts am Aufbau der Seite kaputtgehen.

import type { ThemeSelection } from "@/lib/theme";

export interface BusinessInfo {
  /** Kurzer Name, z. B. für Header und Footer */
  name: string;
  /** Was gemacht wird, ein bis zwei Wörter */
  tagline: string;
  /** Name der Inhaber/in */
  fullName: string;
  subtitle: string;
  phone: string;
  email: string;
  website: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface HeroContent {
  title: string;
  description: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface WelcomeContent {
  title: string;
  intro: string;
  aboutTitle: string;
  aboutText: string;
  image: string;
  quote: string;
  /** Text neben dem Regenbogen-Badge, falls in der Site-Config aktiviert */
  inclusivityText: string;
}

export interface PhilosophyContent {
  title: string;
  text: string;
  ctaText: string;
  ctaLink: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export interface TargetGroup {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface ServiceTopic {
  id: string;
  title: string;
  /** Name eines lucide-react Icons, z. B. "sun" oder "heart-pulse" */
  icon: string;
  description: string;
}

export interface ServicesContent {
  title: string;
  intro: string;
  targetGroupsTitle: string;
  targetGroups: TargetGroup[];
  topicsTitle: string;
  topics: ServiceTopic[];
}

export interface ImpressionImage {
  id: string;
  image: string;
  alt: string;
}

export interface ImpressionsContent {
  title: string;
  subtitle: string;
  images: ImpressionImage[];
}

export interface Certificate {
  id: number;
  title: string;
  image: string;
}

export interface CertificatesContent {
  title: string;
  certificates: Certificate[];
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
  rating: number;
}

export interface TestimonialsContent {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export interface PricingContent {
  title: string;
  freeConsultation: {
    title: string;
    subtitle: string;
    phone: string;
    buttonText: string;
  };
  hourlyRate: string;
  firstSession: {
    title: string;
    duration: string;
  };
  followUpSession: {
    title: string;
    duration: string;
  };
  discount: {
    title: string;
    description: string;
  };
  payment: {
    title: string;
    methods: string[];
  };
  houseVisits: {
    title: string;
    cost: string;
  };
  cancellation: {
    title: string;
    text: string;
  };
  insurance: {
    title: string;
    text: string;
  };
  ctaText: string;
  ctaLink: string;
}

export interface DisclaimerItem {
  title: string;
  text: string;
}

export interface DisclaimerContent {
  title: string;
  items: DisclaimerItem[];
}

export interface ContactContent {
  title: string;
  fields: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  };
  submitText: string;
  privacyText: string;
  successTitle: string;
  successMessage: string;
}

export interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

export interface FooterContent {
  copyright: string;
  email: string;
  links: FooterLink[];
  socialLinks: {
    name: string;
    href: string;
    icon: string;
  }[];
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
}

/** Gesamter Website-Content */
export interface SiteContent {
  /** Palette und Schrift — das Einzige am Design, was im Admin änderbar ist */
  theme: ThemeSelection;
  seo: SeoContent;
  business: BusinessInfo;
  navigation: NavigationItem[];
  hero: HeroContent;
  welcome: WelcomeContent;
  philosophy: PhilosophyContent;
  services: ServicesContent;
  impressions: ImpressionsContent;
  certificates: CertificatesContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  disclaimer: DisclaimerContent;
  contact: ContactContent;
  footer: FooterContent;
}

export type SectionKey = keyof SiteContent;
