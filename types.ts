
// Fix: Import React to resolve React namespace error
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  loc?: string;
  content: string;
  stars: number;
  avatar?: string;
}

export interface BeforeAfterImage {
  id: number;
  before: string;
  after: string;
  caption: string;
}
