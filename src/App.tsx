import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import AppLayout from "./layouts/app-layout/AppLayout";
import { useEffect, useState } from "react";
import ThemeContext from "./context/ThemeContext"
import { getColorScheme, setColorScheme } from "./utils/colorScheme";
import { ThemeProvider } from "@mui/material/styles";
import getTheme, { getMobileTheme } from "./theme";
import { CssBaseline } from "@mui/material";
import AuthPage from "./features/auth/components/AuthPage";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./features/auth/components/AuthProvider";
import Catalog from "./pages/catalog";
import CommentPage from "./pages/comment/CommentPage";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import UserProfile from "./pages/UserProfile";
import { AppRoutes, AuthRoutes, ChapterRoutes, TeamRoutes, TitleRoutes, UserRoutes } from "./routes";
import UserProfileSettings from "./pages/UserProfileSettings";
import TeamIndex from "./pages/teams";
import TeamCreate from "./pages/teams/create";
import TeamEdit from "./pages/teams/edit";
import ChapterIndex from "./pages/chapters";
import ChapterCreate from "./pages/chapters/create";
import ChapterEdit from "./pages/chapters/edit";
import { DEVICE, useDeviceDetect } from "./hooks/useDeviceDetect";
import TitleIndex from "./pages/title";
import TitleCreate from "./pages/title/create";
import FormLayout from "./layouts/form-layout/FormLayout";
import TitleUpdate from "./pages/title/update";

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(getColorScheme());

  const {device} = useDeviceDetect();

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
          <ThemeProvider theme={device == DEVICE.MOBILE ? getMobileTheme(theme) : getTheme(theme)}>
            <CssBaseline />
            <AuthProvider>
              <Routes>
                <Route path={ChapterRoutes.INDEX} element={<ChapterIndex/>} />
                <Route element={<AuthLayout />}>
                    <Route path={AuthRoutes.REGISTER} element={<AuthPage section="register" />}/>
                    <Route path={AuthRoutes.FORGOT} element={<AuthPage section="forgot" />}/>
                    <Route path={AuthRoutes.LOGIN} element={<AuthPage section="login" />}/>
                    <Route path={AuthRoutes.VERIFY} element={<AuthPage section="verify" />}/>
                    <Route path={AuthRoutes.RECOVERY} element={<AuthPage section="recovery"/>} />
                </Route>
                <Route element={<AppLayout />}>
                    <Route element={<FormLayout />}>
                        <Route path={ChapterRoutes.ADD} element={<ChapterCreate/>} />
                        <Route path={ChapterRoutes.EDIT} element={<ChapterEdit/>} />

                        <Route path={TitleRoutes.ADD} element={<TitleCreate/>} />
                        <Route path={TitleRoutes.EDIT} element={<TitleUpdate/>} />
                    </Route>
                    <Route>
                        <Route path={TitleRoutes.INDEX} element={<TitleIndex />} />
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
