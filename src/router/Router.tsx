import { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { PuffLoader } from "react-spinners";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";

const GiftDetailsPage = lazy(() => import("../pages/gift/GiftDetailsPage"));

const Loader = (
  <PuffLoader
    size={50}
    className="absoulte top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2"
  />
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path="gift/:giftid"
        element={
          <Suspense fallback={Loader}>
            <GiftDetailsPage />
          </Suspense>
        }
      />
    </Route>
  )
);

export default router;
