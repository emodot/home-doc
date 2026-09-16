import React from "react";
import { lazy } from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import BookingLayout from "../layouts/BookingLayout";
import AdminLayout from "../layouts/AdminLayout";

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
const AdminLogin = lazy(() => import("../pages/admin/login"));
const AdminOverview = lazy(() => import("../pages/admin/overview"));
const AdminCareRequests = lazy(() => import("../pages/admin/care-requests"));
const AdminContactSubmissions = lazy(() => import("../pages/admin/contact-submissions"));
const AdminPlans = lazy(() => import("../pages/admin/plans"));

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
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <Navigate to="/admin/overview" replace /> },
      { path: "overview", element: <AdminOverview /> },
      { path: "care-requests", element: <AdminCareRequests /> },
      { path: "contact-submissions", element: <AdminContactSubmissions /> },
      { path: "plans", element: <AdminPlans /> },
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
