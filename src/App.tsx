import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import AppLayout from "./layouts/app-layout/AppLayout";
import { useEffect, useState } from "react";
import ThemeContext from "./context/ThemeContext"
import { getColorScheme, setColorScheme } from "./utils/colorScheme";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./theme";
import { CssBaseline } from "@mui/material";
import AuthPage from "./features/auth/components/AuthPage";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./features/auth/components/AuthProvider";
import Catalog from "./pages/catalog";
import AddTitle from "./pages/title-form/AddTitle";
import UpdateTitle from "./pages/title-form/UpdateTitle";
import CommentPage from "./pages/comment/CommentPage";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import TitlePage from "./pages/title/TitlePage";
import UserProfile from "./pages/UserProfile";
import { AppRoutes, AuthRoutes, MangaRoutes, TeamRoutes, UserRoutes } from "./routes";
import UserProfileSettings from "./pages/UserProfileSettings";
import TeamIndex from "./pages/teams";
import TeamCreate from "./pages/teams/create";
import TeamEdit from "./pages/teams/edit";


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
                <Route element={<AuthLayout />}>
                    <Route path={AuthRoutes.REGISTER} element={<AuthPage section="register" />}/>
                    <Route path={AuthRoutes.FORGOT} element={<AuthPage section="forgot" />}/>
                    <Route path={AuthRoutes.LOGIN} element={<AuthPage section="login" />}/>
                    <Route path={AuthRoutes.VERIFY} element={<AuthPage section="verify" />}/>
                    <Route path={AuthRoutes.RECOVERY} element={<AuthPage section="recovery"/>} />
                </Route>
                <Route element={<AppLayout />}>
                    <Route>
                        <Route path={MangaRoutes.INDEX} element={<TitlePage />} />
                        <Route path={MangaRoutes.ADD} element={<AddTitle/>} />
                        <Route path={MangaRoutes.EDIT} element={<UpdateTitle/>} />
                    </Route>
                    <Route index element={<Home/>} />
                    <Route path={AppRoutes.CATALOG} element={<Catalog />} />
                    <Route>
                        <Route path={UserRoutes.INDEX} element={<UserProfile />} />
                        <Route path={UserRoutes.SETTINGS} element={<UserProfileSettings />} />
                    </Route>
                    <Route>
                        <Route path={TeamRoutes.INDEX} element={<TeamIndex />}/>
                        <Route path={TeamRoutes.ADD} element={<TeamCreate />}/>
                        <Route path={TeamRoutes.EDIT} element={<TeamEdit />}/>
                    </Route>
                    <Route path={AppRoutes.COMMENT} element={<CommentPage />} />
                    <Route path={AppRoutes.NOT_FOUND} element={<NotFound />} />
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
