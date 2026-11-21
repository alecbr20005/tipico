export type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  priceCents: number | null;
  imageUrl: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  modelUrl: string | null;
  modelIosUrl: string | null;
};
