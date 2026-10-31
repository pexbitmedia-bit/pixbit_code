export type NavItem = {
  id: string;
  label: string;
};

export type ServiceIconName = 'linkedin' | 'site' | 'press' | 'video' | 'pen' | 'mark';

export type SocialName = 'LinkedIn' | 'Instagram' | 'YouTube' | 'X';

export type ServiceLink = {
  slug: string;
  title: string;
};

export type ServiceGroup = {
  label: string;
  items: ServiceLink[];
};

export type Service = {
  id: string;
  icon: ServiceIconName;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  groups: ServiceGroup[];
  featured?: boolean;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type Principle = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactField = 'name' | 'email' | 'phone' | 'message';

export type ContactResponse = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};
