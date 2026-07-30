// Content Types für das CMS

export interface PracticeInfo {
  name: string;
  tagline: string;
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

export interface TherapyTopic {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface TherapyContent {
  title: string;
  intro: string;
  targetGroupsTitle: string;
  targetGroups: TargetGroup[];
  topicsTitle: string;
  topics: TherapyTopic[];
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

// Gesamter Website-Content
export interface SiteContent {
  practiceInfo: PracticeInfo;
  navigation: NavigationItem[];
  hero: HeroContent;
  welcome: WelcomeContent;
  philosophy: PhilosophyContent;
  therapy: TherapyContent;
  certificates: CertificatesContent;
  testimonials: TestimonialsContent;
  pricing: PricingContent;
  disclaimer: DisclaimerContent;
  contact: ContactContent;
  footer: FooterContent;
}

// Section Keys für einfachen Zugriff
export type SectionKey = keyof SiteContent;
