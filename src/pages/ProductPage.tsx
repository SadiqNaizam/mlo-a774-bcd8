import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";

const ProductPage = () => {
  console.log('ProductPage loaded');
  const [quantity, setQuantity] = useState(1);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { toast } = useToast();

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    setCartItemCount((prev) => prev + quantity);
    toast({
      title: "Success!",
      description: `${quantity} item(s) added to your cart.`,
    });
  };

  const productImages = [
    "https://images.unsplash.com/photo-1584302179602-e4b3aa3fe86b?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589922533610-3c139d3b2a0d?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583946099373-6d9b3576f622?q=80&w=2127&auto=format&fit=crop"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header cartItemCount={cartItemCount} />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column: Image Carousel */}
          <div className="flex items-center justify-center">
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                {productImages.map((src, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <img src={src} alt={`SanitizeSmart Product Image ${index + 1}`} className="rounded-lg object-cover w-full h-full" />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <Badge variant="outline">Best Seller</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                SanitizeSmart Hand Sanitizer
              </h1>
              <p className="text-muted-foreground text-lg">
                Keeps you safe by killing 99.9% of germs. Infused with moisturizers to keep your hands soft.
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">$12.99</span>
              <span className="text-muted-foreground line-through">$15.99</span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-medium">Quantity</label>
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0 focus-visible:ring-0"
                    min="1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Accordion for extra details */}
        <section className="mt-12 md:mt-20">
          <Accordion type="single" collapsible defaultValue="description" className="w-full max-w-3xl mx-auto">
            <AccordionItem value="description">
              <AccordionTrigger className="text-lg font-medium">Product Description</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our premium hand sanitizer is formulated to be tough on germs but gentle on skin. The fast-absorbing, alcohol-based gel formula is enriched with natural moisturizers like Aloe Vera to leave your hands feeling soft, refreshed, and clean. It's the perfect solution for hygiene on the go, at home, or in the office.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-lg font-medium">Ingredients</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p><strong>Active Ingredient:</strong> Ethyl Alcohol 70% (Antiseptic)</p>
                <p><strong>Inactive Ingredients:</strong> Water (Aqua), Glycerin, Carbomer, Aloe Barbadensis Leaf Juice, Tocopheryl Acetate (Vitamin E), Fragrance.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="usage">
              <AccordionTrigger className="text-lg font-medium">Usage Instructions</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Apply a small, dime-sized amount to your palm and rub hands together briskly until dry. Ensure all surfaces, including between fingers and under nails, are covered. Supervise children under 6 years of age when using this product to avoid swallowing. For external use only.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;