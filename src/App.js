// import logo from './logo.svg';
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
}

export default App;
