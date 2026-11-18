import { ImageResponse } from 'next/og';

// O Next publica esta imagem PNG em /opengraph-image para as prévias dos links.
export const alt = 'Simulado AWS SAA-C03 — Solutions Architect Associate';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', background: '#0F172A', color: '#F8FAFC', borderLeft: '18px solid #FF9900', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', color: '#FF9900', fontSize: 28, letterSpacing: 5, marginBottom: 32 }}>SOLUTIONS ARCHITECT ASSOCIATE</div>
        <div style={{ display: 'flex', fontSize: 78, fontWeight: 800 }}>Simulado AWS</div>
        <div style={{ display: 'flex', fontSize: 88, fontWeight: 800, color: '#FF9900', marginBottom: 30 }}>SAA-C03</div>
        <div style={{ display: 'flex', fontSize: 30, color: '#CBD5E1' }}>Pratique. Revise seus erros. Acompanhe sua evolução.</div>
        <div style={{ display: 'flex', marginTop: 38, fontSize: 23, color: '#94A3B8' }}>Questões em português • Correção imediata • Histórico de resultados</div>
      </div>
    ),
    size,
  );
}
