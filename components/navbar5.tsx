'use client';

import { MenuIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '@/contexts/auth/presentation/hooks/useAuth';
import { useUser } from '@/contexts/user/presentation/hooks/useUser';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const NavBar = () => {
  const { user } = useAuth();
  const { data: userData } = useUser(user?.id);

  const t = useTranslations();

  const navLinks = [
    {
      title: t('navbar.groups'),
      href: '/groups',
    },
    {
      title: t('navbar.activity'),
      href: '/activity',
    },
  ];

  return (
    <section className="py-4 bg-sidebar">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {/* TODO: Add logo */}
            <Image
              src="/icons/google.svg"
              className="max-h-8"
              alt="Shadcn UI Navbar"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold tracking-tighter">
              {t('common.appName')}
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink
                    href={link.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {link.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <Link href="/profile" className="hidden items-center gap-4 lg:flex">
            <Avatar>
              <AvatarImage src={userData?.image || undefined} />
              <AvatarFallback>
                {userData?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="max-h-screen overflow-auto bg-sidebar"
            >
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/icons/google.svg"
                      className="max-h-8"
                      alt="Shadcn UI Navbar"
                      width={32}
                      height={32}
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      {t('common.appName')}
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      href={link.href}
                      className="font-medium"
                      key={link.title}
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/profile"
                  className="mt-6 flex flex-row items-center gap-4"
                >
                  <Avatar>
                    <AvatarImage src={userData?.image || undefined} />
                    <AvatarFallback>
                      {userData?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <p>{userData?.name}</p>
                    <p>{user?.email}</p>
                  </div>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
