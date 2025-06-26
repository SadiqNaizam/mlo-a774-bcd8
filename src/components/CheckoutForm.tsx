import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

// Define Zod schemas for validation
const shippingSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  address1: z.string().min(5, { message: 'Street address is required' }),
  address2: z.string().optional(),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State / Province is required' }),
  postalCode: z.string().min(5, { message: 'Postal code is required' }),
  country: z.string().min(2, { message: 'Country is required' }),
});

const billingSchema = z.object({
  sameAsShipping: z.boolean().default(true),
  billingAddress: shippingSchema.optional(),
}).refine(data => {
    if (!data.sameAsShipping) {
      return data.billingAddress !== undefined;
    }
    return true;
}, {
    message: "Billing address is required when not same as shipping",
    path: ["billingAddress"],
});


const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Card number must be 16 digits' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Invalid format. Use MM/YY' }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: 'CVC must be 3 or 4 digits' }),
});

const checkoutSchema = shippingSchema.merge(billingSchema).merge(paymentSchema);

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutForm: React.FC = () => {
  console.log('CheckoutForm loaded');
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'USA',
      sameAsShipping: true,
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  const sameAsShipping = form.watch('sameAsShipping');

  const processForm = (data: CheckoutFormValues) => {
    console.log('Form Submitted:', data);
    toast.success('Order placed successfully!', {
      description: 'You will receive a confirmation email shortly.',
    });
    // Here you would typically send the data to your backend API
    // and potentially redirect the user to a success page.
  };

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof CheckoutFormValues)[] = [];
    if (currentStep === 1) {
        fieldsToValidate = ['fullName', 'address1', 'city', 'state', 'postalCode', 'country'];
    } else if (currentStep === 2) {
        if (!sameAsShipping) {
          // This validation is more complex and handled by refine, but we can trigger the parent
          fieldsToValidate.push('billingAddress');
        } else {
          // If checkbox is checked, no validation needed for this step
          setCurrentStep(s => s + 1);
          return;
        }
    }
    
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep(s => s + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(s => s - 1);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Step {currentStep} of 3: {currentStep === 1 ? 'Shipping' : currentStep === 2 ? 'Billing' : 'Payment'}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)}>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Address</h3>
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address1" render={({ field }) => (
                  <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="address2" render={({ field }) => (
                  <FormItem><FormLabel>Address Line 2 (Optional)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem><FormLabel>State / Province</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="postalCode" render={({ field }) => (
                    <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                 <h3 className="text-lg font-medium">Billing Information</h3>
                <FormField control={form.control} name="sameAsShipping" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                     <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                     <div className="space-y-1 leading-none">
                       <FormLabel>Billing address is the same as my shipping address</FormLabel>
                     </div>
                  </FormItem>
                )} />
                {!sameAsShipping && (
                   <div className="space-y-4 pt-4 border-t">
                      <FormField control={form.control} name="billingAddress.fullName" render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                      <FormField control={form.control} name="billingAddress.address1" render={({ field }) => ( <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                      <FormField control={form.control} name="billingAddress.city" render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
                      {/* Add other billing fields as needed */}
                   </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Details</h3>
                 <FormField control={form.control} name="cardNumber" render={({ field }) => (
                  <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder=".... .... .... ...." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                   <FormField control={form.control} name="expiryDate" render={({ field }) => (
                    <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="cvc" render={({ field }) => (
                    <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                    <h4 className="font-medium">Order Review</h4>
                    <p className="text-sm text-muted-foreground">Please review your information before placing the order.</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrevStep}>Back</Button>
            ) : <div />}
            
            {currentStep < 3 ? (
              <Button type="button" onClick={handleNextStep}>Next</Button>
            ) : (
              <Button type="submit">Place Order</Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default CheckoutForm;