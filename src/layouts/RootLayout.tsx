import Header from "./header/Header";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import PageTransition from "./animations/PageTransition";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function RootLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_FAVGIFTIDS" });
  }, []);

  return (
    <>
      <Header />
      <main className="relative mt-[65px] min-h-screen">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
