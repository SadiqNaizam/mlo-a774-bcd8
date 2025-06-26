import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductShowcase: React.FC = () => {
  console.log('ProductShowcase loaded');

  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="flex justify-center items-center">
            {/* Using a placeholder image path. Assumes an image is in the /public folder. */}
            <img
              src="/sanitizer-bottle.png"
              alt="SanitizeSmart Hand Sanitizer Bottle"
              className="max-w-xs sm:max-w-sm w-full h-auto object-contain rounded-lg transform transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Text Content Column */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Kills 99.9% of Germs.
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Introducing SanitizeSmart, the premium hand sanitizer designed for your peace of mind. Our fast-acting formula ensures your hands are clean, protected, and soft.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/product">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;