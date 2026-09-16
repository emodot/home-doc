// import logo from './logo.svg';
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { HelmetProvider } from "react-helmet-async";
import { PricingProvider } from "store/PricingProvider";

function App() {
  return (
    <HelmetProvider>
      <PricingProvider>
        <div className="">
          <RouterProvider router={router} />
        </div>
      </PricingProvider>
    </HelmetProvider>
  );
}

export default App;
