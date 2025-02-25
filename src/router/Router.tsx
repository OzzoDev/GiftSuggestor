// import { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
// import { PuffLoader } from "react-spinners";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";

// const Loader = <PuffLoader size={50} />;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  )
);

export default router;
