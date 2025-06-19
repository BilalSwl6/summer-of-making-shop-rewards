import React from "react"
import { Home, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 bg-gray-50 text-black">
      {/* Navbar */}
      <nav className="w-full max-w-md mb-6">
        <div className="flex justify-between border rounded-md px-4 py-2 bg-white shadow-sm">
          <NavItem to="/" icon={<Home size={16} />}>Home</NavItem>
          <NavItem to="/shop" icon={<ShoppingBag size={16} />}>Shop</NavItem>
        </div>
      </nav>

      {/* Main content */}
      <main className="w-full max-w-md flex-1">
        <div className="w-full border rounded-md bg-white p-5 shadow-sm">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavItem({ to, children, icon }: { to: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1 text-sm hover:underline"
    >
      {icon}
      {children}
    </Link>
  )
}
