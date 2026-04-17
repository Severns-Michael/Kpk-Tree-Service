import type { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'testimonials', label: 'Reviews', href: '#testimonials' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
