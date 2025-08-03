import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GuestLayout from "@/layouts/GuestLayout";
import data from "@/data/products.json";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  Heart,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Star,
  Package,
  Coins,
} from "lucide-react";

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number | string;
  image: string;
  coins: number;
  category?: string;
  inStock?: boolean;
  featured?: boolean;
  specs?: Record<string, string>;
  orignalLink?: string;
}

interface ProductData {
  products: Product[];
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const productData = data as unknown as ProductData;
  const product = productData.products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product) {
      setIsWishlisted(wishlist.some((item) => item.id === product.id));
      setIsInCart(cart.some((item) => item.id === product.id));
    }
  }, [product, wishlist, cart]);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!", {
        description: "Share this amazing product with your friends.",
      });
    } catch (error) {
      toast.error("Failed to copy link", {
        description: "Please try again.",
      });
    }
  };

  const handleWishlist = () => {
    if (!product) return;

    let updatedWishlist;
    if (isWishlisted) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsWishlisted(!isWishlisted);

    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist!",
      {
        description: isWishlisted
          ? "Product removed from your wishlist."
          : "You can find it in your saved items.",
      }
    );
  };

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;

    const isAlreadyInCart = cart.some((item) => item.id === product.id);
    if (!isAlreadyInCart) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsInCart(true);

      toast.success("Added to cart!", {
        description: "Product has been added to your cart.",
      });
    }
  };

  if (!product) {
    return (
      <GuestLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md mx-auto text-center p-12 bg-card shadow-lg rounded-3xl">
            <CardContent className="space-y-6">
              <div className="text-6xl" role="img" aria-label="Not found">
                ❌
              </div>
              <CardTitle className="text-2xl font-bold text-card-foreground">
                Product Not Found
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                The product you're looking for doesn't exist or may have been removed.
              </CardDescription>
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-lg px-8 border-0"
              >
                <Link to="/shop">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Shop
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </GuestLayout>
    );
  }

  return (
    <>
      <Toaster richColors />
      <GuestLayout>
        <div className="min-h-screen py-8 px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <Button
              asChild
              variant="outline"
              className="rounded-lg border-border hover:bg-muted focus:ring-2 focus:ring-primary/20"
            >
              <Link to="/shop">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-0 bg-card shadow-xl rounded-3xl">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Product Image */}
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl bg-muted">
                    {!imageLoaded && (
                      <div className="w-full aspect-square flex items-center justify-center animate-pulse">
                        <div className="w-8 h-8 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin"></div>
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full aspect-square object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
                        }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-10 w-10 rounded-lg bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg border transition-all duration-200 hover:scale-105"
                        onClick={handleShare}
                        aria-label="Share product"
                      >
                        <Share2 className="h-4 w-4 text-foreground" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg border transition-all duration-200 hover:scale-105 ${isWishlisted ? "text-red-500" : "text-foreground"
                          }`}
                        onClick={handleWishlist}
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-primary text-primary-foreground font-bold text-lg px-4 py-2 rounded-full shadow-lg border-0">
                        $ {product.price}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-3xl font-bold text-card-foreground leading-tight">
                          {product.name}
                        </CardTitle>
                        {product.category && (
                          <CardDescription className="text-muted-foreground text-base capitalize bg-muted/50 px-3 py-1 rounded-full inline-block">
                            {product.category}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <div className="flex gap-3">
                    {product.featured && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 px-3 py-1 rounded-full">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Featured
                      </Badge>
                    )}
                    <Badge
                      className={`px-3 py-1 rounded-full border-0 ${product.inStock
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                          : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                        }`}
                    >
                      {product.inStock ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          In Stock
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 mr-1" />
                          Out of Stock
                        </>
                      )}
                    </Badge>
                  </div>

                  <Separator className="bg-border" />

                  <CardContent className="p-0">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground mb-2">
                          Description
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Coins className="w-5 h-5 mr-2 text-primary" />
                        <span className="font-medium text-card-foreground">Coins:</span>
                        <span className="ml-1">{product.coins}</span>
                      </div>

                      {product.specs && Object.keys(product.specs).length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-card-foreground flex items-center">
                            <Package className="w-5 h-5 mr-2 text-primary" />
                            Specifications
                          </h3>
                          <div className="bg-muted/50 rounded-2xl p-4">
                            <ul className="space-y-2">
                              {Object.entries(product.specs).map(([key, value]) => (
                                <li key={key} className="flex justify-between items-center py-1">
                                  <span className="font-medium text-card-foreground capitalize">
                                    {key}:
                                  </span>
                                  <span className="text-muted-foreground">{value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <Separator className="bg-border" />

                  <CardFooter className="p-0 pt-2">
                    <div className="w-full space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          disabled={!product.inStock || isInCart}
                          onClick={handleAddToCart}
                          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold rounded-lg h-12 shadow-lg hover:shadow-xl transition-all duration-200 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {isInCart ? "Already in Cart" : "Add to Cart"}
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-lg h-12 border-border hover:bg-muted focus:ring-2 focus:ring-primary/20 font-semibold"
                          onClick={handleWishlist}
                        >
                          <Heart
                            className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-current text-red-500" : ""
                              }`}
                          />
                          {isWishlisted ? "Wishlisted" : "Wishlist"}
                        </Button>
                      </div>

                      {product.orignalLink && (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full rounded-lg h-12 hover:bg-muted focus:ring-2 focus:ring-primary/20 font-semibold"
                        >
                          <Link to={product.orignalLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Original Source
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </GuestLayout>
    </>
  );
}

export default ProductDetail;
