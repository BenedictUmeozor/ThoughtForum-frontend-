import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main>
      <Header />
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default RootLayout;
