import { Box, Container } from "@mantine/core";
import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, Header } from "../components";

const Layout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Container sx={{ minHeight: "100%" }}>
      <Header />
      <Box mt={80} sx={{ minHeight: "60vh" }}>
        <Outlet />
      </Box>
      <Footer />
    </Container>
  );
};

export default Layout;
