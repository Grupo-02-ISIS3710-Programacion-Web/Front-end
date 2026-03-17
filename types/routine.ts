import { SkinType } from "@/types/product";

export interface RoutineStep {
  id: string;
  name: string;
  order: number;
  product: string;
  notes: string;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  type: string;
  skinType: SkinType;
  steps: RoutineStep[];
}