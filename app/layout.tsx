import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://simulado-aws-pi.vercel.app'),
  title: 'DevMendes | Simulado AWS SAA-C03',
  description:
    'Treine com questões de prática para a certificação AWS SAA-C03, prova de 65 questões em 130 minutos, treinos rápidos e mapas mentais para baixar.',
  openGraph: {
    title: 'Simulado AWS SAA-C03 — Solutions Architect Associate',
    description:
      'DevMendes: prova de 65 questões em 130 minutos, treinos rápidos, revisão comentada e mapas mentais.',
    url: 'https://simulado-aws-pi.vercel.app',
    siteName: 'DevMendes | Simulado AWS SAA-C03',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulado AWS SAA-C03 — Solutions Architect Associate',
    description:
      'DevMendes: modo prova, treinos rápidos e mapas mentais SAA-C03 para baixar.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[#0F172A] text-slate-100">{children}</body>
    </html>
  );
}