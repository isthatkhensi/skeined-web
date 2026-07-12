import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./components/Landing";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DeleteAccount from "./pages/DeleteAccount";
import ResetPassword from "./pages/ResetPassword";
import Confirm from "./pages/Confirm";
import AuthError from "./pages/AuthError";
import Get from "./pages/Get";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Landing />} />

        {/* Footer-linked content pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />

        {/* Utility pages — reached only via direct links, not in nav/footer */}
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/auth-error" element={<AuthError />} />
        <Route path="/get" element={<Get />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
