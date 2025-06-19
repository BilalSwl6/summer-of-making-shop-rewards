import GuestLayout from "@/layouts/GuestLayout";
import data from "@/data/products.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = data.products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <GuestLayout>
        <div className="text-center text-red-500 mt-10">Product not found</div>
      </GuestLayout>
    );
  }

  return (
    <GuestLayout>
      <Card className="max-w-md mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover rounded-t-md"
        />
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription className="capitalize">{product.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-lg">Price: Rs. {product.price}</p>
          <p className="text-sm text-gray-700 mb-2">{product.description}</p>

          <div className="mb-2">
            <p className="text-xs text-gray-500">Specs:</p>
            <ul className="text-sm list-disc list-inside">
              <li>Material: {product.specs.material}</li>
              <li>Adjustable: {product.specs.adjustable}</li>
            </ul>
          </div>

          <div className="flex gap-2 mt-2">
            {product.featured && <Badge variant="default">Featured</Badge>}
            {product.inStock ? (
              <Badge variant="success">In Stock</Badge>
            ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
          </div>
        </CardContent>

        <CardFooter>

          <Link to={`${product.orignalLink}`} className="w-full">
            <Button className="w-full mt-4" variant="outline">
              Original Link
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </GuestLayout>
  );
}

export default ProductDetail;
