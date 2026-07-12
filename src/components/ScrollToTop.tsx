import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Reset scroll position on route change (anchor jumps within a page still work). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
