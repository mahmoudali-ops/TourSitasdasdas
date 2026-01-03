import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = __dirname;
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // --- Sitemap ديناميكي ---
  server.get('/sitemap.xml', async (req, res) => {
    try {
      // جلب الـ Tours وTransfers من API
      const toursResponse = await fetch('https://api.toppickstravels.com/tours');
      const tours = await toursResponse.json();

      const transfersResponse = await fetch('https://api.toppickstravels.com/transfers');
      const transfers = await transfersResponse.json();

      // روابط ثابتة
      const urls: string[] = [
        'https://www.toppickstravels.com/home',
        'https://www.toppickstravels.com/blogs',
        'https://www.toppickstravels.com/hurghadaBlog',
        'https://www.toppickstravels.com/luxorBlog',
        'https://www.toppickstravels.com/reviews',
        'https://www.toppickstravels.com/about',
        'https://www.toppickstravels.com/transfer'
      ];

      // إضافة Tours ديناميكي
      tours.forEach((tour: any) => {
        urls.push(`https://www.toppickstravels.com/tourDetail/${tour.slug}`);
      });

      // إضافة Transfers ديناميكي
      transfers.forEach((tr: any) => {
        urls.push(`https://www.toppickstravels.com/transferDetail/${tr.slug}`);
      });

      // إنشاء XML
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
      urls.forEach(url => {
        xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <priority>0.9</priority>\n  </url>\n`;
      });
      xml += '</urlset>';

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error generating sitemap');
    }
  });

  // --- كل الـ routes العادية تستخدم Angular SSR ---
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
 