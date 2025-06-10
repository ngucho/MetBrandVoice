// types/index.d.ts

export interface SectionOptions {
  id?: string;
  title: string;
  content: string | HTMLElement | HTMLElement[];
}

export interface CardOptions {
  title: string;
  content: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
