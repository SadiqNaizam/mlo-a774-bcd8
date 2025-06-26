import React from 'react';

// Import Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import Custom Page-Specific Components
import CheckoutForm from '@/components/CheckoutForm';

const CheckoutPage: React.FC = () => {
  console.log('CheckoutPage loaded');

  // Since the user is at checkout, it's reasonable to assume there is at least one item in the cart.
  const placeholderCartItemCount = 1;

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header cartItemCount={placeholderCartItemCount} />

      <main className="flex-grow w-full">
        <div className="container mx-auto px-4 py-8 md:py-16">
          {/* 
            The CheckoutForm component is self-contained with its own title and card structure.
            We just need to place it within the main layout of the page.
          */}
          <CheckoutForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;