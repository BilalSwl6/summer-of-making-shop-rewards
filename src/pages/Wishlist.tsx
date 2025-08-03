import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import GuestLayout from "@/layouts/GuestLayout";
import { Heart, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const removeFromWishlist = (id: number) => {
    const updated = wishlist.filter((p) => p.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <GuestLayout>
      <div className="max-w-4xl mx-auto py-12 space-y-12">
        <Card>
          <CardContent className="p-6">
            <CardTitle className="text-xl mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Wishlist
            </CardTitle>

            {wishlist.length === 0 ? (
              <div className="text-muted-foreground text-center py-6">
                No items in wishlist.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlist.map((product) => (
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
                      onClick={() => removeFromWishlist(product.id)}
                      variant="outline"
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove from Wishlist
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </GuestLayout>
  );
}
