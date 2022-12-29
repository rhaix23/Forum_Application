import { lazy, Suspense, useEffect } from "react";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getMe } from "./features/user/userThunks";
import { AppDispatch } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminRoute, ScrollToTop } from "./components";
import { Loader } from "./components/Loader";

// Page layouts
import Layout from "./pages/Layout";
import AdminLayout from "./pages/AdminLayout";

// Lazy load pages
const LazyHome = lazy(() => import("./pages/Home"));
const LazyPosts = lazy(() => import("./pages/Posts"));
const LazySinglePost = lazy(() => import("./pages/SinglePost"));
const LazyProfile = lazy(() => import("./pages/Profile"));
const LazyAdminCategory = lazy(() => import("./pages/AdminCategory"));
const LazyAdminSubcategory = lazy(() => import("./pages/AdminSubcategory"));
const LazyAdminPosts = lazy(() => import("./pages/AdminPosts"));
const LazyAdminComments = lazy(() => import("./pages/AdminComments"));
const LazyAdminUsers = lazy(() => import("./pages/AdminUsers"));

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "0",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Fira Sans, sans-serif",
          fontFamilyMonospace: "Fira Code, monospace",
          headings: { fontFamily: "Fira Sans, sans-serif" },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route
                index
                path="/"
                element={
                  <Suspense fallback={<Loader variant="dots" />}>
                    <LazyHome />
                  </Suspense>
                }
              />
              <Route
                path="/:id"
                element={
                  <Suspense fallback={<Loader variant="dots" />}>
                    <LazyPosts />
                  </Suspense>
                }
              />
              <Route
                path="/post/:id"
                element={
                  <Suspense fallback={<Loader variant="dots" />}>
                    <LazySinglePost />
                  </Suspense>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <Suspense fallback={<Loader variant="dots" />}>
                    <LazyProfile />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<Loader variant="dots" />}>
                    <LazyAdminCategory />
                  </Suspense>
                }
              />
              <Route
                path="/admin/subcategory"
                element={
                  <Suspense fallback={<Loader variant="dots" />}>
                    <LazyAdminSubcategory />
                  </Suspense>
                }
              />
              <Route
                path="/admin/posts"
                element={
                  <Suspense fallback={<Loader variant="dots" />}>
                    <LazyAdminPosts />
                  </Suspense>
                }
              />
              <Route
                path="/admin/comments"
                element={
                  <Suspense fallback={<Loader variant="dots" />}>
                    <LazyAdminComments />
                  </Suspense>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <Suspense fallback={<Loader variant="dots" />}>
                    <LazyAdminUsers />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <ScrollToTop />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
