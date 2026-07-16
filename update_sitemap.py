import re
import datetime

# Read personalData.js
with open('src/data/personalData.js', 'r') as f:
    content = f.read()

# Find all slugs
slugs = re.findall(r'slug:\s*[\'"]([^\'"]+)[\'"]', content)

# Create sitemap XML
today = datetime.date.today().strftime('%Y-%m-%d')

sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
sitemap += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n'

# Main URLs
sitemap += f'  <url>\n    <loc>https://aadi-sharma.dev/</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n'
sitemap += f'  <url>\n    <loc>https://aadi-sharma.dev/blog</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n'

# Blog URLs
for slug in slugs:
    sitemap += f'  <url>\n    <loc>https://aadi-sharma.dev/blog/{slug}</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n'

sitemap += '</urlset>\n'

with open('public/sitemap.xml', 'w') as f:
    f.write(sitemap)

print(f"Sitemap updated successfully with {len(slugs)} blogs!")
