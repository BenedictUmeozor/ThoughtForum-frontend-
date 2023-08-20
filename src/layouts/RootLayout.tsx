import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main>
      <Header />
      <section>
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default RootLayout;
