import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/components-theme-toggle";
import {
  MortarBoardIcon,
  LayoutDashboardIcon,
  MessageCircleIcon,
  BarChartIcon,
  LayoutIcon,
  UserIcon,
} from "@/components/components-icons";
import { NavLink } from "@/components/components-nav-link";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/tutor", label: "AI Tutor", icon: MessageCircleIcon },
  { href: "/progress", label: "Progress", icon: BarChartIcon },
  { href: "/showcase", label: "Showcase", icon: LayoutIcon },
];

export async function Layout({ children }: { children: React.ReactNode }) {
  const user = { name: "John Doe" };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <Link href="/" className="flex items-center space-x-2">
            <MortarBoardIcon className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Wagademy</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="flex items-center w-full mb-2 text-left"
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ThemeToggle />
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 md:h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2" />
              <span>{user?.name || "Profile"}</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
