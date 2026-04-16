/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.aibe.website',
  generateRobotsTxt: false,
  outDir: 'public',
  // Evita sobrescrever public/sitemap.xml (índice manual + static-sitemap.xml).
  sitemapBaseFileName: 'next-build-sitemap',
  generateIndexSitemap: false,
}
