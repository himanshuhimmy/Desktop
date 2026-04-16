import { BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider }   from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import PublicRoutes    from "./routes/public.routes";
import ProtectedRoutes from "./routes/protected.routes";
import NotFound        from "./pages/NotFound";
import { Route }       from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            {PublicRoutes}
            {ProtectedRoutes}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
