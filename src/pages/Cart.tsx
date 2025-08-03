import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import GuestLayout from "@/layouts/GuestLayout";
import { ShoppingBag, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (id: number) => {
    const updated = cart.filter((p) => p.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const getTotal = () =>
    cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <GuestLayout>
      <div className="max-w-4xl mx-auto py-12 space-y-12">
        <Card>
          <CardContent className="p-6">
            <CardTitle className="text-xl mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Cart
            </CardTitle>

            {cart.length === 0 ? (
              <div className="text-muted-foreground text-center py-6">
                No items in cart.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {cart.map((product) => (
                    <Card key={product.id} className="p-4 space-y-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-xl h-48 w-full object-contain bg-muted p-2"
                      />
                      <CardTitle className="text-lg">
                        {product.name}
                      </CardTitle>
                      <CardDescription>
                        {product.description}
                      </CardDescription>
                      <div className="text-sm font-medium text-primary">
                        Rs {product.price}
                      </div>
                      <Button
                        onClick={() => removeFromCart(product.id)}
                        variant="outline"
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove from Cart
                      </Button>
                    </Card>
                  ))}
                </div>

                <div className="text-right text-lg font-semibold">
                  Total: Rs {getTotal()}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </GuestLayout>
  );
}
