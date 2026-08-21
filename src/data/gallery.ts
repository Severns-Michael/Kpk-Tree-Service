import type { GalleryImage } from '@/types';
import work1 from '@/assets/gallery/work-1.webp';
import work2 from '@/assets/gallery/work-2.webp';
import work3 from '@/assets/gallery/work-3.webp';
import work4 from '@/assets/gallery/work-4.webp';
import work5 from '@/assets/gallery/work-5.webp';

export const galleryImages: GalleryImage[] = [
  {
    id: 'crew-stump',
    src: work3,
    alt: 'The KPK Tree Service crew standing on the stump of a massive tree they removed in Mansfield, Ohio',
    caption: 'The KPK crew after taking down a giant',
    width: 1200,
    height: 1600,
  },
  {
    id: 'trunk-sectioning',
    src: work1,
    alt: 'KPK Tree Service crew member cutting a large tree trunk into sections during a backyard tree removal',
    caption: 'Sectioning a large trunk during a backyard removal',
    width: 1200,
    height: 1600,
  },
  {
    id: 'bucket-lift',
    src: work5,
    alt: 'KPK Tree Service using a bucket lift to remove a large tree next to a house',
    caption: 'Bucket lift work on a big removal near a home',
    width: 1200,
    height: 1600,
  },
  {
    id: 'pine-limbing',
    src: work4,
    alt: 'Tall pine tree limbed and prepared for safe sectional removal near power lines',
    caption: 'Limbing a tall pine for a safe takedown near lines',
    width: 1200,
    height: 1600,
  },
  {
    id: 'land-clearing',
    src: work2,
    alt: 'Large felled tree cut into sections during land clearing on a rural Ohio property',
    caption: 'Big removal on open rural land',
    width: 1200,
    height: 1600,
  },
];
