import { Product, Category, SkinType } from "@/types/product";

export interface RoutineStep {
  id: string;
  order: number;
  product: Product;
  notes?: string;
}

export interface Routine {
  id: string;
  name: string;
  description:String;  
  type:String;
  steps: RoutineStep[];

}