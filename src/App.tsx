import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import AppLayout from "./layouts/app-layout/AppLayout";
import Home from "./pages/home/Home";
import Title from "./pages/title/Title";
import NotFound from "./pages/not-found/NotFound";
import { useEffect, useState } from "react";
import { EmptyUser } from "./types/User"
import UserContext from "./context/UserContext"
import ThemeContext from "./context/ThemeContext"
import fetchUser from "./services/api/fetchUser";
import { getColorScheme, setColorScheme } from "./utils/colorScheme";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import { CssBaseline } from "@mui/material";
import Auth from "./features/Auth/components/Auth";
import AuthPage from "./features/Auth/components/AuthPage";


function App() {
  const [user, setUser] = useState(EmptyUser);

  const [isDarkMode, setIsDarkMode] = useState(getColorScheme() === "dark");
  
    const setTheme = (theme: string) => {
        setIsDarkMode(!isDarkMode);
        setColorScheme(theme);
    }

  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchUser();

      setUser(user);
    }

    loadUser();

    return () => {}
  }, [])

  return (
    <>
      <ThemeContext.Provider
        value={{
          setTheme
        }}
      >
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <UserContext.Provider
            value={{
              user,
              setUser
            }}
          >
            <Routes>
              <Route path="/auth" element={<AuthLayout />}>
                  <Route path="register" element={<AuthPage section="register" />}/>
                  <Route path="forgot" element={<AuthPage section="forgot" />}/>
                  <Route path="login" element={<AuthPage section="login" />}/>
                  <Route path="verify" element={<AuthPage section="verify" />}/>
                  <Route path="recovery" element={<AuthPage section="recovery"/>} />
              </Route>
              <Route path="/" element={<AppLayout />}>
                  <Route index element={<Home/>} />
                  <Route path="manga/:id" element={<Title />} />
                  <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </UserContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  )
}

export default App
