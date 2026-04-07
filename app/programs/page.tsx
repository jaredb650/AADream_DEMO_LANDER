import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "AAD offers mentorship, professional development, and career advancement programs for first-generation, low-income AAPI undergraduates.",
  alternates: { canonical: "https://asianamericandream.org/#programs" },
};

export default function ProgramsRedirect() {
  redirect("/#programs");
}
