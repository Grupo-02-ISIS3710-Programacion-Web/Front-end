import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DiscoveryPage from "./page";


jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));


jest.mock("@/lib/api", () => ({
  getProducts: () => [
    {
      id: "1",
      name: "Cleanser A",
      brand: "Cerave",
      category: ["CLEANSER"],
      skin_type: ["OILY"],
      ingredients: ["niacinamide"],
      image_url: ["img1"],
    },
    {
      id: "2",
      name: "Serum B",
      brand: "La Roche",
      category: ["SERUM"],
      skin_type: ["DRY"],
      ingredients: ["alcohol"],
      image_url: ["img2"],
    },
  ],
}));


jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { unoptimized, ...rest } = props;
    return <img {...rest} />;
  },
}));


jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: any = {
      didNotFindProduct: "No products found",
      addProduct: "Add product",
    };
    return translations[key] || key;
  },
}));


jest.mock("@/components/products/filter-header", () => ({
  FilterHeader: ({ onFiltersChange }: any) => (
    <div>
      <button
        onClick={() =>
          onFiltersChange({
            skinTypes: ["OILY"],
            brands: [],
            ingredients: [],
          })
        }
      >
        apply-oily
      </button>

      <button
        onClick={() =>
          onFiltersChange({
            skinTypes: [],
            brands: [],
            ingredients: ["alcohol"],
          })
        }
      >
        apply-alcohol
      </button>

      <button
        onClick={() =>
          onFiltersChange({
            skinTypes: ["DRY"],
            brands: [],
            ingredients: ["alcohol"],
          })
        }
      >
        apply-empty
      </button>
    </div>
  ),
}));

describe("HU-6:DiscoveryPage", () => {

  test("muestra productos al cargar", () => {
    render(<DiscoveryPage />);

    expect(screen.getAllByText("Cleanser A").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Serum B").length).toBeGreaterThan(0);
  });

  test("filtra por tipo de piel", async () => {
    render(<DiscoveryPage />);

    fireEvent.click(screen.getByText("apply-oily"));

    await screen.findAllByText("Cleanser A");

    expect(screen.queryAllByText("Serum B").length).toBe(0);
  });

  test("excluye ingredientes correctamente", async () => {
    render(<DiscoveryPage />);

    fireEvent.click(screen.getByText("apply-alcohol"));

    await screen.findAllByText("Cleanser A");

    expect(screen.queryAllByText("Serum B").length).toBe(0);
  });

  test("muestra estado vacío", async () => {
    render(<DiscoveryPage />);

    fireEvent.click(screen.getByText("apply-empty"));

    await screen.findByText("No products found");

    expect(screen.getByText("Add product")).toBeInTheDocument();
  });

});