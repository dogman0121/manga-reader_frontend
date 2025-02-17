import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import AppLayout from "./layouts/app-layout/AppLayout";
import Home from "./pages/home/Home";
import Title from "./pages/title/Title";
import NotFound from "./pages/not-found/NotFound";
import { useEffect, useState } from "react";
import { EmptyUser } from "./types/User"
import UserContext from "./context/UserContext"
import fetchUser from "./services/api/fetchUser";


function App() {
  const [user, setUser] = useState(EmptyUser);

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
      <UserContext.Provider
        value={{
          user,
          setUser
        }}
      >
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
              <Route path="register"/>
              <Route path="login"/>
          </Route>
          <Route path="/" element={<AppLayout />}>
              <Route index element={<Home/>} />
              <Route path="manga/:id" element={<Title />} />
              <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
