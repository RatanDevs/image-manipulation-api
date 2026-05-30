# PicScale - Serverless Image Manipulation API

PicScale is a lightweight, high-performance serverless image processing API built with Next.js (App Router) and Sharp. It fetches remote images dynamically, compresses, resizes, crops, and converts them between formats based on URL query parameters, and serves them with optimal caching headers directly through Vercel’s Edge CDN.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRatanDevs%2Fimage-manipulation-api)

---

## Features

- **On-the-Fly Resizing:** Scale images to any width or height while maintaining proportions.
- **Smart Center Crop:** Crop excess canvas from the center to strictly fit specified box dimensions.
- **Compression Control:** Adjust output quality (1-100) to balance fidelity and file size.
- **Format Conversion:** Convert images dynamically on-the-fly to WebP, JPEG, PNG, or preserve the `original` format.
- **Auto Format Detection:** Supports JPEG, PNG, and WebP, maintaining transparency channels when applicable.
- **Edge CDN Caching:** Out-of-the-box caching using Vercel’s edge layer for rapid repeat requests.
- **Responsive Dashboard:** Includes an interactive playground and integration documentation.

---

## File Structure

```text
├── package.json          # Project configurations & dependencies
├── postcss.config.js     # PostCSS configuration for Tailwind
├── tailwind.config.js    # Tailwind layout utility configurations
├── public/
│   └── image.svg         # Favicon logo
└── app/
    ├── layout.js         # Root HTML viewport layouts & metadata
    ├── globals.css       # Tailwind directives & CSS reset
    ├── page.js           # Server Component for dynamic base URL detection
    ├── Playground.js     # Client Component for playground UI
    ├── not-found.js      # App Router Custom 404 handler
    └── image/
        └── route.js      # Serverless GET function containing processing pipeline
```

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.x or newer) installed.

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RatanDevs/image-manipulation-api.git
   cd image-manipulation-api
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the interactive dashboard.

---

## API Reference

All requests must be sent as `GET` requests to the `/image` endpoint.

### Base Endpoint
```text
GET /image
```

### Request Parameters

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :---: | :---: | :--- |
| `src` | `string` | **Yes** | - | The absolute URL of the remote source image (JPEG, PNG, or WebP). |
| `w` | `integer` | No | - | Target width in pixels. If omitted, it scales relative to target height. |
| `h` | `integer` | No | - | Target height in pixels. If omitted, it scales relative to target width. |
| `crop` | `string` | No | `0` | Set to `1` to crop center regions to fit designated proportions. |
| `q` | `integer` | No | `80` | Image compression quality from `1` (smallest file) to `100` (best quality). |
| `format` | `string` | No | `original` | Target output format: `original`, `webp`, `jpeg` (or `jpg`), or `png`. |

---

## Usage Examples

### 1. Resize proportional to width (maintain aspect ratio)
Resize an image to `400px` wide, keeping natural proportional height:
```text
https://your-deployed-app.vercel.app/image?src=https://example.com/photo.jpg&w=400
```

### 2. Center crop into exact dimensions
Resize and crop excess margins to fill a `300px` square:
```text
https://your-deployed-app.vercel.app/image?src=https://example.com/photo.jpg&w=300&h=300&crop=1
```

### 3. Compress with lower quality
Reduce footprint with 50% compression quality:
```text
https://your-deployed-app.vercel.app/image?src=https://example.com/photo.jpg&w=800&q=50
```

### 4. Convert Image Format
Convert a PNG or JPEG source image dynamically to WebP format:
```text
https://your-deployed-app.vercel.app/image?src=https://example.com/photo.png&format=webp
```

---

## HTML Integration

You can integrate endpoints directly into your website's content markup:

```html
<img src="https://your-deployed-app.vercel.app/image?src=https://example.com/img.png&w=500&h=300&crop=1" alt="Cropped Hero Element" loading="lazy"/>
```

---

## Deploy to Vercel

The quickest way to host this project is to use the Vercel Deploy button at the top of this readme, or follow these manual steps:

1. Push your code repository to GitHub.
2. Go to the [Vercel Dashboard](https://vercel.com) and click **Add New > Project**.
3. Import your GitHub repository.
4. Leave build settings default and click **Deploy**.
