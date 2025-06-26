import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReceiptText } from 'lucide-react';

type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface OrderHistoryItemProps {
  orderId: string;
  date: string;
  total: number;
  status: OrderStatus;
}

const statusVariantMap: Record<OrderStatus, 'default' | 'secondary' | 'destructive'> = {
  Processing: 'secondary',
  Shipped: 'secondary',
  Delivered: 'default',
  Cancelled: 'destructive',
};

const OrderHistoryItem: React.FC<OrderHistoryItemProps> = ({
  orderId,
  date,
  total,
  status,
}) => {
  console.log('OrderHistoryItem loaded for order:', orderId);

  const handleViewDetails = () => {
    // In a real application, this would navigate to an order details page
    // or open a modal with more information.
    console.log(`"View Details" clicked for order ID: ${orderId}`);
  };

  return (
    <Card className="p-4 transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Order Info */}
        <div className="flex-grow">
          <p className="text-sm font-semibold text-gray-800">Order #{orderId}</p>
          <p className="text-xs text-gray-500">Placed on {date}</p>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
          <div className="text-right">
            <p className="text-sm font-bold">${total.toFixed(2)}</p>
          </div>
          <Badge variant={statusVariantMap[status]} className="capitalize px-2 py-1 text-xs">
            {status}
          </Badge>
          <Button variant="outline" size="sm" onClick={handleViewDetails}>
            <ReceiptText className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrderHistoryItem;