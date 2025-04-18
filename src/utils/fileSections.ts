
import { Section } from '@/types/files';
import { Briefcase, Building2, Home, LayoutGrid } from 'lucide-react';

export const SECTIONS: Section[] = [
  {
    id: 'residential',
    name: 'Residential',
    icon: 'Home',
    color: 'residential',
    lightColor: 'residential.light',
    darkColor: 'residential.dark',
  },
  {
    id: 'commercial',
    name: 'Commercial',
    icon: 'Building2',
    color: 'commercial',
    lightColor: 'commercial.light',
    darkColor: 'commercial.dark',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: 'LayoutGrid',
    color: 'marketing',
    lightColor: 'marketing.light',
    darkColor: 'marketing.dark',
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: 'Briefcase',
    color: 'realestate',
    lightColor: 'realestate.light',
    darkColor: 'realestate.dark',
  },
];

export const getSectionById = (id: string): Section | undefined => {
  return SECTIONS.find((section) => section.id === id);
};
