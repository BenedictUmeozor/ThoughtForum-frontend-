import { Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const RootLayout = () => {
  return (
    <main className="main">
      <div>
        <Header />
      </div>
      <section>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </section>
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default RootLayout;
