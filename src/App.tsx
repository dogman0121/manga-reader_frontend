import { Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout/AuthLayout";
import AppLayout from "./layouts/app-layout/AppLayout";
import Home from "./pages/home/Home";
import Title from "./pages/title/Title";
import NotFound from "./pages/not-found/NotFound";

function App() {

  return (
    <>
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
    </>
  )
}

export default App
