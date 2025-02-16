import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import AppLayout from "./layouts/app-layout/AppLayout";
import Home from "./pages/home/Home";
import Title from "./pages/title/Title";
import NotFound from "./pages/not-found/NotFound";
import { useState } from "react";
import { User, EmptyUser } from "./types/User"
import UserContext from "./context/UserContext"


function App() {
  const [user, setUser] = useState(EmptyUser);

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
