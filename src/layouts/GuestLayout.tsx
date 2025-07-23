import React from "react"
import { Home, ShoppingBag } from "lucide-react"
import { Link } from "react-router-dom"

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50 shadow-lg rounded-b-2xl">
        <div className="max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-center gap-4 sm:gap-8">
            <NavItem to="/" icon={<Home size={20} />}>Home</NavItem>
            <NavItem to="/shop" icon={<ShoppingBag size={20} />}>Shop</NavItem>
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
  )
}

function NavItem({ to, children, icon }: { to: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 px-4 py-2 text-gray-700 font-medium rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 transform hover:scale-105 active:scale-95"
    >
      <span className="group-hover:rotate-12 transition-transform duration-200">
        {icon}
      </span>
      <span className="text-sm">{children}</span>
    </Link>
  )
}