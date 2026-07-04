import { ImageResponse } from 'next/og';

// Mengatur ukuran logo tab standar browser
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Proses pembuatan logo otomatis di server Next.js
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(to bottom right, #4f46e5, #06b6d4)', // Gradasi Indigo ke Cyan (Cyberpunk/Tech)
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
          fontWeight: '900',
          fontFamily: 'sans-serif',
        }}
      >
        R
      </div>
    ),
    {
      ...size,
    }
  );
}