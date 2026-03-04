import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function LocaleLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <>
        <NavBar />
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
    </>
  );
}