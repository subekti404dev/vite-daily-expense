import { useEffect, useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/Home";
import { History } from "./pages/History";
import { AccountPage } from "./pages/Account";
import theme from "./theme";
import "@fontsource/poppins";
import { StatusBar } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { Helmet } from "react-helmet";

function App() {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  useEffect(() => {
    if (Capacitor.getPlatform() !== "web") {
      StatusBar.setBackgroundColor({ color: "#705a9d" });
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <Box display={"flex"} justifyContent={"center"} color={"#1D1D1D"}>
        <Box maxW={"480px"} w={"100%"} h={"100vh"} position="relative">
          <Box height={"calc(100vh - 60px)"}>
            {activeMenuIndex === 0 && <HomePage />}
            {activeMenuIndex === 1 && <History />}
            {activeMenuIndex === 2 && <AccountPage />}
          </Box>
          <Navbar
            activeIndex={activeMenuIndex}
            onChange={(i: number) => setActiveMenuIndex(i)}
          />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
