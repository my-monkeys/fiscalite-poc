<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — fiscalite.my-monkey.fr</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #f9f7f4; color: #1a1a2e; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; font-size: 13px; line-height: 1.5; }
          .wrap { max-width: 860px; margin: 0 auto; padding: 48px 24px 80px; }
          .logo { display: inline-flex; align-items: center; gap: 7px; margin-bottom: 28px; color: #059669; font-size: 14px; font-weight: 700; }
          .logo-dot { width: 8px; height: 8px; border-radius: 50%; background: #059669; opacity: .7; }
          h1 { color: #1a1a2e; font-size: 22px; font-weight: 700; letter-spacing: -.03em; margin-bottom: 6px; }
          .meta { color: #9ca3af; font-size: 11px; display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
          .count { background: #d1fae5; border: 1px solid #a7f3d0; color: #059669; border-radius: 20px; padding: 2px 10px; font-size: 11px; }
          table { width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #e8e4de; border-radius: 10px; overflow: hidden; }
          thead tr { border-bottom: 1px solid #e8e4de; }
          th { color: #9ca3af; font-size: 10px; text-transform: uppercase; letter-spacing: .07em; font-weight: 500; padding: 12px 16px; text-align: left; }
          tbody tr { border-bottom: 1px solid #f0ece6; transition: background .12s; }
          tbody tr:last-child { border-bottom: none; }
          tbody tr:hover { background: #f9f7f4; }
          td { padding: 10px 16px; vertical-align: middle; }
          td.url { font-family: 'SF Mono', 'Fira Mono', 'Consolas', monospace; font-size: 12px; }
          td.url a { color: #1a1a2e; text-decoration: none; display: flex; align-items: center; gap: 8px; }
          td.url a:hover { color: #059669; }
          .path-domain { color: #9ca3af; }
          .path-slug { color: #1a1a2e; }
          .badge { display: inline-block; border-radius: 4px; padding: 2px 7px; font-size: 10px; font-weight: 500; }
          .prio-high { background: #d1fae5; color: #059669; }
          .prio-mid  { background: #e0f2fe; color: #0284c7; }
          .prio-low  { background: #f9f7f4; color: #9ca3af; border: 1px solid #e8e4de; }
          .freq { color: #9ca3af; font-size: 11px; }
          footer { margin-top: 40px; color: #9ca3af; font-size: 11px; display: flex; align-items: center; justify-content: space-between; }
          footer a { color: #9ca3af; text-decoration: none; }
          footer a:hover { color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="logo"><div class="logo-dot"/>fiscalite·</div>
          <h1>Plan du site</h1>
          <div class="meta">
            <span>fiscalite.my-monkey.fr</span>
            <span class="count"><xsl:value-of select="count(s:urlset/s:url)"/> URLs</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Priorité</th>
                <th>Fréquence</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <xsl:sort select="s:priority" order="descending" data-type="number"/>
                <tr>
                  <td class="url">
                    <a href="{s:loc}">
                      <span class="path-domain">fiscalite.my-monkey.fr</span>
                      <span class="path-slug">
                        <xsl:choose>
                          <xsl:when test="string-length(s:loc) > 30">
                            <xsl:value-of select="substring(s:loc, 31)"/>
                          </xsl:when>
                          <xsl:otherwise>/</xsl:otherwise>
                        </xsl:choose>
                      </span>
                    </a>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="s:priority >= 0.9">
                        <span class="badge prio-high"><xsl:value-of select="s:priority"/></span>
                      </xsl:when>
                      <xsl:when test="s:priority >= 0.8">
                        <span class="badge prio-mid"><xsl:value-of select="s:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="badge prio-low"><xsl:value-of select="s:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td class="freq"><xsl:value-of select="s:changefreq"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <footer>
            <span>© 2026 fiscalite — my-monkey</span>
            <a href="/">← Retour au site</a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
