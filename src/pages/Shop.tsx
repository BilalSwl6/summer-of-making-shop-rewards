import React, { useState } from "react";
import { Link } from "react-router-dom";
import GuestLayout from "@/layouts/GuestLayout";
import data from "@/data/products.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Share2, Copy, Facebook, Twitter, Instagram, ShoppingBag, Eye, Shell } from "lucide-react";

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number | string;
  image: string;
  category?: string;
  inStock?: boolean;
}

interface ImageLoadedState {
  [productId: string | number]: boolean;
}

interface ProductData {
  products: Product[];
}

interface ShareButtonProps {
  product: Product;
  onShare: (product: Product) => void;
  className?: string;
}

interface ProductCardProps {
  product: Product;
  isImageLoaded: boolean;
  onImageLoad: (productId: string | number) => void;
  onShare: (product: Product) => void;
}

interface ShareDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  shareUrl: string;
  onCopyToClipboard: (text: string) => void;
}

const categories = [
  { id: "tech-gadgets", name: "Tech Gadgets" },
  { id: "stationary", name: "Stationary" },
  { id: "electric", name: "Electric" },
  { id: "mechanical", name: "Mechanical" },
  { id: "virtual", name: "Virtual" },
  { id: "toy", name: "Toy" },
  { id: "security", name: "Security" },
  { id: "computer", name: "Computer" },
  { id: "games", name: "Games" },
];

const ShareButton: React.FC<ShareButtonProps> = ({ product, onShare, className = "" }) => (
  <Button
    size="sm"
    variant="secondary"
    className={`h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg border transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-primary/20 ${className}`}
    onClick={() => onShare(product)}
    aria-label={`Share ${product.name}`}
  >
    <Share2 className="h-4 w-4 text-foreground" />
  </Button>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, isImageLoaded, onImageLoad, onShare }) => (
  <Card className="break-inside-avoid mb-6 group overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
    <div className="relative overflow-hidden rounded-t-3xl">
      {!isImageLoaded && (
        <div className="w-full h-48 bg-muted rounded-t-3xl flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      <img
        src={product.image}
        alt={product.name}
        className={`w-full h-auto transition-all duration-700 group-hover:scale-110 ${
          isImageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
        }`}
        onLoad={() => onImageLoad(product.id)}
        style={{ display: "block", maxWidth: "100%", height: "auto" }}
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-t-3xl">
        <div className="absolute top-4 right-4 flex space-x-2">
          <ShareButton product={product} onShare={onShare} />
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-primary text-primary-foreground font-bold text-base px-3 py-1 rounded-full shadow-lg border-0">
            ${product.price}
          </Badge>
        </div>
      </div>
    </div>

    <CardContent className="p-6 space-y-4">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-bold text-card-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3 text-sm mt-2">
          {product.description}
        </CardDescription>
      </CardHeader>

      <Separator className="bg-border" />

      <CardFooter className="p-0">
        <Button asChild className="w-full text-primary-foreground font-semibold rounded-2xl h-12 shadow-lg hover:shadow-xl transition-all duration-200 border-0">
          <Link to={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </CardContent>
  </Card>
);

const ShareDialog: React.FC<ShareDialogProps> = ({ isOpen, onOpenChange, product, shareUrl, onCopyToClipboard }) => {
  const handleSocialShare = (platform: "facebook" | "twitter" | "instagram") => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product?.name || "")}`,
      instagram: "https://www.instagram.com",
    };

    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Toaster />
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader className="text-center pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Share Product
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Share this amazing product with your friends
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {product && (
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-2xl">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl shadow-md" />
                <div className="flex-1">
                  <h4 className="font-semibold text-card-foreground line-clamp-1">{product.name}</h4>
                  <p className="text-muted-foreground text-sm">${product.price}</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="share-url" className="text-sm font-medium text-foreground">
                Product Link
              </Label>
              <div className="flex space-x-2">
                <Input id="share-url" defaultValue={shareUrl} readOnly className="bg-background border-input text-foreground" />
                <Button
                  size="sm"
                  onClick={() => onCopyToClipboard(shareUrl)}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl px-4 border-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator className="bg-border" />

            <div className="grid grid-cols-3 gap-3">
              {[
                { platform: "facebook", icon: <Facebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />, label: "Facebook" },
                { platform: "twitter", icon: <Twitter className="h-5 w-5 text-sky-600 dark:text-sky-400" />, label: "Twitter" },
                { platform: "instagram", icon: <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />, label: "Instagram" },
              ].map(({ platform, icon, label }) => (
                <Button
                  key={platform}
                  variant="outline"
                  className="flex-col h-16 space-y-1 rounded-xl"
                  onClick={() => handleSocialShare(platform as any)}
                >
                  {icon}
                  <span className="text-xs text-foreground">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl border-border hover:bg-muted">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Shop: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState<ImageLoadedState>({});
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const productData = data as ProductData;

  const handleImageLoad = (productId: string | number): void => {
    setImageLoaded(prev => ({ ...prev, [productId]: true }));
  };

  const handleShare = (product: Product): void => {
    setSelectedProduct(product);
    setShareDialogOpen(true);
  };

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!", {
        description: "Product link has been copied successfully.",
      });
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      toast.error("Copy failed", {
        description: "Failed to copy link. Please try again.",
      });
    }
  };

  const shareUrl: string = selectedProduct ? `${window.location.origin}/product/${selectedProduct.id}` : "";

  const filteredProducts = productData.products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <GuestLayout>
      <div className="space-y-12 pb-16">
        {/* Hero */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 blur-3xl"></div>
          <div className="relative text-center space-y-6 py-16">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-2xl shadow-lg">
                <Shell className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Spend Shells and Get Products
            </h1>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Discover amazing products you can redeem using your earned Shells. Find exclusive items and show off your dedication!
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map(c => (
              <Button
                key={c.id}
                variant={selectedCategory === c.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(c.id)}
                className="rounded-full capitalize"
              >
                {c.name}
              </Button>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>

        {/* Product Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4 px-4" style={{ columnFill: "balance" }}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isImageLoaded={imageLoaded[product.id] || false}
              onImageLoad={handleImageLoad}
              onShare={handleShare}
            />
          ))}
          {filteredProducts.length === 0 && (
            <Card className="max-w-md mx-auto text-center p-12 bg-card shadow-lg rounded-3xl">
              <CardContent className="space-y-6">
                <div className="text-8xl" role="img" aria-label="Shopping bag">🛍️</div>
                <CardTitle className="text-2xl font-bold text-card-foreground">No Products Yet</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your collection is waiting to be filled with amazing products!
                </CardDescription>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-2xl px-8 border-0">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <ShareDialog
          isOpen={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          product={selectedProduct}
          shareUrl={shareUrl}
          onCopyToClipboard={copyToClipboard}
        />
      </div>
    </GuestLayout>
  );
};

export default Shop;
