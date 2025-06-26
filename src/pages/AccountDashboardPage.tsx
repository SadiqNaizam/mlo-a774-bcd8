import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderHistoryItem from '@/components/OrderHistoryItem';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Lucide Icons
import { Trash2, Edit } from 'lucide-react';

// Mock Data
const mockOrders = [
  { id: 'SS-86753', date: '2024-07-15', total: 25.99, status: 'Delivered' as const },
  { id: 'SS-84321', date: '2024-06-28', total: 49.50, status: 'Shipped' as const },
  { id: 'SS-79123', date: '2024-05-10', total: 15.00, status: 'Cancelled' as const },
];

const mockAddresses = [
  { id: 'addr1', type: 'Shipping', recipient: 'Jane Doe', address: '123 Clean St, Hygiene, CA 90210' },
  { id: 'addr2', type: 'Billing', recipient: 'Jane Doe', address: '123 Clean St, Hygiene, CA 90210' },
];

const AccountDashboardPage = () => {
  console.log('AccountDashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header cartItemCount={0} />

      <main className="flex-grow container py-8 md:py-12">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
          <p className="text-muted-foreground">
            Manage your orders, addresses, and personal information.
          </p>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="addresses">Manage Addresses</TabsTrigger>
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
          </TabsList>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>View the status and details of your past purchases.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockOrders.length > 0 ? (
                  mockOrders.map(order => <OrderHistoryItem key={order.id} {...order} />)
                ) : (
                  <p className="text-sm text-muted-foreground">You have not placed any orders yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Addresses</CardTitle>
                  <CardDescription>Add or update your shipping and billing addresses.</CardDescription>
                </div>
                <Button>Add New Address</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Recipient & Address</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAddresses.map(addr => (
                      <TableRow key={addr.id}>
                        <TableCell className="font-medium">{addr.type}</TableCell>
                        <TableCell>
                          <div className="font-medium">{addr.recipient}</div>
                          <div className="text-sm text-muted-foreground">{addr.address}</div>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Information Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AccountDashboardPage;