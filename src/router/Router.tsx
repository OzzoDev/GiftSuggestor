import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/error/NotFoundPage";
import RouteWrapper from "./RouteWrapper";

// Import lazy components
const GiftDetailsPage = lazy(() => import("../pages/gift/GiftDetailsPage"));
const FavoriteGiftsPage = lazy(() => import("../pages/gift/FavoriteGiftsPage"));
const AddGiftPage = lazy(() => import("../pages/gift/AddGiftPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path="favorites"
        element={
          <RouteWrapper>
            <FavoriteGiftsPage />
          </RouteWrapper>
        }
      />
      <Route
        path="gift/:giftid"
        element={
          <RouteWrapper>
            <GiftDetailsPage />
          </RouteWrapper>
        }
      />
      <Route
        path="addgift"
        element={
          <RouteWrapper>
            <AddGiftPage />
          </RouteWrapper>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
