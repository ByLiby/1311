import NextLink from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToHomeButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <NextLink
      href={href}
      className="luxury-button luxury-button-secondary inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full border border-gold/24 bg-card-bg px-4 py-2.5 text-xs font-semibold tracking-[0.08em] text-text-primary shadow-[0_14px_34px_rgba(0,0,0,0.34)] transition hover:border-gold/48 sm:px-5"
    >
      <ArrowLeft size={15} strokeWidth={2.3} className="text-gold" />
      <span>{label}</span>
    </NextLink>
  );
}
