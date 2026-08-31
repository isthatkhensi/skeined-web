import { Routes, Route } from "react-router-dom";
import PageViews from "./components/PageViews";
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
import Waitlisted from "./pages/Waitlisted";
import Beta from "./pages/Beta";
import Changelog from "./pages/Changelog";
import Install from "./pages/Install";
import BetaBanner from "./components/BetaBanner";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageViews />
      {/* Above <Routes> so it shows on every page, including a landing page
          someone reached directly from a story. */}
      <BetaBanner />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Landing />} />

        {/* Footer-linked content pages */}
        <Route path="/privacy" element={<Privacy />} />
        {/* the app links to /privacy-policy (constants/links.ts); /privacy kept as an alias */}
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/support" element={<Support />} />
        <Route path="/beta" element={<Beta />} />
        <Route path="/changelog" element={<Changelog />} />
        {/* Not in nav — reached only from a tester email. */}
        <Route path="/install" element={<Install />} />

        {/* Utility pages — reached only via direct links, not in nav/footer */}
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/auth-error" element={<AuthError />} />
        <Route path="/get" element={<Get />} />
        <Route path="/welcome" element={<Waitlisted />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
