import { Resvg } from '@resvg/resvg-js'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Background -->
  <rect width="1200" height="630" fill="#f9f7f4"/>

  <!-- Top accent stripe -->
  <rect width="1200" height="8" fill="#059669"/>

  <!-- Bottom border -->
  <rect y="622" width="1200" height="8" fill="#e8e4de"/>

  <!-- Decorative % watermark (vector paths, no font dependency) -->
  <circle cx="980" cy="210" r="130" fill="none" stroke="#059669" stroke-width="55" opacity="0.05"/>
  <circle cx="1120" cy="490" r="130" fill="none" stroke="#059669" stroke-width="55" opacity="0.05"/>
  <line x1="870" y1="590" x2="1130" y2="110" stroke="#059669" stroke-width="55" stroke-linecap="round" opacity="0.05"/>

  <!-- Brand -->
  <text x="80" y="175" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#059669">fiscalite·</text>

  <!-- Main headline -->
  <text x="80" y="300" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#1a1a2e">Calculateurs fiscaux</text>
  <text x="80" y="392" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#1a1a2e">fran&#xe7;ais 2024</text>

  <!-- Tool names -->
  <text x="80" y="478" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="24" fill="#6b7280">Net / Brut  &#xb7;  Simulateur IR  &#xb7;  Rupture conventionnelle</text>

  <!-- URL -->
  <text x="80" y="590" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-size="19" fill="#9ca3af">fiscalite.my-monkey.fr</text>
</svg>`

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true, defaultFontFamily: 'Arial' },
})

const png = resvg.render().asPng()
const out = join(__dirname, '../public/og/default.png')
writeFileSync(out, png)
console.log(`OG image generated → public/og/default.png (${Math.round(png.length / 1024)}KB)`)
