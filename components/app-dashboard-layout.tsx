import Link from 'next/link';
import {
  MortarBoardIcon,
  LayoutDashboardIcon,
  MessageCircleIcon,
  BarChartIcon,
  LayoutIcon,
} from '@/components/icons';
import { type User } from 'next-auth';
import { SidebarUserNav } from './custom/sidebar-user-nav';
import { SidebarProvider } from './ui/sidebar';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboardIcon },
  { href: '/tutor', label: 'AI Tutor', icon: MessageCircleIcon },
  { href: '/progress', label: 'Progress', icon: BarChartIcon },
  { href: '/showcase', label: 'Showcase', icon: LayoutIcon },
];

export async function Layout({
  children,
  user,
  currentPath,
}: {
  children: React.ReactNode;
  user: User | undefined;
  currentPath: string;
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex w-48 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <Link href="/" className="flex items-center space-x-2">
            <MortarBoardIcon className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">Code Teacher</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 ">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center w-full mb-2 text-left hover:bg-green-100 dark:hover:bg-green-700 p-2 rounded-lg transition-colors duration-200 ${currentPath === item.href ? 'bg-green-100 dark:bg-green-700' : ''}`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="fixed bottom-100 text-sm">
            <div className="h-px mb-4 bg-gray-200 dark:bg-gray-700" />
            <SidebarProvider defaultOpen={true}>
              {user && <SidebarUserNav user={user} />}
            </SidebarProvider>
          </div>
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
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
