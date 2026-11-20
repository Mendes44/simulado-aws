/* eslint-disable @next/next/no-img-element -- ImageResponse renderiza img nativo, sem o componente next/image. */
import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// A logo é embutida na imagem para não depender de uma requisição externa durante o build.
export const alt = 'DevMendes - Simulado AWS SAA-C03';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const logoUrl = `data:image/png;base64,${readFileSync(join(process.cwd(), 'public/brand/devmendes.png')).toString('base64')}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '64px 72px', background: '#0F172A', color: '#F8FAFC', borderLeft: '16px solid #FF9900', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 34 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 190, height: 104, borderRadius: 18, overflow: 'hidden', backgroundColor: '#F8FAFC' }}><img src={logoUrl} alt="DevMendes" width={190} height={190} style={{ flexShrink: 0 }} /></div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 36, color: '#38BDF8', fontWeight: 800 }}>DevMendes</div>
          <div style={{ display: 'flex', fontSize: 20, color: '#CBD5E1', marginTop: 8 }}>Seu próximo passo na nuvem</div>
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 65, fontWeight: 800 }}>Simulado AWS <span style={{ color: '#FF9900', marginLeft: 20 }}>SAA-C03</span></div>
      <div style={{ display: 'flex', fontSize: 28, color: '#CBD5E1', marginTop: 25 }}>65 questões · 130 minutos · Revisão comentada</div>
      <div style={{ display: 'flex', fontSize: 25, color: '#7DD3FC', marginTop: 27 }}>Treinos rápidos e mapas mentais para baixar</div>
      <div style={{ display: 'flex', fontSize: 18, color: '#94A3B8', marginTop: 31 }}>Preparatório independente · Solutions Architect Associate</div>
    </div>,
    size,
  );
}

