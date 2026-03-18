import { Category } from "@/types/product";
import DiscoveryClient from "@/components/products/DiscoveryClient";

export default async function DiscoveryPage({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined> | undefined> }) {
  const resolved = await Promise.resolve(searchParams);
  const categoryParam = resolved?.category;
  const selectedCategory = typeof categoryParam === "string" ? (categoryParam as Category) : "ALL";

  return <DiscoveryClient selectedCategory={selectedCategory} />;
}