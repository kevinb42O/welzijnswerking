import template from '../../data/sponsors_2026.template.json';
import { publishedSponsors } from './publication.mjs';
export interface Sponsor {
  id: string;
  name: string;
  tier: 'main' | 'partner' | 'support' | 'in_kind';
  description?: string;
  website?: string;
  logo: string;
  logoAlt: string;
  confirmedFor2026: boolean;
  verified: boolean;
  logoUsageApproved: boolean;
  displayOrder: number;
}
// Vul uitsluitend confirmedSponsors in data/sponsors_2026.template.json aan.
export const sponsors: Sponsor[] = template.confirmedSponsors as Sponsor[];
export const visibleSponsors = publishedSponsors(sponsors) as Sponsor[];
export const tiers = [
  { key: 'main', label: 'Hoofdpartners' },
  { key: 'partner', label: 'Partners' },
  { key: 'support', label: 'Steunende partners' },
  { key: 'in_kind', label: 'Met dank aan' },
];
