import LegalPage from "../components/LegalPage";
import { privacyMarkdown } from "../content/legal";

export default function Privacy() {
  return <LegalPage title="Privacy Policy" markdown={privacyMarkdown} />;
}
