import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import AppLayout from "./layouts/app-layout/AppLayout";
import AppLayoutMobile from "./layouts/app-layout-mobile/AppLayoutMobile";
import Home from "./pages/home/Home";
import Title from "./pages/title/Title";
import NotFound from "./pages/not-found/NotFound";
import { useState } from "react";
import ThemeContext from "./context/ThemeContext"
import { getColorScheme, setColorScheme } from "./utils/colorScheme";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { CssBaseline } from "@mui/material";
import AuthPage from "./features/auth/components/AuthPage";
import { DEVICE, useDeviceDetect } from "./hooks/useDeviceDetect";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./features/auth/components/AuthProvider";
import Catalog from "./pages/catalog/Catalog";


function App() {
  const [isDarkMode, setIsDarkMode] = useState(getColorScheme() === "dark");

  const device = useDeviceDetect();

  const setTheme = (theme: string) => {
      setIsDarkMode(!isDarkMode);
      setColorScheme(theme);
  }

  return (
    <>
      <HelmetProvider>
        <ThemeContext.Provider
          value={{
            setTheme
          }}
        >
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
              <AuthProvider>
              <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="register" element={<AuthPage section="register" />}/>
                    <Route path="forgot" element={<AuthPage section="forgot" />}/>
                    <Route path="login" element={<AuthPage section="login" />}/>
                    <Route path="verify" element={<AuthPage section="verify" />}/>
                    <Route path="recovery" element={<AuthPage section="recovery"/>} />
                </Route>
                <Route path="/" element={device !== DEVICE.MOBILE ? <AppLayout /> : <AppLayoutMobile />}>
                    <Route index element={<Home/>} />
                    <Route path="manga/:id" element={<Title />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </AuthProvider>
          </ThemeProvider>
        </ThemeContext.Provider>
      </HelmetProvider>
    </>
  )
}

export default App
