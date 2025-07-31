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
      title: "Server Directory",
      href: "/servers",
      description: "Browse 1000+ community-built MCP servers",
    },
    {
      title: "Getting Started",
      href: "/docs/getting-started",
      description: "Learn how to build and deploy MCP servers",
    },
  ];

  const items = navigationItems || defaultItems;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">MCP Ecosystem</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            MCP Ecosystem
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Join the growing community building the future of AI interactions with Model Context Protocol.
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
                  <Link href="/servers" className={navigationMenuTriggerStyle()}>
                    Servers
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/docs" className={navigationMenuTriggerStyle()}>
                    Docs
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/community" className={navigationMenuTriggerStyle()}>
                    Community
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
                    MCP Ecosystem
                  </h2>
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Home
                    </Link>
                    <Link
                      href="/servers"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Servers
                    </Link>
                    <Link
                      href="/docs"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Documentation
                    </Link>
                    <Link
                      href="/community"
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Community
                    </Link>
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="ml-4 flex items-center space-x-2">
            <span className="font-bold">MCP Ecosystem</span>
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
