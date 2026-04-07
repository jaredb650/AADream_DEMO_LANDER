import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Asian American Dream, a 501(c)(3) nonprofit founded in 2021 to forge new pathways to career success for AAPI undergraduates.",
  alternates: { canonical: "https://asianamericandream.org/#about" },
};

export default function AboutRedirect() {
  redirect("/#about");
}
