"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavigationItem {
  title: string;
  href: string;
  description?: string;
}

interface HeaderProps {
  navigationItems?: NavigationItem[];
}

export function Header({ navigationItems }: HeaderProps = {}) {
  const defaultItems: NavigationItem[] = [
    {
      title: "Features",
      href: "/#features",
      description: "Explore MCP server capabilities and integrations",
    },
    {
      title: "Enterprise",
      href: "/#enterprise",
      description: "Enterprise-grade security and compliance features",
    },
    {
      title: "Pricing",
      href: "/#pricing",
      description: "Flexible pricing for teams of all sizes",
    },
  ];

  const items = navigationItems || defaultItems;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">MCP Servers</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            MCP Servers
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Enterprise-grade Model Context Protocol servers for modern AI development.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {items.map((item, index) => (
                      <li key={`nav-item-${index}`}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                            {item.description && (
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/#enterprise" className={navigationMenuTriggerStyle()}>
                    Enterprise
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/docs" className={navigationMenuTriggerStyle()}>
                    Documentation
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile navigation */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 sm:max-w-xs">
              <div className="py-4">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    MCP Servers
                  </h2>
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Home
                    </Link>
                    <Link
                      href="/#enterprise"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Enterprise
                    </Link>
                    <Link
                      href="/docs"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Documentation
                    </Link>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="ml-4 flex items-center space-x-2">
            <span className="font-bold">MCP Servers</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {/* You can add user menu, theme toggle, etc. here */}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
