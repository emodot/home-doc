import React from "react";
import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import BookingLayout from "../layouts/BookingLayout";

// Lazy Loaded Pages
const Home = lazy(() => import("../pages/home"));
const AboutUs = lazy(() => import("../pages/about-us"));
const ContactUs = lazy(() => import("../pages/contact-us"));
const WhatWeDo = lazy(() => import("../pages/what-we-do"));
const PlansAndPricing = lazy(() => import("../pages/plans-and-pricing"));
const FAQ = lazy(() => import("../pages/faq"));
const TermsAndConditions = lazy(() => import("../pages/terms-and-conditions"));
const Request = lazy(() => import("../pages/request"));
const Personal = lazy(() => import("../pages/request/personal"));
const ElderlyOne = lazy(() => import("../pages/request/elderly-one"));
const ReviewRequest = lazy(() => import("../pages/request/review"));

const router = createBrowserRouter([
  {
    path: "/request",
    element: (
      <BookingLayout>
        <Outlet />
      </BookingLayout>
    ),
    children: [
      {
        path: "",
        element: <Request />,
      },
      {
        path: "personal",
        element: <Personal />,
      },
      {
        path: "elderly-one",
        element: <ElderlyOne />,
      },
      {
        path: "review",
        element: <ReviewRequest />,
      },
    ],
  },
  {
    path: "/",
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
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/what-we-do",
        element: <WhatWeDo />,
      },
      {
        path: "/plans-and-pricing",
        element: <PlansAndPricing />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
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
