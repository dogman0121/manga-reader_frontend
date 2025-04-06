import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import AppLayout from "./layouts/app-layout/AppLayout";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import { useEffect, useState } from "react";
import ThemeContext from "./context/ThemeContext"
import { getColorScheme, setColorScheme } from "./utils/colorScheme";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./theme";
import { CssBaseline } from "@mui/material";
import AuthPage from "./features/auth/components/AuthPage";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./features/auth/components/AuthProvider";
import Catalog from "./pages/catalog/Catalog";
import AddTitle from "./pages/title-form/AddTitle";
import FormLayout from "./layouts/form-layout/FormLayout";
import UpdateTitle from "./pages/title-form/UpdateTitle";
import CommentPage from "./pages/comment/CommentPage";
import TitlePage from "./pages/title/TitlePage";


function App() {
  const [theme, setTheme] = useState<"dark" | "light">(getColorScheme());

  const handleSetTheme = (theme: "dark" | "light") => {
      setColorScheme(theme);
      setTheme(theme);
  }

  useEffect(() => {
    setColorScheme(getColorScheme());

    return () => {}
  }, [])

  return (
    <>
      <HelmetProvider>
        <ThemeContext.Provider
          value={{
            setTheme: handleSetTheme
          }}
        >
          <ThemeProvider theme={getTheme(theme)}>
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
                <Route path="/" element={<AppLayout />}>
                    <Route element={<FormLayout/>}>
                        <Route path="manga/add" element={<AddTitle/>} />
                        <Route path="manga/:id/edit" element={<UpdateTitle/>} />
                    </Route>
                    <Route index element={<Home/>} />
                    <Route path="manga/:id" element={<TitlePage />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="comment/:id" element={<CommentPage />} />
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
