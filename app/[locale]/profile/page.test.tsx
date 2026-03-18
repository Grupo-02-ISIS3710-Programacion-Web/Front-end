import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./page";

// mocks
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({ children }: any) => children,
}));


jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: any) => children,
}));

describe("HU-03: Profile Page", () => {

  test("muestra información del usuario", () => {
    render(<Profile />);

    expect(screen.getByText("Elara Vance")).toBeInTheDocument();
    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
  });

  test("abre modal de edición", () => {
    render(<Profile />);

    fireEvent.click(screen.getByText("editProfile"));

    expect(screen.getByText("name")).toBeInTheDocument();
  });

  test("edita y guarda cambios", () => {
    render(<Profile />);

    fireEvent.click(screen.getByText("editProfile"));

    const input = screen.getByDisplayValue("Elara Vance");

    fireEvent.change(input, {
      target: { value: "Nuevo Nombre" }
    });

    fireEvent.click(screen.getByText("save"));

    expect(screen.getByText("Nuevo Nombre")).toBeInTheDocument();
  });

  test("cierra modal al cancelar", async () => {
    render(<Profile />);

    fireEvent.click(screen.getByText("editProfile"));

    fireEvent.click(screen.getByText("cancel"));

    await waitFor(() => {
    expect(screen.queryByTestId("edit-modal")).toBeNull();
    });
  });

});