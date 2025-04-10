"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Settings,
  Users,
  Ticket,
  DollarSign,
  Coffee,
  BarChart,
  UserCircle,
  Network,
  Info,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function MainHeader() {
  const { theme, setTheme } = useTheme()
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString())
  const pathname = usePathname()

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
      setCurrentDate(new Date().toLocaleDateString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const navItems = [
    { icon: <Home className="h-5 w-5 mb-1" />, label: "Home", href: "/" },
    { icon: <Settings className="h-5 w-5 mb-1" />, label: "Settings", href: "/settings" },
    { icon: <Users className="h-5 w-5 mb-1" />, label: "Members", href: "/members" },
    { icon: <Ticket className="h-5 w-5 mb-1" />, label: "Ticket", href: "/ticket" },
    { icon: <DollarSign className="h-5 w-5 mb-1" />, label: "Cash", href: "/cash" },
    { icon: <Coffee className="h-5 w-5 mb-1" />, label: "Cafeteria", href: "/cafeteria" },
    { icon: <BarChart className="h-5 w-5 mb-1" />, label: "Reports", href: "/reports" },
    { icon: <UserCircle className="h-5 w-5 mb-1" />, label: "Cashier", href: "/cashier" },
    { icon: <Network className="h-5 w-5 mb-1" />, label: "Network", href: "/network" },
    { icon: <Info className="h-5 w-5 mb-1" />, label: "About", href: "/about" },
  ]

  return (
    <header className="border-b dark:border-slate-700">
      <div className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-rose-600 dark:text-rose-500">
            SKZ Cafe Pro
          </Link>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold">{currentTime}</div>
          <div className="text-sm text-muted-foreground">{currentDate}</div>
        </div>
      </div>

      <nav className="flex items-center justify-between p-1 bg-white dark:bg-slate-950 overflow-x-auto">
        <div className="flex space-x-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                size="sm"
                className={`flex flex-col items-center h-auto py-2 px-3 ${
                  pathname === item.href
                    ? "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:hover:bg-rose-900/30"
                    : ""
                }`}
              >
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center h-auto py-2 px-3 text-rose-600 hover:text-rose-700 dark:text-rose-500 dark:hover:text-rose-400"
          >
            <LogOut className="h-5 w-5 mb-1" />
            <span className="text-xs">Exit</span>
          </Button>
        </div>
      </nav>
    </header>
  )
}
