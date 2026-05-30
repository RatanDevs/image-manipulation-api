import './globals.css'

export const metadata = {
  title: 'PicScale - Premium Image Processing API',
  description: 'Fast and reliable real-time serverless image resizing, cropping, compression, and format conversion API.',
  icons: {
    icon: '/image.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body class="bg-[#fafbfd] text-slate-800 antialiased min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  )
}
