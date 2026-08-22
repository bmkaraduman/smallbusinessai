import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-6xl">🥙</span>
      <h1 className="font-display text-3xl font-semibold text-white">404</h1>
      <p className="max-w-sm text-slate-400">
        Deze pagina bestaat niet · Bu sayfa bulunamadı · Seite nicht gefunden ·
        Page not found
      </p>
      <Link href="/nl" className="btn-primary">
        Terug naar de startpagina
      </Link>
    </main>
  );
}
