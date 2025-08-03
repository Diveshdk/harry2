"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Linkedin, Facebook, Youtube, Instagram } from "lucide-react"

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const footerLinks = {
    company: [
      { name: "Home", href: "home" },
      { name: "About Us", href: "about" },
      { name: "Publications & News", href: "publications" },
    ],
    services: [
      { name: "Our Achievements", href: "projects" },
      { name: "Careers", href: "contact" },
      { name: "Contact Us", href: "contact" },
    ],
  }

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "https://instagram.com/hariomjangidarchitects", label: "Instagram" },
  ]

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="/images/hariom-jangid-logo.png"
                alt="Hariom Jangid Architects"
                className="h-10 sm:h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md text-sm sm:text-base">
              Creating innovative architectural solutions that inspire and endure. We are committed to designing spaces
              that enhance the human experience while respecting our environment.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                <Phone className="h-4 sm:h-5 w-4 sm:w-5 text-primary-300" />
                <span>+91 8655797417</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                <Mail className="h-4 sm:h-5 w-4 sm:w-5 text-primary-300" />
                <span>hariomjangidarchitects@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm sm:text-base">
                <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-primary-300" />
                <span>123 Design Street, Architecture City, AC 12345</span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-primary-300 transition-colors duration-300 text-left text-sm sm:text-base"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-medium mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-primary-300 transition-colors duration-300 text-left text-sm sm:text-base"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © Hariom Jangid Architects 2025. All Rights Reserved
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="h-4 sm:h-5 w-4 sm:w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
