import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const originalHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// 1. Generate /book/index.html for static routing and direct crawler indexing
const bookDir = path.join(distDir, 'book');
if (!fs.existsSync(bookDir)) {
  fs.mkdirSync(bookDir, { recursive: true });
}

let bookHtml = originalHtml;

// Update page title and description for /book route
bookHtml = bookHtml.replace(
  /<title>.*?<\/title>/,
  '<title>Book Private Chauffeur &amp; Airport Taxi in Rwanda | Your Taxi Man</title>'
);

bookHtml = bookHtml.replace(
  /<meta name="description" content=".*?" \/>/,
  '<meta name="description" content="Reserve your private chauffeur transportation, Kigali airport transfer (KGL), or Rwanda tourism journey. Instant booking via WhatsApp." />'
);

// Update canonical link if present
if (bookHtml.includes('rel="canonical"')) {
  bookHtml = bookHtml.replace(
    /<link rel="canonical" href=".*?" \/>/,
    '<link rel="canonical" href="https://yourtaximan.vercel.app/book" />'
  );
}

// Update Open Graph tags for /book
bookHtml = bookHtml.replace(
  /<meta property="og:url" content=".*?" \/>/,
  '<meta property="og:url" content="https://yourtaximan.vercel.app/book" />'
);
bookHtml = bookHtml.replace(
  /<meta property="og:title" content=".*?" \/>/,
  '<meta property="og:title" content="Book Private Chauffeur &amp; Airport Taxi in Rwanda | Your Taxi Man" />'
);
bookHtml = bookHtml.replace(
  /<meta property="og:description" content=".*?" \/>/,
  '<meta property="og:description" content="Reserve your private chauffeur transportation, Kigali airport transfer (KGL), or Rwanda tourism journey. Instant booking via WhatsApp." />'
);

// Update Twitter card tags for /book
bookHtml = bookHtml.replace(
  /<meta name="twitter:title" content=".*?" \/>/,
  '<meta name="twitter:title" content="Book Private Chauffeur &amp; Airport Taxi in Rwanda | Your Taxi Man" />'
);
bookHtml = bookHtml.replace(
  /<meta name="twitter:description" content=".*?" \/>/,
  '<meta name="twitter:description" content="Reserve your private chauffeur transportation, Kigali airport transfer (KGL), or Rwanda tourism journey. Instant booking via WhatsApp." />'
);

fs.writeFileSync(path.join(bookDir, 'index.html'), bookHtml, 'utf-8');
console.log('✓ Successfully generated dist/book/index.html for static prerendering');
