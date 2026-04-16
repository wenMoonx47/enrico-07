// Root layout — minimal wrapper required by Next.js App Router.
// All locale-specific layout is handled in app/[locale]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
