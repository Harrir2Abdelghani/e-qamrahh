import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qamrah - Premium Luxury Rentals",
  description: "Discover exclusive designer dresses, luxury jewelry, and premium accessories for your special moments. Rent, wear, return.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading Qamrah...</p>
              </div>
            </div>
          }>
            {children}
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}