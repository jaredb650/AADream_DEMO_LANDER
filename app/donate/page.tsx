import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support first-generation, low-income AAPI undergraduates. Every dollar funds mentorship, professional development, and career programs.",
  alternates: { canonical: "https://asianamericandream.org/#donate" },
};

export default function DonateRedirect() {
  redirect("/#donate");
}
