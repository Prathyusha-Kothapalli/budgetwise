/* BudgetWise Enterprise Custom SVG & Canvas Visualization Engine */

/**
 * Generates responsive SVG Line Chart with gradient fill & hover tooltips
 */
export function renderLineChartSVG(series = [], options = {}) {
  const width = options.width || 600;
  const height = options.height || 260;
  const padding = options.padding || 40;

  if (!series || !series.length) {
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><text x="50%" y="50%" text-anchor="middle" fill="#94a3b8">No data available</text></svg>`;
  }

  const values = series.map(d => d.value);
  const maxVal = Math.max(...values, 1);
  const minVal = Math.min(...values, 0);
  const valRange = maxVal - minVal || 1;

  const points = series.map((d, idx) => {
    const x = padding + (idx / (series.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - ((d.value - minVal) / valRange) * (height - padding * 2);
    return { x, y, value: d.value, label: d.label };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

  const gradientId = 'line-grad-' + Math.random().toString(36).substring(2, 7);

  return `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${options.color || '#6366f1'}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="${options.color || '#6366f1'}" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <!-- Background Grid lines -->
      <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="var(--border-color)" stroke-dasharray="4" />
      <line x1="${padding}" y1="${height / 2}" x2="${width - padding}" y2="${height / 2}" stroke="var(--border-color)" stroke-dasharray="4" />
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="var(--border-color)" />

      <!-- Area Fill -->
      <path d="${areaD}" fill="url(#${gradientId})" />

      <!-- Line Path -->
      <path d="${pathD}" fill="none" stroke="${options.color || '#6366f1'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Data Dots -->
      ${points.map(pt => `
        <circle cx="${pt.x}" cy="${pt.y}" r="4" fill="var(--bg-secondary)" stroke="${options.color || '#6366f1'}" stroke-width="2.5">
          <title>${pt.label}: ${pt.value}</title>
        </circle>
      `).join('')}

      <!-- X Axis Labels -->
      ${points.map(pt => `
        <text x="${pt.x}" y="${height - 12}" text-anchor="middle" font-size="10" fill="var(--text-muted)" font-weight="600">${pt.label}</text>
      `).join('')}
    </svg>
  `;
}

/**
 * Generates SVG Doughnut Chart with interactive slices & legends
 */
export function renderDoughnutChartSVG(categories = [], options = {}) {
  const size = options.size || 240;
  const strokeWidth = options.strokeWidth || 36;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const total = categories.reduce((sum, c) => sum + (Number(c.value) || 0), 0) || 1;

  let accumulatedAngle = 0;

  const slices = categories.map(c => {
    const val = Number(c.value) || 0;
    const percentage = val / total;
    const strokeDasharray = `${percentage * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedAngle * circumference;
    accumulatedAngle += percentage;

    return {
      name: c.name,
      value: val,
      percentage: Math.round(percentage * 100),
      color: c.color || '#6366f1',
      strokeDasharray,
      strokeDashoffset
    };
  });

  return `
    <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-around; gap:1.5rem;">
      <div style="position:relative; width:${size}px; height:${size}px;">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--bg-tertiary)" stroke-width="${strokeWidth}" />
          ${slices.map(s => `
            <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="${s.color}" stroke-width="${strokeWidth}"
                    stroke-dasharray="${s.strokeDasharray}" stroke-dashoffset="${s.strokeDashoffset}"
                    transform="rotate(-90 ${center} ${center})" style="transition: stroke-dasharray 400ms ease;">
              <title>${s.name}: ${s.percentage}%</title>
            </circle>
          `).join('')}
        </svg>
        <div style="position:absolute; top:0; left:0; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Total Outflow</span>
          <span class="font-mono" style="font-size:1.1rem; font-weight:800;">${options.totalFormatted || ''}</span>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.5rem; flex:1; min-width:180px;">
        ${slices.map(s => `
          <div style="display:flex; align-items:center; justify-content:space-between; font-size:0.85rem;">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <div style="width:10px; height:10px; border-radius:50%; background:${s.color};"></div>
              <span style="font-weight:600; color:var(--text-secondary);">${s.name}</span>
            </div>
            <span class="font-mono" style="font-weight:700;">${s.percentage}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Generates Circular Gauge SVG for Financial Health Score Index
 */
export function renderGaugeSVG(score = 85, title = 'Health Index') {
  const clampScore = Math.min(100, Math.max(0, score));
  const radius = 40;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (clampScore / 100) * circumference;

  let gaugeColor = 'var(--brand-primary)';
  if (clampScore >= 80) gaugeColor = 'var(--color-income)';
  else if (clampScore >= 60) gaugeColor = 'var(--brand-primary)';
  else if (clampScore >= 40) gaugeColor = 'var(--color-warning)';
  else gaugeColor = 'var(--color-expense)';

  return `
    <div style="position:relative; width:110px; height:110px; display:flex; align-items:center; justify-content:center;">
      <svg width="110" height="110" viewBox="0 0 100 100" style="transform:rotate(-90deg);">
        <circle cx="50" cy="50" r="${radius}" fill="none" stroke="var(--bg-tertiary)" stroke-width="${stroke}" />
        <circle cx="50" cy="50" r="${radius}" fill="none" stroke="${gaugeColor}" stroke-width="${stroke}"
                stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}"
                stroke-linecap="round" style="transition: stroke-dashoffset 600ms ease;" />
      </svg>
      <div style="position:absolute; text-align:center;">
        <div style="font-size:1.6rem; font-weight:800; color:${gaugeColor}; leading-trim:both;" class="font-mono">${clampScore}</div>
        <div style="font-size:0.65rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">${title}</div>
      </div>
    </div>
  `;
}
