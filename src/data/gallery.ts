import source from '../../data/inhoud_2026.json';
import { publishedPhotos } from './publication.mjs';
export interface GalleryPhoto {
  src: string;
  year: number;
  alt: string;
  credit: string;
  permissionReceived: boolean;
  permissionEvidence: string;
  publish: boolean;
  objectPosition?: string;
  variants?: { src: string; width: number }[];
}
export const gallery: GalleryPhoto[] = source.images.galleryPreviousYears;
export const visiblePhotos = publishedPhotos(gallery) as GalleryPhoto[];
