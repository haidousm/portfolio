const fs = require("fs");
const createSitemap = () => {
    const baseUrl = "https://haidousm.com";

    const staticPages = fs
        .readdirSync("./src/pages")
        .filter((staticPage) => {
            return ![
                "_app.tsx",
                "_document.tsx",
                "_error.tsx",
                "sitemap.xml",
                "robots.txt",
            ].includes(staticPage);
        })
        .map((staticPagePath) => {
            if (staticPagePath.includes("index")) {
                return `${baseUrl}/`;
            }
            return `${baseUrl}/${staticPagePath}`;
        });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${staticPages
              .map((url) => {
                  return `
                <url>
                  <loc>${url}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>1.0</priority>
                </url>
              `;
              })
              .join("")}
        </urlset>
      `;
    fs.writeFileSync("public/sitemap.xml", sitemap);
};

createSitemap();
