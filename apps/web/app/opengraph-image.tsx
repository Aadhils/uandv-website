import { ImageResponse } from 'next/og';

export const alt = 'U&V — Everything your business needs under one roof';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #08152F 0%, #3B1C78 55%, #7C3AED 100%)',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: '#102A56',
              border: '2px solid #A78BFA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            U&V
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>U&V</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
            Your AI-powered business technology & growth partner.
          </div>
          <div style={{ fontSize: 28, color: '#A78BFA' }}>
            Everything your business needs under one roof.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
