import React from 'react';
import { Link } from 'react-router-dom';
import { Hand, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const infoLinks = [
    { label: "FAQ", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <Hand className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">SanitizeSmart</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your trusted partner in hygiene. Clean hands, safe life. Kills 99.9% of germs.
            </p>
          </div>
          
          {/* Info Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Information</h3>
            <nav className="flex flex-col space-y-2">
              {infoLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
             <h3 className="font-semibold text-foreground">Follow Us</h3>
             <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} SanitizeSmart. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
             <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <span className="text-muted-foreground/50">•</span>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;