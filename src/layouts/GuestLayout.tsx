import React from "react";
import { Heart, Home, ShoppingBag, ShoppingBasket } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-lg rounded-b-2xl">
        <div className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Left side: Home, Shop */}
            <div className="flex gap-4 sm:gap-8">
              <NavItem to="/" icon={<Home size={20} />}>Home</NavItem>
              <NavItem to="/shop" icon={<ShoppingBag size={20} />}>Shop</NavItem>
            </div>

            {/* Right side: Wishlist, Cart */}
            <div className="flex gap-4 sm:gap-6">
              <NavItem to="/wishlist" icon={<Heart size={20} />}>Wishlist</NavItem>
              <NavItem to="/cart" icon={<ShoppingBasket size={20} />}>Cart</NavItem>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="px-4 sm:px-6 py-8">
        <div className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({
  to,
  children,
  icon,
}: {
  to: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "group flex items-center gap-3 px-4 py-2 font-medium rounded-xl transition-all duration-200 transform",
          isActive
            ? "bg-indigo-100 text-indigo-600 scale-105"
            : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-105 active:scale-95",
        ].join(" ")
      }
    >
      <span className="group-hover:rotate-12 transition-transform duration-200">
        {icon}
      </span>
      <span className="text-sm">{children}</span>
    </NavLink>
  );
}
