import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import EditUser from "../pages/EditUser/EditUser";
import User from "../pages/Users/User";
import { UsersProvider } from "../hooks/useUsers";
// import NotFound from "../pages/NotFound/NotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/user" replace />} />
          <Route path="/editUser" element={<EditUser />} />
          <Route path="/user" element={<User />} />

          {/* Якщо маршрут не знайдено
        <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </UsersProvider>
    </BrowserRouter>
  );
}

export default AppRouter;