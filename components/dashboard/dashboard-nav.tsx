"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { logout } from "@/lib/store/slices/auth-slice"
import { Button } from "@/components/ui/button"
import { Package, LayoutGrid, LogOut, User, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  {
    title: "Products",
    href: "/dashboard",
    icon: LayoutGrid,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const email = useAppSelector((state) => state.auth.email)

  const handleLogout = () => {
    dispatch(logout())
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full animate-slide-in border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-all hover:shadow-lg">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden text-lg font-semibold sm:inline">Admin Dashboard</span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn("gap-2 transition-all", isActive && "bg-secondary")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{email}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 transition-all hover:scale-105">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="sm:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="truncate">{email}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
