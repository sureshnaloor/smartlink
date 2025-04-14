import { redirectToUnderConstruction } from "../../actions/redirect-actions";

export default async function PersonnelPage() {
  // This demo page is under construction, so we redirect to the under-construction page
  return redirectToUnderConstruction();
} 