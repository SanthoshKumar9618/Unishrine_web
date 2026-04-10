import "./globals.css";
import Navbar from "@/components/layout/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen text-black overflow-x-hidden">

  {/* 🌟 LIGHT GLOBAL BACKGROUND */}
  <div className="fixed inset-0 -z-10">

    {/* Base white */}
    <div className="absolute inset-0 bg-white" />

    {/* soft gradient tint */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

    {/* subtle glow */}
    <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-200/40 blur-[120px] rounded-full" />

    <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-200/40 blur-[120px] rounded-full" />

  </div>

  {/* content */}
  <Navbar />
  <main className="pt-24">{children}</main>

</body>
    </html>
  );
}