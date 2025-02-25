import Header from "./header/Header";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
