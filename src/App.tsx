import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getMe } from "./features/user/userThunks";
import { Posts, Home, Profile, SinglePost } from "./pages";
import { Layout } from "./pages/Layout";
import { AppDispatch } from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScrollToTop } from "./components";

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
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Posts />} />
              <Route path="/post/:id" element={<SinglePost />} />
              <Route path="/profile" element={<Profile />} />
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
