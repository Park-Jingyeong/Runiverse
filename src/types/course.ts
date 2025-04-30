export interface Course {
  id: string;
  name: string;
  distance: number;
  region: [string, string, string];
  difficulty?: string;
  slope: number;
  pavement: number;
  complexity: number;
  toilet: number;
  parking: number;
  imageUrls: string[];
}
