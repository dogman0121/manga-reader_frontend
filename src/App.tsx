import { Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/not-found/NotFound";
import { AppRoutes, AuthRoutes, ChapterRoutes, TeamRoutes } from "./routes";
import TeamIndex from "./pages/teams";
import TeamCreate from "./pages/teams/create";
import TeamEdit from "./pages/teams/edit";
import ChapterIndex from "./pages/chapters";
import ChapterCreate from "./pages/chapters/create";
import ChapterEdit from "./pages/chapters/edit";
import { DEVICE, useDeviceDetect } from "./hooks/useDeviceDetect";
import FormLayout from "./layouts/form-layout/FormLayout";
import NotificationsRouter from "./modules/notifications/NotificationsRouter";
import HomeRouter from "./modules/home/HomeRouter";
import TitleRouter from "./modules/titles/TitleRouter";
import ListsRouter from "./modules/lists/ListsRouter";
import UsersRouter from "./modules/users/UsersRouter";

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
                <Route element={<AppLayout />}>
                    <Route>
                        <Route path={AuthRoutes.REGISTER} element={<AuthPage section="register" />}/>
                        <Route path={AuthRoutes.FORGOT} element={<AuthPage section="forgot" />}/>
                        <Route path={AuthRoutes.LOGIN} element={<AuthPage section="login" />}/>
                        <Route path={AuthRoutes.VERIFY} element={<AuthPage section="verify" />}/>
                        <Route path={AuthRoutes.RECOVERY} element={<AuthPage section="recovery"/>} />
                    </Route>
                    <Route element={<FormLayout />}>
                        <Route path={ChapterRoutes.ADD} element={<ChapterCreate/>} />
                        <Route path={ChapterRoutes.EDIT} element={<ChapterEdit/>} />
                    </Route>
                    <Route path={AppRoutes.CATALOG} element={<Catalog />} />
                    <Route>
                        <Route path={TeamRoutes.INDEX} element={<TeamIndex />}/>
                        <Route path={TeamRoutes.ADD} element={<TeamCreate />}/>
                        <Route path={TeamRoutes.EDIT} element={<TeamEdit />}/>
                    </Route>
                    <Route path={AppRoutes.COMMENT} element={<CommentPage />} />

                    <Route path={AppRoutes.USERS} element={<UsersRouter />} />
                    <Route path={AppRoutes.HOME} element={<HomeRouter />} />
                    <Route path={AppRoutes.NOTIFICATIONS} element={<NotificationsRouter />}/>
                    <Route path={AppRoutes.TITLE} element={<TitleRouter />} />
                    <Route path={AppRoutes.NOT_FOUND} element={<NotFound />} />
                    <Route path={AppRoutes.LISTS} element={<ListsRouter />} />
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
