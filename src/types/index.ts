export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CompanyInfo {
  name: string;
  phone: string;
  phoneFormatted: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  email: string;
  tagline: string;
  description: string;
  facebookUrl: string;
}
