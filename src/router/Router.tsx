import { lazy, Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { PuffLoader } from "react-spinners";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";

const GiftDetailsPage = lazy(() => import("../pages/gift/GiftDetailsPage"));
const FavoriteGiftsPage = lazy(() => import("../pages/gift/FavoriteGiftsPage"));
const AddGiftPage = lazy(() => import("../pages/gift/AddGiftPage"));

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
        path="favorites"
        element={
          <Suspense fallback={Loader}>
            <FavoriteGiftsPage />
          </Suspense>
        }
      />
      <Route
        path="gift/:giftid"
        element={
          <Suspense fallback={Loader}>
            <GiftDetailsPage />
          </Suspense>
        }
      />
      <Route
        path="addgift"
        element={
          <Suspense fallback={Loader}>
            <AddGiftPage />
          </Suspense>
        }
      />
    </Route>
  )
);

export default router;
