import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Note Taking App",
  description: "Note Taking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link
        className="absolute top-6 left-2 w-40 text-blue-500 p-1 bg-gray-300 hover:bg-gray-400 rounded flex justify-center items-center"
        href="/"
      >
        {`<= Return Home`}
      </Link>
      {children}
    </div>
  );
}
