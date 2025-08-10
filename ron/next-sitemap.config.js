/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  outDir: 'public',
  sitemapSize: 5000,
  exclude: ['/admin/*'],
};


