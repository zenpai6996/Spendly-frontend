import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useUserAuth } from '@/hooks/useUserAuth'

const NavBar = () => {
  
  return (
    <div>
      <header className="border-b border-border transition-all duration-300 backdrop-blur-sm bg-background/90 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <span className="text-primary-foreground font-bold text-sm">$</span>
              </div>
              <span className="font-bold text-xl transition-colors duration-300 group-hover:text-primary">
                Spendly
              </span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center transition-colors duration-300 relative group"
              >
                Products{" "}
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center transition-colors duration-300 relative group"
              >
                Resources{" "}
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105"
            >
              Log in
            </button>
            
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
              Sign up
            </button>
          </div>
        </div>
      </header>

    </div>
  )
}

export default NavBar