import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  /** The star rating from 1 to 5 */
  rating: number;
  /** The main text of the testimonial */
  quote: string;
  /** The name of the customer giving the review */
  name: string;
  /** The location of the customer */
  location: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ rating, quote, name, location }) => {
  console.log('TestimonialCard loaded for:', name);

  const renderStars = () => {
    const totalStars = 5;
    const filledStars = Math.max(0, Math.min(totalStars, Math.floor(rating)));
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            className={`h-5 w-5 ${
              index < filledStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="flex flex-col h-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        {renderStars()}
      </CardHeader>
      <CardContent className="flex-grow">
        <blockquote className="border-l-4 border-gray-200 pl-4">
          <p className="text-gray-700 italic">"{quote}"</p>
        </blockquote>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-gray-600">
          <p className="font-semibold text-gray-800">{name}</p>
          <p>{location}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;