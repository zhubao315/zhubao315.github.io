/**
 * Build public/brand/brand-logo-guide.pdf — the ZHUBAO logo usage guide (A4, 3 pages).
 *
 * Uses the production sliced assets (public/brand/*.png) so the guide always
 * matches what the site ships, and shows the vector edition as the print source.
 *
 * Usage: PLAYWRIGHT_CHROMIUM_EXECUTABLE=... node scripts/build-brand-guide.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tmp = path.join(root, '.tmp-brand-guide.html');

const b64 = (p) => `data:${p.endsWith('.svg') ? 'image/svg+xml' : 'image/png'};base64,${fs.readFileSync(p).toString('base64')}`;
const brand = (f) => b64(path.join(root, 'public/brand', f));

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 0; }
  *{box-sizing:border-box;margin:0}
  body{font-family:'Noto Sans CJK SC','Source Han Sans SC','PingFang SC',sans-serif;color:#101828}
  .page{width:210mm;height:296mm;padding:14mm 15mm;page-break-after:always;position:relative;overflow:hidden;background:#07111F;color:#F7FAFF}
  .page:last-child{page-break-after:auto}
  .hdr{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid rgba(247,250,255,.2);padding-bottom:7mm;margin-bottom:9mm}
  .mono{font-family:ui-monospace,monospace;letter-spacing:.14em;font-size:9px;text-transform:uppercase;color:#94A3B8}
  h2{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;margin:5.5mm 0 3mm;color:#38BDF8}
  .mut{color:#94A3B8;font-size:10.5px;line-height:1.75}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:5mm}
  .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4mm}
  .card{border:1px solid rgba(247,250,255,.16);border-radius:2mm;padding:4.5mm;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.5mm;min-height:24mm}
  .card.on-white{background:#F7FAFF}
  .tag{font-family:ui-monospace,monospace;font-size:8px;letter-spacing:.08em;color:#94A3B8;text-transform:uppercase}
  .card.on-white .tag{color:#667085}
  .sw{height:16mm;border:1px solid rgba(247,250,255,.14);border-radius:1.5mm;display:flex;align-items:flex-end;padding:2mm 2.5mm;color:#fff;font-size:8.5px;font-family:ui-monospace,monospace}
  ul{margin:1mm 0 0 5mm}
  li{font-size:10px;line-height:1.75;color:#DDE7F5}
  .ok::marker{color:#34D399}.no::marker{color:#FB7185}
  table{width:100%;border-collapse:collapse;font-size:9.5px}
  th,td{text-align:left;padding:1.7mm 2mm;border-bottom:1px solid rgba(247,250,255,.14)}
  th{font-family:ui-monospace,monospace;font-size:8.5px;letter-spacing:.08em;text-transform:uppercase;color:#94A3B8}
  code{font-family:ui-monospace,monospace;font-size:9.5px;color:#38BDF8}
  .clearspace{background:#0B1D33;padding:7mm;display:flex;align-items:center;justify-content:center;border:1px dashed rgba(56,189,248,.5)}
  .clearspace img{width:48mm}
  .foot{position:absolute;bottom:9mm;left:16mm;right:16mm;display:flex;justify-content:space-between;font-size:8px;letter-spacing:.12em;text-transform:uppercase;color:#94A3B8;font-family:ui-monospace,monospace}
</style></head><body>

<div class="page">
  <div class="hdr"><span class="mono">ZHUBAO · Logo Usage Guide</span><span class="mono">V2.2 · 2026-11 · Midnight Signal</span></div>
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:138mm;gap:10mm">
    <img src="${brand('zhubao-symbol.png')}" style="width:84mm">
    <img src="${brand('zhubao-horizontal.png')}" style="width:104mm">
  </div>
  <h2>Z-Grid · 一个 Z，连接四个方向</h2>
  <p class="mut">顶部与底部横条构成 Z 的结构骨架，白色对角笔画以 45° 连接右上 THINK 节点与左下 MEASURE 节点，四个角部方形节点即品牌的四个方向。一个 Z，连接四个方向，代表一个完整的个人数字生态。<br>
  01 BUILD 构建系统 · 02 THINK 工程知识 · 03 MEASURE 量化生活 · 04 CREATE 创造作品。<br>
  Build Systems. Engineer Knowledge. Measure Life. Create Things.</p>
  <div class="foot"><span>zhubao.github.io</span><span>Page 1 / 3</span></div>
</div>

<div class="page">
  <div class="hdr"><span class="mono">01 · Logo Family</span><span class="mono">ZHUBAO · 使用规范</span></div>
  <h2>标准组合与变体</h2>
  <div class="grid3">
    <div class="card"><img src="${brand('zhubao-symbol.png')}" style="width:34mm"><span class="tag">symbol · 标准彩色</span></div>
    <div class="card"><img src="${brand('zhubao-white.png')}" style="width:34mm"><span class="tag">white · 反白版</span></div>
    <div class="card"><img src="${brand('zhubao-mono-reverse.png')}" style="width:26mm"><span class="tag">mono-reverse · 白单色</span></div>
    <div class="card on-white"><img src="${brand('zhubao-mono.png')}" style="width:26mm"><span class="tag">mono · 黑单色</span></div>
    <div class="card on-white"><img src="${brand('zhubao-horizontal.png')}" style="width:48mm"><span class="tag">horizontal · 横向组合</span></div>
    <div class="card"><img src="${brand('zhubao-stacked.png')}" style="width:34mm"><span class="tag">stacked · 纵向组合</span></div>
  </div>
  <div class="grid2" style="margin-top:4.5mm">
    <div>
      <h2>安全间距</h2>
      <div class="clearspace"><img src="${brand('zhubao-white.png')}"></div>
      <p class="mut" style="margin-top:2.5mm">四周留白 ≥ 一个节点边长（等于符号宽度的 1/5.6）。间距内不得出现文字、图片或其他标志。</p>
    </div>
    <div>
      <h2>最小尺寸</h2>
      <table>
        <tr><th>版本</th><th>数字最小</th><th>印刷最小</th></tr>
        <tr><td>Symbol 符号</td><td>24 px</td><td>8 mm</td></tr>
        <tr><td>Horizontal 横版</td><td>140 px</td><td>38 mm</td></tr>
        <tr><td>Stacked 竖版</td><td>80 px</td><td>24 mm</td></tr>
        <tr><td>Favicon</td><td>16 px</td><td>—</td></tr>
      </table>
      <p class="mut" style="margin-top:3mm">小尺寸一律使用 Symbol 或 Favicon，不要缩小横版词标。</p>
    </div>
  </div>
  <h2>背景应用</h2>
  <div class="grid3">
    <div class="card"><img src="${brand('zhubao-symbol.png')}" style="width:34mm"><span class="tag">深底 · 彩色符号</span></div>
    <div class="card on-white"><img src="${brand('zhubao-horizontal.png')}" style="width:46mm"><span class="tag">浅底 · 横版全彩</span></div>
    <div class="card"><img src="${brand('zhubao-appicon-512.png')}" style="width:22mm"><span class="tag">App / 桌面图标</span></div>
  </div>
  <p class="mut" style="margin-top:3mm">深色或复杂背景 → 彩色符号或反白版；浅色背景 → 彩色符号或全彩横版；单色印刷 → mono（黑 / 白 / 电光蓝任一）。</p>
  <div class="foot"><span>Midnight Signal</span><span>Page 2 / 3</span></div>
</div>

<div class="page">
  <div class="hdr"><span class="mono">02 · Color · Files · Rules</span><span class="mono">ZHUBAO · 使用规范</span></div>
  <h2>品牌色 Midnight Signal</h2>
  <div class="grid3">
    <div class="sw" style="background:#07111F">#07111F Midnight</div>
    <div class="sw" style="background:#0B1D33">#0B1D33 Navy</div>
    <div class="sw" style="background:#2563EB">#2563EB Electric</div>
    <div class="sw" style="background:#F7FAFF;color:#101828">#F7FAFF Arctic</div>
    <div class="sw" style="background:#94A3B8;color:#07111F">#94A3B8 Cool Gray</div>
    <div class="sw" style="background:#13263D">#13263D Surface</div>
  </div>
  <h2>四向信号节点</h2>
  <div class="grid2">
    <div class="sw" style="background:#38BDF8;color:#07111F">BUILD #38BDF8</div>
    <div class="sw" style="background:#FBBF24;color:#07111F">THINK #FBBF24</div>
    <div class="sw" style="background:#34D399;color:#07111F">MEASURE #34D399</div>
    <div class="sw" style="background:#FB7185;color:#07111F">CREATE #FB7185</div>
  </div>
  <h2>文件清单</h2>
  <table>
    <tr><th>文件</th><th>用途</th></tr>
    <tr><td><code>zhubao-symbol.png / .svg</code></td><td>独立图形标志：Header、App 图标、社交头像</td></tr>
    <tr><td><code>zhubao-horizontal.png / .svg</code></td><td>网站横向 Logo（含朱宝词标）</td></tr>
    <tr><td><code>zhubao-stacked.png / .svg</code></td><td>纵向组合：封面、扉页、海报</td></tr>
    <tr><td><code>zhubao-white.png / .svg</code></td><td>深色背景反白版</td></tr>
    <tr><td><code>zhubao-mono.png / .svg</code> · <code>zhubao-mono-reverse</code></td><td>单色版（黑）/ 单色反白版（白）</td></tr>
    <tr><td><code>favicon.svg / .ico / favicon-32.png</code></td><td>浏览器与 PWA 图标（标志 + 深蓝圆角芯片）</td></tr>
    <tr><td><code>apple-touch-icon.png · icon-192/512.png</code></td><td>手机桌面与应用图标</td></tr>
    <tr><td><code>zhubao-appicon-512.png · zhubao-avatar-1024.png</code></td><td>应用图标母版 · 社交头像</td></tr>
    <tr><td><code>public/brand/vector/*.svg</code></td><td>矢量版备份（印刷、放大、二次编辑）</td></tr>
  </table>
  <div class="grid2" style="margin-top:3mm">
    <div><h2>允许 Do</h2>
      <ul>
        <li class="ok">保持 Z 与四节点的完整几何结构</li>
        <li class="ok">等比缩放；小尺寸优先 Symbol 或 Favicon</li>
        <li class="ok">深底用彩色符号或反白版，浅底用彩色或全彩横版</li>
        <li class="ok">单色场景使用 mono 版（黑 / 白 / 电光蓝任一单色）</li>
        <li class="ok">印刷与大幅放大使用 <code>vector/</code> 矢量版</li>
      </ul>
    </div>
    <div><h2>禁止 Don't</h2>
      <ul>
        <li class="no">禁止拉伸、旋转、倾斜、加描边投影外发光</li>
        <li class="no">禁止改色、渐变重绘、彩虹配色、霓虹效果</li>
        <li class="no">禁止低对比背景（米白 / 奶油 / 暖纸 / 低对比灰）</li>
        <li class="no">禁止拆分四向节点单独使用或用其他图标替代 Z</li>
        <li class="no">禁止把四色平均铺满标志、禁止加 3D 金属质感</li>
      </ul>
    </div>
  </div>
  <div class="foot"><span>docs/brand-guidelines-v2.md 为唯一上位规范</span><span>Page 3 / 3</span></div>
</div>
</body></html>`;

fs.writeFileSync(tmp, html);
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
});
const page = await browser.newPage();
await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
await page.pdf({ path: path.join(root, 'public/brand/brand-logo-guide.pdf'), format: 'A4', printBackground: true });
await browser.close();
fs.unlinkSync(tmp);
console.log('brand-logo-guide.pdf rebuilt from sliced assets');
