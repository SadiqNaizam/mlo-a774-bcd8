import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Hand, User, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  const MobileNav = () => (
    <div className="flex flex-col gap-4 p-4">
      <NavLink to="/product" className={navLinkClasses}>Product</NavLink>
      <NavLink to="/" className={navLinkClasses}>About</NavLink>
      <NavLink to="/account-dashboard" className={navLinkClasses}>My Account</NavLink>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Hand className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">SanitizeSmart</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/product" className={navLinkClasses}>
            Product
          </NavLink>
          <NavLink to="/" end className={navLinkClasses}>
            About
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/shopping-cart" aria-label="Open Shopping Cart">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </div>
            </Link>
          </Button>

          <Button variant="ghost" className="hidden md:inline-flex" asChild>
            <Link to="/account-dashboard">
              <User className="mr-2 h-4 w-4" />
              My Account
            </Link>
          </Button>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <MobileNav />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;