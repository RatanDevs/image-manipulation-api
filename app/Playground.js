'use client';

import { useState } from 'react';

export default function Playground({ apiUrl }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [srcUrl, setSrcUrl] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quality, setQuality] = useState(80);
  const [crop, setCrop] = useState(false);
  const [format, setFormat] = useState('original'); // New State
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [previewState, setPreviewState] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [copied, setCopied] = useState(false);

  const loadDemoImage = () => {
    setSrcUrl("https://images.unsplash.com/photo-1541701494587-cb58502866ab");
  };

  const generateImage = () => {
    if (!srcUrl) return;

    const params = new URLSearchParams();
    params.append('src', srcUrl);

    if (width) params.append('w', width);
    if (height) params.append('h', height);
    if (crop) params.append('crop', '1');
    if (quality !== 80) params.append('q', quality.toString());
    if (format && format !== 'original') params.append('format', format); // Append Format parameter

    const finalUrl = `${apiUrl}?${params.toString()}`;
    setGeneratedUrl(finalUrl);
    setPreviewState('loading');
  };

  const copyToClipboard = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* Header */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="bg-indigo-600 text-white p-2 rounded-xl shadow-md shadow-indigo-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375 0 1 1-.75 0 .375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <span class="font-bold text-lg sm:text-xl tracking-tight text-slate-900">PicScale<span class="text-indigo-600">.</span></span>
          </div>

          <nav class="hidden md:flex items-center space-x-8">
            <a href="#playground" class="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Playground</a>
            <a href="#docs" class="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Documentation</a>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} type="button" class="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg">
            {!mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div class="md:hidden border-b border-slate-100 bg-white px-4 py-4 space-y-3 shadow-inner">
            <a onClick={() => setMobileMenuOpen(false)} href="#playground" class="block py-2.5 px-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg">Playground</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#docs" class="block py-2.5 px-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg">Documentation</a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-grow w-full">
        <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span class="inline-block text-indigo-600 font-semibold text-xs tracking-wider uppercase px-3 py-1 bg-indigo-50 rounded-full">Fast & Reliable</span>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-4 sm:mb-6 leading-tight">
            Compress, Resize, & Crop Images Effortlessly
          </h1>
          <p class="text-base sm:text-lg text-slate-500">
            A highly optimized, server-side image processing utility. Just pass your parameters via URL query strings and request instantly.
          </p>
        </div>

        {/* Playground Grid */}
        <section id="playground" class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-20 scroll-mt-24">
          <div class="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md flex flex-col justify-between">
            <form onSubmit={(e) => { e.preventDefault(); generateImage(); }} class="space-y-5 sm:space-y-6">
              <div>
                <label for="img-url" class="block text-sm font-semibold text-slate-700 mb-2">Source Image URL</label>
                <div class="relative">
                  <input type="url" id="img-url" required value={srcUrl} onChange={(e) => setSrcUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5"
                    class="w-full pl-4 pr-16 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-800"
                  />
                  <button type="button" onClick={loadDemoImage} class="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1.5 rounded-lg">Demo</button>
                </div>
              </div>

              <div>
                <button type="button" onClick={() => setAdvancedOpen(!advancedOpen)} class="w-full flex items-center justify-between py-2 border-b border-slate-100 text-slate-700 hover:text-slate-900 font-semibold text-sm">
                  <span>Advanced Settings</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" class={`w-4 h-4 transition-transform duration-200 ${advancedOpen ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {advancedOpen && (
                  <div class="mt-4 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Width (px)</label>
                        <input type="number" min="0" placeholder="e.g., 600" value={width} onChange={(e) => setWidth(e.target.value)}
                          class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-slate-600 mb-1.5">Height (px)</label>
                        <input type="number" min="0" placeholder="e.g., 400" value={height} onChange={(e) => setHeight(e.target.value)}
                          class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" />
                      </div>
                    </div>

                    {/* Output Format Dropdown */}
                    <div>
                      <label class="block text-xs font-semibold text-slate-600 mb-1.5">Output Format</label>
                      <select value={format} onChange={(e) => setFormat(e.target.value)}
                        class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700">
                        <option value="original">Original (Match Source)</option>
                        <option value="webp">WebP (Recommended)</option>
                        <option value="jpeg">JPEG (Standard)</option>
                        <option value="png">PNG (Lossless)</option>
                      </select>
                    </div>

                    <div>
                      <div class="flex justify-between items-center mb-1.5">
                        <label class="text-xs font-semibold text-slate-600">Compression Quality</label>
                        <span class="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{quality}%</span>
                      </div>
                      <input type="range" min="1" max="100" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))}
                        class="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                    </div>

                    <div class="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <div>
                        <span class="block text-xs font-semibold text-slate-700">Crop Image to Fit</span>
                        <span class="block text-[10px] text-slate-400">Forces exact dimensions, crops center</span>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={crop} onChange={(e) => setCrop(e.target.checked)} class="sr-only peer" />
                        <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-100 transition-all text-sm">
                Process Image
              </button>
            </form>
          </div>

          <div class="lg:col-span-7 flex flex-col space-y-6">
            <div class="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between flex-grow min-h-[300px] sm:min-h-[350px]">
              <span class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Live Preview Output</span>
              
              <div class="relative flex-grow flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 overflow-hidden p-4">
                {previewState === 'idle' && (
                  <div class="text-center py-8 flex flex-col items-center">
                    <svg class="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 stroke-[1.5] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375 0 1 1-.75 0 .375 0 0 1 .75 0Z" />
                    </svg>
                    <span class="text-xs sm:text-sm font-medium text-slate-400">Load a demo image or enter an URL to see changes</span>
                  </div>
                )}

                {previewState === 'loading' && (
                  <div class="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div class="flex flex-col items-center space-y-3">
                      <div class="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      <span class="text-xs text-slate-500 font-medium">Processing on server...</span>
                    </div>
                  </div>
                )}

                {previewState === 'error' && (
                  <div class="text-center py-8 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-10 h-10 text-rose-500 mb-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008h-.008v-.008Z" />
                    </svg>
                    <span class="text-xs sm:text-sm font-semibold text-rose-600">Failed to render image</span>
                    <p class="text-[11px] text-slate-400 mt-1 max-w-xs">Double-check the file URL or verify if it's a valid JPEG, PNG, or WebP.</p>
                  </div>
                )}

                <img
                  className={`${previewState === 'success' ? '' : 'hidden'} max-h-[250px] sm:max-h-[300px] object-contain rounded-lg shadow-sm`}
                  src={generatedUrl}
                  alt="API Generated Output"
                  onLoad={() => setPreviewState('success')}
                  onError={() => setPreviewState('error')}
                />
              </div>
            </div>

            <div class="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-sm">
              <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Generated Endpoint URL</label>
              <div class="flex flex-col sm:flex-row gap-2">
                <input type="text" readonly value={generatedUrl}
                  class="flex-grow px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-mono text-slate-600 focus:outline-none" />
                <button type="button" onClick={copyToClipboard} class={`w-full sm:w-auto px-4 py-2.5 text-white rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center space-x-1.5 shrink-0 ${copied ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-4 h-4">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* API Documentation */}
        <section id="docs" class="border-t border-slate-200/60 pt-12 sm:pt-16 max-w-4xl mx-auto scroll-mt-24">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">API Documentation</h2>
          <p class="text-sm sm:text-base text-slate-500 mb-8">PicScale allows real-time manipulation of remote or local images using standard query string variables.</p>

          <div class="bg-slate-900 text-slate-100 rounded-xl p-4 sm:p-5 mb-8 shadow-inner relative overflow-hidden">
            <div class="absolute right-0 top-0 bg-indigo-600/10 text-indigo-400 font-mono text-[9px] sm:text-[10px] uppercase font-bold px-3 py-1.5 rounded-bl-lg">Method: GET</div>
            <div class="text-[10px] sm:text-xs uppercase text-slate-400 font-semibold tracking-widest mb-1">Base Endpoint</div>
            <code class="text-indigo-300 text-xs sm:text-sm break-all">{apiUrl}</code>
          </div>

          <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-4">Request Parameters</h3>
          <div class="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm mb-12">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr class="bg-slate-50/70 border-b border-slate-100 text-slate-500 text-[10px] sm:text-xs uppercase font-bold tracking-wider">
                    <th class="py-4 px-6">Param</th>
                    <th class="py-4 px-6">Type</th>
                    <th class="py-4 px-6">Required</th>
                    <th class="py-4 px-6">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
                  <tr>
                    <td class="py-4 px-6 font-mono font-semibold text-slate-900">src</td>
                    <td class="py-4 px-6 text-indigo-600 font-semibold">string</td>
                    <td class="py-4 px-6 text-rose-500 font-semibold">Yes</td>
                    <td class="py-4 px-6 text-slate-500">The absolute URL of the remote image (JPEG, PNG, or WebP).</td>
                  </tr>
                  <tr>
                    <td class="py-4 px-6 font-mono font-semibold text-slate-900">w</td>
                    <td class="py-4 px-6 text-indigo-600 font-semibold">integer</td>
                    <td class="py-4 px-6 text-slate-400 font-medium">No</td>
                    <td class="py-4 px-6 text-slate-500">Target output width in pixels. Keep empty to auto-calculate maintaining the original aspect ratio.</td>
                  </tr>
                  <tr>
                    <td class="py-4 px-6 font-mono font-semibold text-slate-900">h</td>
                    <td class="py-4 px-6 text-indigo-600 font-semibold">integer</td>
                    <td class="py-4 px-6 text-slate-400 font-medium">No</td>
                    <td class="py-4 px-6 text-slate-500">Target output height in pixels. Keep empty to auto-calculate maintaining the original aspect ratio.</td>
                  </tr>
                  <tr>
                    <td class="py-4 px-6 font-mono font-semibold text-slate-900">crop</td>
                    <td class="py-4 px-6 text-indigo-600 font-semibold">boolean</td>
                    <td class="py-4 px-6 text-slate-400 font-medium">No</td>
                    <td class="py-4 px-6 text-slate-500">Must be set to <code class="bg-slate-50 text-indigo-600 border border-slate-100 px-1 py-0.5 rounded">1</code> to activate. Scaled-and-cropped from the center to strictly fill target dimensions.</td>
                  </tr>
                  <tr>
                    <td class="py-4 px-6 font-mono font-semibold text-slate-900">q</td>
                    <td class="py-4 px-6 text-indigo-600 font-semibold">integer</td>
                    <td class="py-4 px-6 text-slate-400 font-medium">No</td>
                    <td class="py-4 px-6 text-slate-500">Compression scale value between <code class="bg-slate-50 text-indigo-600 border border-slate-100 px-1 py-0.5 rounded">1</code> (lowest quality, highest compression) and <code class="bg-slate-50 text-indigo-600 border border-slate-100 px-1 py-0.5 rounded">100</code>. Default is 80.</td>
                  </tr>
                  {/* New Parameter Entry */}
                  <tr>
                    <td class="py-4 px-6 font-mono font-semibold text-slate-900">format</td>
                    <td class="py-4 px-6 text-indigo-600 font-semibold">string</td>
                    <td class="py-4 px-6 text-slate-400 font-medium">No</td>
                    <td class="py-4 px-6 text-slate-500">Converts image output format. Acceptable inputs: <code class="bg-slate-50 text-indigo-600 border border-slate-100 px-1 py-0.5 rounded">original</code>, <code class="bg-slate-50 text-indigo-600 border border-slate-100 px-1 py-0.5 rounded">webp</code>, <code class="bg-slate-50 text-indigo-600 border border-slate-100 px-1 py-0.5 rounded">jpeg</code> (or <code class="bg-slate-50 text-indigo-600 border border-slate-100 px-1 py-0.5 rounded">jpg</code>), and <code class="bg-slate-50 text-indigo-600 border border-slate-100 px-1 py-0.5 rounded">png</code>. Default is <code class="bg-slate-50 text-indigo-600 border border-slate-100 px-1 py-0.5 rounded">original</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 class="text-lg sm:text-xl font-bold text-slate-900 mb-4">HTML Implementation Example</h3>
          <div class="bg-slate-950 text-slate-200 rounded-xl p-5 sm:p-6 shadow-inner font-mono text-[11px] sm:text-xs leading-relaxed overflow-x-auto mb-16 relative">
            <span class="absolute right-4 top-4 text-[9px] text-slate-500 uppercase tracking-widest">HTML</span>
            <span class="text-slate-400">&lt;!-- Example of integrating directly into web content --&gt;</span>
            <br />
            <span class="text-pink-400">&lt;img</span> 
            <span class="text-purple-400">src=</span><span class="text-emerald-400">"{apiUrl}?src=https://unsplash.com/sample.jpg&w=400&h=300&crop=1&format=webp"</span> 
            <span class="text-purple-400">alt=</span><span class="text-emerald-400">"Cropped Thumbnail"</span>
            <span class="text-purple-400">loading=</span><span class="text-emerald-400">"lazy"</span><span class="text-pink-400">&gt;</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer class="border-t border-slate-100 bg-white py-8 sm:py-12 w-full">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-slate-400">
          <div>&copy; 2026 PicScale. All rights reserved.</div>
          <div class="mt-4 md:mt-0 flex space-x-6">
            <a href="#playground" class="hover:text-slate-600 transition-colors">Playground</a>
            <a href="#docs" class="hover:text-slate-600 transition-colors">Developer Docs</a>
          </div>
        </div>
      </footer>
    </>
  );
}
