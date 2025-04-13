"use server";

import { redirect } from "next/navigation";

/**
 * Redirects to the under-construction page with the requested path as a query parameter
 * Use this for links that point to pages that aren't implemented yet
 */
export async function redirectToUnderConstruction(path: string = "") {
  const encodedPath = encodeURIComponent(path || "");
  return redirect(`/under-construction?from=${encodedPath}`);
} 