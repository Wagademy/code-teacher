import Link from "next/link";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";

export async function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      className={className}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
