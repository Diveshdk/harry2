"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Research", href: "/research" },
    { name: "About Me", href: "/about" },
    { name: "Design Board", href: "/design-board" },
    { name: "Achievements", href: "/achievements" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/">
                <img
                  src="/images/hariom-jangid-logo.png"
                  alt="Hariom Jangid Architects"
                  className="h-8 sm:h-10 w-auto"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={item.href}
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-primary-500 ${
                      pathname === item.href ? "text-primary-500" : scrolled ? "text-gray-700" : "text-white/90"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Contact Info - Hidden on smaller screens */}
            <div className="hidden xl:flex items-center space-x-6">
              <div className={`text-sm ${scrolled ? "text-gray-600" : "text-white/80"}`}>
                <div className="flex items-center space-x-2 mb-1">
                  <Phone className="h-3 w-3" />
                  <span>+91 8655797417</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3" />
                  <span>hariomjangidarchitects@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className={`h-6 w-6 ${scrolled ? "text-gray-900" : "text-white"}`} />
              ) : (
                <Menu className={`h-6 w-6 ${scrolled ? "text-gray-900" : "text-white"}`} />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

            {/* Mobile Menu Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <img src="/images/hariom-jangid-logo.png" alt="Hariom Jangid Architects" className="h-8 w-auto" />
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-2">
                    <X className="h-6 w-6 text-gray-900" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-8">
                  <div className="space-y-6">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`block text-2xl font-light transition-colors duration-300 w-full text-left ${
                            pathname === item.href ? "text-primary-500" : "text-gray-900 hover:text-primary-500"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="px-6 py-8 border-t border-gray-200 bg-gray-50">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Phone className="h-5 w-5 text-primary-500" />
                      <span className="text-sm">+91 8655797417</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Mail className="h-5 w-5 text-primary-500" />
                      <span className="text-sm">hariomjangidarchitects@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
