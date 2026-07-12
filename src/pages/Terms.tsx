import LegalPage from "../components/LegalPage";
import { termsMarkdown } from "../content/legal";

export default function Terms() {
  return <LegalPage title="Terms of Service" markdown={termsMarkdown} />;
}
