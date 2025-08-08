"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Publications", href: "/publications" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Design Board", href: "/design-board" },
    { name: "Achievements", href: "/achievements" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-blue/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/images/hariom-jangid-logo.png"
                alt="Hariom Jangid Architects"
                className="h-8 w-auto"
              />

            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-primary-500 ${
                    pathname === item.href
                      ? "text-primary-500"
                      : scrolled || isOpen
                      ? "text-gray-700"
                      : "text-blue"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
<Button
  variant="ghost"
  size="sm"
  onClick={toggleMenu}
  className={`lg:hidden transition-colors duration-300 w-10 h-10 flex items-center justify-center ${
    scrolled || isOpen ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
  }`}
>
  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block text-base font-medium transition-colors duration-200 hover:text-primary-500 ${
                      pathname === item.href ? "text-primary-500" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

export default Navigation
