import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://simulado-aws-pi.vercel.app'),
  title: 'Simulado AWS SAA-C03 | Solutions Architect Associate',
  description:
    'Treine com questões de prática para a certificação AWS SAA-C03, correção imediata com resumo de fixação, pontuação estimada (100–1000) e ranking.',
  openGraph: {
    title: 'Simulado AWS SAA-C03 — Solutions Architect Associate',
    description:
      'Teste seus conhecimentos com nota estimada (meta 720/1000) com feedback instantâneo, resumo técnico e histórico de gabaritos.',
    url: 'https://simulado-aws-pi.vercel.app',
    siteName: 'Simulado AWS SAA-C03',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulado AWS SAA-C03 — Solutions Architect Associate',
    description:
      'Questões de prática no formato SAA-C03, correção imediata, nota 100–1000 e ranking.',
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