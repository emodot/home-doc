import React from "react";
import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import MainLayout from "../layouts/MainLayout";

// Lazy Loaded Pages
const Home = lazy(() => import("../pages/home"));
const AboutUs = lazy(() => import("../pages/about-us"));
// const ContactUs = lazy(() => import("../pages/contact-us"));
const WhatWeDo = lazy(() => import("../pages/what-we-do"));
const PlansAndPricing = lazy(() => import("../pages/plans-and-pricing"));
// const HighResolutionGeophysicalSurvey = lazy(() => import("../pages/services/high-resolution-geophysical-survey"));
// const GeotechnicalSiteInvestigations = lazy(() => import("../pages/services/geotechnical-site-investigations"));
// const Projects = lazy(() => import("../pages/projects"));
// const Blog = lazy(() => import("../pages/blog"));

const router = createBrowserRouter([
  {
    path: "",
    errorElement: <ErrorPage />,
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      // {
      //   path: "/contact-us",
      //   element: <ContactUs />,
      // },
      {
        path: "/what-we-do",
        element: <WhatWeDo />,
      },
      {
        path: "/plans-and-pricing",
        element: <PlansAndPricing />,
      },
      // {
      //   path: "/services/high-resolution-geophysical-survey",
      //   element: <HighResolutionGeophysicalSurvey />,
      // },
      // {
      //   path: "/services/geotechnical-site-investigations",
      //   element: <GeotechnicalSiteInvestigations />,
      // },
      // {
      //   path: "/projects",
      //   element: <Projects />,
      // },
      // {
      //   path: "/blog",
      //   element: <Blog />,
      // },
    ],
  },
]);

export { router };
