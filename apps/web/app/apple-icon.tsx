import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #08152F 0%, #3B1C78 55%, #7C3AED 100%)',
          borderRadius: 40,
          color: 'white',
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: '-0.04em',
        }}
      >
        U&V
      </div>
    ),
    size,
  );
}
