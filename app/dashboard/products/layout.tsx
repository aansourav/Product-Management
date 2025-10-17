import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Products | Product Management",
    template: "%s | Product Management",
  },
  description: "Manage your product inventory with our modern dashboard",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
