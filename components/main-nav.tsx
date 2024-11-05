"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Monitor, Upload, User } from 'lucide-react'

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            Showey
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/upload"
              className={cn(
                "flex items-center space-x-2 text-sm transition-colors hover:text-primary",
                pathname === "/upload" && "text-primary"
              )}
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Link>
            <Link
              href="/venue/featured"
              className={cn(
                "flex items-center space-x-2 text-sm transition-colors hover:text-primary",
                pathname.startsWith("/venue") && "text-primary"
              )}
            >
              <Monitor className="h-4 w-4" />
              <span>Venues</span>
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center space-x-2 text-sm transition-colors hover:text-primary",
                pathname === "/dashboard" && "text-primary"
              )}
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}