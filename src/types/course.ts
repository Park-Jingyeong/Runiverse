export interface Course {
  id: string;
  name: string;
  distance: number;
  location?: string;
  difficulty?: string;
  slope: number;
  pavement: number;
  complexity: number;
  toilet: number;
  parking: number;
  imageUrl: string;
}
