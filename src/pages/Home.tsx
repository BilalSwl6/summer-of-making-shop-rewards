import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GuestLayout from "@/layouts/GuestLayout";
import data from "@/data/products.json"; 

type Product = {
  id: number;
  name: string;
  description: string;
  featured?: boolean;
  price: number | string;
  image: string;
};

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);

  
useEffect(() => {
  const featuredProducts = data.products.filter(product => product.featured);
  const shuffled = [...featuredProducts].sort(() => 0.5 - Math.random());
  setFeatured(shuffled.slice(0, 2));
}, []);

  return (
    <GuestLayout>
      <section className="text-center space-y-6 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
        <h1 className="text-4xl font-extrabold tracking-tight text-indigo-700 sm:text-5xl">
          Welcome to <span className="text-indigo-900">Summer of Making!</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Discover high-quality gadgets, and accessories in exchange of shells.
        </p>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-indigo-600 mb-8">Featured Products</h2>
          <div className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
            {featured.map((product) => (
              <Card
                key={product.id}
                className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl"
              >
                <CardContent className="p-6 space-y-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain bg-muted p-3 rounded-xl"
                  />
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-gray-500 text-sm">
                      {product.description}
                    </CardDescription>
                  </div>
                  <div className="text-xl font-bold text-indigo-700">$ {product.price}</div>
                  <Button variant="default" className="w-full text-base font-medium">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </GuestLayout>
  );
}
