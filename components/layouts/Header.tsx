"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Info, Code, Flame, Play, Users, Heart } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#about", label: "About", icon: Info },
  { href: "/workshops", label: "Workshops", icon: Code },
  { href: "/hacktoberfest", label: "Hacktoberfest", icon: Flame, className: "text-orange-500 font-semibold" },
  { href: "/playground", label: "Playground", icon: Play },
  { href: "/#community", label: "Community", icon: Users },
  { href: "/partners", label: "Partners", icon: Heart },
]

function MobileNav({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/75 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <h2 className="font-serif font-bold text-lg text-gray-900 dark:text-white">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close mobile menu" className="hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-6 w-6 text-gray-900 dark:text-white" />
          </Button>
        </div>
        <nav className="flex flex-col p-4 space-y-2 bg-white dark:bg-gray-900">
          {navLinks.map(({ href, label, icon: Icon, className }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 p-3 rounded-lg text-gray-900 dark:text-white hover:bg-primary/10 hover:text-primary active:bg-primary/20 transition-all duration-200 text-lg min-h-[48px] ${className || ''}`}
              onClick={onClose}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{label}</span>
            </Link>
          ))}
          <div className="pt-4">
            <a href="https://whatsapp.com/channel/0029VbB2boDEawdueVgsYC39" className="block w-full">
              <Button className="w-full min-h-[48px]" onClick={onClose}>
                Join Us
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </>
  )
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/"><img src="/Campus_crop.png" alt="DjangoCampus Logo" className="h-10 w-20" /></a >
          <div>
            <h1 className="font-serif font-black text-xl text-foreground">DjangoCampus</h1>
            <p className="text-sm text-muted-foreground">Powered by Django</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label, className }) => (
            <Link
              key={href}
              href={href}
              className={`text-foreground hover:text-primary transition-colors ${className || ''}`}
            >
              {label}
            </Link>
          ))}
          <a href="https://whatsapp.com/channel/0029VbB2boDEawdueVgsYC39"><Button>Join Us</Button></a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}
