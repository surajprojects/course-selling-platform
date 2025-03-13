import RootWrapper from "@/components/rootWrapper";
import "./globals.css";
import Footer from "@course-selling-platform/ui/src/components/footer";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RootWrapper>
        <html lang="en">
          <body className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </body>
        </html>
      </RootWrapper>
    </>
  );
};