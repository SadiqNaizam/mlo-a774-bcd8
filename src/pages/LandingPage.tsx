import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductShowcase from '@/components/ProductShowcase';
import TestimonialCard from '@/components/TestimonialCard';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Icons
import { ShieldCheck, Droplets, Sparkles, ArrowRight } from 'lucide-react';

// Placeholder data for testimonials
const testimonials = [
  {
    rating: 5,
    quote: "This is the best hand sanitizer I've ever used. It doesn't dry out my hands and smells great. Highly recommend!",
    name: "Sarah J.",
    location: "New York, NY",
  },
  {
    rating: 5,
    quote: "As a teacher, I use sanitizer constantly. SanitizeSmart is effective and gentle on my skin. A new classroom essential.",
    name: "Mark T.",
    location: "Austin, TX",
  },
  {
    rating: 4,
    quote: "I love the clean feel and peace of mind this gives me. The bottle is also very sleek and easy to carry around.",
    name: "Emily R.",
    location: "Chicago, IL",
  },
];

// Placeholder data for benefits
const benefits = [
    {
        icon: <ShieldCheck className="h-10 w-10 text-primary" />,
        title: "Effective Formula",
        description: "Our sanitizer is lab-tested to kill 99.9% of common germs and bacteria, keeping you safe and protected."
    },
    {
        icon: <Droplets className="h-10 w-10 text-primary" />,
        title: "Moisturizing Agents",
        description: "Infused with aloe vera and vitamin E, our formula prevents dryness, leaving your hands soft and smooth."
    },
    {
        icon: <Sparkles className="h-10 w-10 text-primary" />,
        title: "Trusted Quality",
        description: "Made in the USA in an FDA-registered facility, ensuring the highest standards of safety and quality."
    }
];

const LandingPage = () => {
  console.log('LandingPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 dark:bg-black">
      <Header cartItemCount={0} />

      <main className="flex-1">
        {/* Hero Section */}
        <ProductShowcase />

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 bg-white dark:bg-gray-900/50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Why Choose SanitizeSmart?</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Your trusted partner in hygiene and safety.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((benefit) => (
                        <Card key={benefit.title} className="text-center p-6 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                           <CardHeader className="flex justify-center items-center">
                                {benefit.icon}
                           </CardHeader>
                           <CardContent className="space-y-2">
                                <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
                                <p className="text-muted-foreground">{benefit.description}</p>
                           </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What Our Customers Say</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Real reviews from satisfied users.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  rating={testimonial.rating}
                  quote={testimonial.quote}
                  name={testimonial.name}
                  location={testimonial.location}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 sm:py-20 bg-primary/10 dark:bg-primary/5">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Ready for a Cleaner, Safer You?</h2>
                 <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Join thousands of happy customers who trust SanitizeSmart for their daily protection. Order now and experience the difference.</p>
                 <div className="mt-8">
                    <Button asChild size="lg" className="text-lg px-8 py-6">
                        <Link to="/product"> {/* Path from App.tsx */}
                            Shop The Sanitizer
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                 </div>
            </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;