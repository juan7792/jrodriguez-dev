"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

// Preserve old shared links such as /en/#projects when the home page changes.
export default function LegacyAnchorRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const oldSections = new Set([
      "#top",
      "#services",
      "#projects",
      "#tech",
      "#life",
      "#contact",
    ]);

    if (oldSections.has(hash)) {
      router.replace("/technical" + hash);
    }
  }, [router]);

  return null;
}
