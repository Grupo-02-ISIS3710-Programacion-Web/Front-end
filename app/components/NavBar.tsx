"use client"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User, Search, Menu, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
    {
      nombre: "Home",
      href: "/"
    },
    {
        nombre: "Descubre productos",
        href: "/descubrir"
    },
    {
        nombre: "Comunidad",
        href: "/comunidad"
    },
    {
        nombre: "Mis productos",
        href: "/mis-productos"
    }
  ]

export default function NavBar() {
  return (
    <>
      <div className="hidden md:block">
        <NavBarDesktop />
      </div>

      {/* Para mobile */}
      <div className="block md:hidden">
        <NavBarMobile   />
      </div>
    </>
  )
}

export function NavBarDesktop() {
  return (
    <div className="hidden md:flex items-center justify-between px-4 lg:px-10 py-3 w-full">
      
      {/* Left side */}
      <div className="flex items-center gap-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
        />

        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            {links.map((link) => (
              <NavigationMenuItem key={link.nombre}>
                <NavigationMenuLink
                  href={link.href}
                  className="text-sm font-medium hover:text-primary hover:font-medium transition-colors"
                >
                  {link.nombre}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Barra de busqueda en el centro  */}
      <div className="flex-1 max-w-md mx-6">
        <SearchBar />
      </div>

      {/* Lado derecho */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="outline"
            className="border-secondary hover:bg-secondary hover:text-primary-foreground"
          >
            Registrarme
          </Button>
          <Button>
            Iniciar sesión
          </Button>
        </div>
        <NotificationsButton />
        <ProfileButton />
      </div>
    </div>
  )
}

export function SearchBar() {
  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        type="text"
        placeholder="Buscar productos..."
        className="w-full"
      />
      <Button variant="outline" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function NotificationsButton() {
  return (
    <Button variant="outline" size="icon" >
        <Bell className="h-5 w-5" />
    </Button>
  )
}

export function ProfileButton() {
  return (
    <Button size="icon" className="rounded-full">
      <User className="h-5 w-5" />
    </Button>
  )
}

export function NavBarMobile() {
  return (
    <div className="md:hidden sticky top-0 z-50 bg-background border-b">
      <div className="flex items-center justify-between px-4 py-3">
        
        {/* Menu trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 flex flex-col">
            <SheetHeader>
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>

            {/* Links */}
            <div className="mt-6 flex flex-col gap-1">
              {links.map((link) => (
                <Button key={link.nombre} variant="ghost" className="justify-start text-base">
                  <Link href={link.href}>{link.nombre}</Link>
                </Button>
              ))}
            </div>

            {/* Autenticación al fondo */}
            <div className="mt-auto pt-6 border-t flex flex-col gap-2">
              <Button variant="outline">Registrarme</Button>
              <Button>Iniciar sesión</Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Center logo */}
        <Image src="/logo.png" alt="Logo" width={36} height={36}/>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          <NotificationsButton />
          <ProfileButton />
        </div>
      </div>
    </div>
  )
}