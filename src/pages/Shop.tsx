import GuestLayout from "@/layouts/GuestLayout";
import data from "@/data/products.json";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";

function Shop() {
  return (
    <GuestLayout>
    <div>
      <h1>Shop</h1>
      <p>Welcome to the shop! Here you can find a variety of products.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.products.map((product) => (
          <Card key={product.id} className="w-full">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            </CardContent>
            <CardFooter className="flex items-center">
              <span className="text-lg font-semibold">${product.price}</span>
              <CardAction className="ml-auto">
              <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline">
                View Details
                </Link>
              </CardAction>
            </CardFooter>
          </Card>
        ))}
        </div>
    </div>
    </GuestLayout>
  );
}

export default Shop;
