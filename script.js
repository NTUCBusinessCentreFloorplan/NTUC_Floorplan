// =====================
// DYNAMIC FLOORPLANNER LOGIC
// =====================

// PLAN CONFIGS
const plans = {
  training: {
    id: "training",
    title: "Training Rooms Floor Plan Designer",
    desc: "",
    showSpecs: true,
    showPresets: true,
    floorW: 600,
    floorH: 495,
    render: renderTrainingRoomPlan,
    placementRestriction: isLegalTrainingRoomPlacement,
  },
  foyer: {
    id: "foyer",
    title: "Level 7 Foyer Floor Plan Designer",
    desc: "The Level 7 Foyer is used for access and registration for the Auditorium, 701 Training Room, and Holding Room. Ideal for guest reception, social mingling, and exhibition setup.",
    showSpecs: false,
    showPresets: false,
    floorW: 1200,
    floorH: 800,
    render: renderFoyerPlan,
    placementRestriction: isLegalFoyerPlacement,
  },
   level8foyer: {
    id: "level8foyer",
    title: "Level 8 Foyer Floor Plan Designer",
    desc: "The Level 8 Foyer is to be used for Training Room 801 event use.",
    showSpecs: false,
    showPresets: false,
    floorW: 598,
    floorH: 500,
    render: renderLevel8FoyerPlan,
    placementRestriction: isLegalLevel8FoyerPlacement,
  },
  holdingroom: {
  id: "holdingroom",
  title: "Holding Room Floor Plan Designer",
  desc: "...",
  showSpecs: false,
  showPresets: false,
  floorW: 700,
  floorH: 1100,
  render: renderHoldingRoomPlan,
  placementRestriction: isLegalHoldingRoomPlacement,
},
  mezzanine: {
  id: "mezzanine",
  title: "Mezzanine Floor Plan Designer",
  desc: "Design the Mezzanine Level. Toilet, bar, pillar, and stairs are restricted zones.",
  showSpecs: false,
  showPresets: false,
  floorW: 1100,
  floorH: 888,
  render: renderMezzaninePlan,
  placementRestriction: isLegalMezzaninePlacement, // define this next!
},
auditorium: {
  id: "auditorium",
  title: "Auditorium Floor Plan Designer",
  desc: "The Auditorium accommodates up to 550 seats. Use this designer to plan premium seating, staging, or special furniture.",
  showSpecs: false,
  showPresets: false,
  floorW: 1200,
  floorH: 600,
  render: renderAuditoriumPlan,
  placementRestriction: isLegalAuditoriumPlacement, // <-- THIS LINE
},
};

function renderAuditoriumPlan() {
  const width = 1200, height = 600;

  let svgHtml = `
  <style>
    #auditorium-svg {
      background: linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(60,80,120,.18), 0 1.5px 4px rgba(60,60,60,.08);
      width: ${width}px;
      height: ${height}px;
      display: block;
    }
    .label {
      font-weight: 700;
      letter-spacing: .7px;
      fill: #003366;
      font-size: 24px;
      text-anchor: middle;
      dominant-baseline: middle;
      pointer-events: none;
      text-shadow: 0 2px 7px rgba(30,50,90,0.09);
    }
    .stage-label {
      font-size: 32px;
      font-weight: 400;
      fill: #3cb371;
      opacity: 0.7;
      text-shadow: none;
    }
  </style>
  <svg id="auditorium-svg" width="${width}" height="${height}" viewBox="0 0 800 400">
      <defs>
        <!-- ... your gradients and patterns ... -->
        <!-- same as your current code -->
        <filter id="hallShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#001d3d" flood-opacity=".22"/>
        </filter>
        <linearGradient id="stageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#c6ffe1"/>
            <stop offset="25%" stop-color="#7ae0a6"/>
            <stop offset="60%" stop-color="#43d37f"/>
            <stop offset="100%" stop-color="#189d50"/>
        </linearGradient>
        <radialGradient id="stageHighlight" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.35"/>
            <stop offset="90%" stop-color="transparent" stop-opacity="0"/>
        </radialGradient>
        <filter id="stageShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#1b5e20" flood-opacity="0.30"/>
        </filter>
        <linearGradient id="seatFabricGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffb3ba"/>
            <stop offset="50%" stop-color="#ff5860"/>
            <stop offset="100%" stop-color="#c92a2a"/>
        </linearGradient>
        <radialGradient id="seatGloss" cx="30%" cy="20%" r="80%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.13"/>
            <stop offset="70%" stop-color="transparent" stop-opacity="0"/>
        </radialGradient>
        <pattern id="seatsPattern" patternUnits="userSpaceOnUse" width="16" height="16">
            <rect x="3" y="3" width="10" height="10" rx="2.5" ry="2.5"
                fill="url(#seatFabricGrad)" stroke="#fff8" stroke-width="1"/>
            <ellipse cx="8" cy="8" rx="3" ry="2" fill="url(#seatGloss)" />
        </pattern>
        <filter id="seatShadow" x="-18%" y="-18%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#830808" flood-opacity=".15"/>
        </filter>
        <linearGradient id="wallShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#dbeafe" stop-opacity="0.85"/>
            <stop offset="90%" stop-color="white" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- auditorium outline with shine -->
      <g filter="url(#hallShadow)">
          <rect x="50" y="50" width="700" height="340"
              fill="url(#wallShine)" stroke="#1a3257" stroke-width="4.5" rx="16" ry="16"/>
      </g>
      <rect x="50" y="55" width="700" height="30"
          fill="url(#wallShine)" opacity="0.2"/>
      <!-- cartoonish green stage with extra shine and shadow -->
      <g filter="url(#stageShadow)">
          <rect x="50" y="111.22" width="116.4" height="209.64"
              fill="url(#stageGradient)" stroke="#11955f" stroke-width="3.5"
              rx="10" ry="10"/>
          <rect x="65" y="121.22" width="86.4" height="40"
              fill="url(#stageHighlight)" opacity="0.65" rx="8" ry="8"/>
          <text 
            x="108.2" 
            y="216.04" 
            class="stage-label" 
            text-anchor="middle" 
            dominant-baseline="middle"
          >STAGE</text>
      </g>
      <!-- seating blocks (same dimensions, enhanced style) -->
      <rect x="238.08" y="50"   width="223.5" height="60"  fill="url(#seatsPattern)" stroke="#9d1f34" stroke-width="2.5" rx="6" ry="6" filter="url(#seatShadow)"/>
      <rect x="501.39" y="50"   width="248.61" height="60" fill="url(#seatsPattern)" stroke="#9d1f34" stroke-width="2.5" rx="6" ry="6" filter="url(#seatShadow)"/>
      <rect x="238.08" y="140"  width="223.5" height="160" fill="url(#seatsPattern)" stroke="#9d1f34" stroke-width="2.5" rx="10" ry="10" filter="url(#seatShadow)"/>
      <rect x="501.39" y="140"  width="248.61" height="160" fill="url(#seatsPattern)" stroke="#9d1f34" stroke-width="2.5" rx="10" ry="10" filter="url(#seatShadow)"/>
      <rect x="238.08" y="330"  width="223.5" height="60"  fill="url(#seatsPattern)" stroke="#9d1f34" stroke-width="2.5" rx="6" ry="6" filter="url(#seatShadow)"/>
      <rect x="501.39" y="330"  width="248.61" height="60" fill="url(#seatsPattern)" stroke="#9d1f34" stroke-width="2.5" rx="6" ry="6" filter="url(#seatShadow)"/>
      <!-- capacity label -->
      <text x="400" y="27" class="label" fill="#003366" style="font-size:28px;text-shadow:0 2px 7px #9cc6e390;">TOTAL CAPACITY  •  550 SEATS</text>
    </svg>
  `;

  // The KEY FIX: wrap in correct container for your DnD logic!
  let html = `
    <div class="fp-foyer-svg-container" style="width:${width}px;height:${height}px;position:relative;">
      ${svgHtml}
    </div>
  `;

  document.getElementById('fp-floorplan-container').innerHTML = html;
  document.getElementById('fp-floorplan-container').style.width = width + "px";
  document.getElementById('fp-floorplan-container').style.height = height + "px";
}


function isLegalAuditoriumPlacement(x, y, type, angle = 0) {
  // Auditorium SVG/floor dims
  const floorW = 1200, floorH = 600;

  // 1. Only allow placement INSIDE the visible black rectangle (x=50,y=50,w=700,h=340 in SVG coords)
  // Remember: your drag/drop works in screen px (1200x600), but SVG is 800x400 and rect is at 50,50,700,340
  // So, we need to use SCREEN px!
  // Black outline: 50/800*1200 = 75 px; 700/800*1200 = 1050 px
  // 50/400*600 = 75 px; 340/400*600 = 510 px
  const rectX = 75, rectY = 75, rectW = 1050, rectH = 510;

  const sz = FURNITURE_SIZE[type];

  // Check axis-aligned bounding box (rotated furniture handled by your other logic)
  if (x < rectX || y < rectY || (x + sz.w) > (rectX + rectW) || (y + sz.h) > (rectY + rectH)) {
    return false;
  }

  // 2. NO part of the furniture may touch/overlap any seating block (rects in px)
  const seatRects = [
    { x: 357.12, y: 75, width: 334.5, height: 90 },   // top left+right (scaled up)
    { x: 357.12, y: 210, width: 334.5, height: 240 }, // middle
    { x: 357.12, y: 495, width: 334.5, height: 90 }   // bottom
  ];
  // Actually, your SVG uses:
  // Left: 238.08, 50, 223.5, 60  => scale by 1.5
  // Right: 501.39, 50, 248.61, 60 => scale by 1.5
  // Etc.
  const scaleX = 1200 / 800, scaleY = 600 / 400;
  const seatRectsScaled = [
    // top left
    { x: 238.08 * scaleX, y: 50 * scaleY, width: 223.5 * scaleX, height: 60 * scaleY },
    // top right
    { x: 501.39 * scaleX, y: 50 * scaleY, width: 248.61 * scaleX, height: 60 * scaleY },
    // mid left
    { x: 238.08 * scaleX, y: 140 * scaleY, width: 223.5 * scaleX, height: 160 * scaleY },
    // mid right
    { x: 501.39 * scaleX, y: 140 * scaleY, width: 248.61 * scaleX, height: 160 * scaleY },
    // bottom left
    { x: 238.08 * scaleX, y: 330 * scaleY, width: 223.5 * scaleX, height: 60 * scaleY },
    // bottom right
    { x: 501.39 * scaleX, y: 330 * scaleY, width: 248.61 * scaleX, height: 60 * scaleY }
  ];

  // Check all corners of rotated furniture against all seating rects
  const corners = getRotatedCorners(x, y, sz.w, sz.h, angle);
  for (const r of seatRectsScaled) {
    for (const [px, py] of corners) {
      if (
        px >= r.x &&
        px <= r.x + r.width &&
        py >= r.y &&
        py <= r.y + r.height
      ) return false;
    }
  }

  // Passed all restrictions: inside black outline and not on seats
  return true;
}





function renderMezzaninePlan() {
  const width = 1100, height = 888;
  const scale = width / 1300;
  const sx = x => +(x * scale).toFixed(2);
  const sy = y => +(y * scale).toFixed(2);

  let html = `
  <style>
    .fp-foyer-svg-container {
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05);
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: ${width}px;
      height: ${height}px;
      position: relative;
      overflow: visible;
    }
    #mezzanine-svg {
      background: #fff;
      border-radius: 10px;
      filter: drop-shadow(0 4px 20px rgba(0,0,0,0.08));
      width: ${width}px;
      height: ${height}px;
      display: block;
    }
    .main-floor { fill: #f5f5f5; stroke: none; }
    .toilet-area { fill: url(#toiletGradient); stroke: #c62d42; stroke-width: 3; }
    .bar-area { fill: url(#barGradient); stroke: #c62d42; stroke-width: 3; }
    .stairs-area { fill: url(#stairsGradient); stroke: #c62d42; stroke-width: 3; }
    .pillar { fill: url(#pillarGradient); stroke: #2c3e50; stroke-width: 3; }
    .floor-pattern { fill: none; stroke: #e0e0e0; stroke-width: 1; opacity: 0.5; }
    .fixture { fill: #95a5a6; stroke: #7f8c8d; stroke-width: 1; }
    .door-arc { fill: none; stroke: #bdc3c7; stroke-width: 2; stroke-dasharray: 3,3; opacity: 0.7; }
    .wall { stroke: #2c3e50; stroke-width: 6; fill: none; }
    .wall-inner { stroke: #34495e; stroke-width: 3; fill: none; }
    .label-text { fill: #000; font-size: 22px; font-weight: 500; text-anchor: middle; }
    .pillar-text { fill: #000; font-size: 16px; font-weight: 600; text-anchor: middle; }
  </style>
  <div class="fp-foyer-svg-container">
    <svg id="mezzanine-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect x="0" y="0" width="${width}" height="${height}" fill="#fff"/>
      <defs>
        <linearGradient id="toiletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffcdd2" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#ef5350" stop-opacity="0.5" />
        </linearGradient>
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f8bbd9" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#e91e63" stop-opacity="0.5" />
        </linearGradient>
        <linearGradient id="stairsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffcdd2" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#ef5350" stop-opacity="0.5" />
        </linearGradient>
        <radialGradient id="pillarGradient" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#ecf0f1"/>
          <stop offset="100%" stop-color="#bdc3c7"/>
        </radialGradient>
      </defs>
      <!-- Main floor area -->
      <polygon class="main-floor" points="${sx(100)},${sy(100)} ${sx(850)},${sy(100)} ${sx(850)},${sy(210)} ${sx(1000)},${sy(210)} ${sx(1000)},${sy(850)} ${sx(100)},${sy(850)} ${sx(100)},${sy(100)}" />
      <!-- Subtle floor pattern -->
      <g class="floor-pattern">
        <line x1="${sx(100)}" y1="${sy(200)}" x2="${sx(1000)}" y2="${sy(200)}" />
        <line x1="${sx(100)}" y1="${sy(300)}" x2="${sx(1000)}" y2="${sy(300)}" />
        <line x1="${sx(100)}" y1="${sy(400)}" x2="${sx(1000)}" y2="${sy(400)}" />
        <line x1="${sx(100)}" y1="${sy(500)}" x2="${sx(1000)}" y2="${sy(500)}" />
        <line x1="${sx(100)}" y1="${sy(600)}" x2="${sx(1000)}" y2="${sy(600)}" />
        <line x1="${sx(200)}" y1="${sy(100)}" x2="${sx(200)}" y2="${sy(850)}" />
        <line x1="${sx(300)}" y1="${sy(100)}" x2="${sx(300)}" y2="${sy(850)}" />
        <line x1="${sx(400)}" y1="${sy(100)}" x2="${sx(400)}" y2="${sy(850)}" />
        <line x1="${sx(500)}" y1="${sy(100)}" x2="${sx(500)}" y2="${sy(850)}" />
        <line x1="${sx(600)}" y1="${sy(100)}" x2="${sx(600)}" y2="${sy(850)}" />
        <line x1="${sx(700)}" y1="${sy(100)}" x2="${sx(700)}" y2="${sy(850)}" />
        <line x1="${sx(800)}" y1="${sy(100)}" x2="${sx(800)}" y2="${sy(850)}" />
      </g>
      <!-- Restrooms -->
      <rect class="toilet-area" x="${sx(100)}" y="${sy(100)}" width="${sx(130)}" height="${sy(160)}" rx="5" />
      <rect class="toilet-area" x="${sx(100)}" y="${sy(740)}" width="${sx(130)}" height="${sy(110)}" rx="5" />
      <!-- Bar & Stairs -->
      <rect class="bar-area" x="${sx(230)}" y="${sy(740)}" width="${sx(620)}" height="${sy(110)}" rx="5" />
      <rect class="stairs-area" x="${sx(850)}" y="${sy(700)}" width="${sx(150)}" height="${sy(150)}" rx="5" />
      <!-- Walls -->
      <polyline class="wall" points="${sx(100)},${sy(100)} ${sx(850)},${sy(100)} ${sx(850)},${sy(210)} ${sx(1000)},${sy(210)} ${sx(1000)},${sy(850)} ${sx(100)},${sy(850)} ${sx(100)},${sy(100)}" />
      <line class="wall-inner" x1="${sx(230)}" y1="${sy(100)}" x2="${sx(230)}" y2="${sy(260)}" />
      <line class="wall-inner" x1="${sx(100)}" y1="${sy(260)}" x2="${sx(230)}" y2="${sy(260)}" />
      <line class="wall-inner" x1="${sx(230)}" y1="${sy(740)}" x2="${sx(230)}" y2="${sy(850)}" />
      <line class="wall-inner" x1="${sx(100)}" y1="${sy(740)}" x2="${sx(230)}" y2="${sy(740)}" />
      <line class="wall-inner" x1="${sx(230)}" y1="${sy(740)}" x2="${sx(850)}" y2="${sy(740)}" />
      <line class="wall-inner" x1="${sx(850)}" y1="${sy(700)}" x2="${sx(850)}" y2="${sy(850)}" />
      <line class="wall-inner" x1="${sx(850)}" y1="${sy(700)}" x2="${sx(1000)}" y2="${sy(700)}" />
      <!-- Pillar -->
      <circle class="pillar" cx="${sx(840)}" cy="${sy(365)}" r="${sx(40)}" />
      <text x="${sx(840)}" y="${sy(366)}" class="pillar-text">Pillar</text>
      <!-- Fixtures & Details (scaled) -->
      <rect class="fixture" x="${sx(250)}" y="${sy(750)}" width="${sx(580)}" height="${sy(15)}" rx="2" />
      <circle class="fixture" cx="${sx(300)}" cy="${sy(770)}" r="${sx(8)}" />
      <circle class="fixture" cx="${sx(400)}" cy="${sy(770)}" r="${sx(8)}" />
      <circle class="fixture" cx="${sx(500)}" cy="${sy(770)}" r="${sx(8)}" />
      <circle class="fixture" cx="${sx(600)}" cy="${sy(770)}" r="${sx(8)}" />
      <circle class="fixture" cx="${sx(700)}" cy="${sy(770)}" r="${sx(8)}" />
      <circle class="fixture" cx="${sx(800)}" cy="${sy(770)}" r="${sx(8)}" />
      <!-- Door swing arcs -->
      <path class="door-arc" d="M ${sx(230)} ${sy(260)} Q ${sx(260)} ${sy(230)} ${sx(290)} ${sy(260)}" />
      <path class="door-arc" d="M ${sx(230)} ${sy(740)} Q ${sx(260)} ${sy(770)} ${sx(290)} ${sy(740)}" />
      <!-- Labels -->
      <text x="${sx(165)}" y="${sy(180)}" class="label-text">Restroom</text>
      <text x="${sx(165)}" y="${sy(795)}" class="label-text">Restroom</text>
      <text x="${sx(540)}" y="${sy(795)}" class="label-text">Bar Counter</text>
      <text x="${sx(925)}" y="${sy(775)}" class="label-text">Stairs</text>
    </svg>
  </div>
  `;
  document.getElementById('fp-floorplan-container').innerHTML = html;
  document.getElementById('fp-floorplan-container').style.width = width + "px";
  document.getElementById('fp-floorplan-container').style.height = height + "px";
}


// 3. PLACEMENT RESTRICTION — must use scaled polygons and rects!
const mezzaninePolygon = [
  [100,100], [850,100], [850,210], [1000,210], [1000,850], [100,850], [100,100]
].map(([x, y]) => [x * 1100/1300, y * 888/1050]);

const mezzanineRestrictRects = [
  [100,100,130,160],    // Top restroom
  [100,740,130,110],    // Bottom restroom
  [230,740,620,110],    // Bar counter
  [850,700,150,150],    // Stairs
].map(([x, y, w, h]) => [
  x * 1100/1300, y * 888/1050, w * 1100/1300, h * 888/1050
]);

const mezzaninePillar = [840 * 1100/1300, 365 * 888/1050, 40 * 1100/1300];

function isLegalMezzaninePlacement(x, y, type, angle = 0) {
  const sz = FURNITURE_SIZE[type];
  // Bounds
  if (x < 0 || y < 0 || x + sz.w > 1100 || y + sz.h > 888) return false;
  // Polygon
  const corners = getRotatedCorners(x, y, sz.w, sz.h, angle);
  for (const corner of corners) {
    if (!pointInPolygon(corner, mezzaninePolygon)) return false;
  }
  // Restricted rectangles
  for (const [rx,ry,rw,rh] of mezzanineRestrictRects) {
    if (!(x + sz.w <= rx || x >= rx + rw || y + sz.h <= ry || y >= ry + rh)) return false;
  }
  // Pillar (circle)
  const [cx0,cy0,rad] = mezzaninePillar;
  for (const [px,py] of corners) {
    const dx = px - cx0, dy = py - cy0;
    if (dx*dx + dy*dy < rad*rad) return false;
  }
  return true;
}







function renderHoldingRoomPlan() {
  // New SVG dimensions
  const roomW = 600;
  const roomH = 850;

  // Scaling factors (from original SVG 900x1300)
  const xScale = roomW / 900;
  const yScale = roomH / 1300;

  // Scaling helpers
  const sx = x => +(x * xScale).toFixed(2);
  const sy = y => +(y * yScale).toFixed(2);

  let html = `
    <style>
      .fp-foyer-svg-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          padding: 10px;
          position: relative;
          width: ${roomW}px;
          height: ${roomH}px;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      #holdingroom-svg {
          background: white;
          border-radius: 8px;
          display: block;
          box-shadow: none;
          width: ${roomW}px;
          height: ${roomH}px;
      }
      .wall {
          fill: none;
          stroke: #333;
          stroke-width: ${Math.max(2, 6 * xScale)};
          stroke-linejoin: round;
          stroke-linecap: round;
      }
      .wall-shadow {
          fill: none;
          stroke: #000;
          stroke-width: ${Math.max(1, 6 * xScale)};
          stroke-linejoin: round;
          stroke-linecap: round;
          opacity: 0.1;
          filter: blur(2px);
      }
      .floor { fill: #fff; opacity: 1; }
      .corner-accent { fill: #666; opacity: 0.8; }
      .door { fill: #d9534f; opacity: 0.8; }
      .door-frame { stroke: #d9534f; stroke-width: ${Math.max(1, 3 * xScale)}; fill: none; }
      .door-handle { fill: #8b0000; }
    </style>
    <div id="floorplan-holdingroom-svg" class="fp-foyer-svg-container">
      <svg id="holdingroom-svg" width="${roomW}" height="${roomH}" viewBox="0 0 ${roomW} ${roomH}" tabindex="0">
        <!-- Floor fill -->
        <polygon class="floor" points="${sx(200)},${sy(116)} ${sx(616)},${sy(116)} ${sx(616)},${sy(1087)} ${sx(32)},${sy(1087)} ${sx(32)},${sy(265)} ${sx(200)},${sy(265)} ${sx(200)},${sy(116)}"/>
        <!-- Wall shadow -->
        <polyline class="wall-shadow" points="${sx(200)},${sy(116)} ${sx(616)},${sy(116)} ${sx(616)},${sy(150)}" transform="translate(${sx(4)},${sy(4)})"/>
        <polyline class="wall-shadow" points="${sx(616)},${sy(250)} ${sx(616)},${sy(1087)} ${sx(32)},${sy(1087)} ${sx(32)},${sy(265)} ${sx(200)},${sy(265)} ${sx(200)},${sy(116)}" transform="translate(${sx(4)},${sy(4)})"/>
        <!-- Main wall -->
        <polyline class="wall" points="${sx(200)},${sy(116)} ${sx(616)},${sy(116)} ${sx(616)},${sy(150)}"/>
        <polyline class="wall" points="${sx(616)},${sy(250)} ${sx(616)},${sy(1087)} ${sx(32)},${sy(1087)} ${sx(32)},${sy(265)} ${sx(200)},${sy(265)} ${sx(200)},${sy(116)}"/>
        <!-- Door -->
        <rect class="door" x="${sx(516)}" y="${sy(150)}" width="${sx(100)}" height="${sy(100)}" rx="${sx(2)}"/>
        <rect class="door-frame" x="${sx(516)}" y="${sy(150)}" width="${sx(100)}" height="${sy(100)}" rx="${sx(2)}"/>
        <!-- Door label -->
        <text x="${sx(566)}" y="${sy(200)}" fill="#000" font-size="${18 * xScale}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" letter-spacing="1">DOOR</text>
        <!-- Door swing arc -->
        <path d="M ${sx(616)} ${sy(250)} A ${sx(100)} ${sy(100)} 0 0 0 ${sx(516)} ${sy(150)}" fill="none" stroke="#d9534f" stroke-width="${1 * xScale}" opacity="0.3" stroke-dasharray="5,5"/>
        <!-- Door handle -->
        <circle class="door-handle" cx="${sx(526)}" cy="${sy(200)}" r="${sx(4)}"/>
        <!-- Corner accents -->
        <circle class="corner-accent" cx="${sx(200)}" cy="${sy(116)}" r="${sx(8)}"/>
        <circle class="corner-accent" cx="${sx(616)}" cy="${sy(116)}" r="${sx(8)}"/>
        <circle class="corner-accent" cx="${sx(616)}" cy="${sy(150)}" r="${sx(6)}"/>
        <circle class="corner-accent" cx="${sx(616)}" cy="${sy(250)}" r="${sx(6)}"/>
        <circle class="corner-accent" cx="${sx(616)}" cy="${sy(1087)}" r="${sx(8)}"/>
        <circle class="corner-accent" cx="${sx(32)}" cy="${sy(1087)}" r="${sx(8)}"/>
        <circle class="corner-accent" cx="${sx(32)}" cy="${sy(265)}" r="${sx(8)}"/>
        <circle class="corner-accent" cx="${sx(200)}" cy="${sy(265)}" r="${sx(8)}"/>
      </svg>
    </div>
  `;
  document.getElementById('fp-floorplan-container').innerHTML = html;
  document.getElementById('fp-floorplan-container').style.width = roomW + "px";
  document.getElementById('fp-floorplan-container').style.height = roomH + "px";
}

// --- Restriction Polygon for Placement ---
const holdingRoomPolygon = [
  [200,116], [616,116], [616,1087], [32,1087], [32,265], [200,265], [200,116]
].map(([x, y]) => [
  +(x * (600 / 900)).toFixed(2),
  +(y * (1000 / 1300)).toFixed(2)
]);

function isLegalHoldingRoomPlacement(x, y, type, angle = 0) {
  const sz = FURNITURE_SIZE[type];
  const roomW = 600, roomH = 1000;

  // Fully inside SVG area
  if (x < 0 || y < 0 || x + sz.w > roomW || y + sz.h > roomH) return false;

  // All corners in polygon
  const corners = getRotatedCorners(x, y, sz.w, sz.h, angle);
  for (const corner of corners) {
    if (!pointInPolygon(corner, holdingRoomPolygon)) return false;
  }

  // Not overlapping door
  // Door rect: x=516, y=150, w=100, h=100 scaled
  const xScale = roomW / 900, yScale = roomH / 1300;
  const doorX = 516 * xScale, doorY = 150 * yScale, doorW = 100 * xScale, doorH = 100 * yScale;
  if (!(x + sz.w <= doorX || x >= doorX + doorW || y + sz.h <= doorY || y >= doorY + doorH)) return false;

  return true;
}











let currentPlan = plans.training;

// ----------- FURNITURE INVENTORY CONFIGS (Do Not Change!) -----------
const MAX_COUNTS = {
  "rectangle-table": 30,
  "round-table": 10,
  "chair": 160,
  "Flip-Chart": 10,
  "partition": 6,
  "portable-stage": 1,  
  "standing-mic": 4,
  "jumbo-bin": 4,
  "cocktail-table": 10,
  "queue-pole": 20,
};
const FURNITURE_SIZE = {
  "rectangle-table":  {w: 90, h: 40},
  "round-table":      {w: 73, h: 73},
  "chair":            {w: 28, h: 35},
  "white-board":      {w: 24, h: 48},
  "partition":        {w: 60, h: 24},
  "portable-stage":   {w: 210, h: 59},
  "standing-mic":     {w: 16, h: 34},
  "jumbo-bin":        {w: 26, h: 24},
  "cocktail-table": { w: 44, h: 60 },
  "queue-pole": { w: 150, h: 12 },
  
};
const SVGs = {
  "rectangle-table": `<svg width="90" height="40" viewBox="0 0 64 32"><rect x="0" y="0" width="64" height="32" rx="4" fill="#8B4513"/><rect x="4" y="4" width="56" height="24" rx="2" fill="#A0522D"/></svg>`,
  "round-table": `<svg width="73" height="73" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#A0522D"/><circle cx="24" cy="24" r="20" fill="#D2B48C" opacity="0.7"/></svg>`,
  "white-board": `<svg width="24" height="48" viewBox="0 0 24 48"><rect x="2" y="3" width="20" height="38" rx="2" fill="#eaeaea" stroke="#bbb" stroke-width="1.5"/><rect x="4" y="7" width="16" height="28" rx="1" fill="#fff"/><rect x="5" y="37" width="14" height="3" rx="1.5" fill="#e2e2e2"/><rect x="9" y="41" width="6" height="4" rx="1" fill="#bbb"/><circle cx="12" cy="47" r="2" fill="#888"/></svg>`,
  "chair": `<svg width="24" height="32" viewBox="0 0 24 32"><rect x="7" y="14" width="10" height="10" rx="3" fill="#4A90E2"/><rect x="8.5" y="5" width="7" height="10" rx="2" fill="#87BFFF"/><rect x="6" y="24" width="3" height="6" rx="1.5" fill="#666"/><rect x="15" y="24" width="3" height="6" rx="1.5" fill="#666"/><rect x="7" y="23" width="10" height="2" rx="1" fill="#bbb"/></svg>`,
  "partition": `<svg width="60" height="24" viewBox="0 0 60 24"><rect x="2" y="4" width="56" height="12" rx="5" fill="#d2d5da" stroke="#888" stroke-width="1"/><rect x="4" y="17" width="8" height="4" rx="2" fill="#bbb"/><rect x="48" y="17" width="8" height="4" rx="2" fill="#bbb"/><rect x="7" y="7" width="46" height="7" rx="2" fill="#fff"/></svg>`,
  "portable-stage": `<svg width="210" height="59" viewBox="0 0 80 25"><rect x="0" y="7" width="80" height="12" rx="3" fill="#4e4e4e" stroke="#888" stroke-width="1"/><rect x="3" y="13" width="10" height="9" rx="2" fill="#888" opacity="0.6"/><rect x="67" y="13" width="10" height="9" rx="2" fill="#888" opacity="0.6"/><rect x="28" y="10" width="24" height="7" rx="2" fill="#888" opacity="0.25"/><rect x="6" y="7" width="68" height="6" rx="2" fill="#777" opacity="0.4"/></svg>`,
  "standing-mic": `<svg width="16" height="34" viewBox="0 0 16 34"><ellipse cx="8" cy="7" rx="7" ry="7" fill="#bbb"/><rect x="6" y="15" width="4" height="14" fill="#222"/><rect x="2" y="29" width="12" height="3" fill="#666"/><ellipse cx="8" cy="31" rx="7" ry="2" fill="#444"/><rect x="7" y="13" width="2" height="5" fill="#888"/></svg>`,
  "jumbo-bin": `<svg width="26" height="24" viewBox="0 0 26 24"><ellipse cx="13" cy="10" rx="10" ry="10" fill="#333"/><ellipse cx="13" cy="19" rx="8" ry="4" fill="#555"/></svg>`,
 "cocktail-table": `<svg width="44" height="60" viewBox="0 0 44 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Darker Glass top shine -->
    <radialGradient id="ctGlassTop" cx="55%" cy="20%" r="70%">
      <stop offset="0%" stop-color="#e5eaf1" stop-opacity="0.93"/>
      <stop offset="75%" stop-color="#a9bed0" stop-opacity="0.97"/>
      <stop offset="100%" stop-color="#7d8fa6" stop-opacity="0.97"/>
    </radialGradient>
    <!-- Edge highlight for glass -->
    <radialGradient id="ctGlassEdge" cx="50%" cy="50%" r="90%">
      <stop offset="85%" stop-color="#7d8fa6" stop-opacity="0"/>
      <stop offset="100%" stop-color="#546172" stop-opacity="0.35"/>
    </radialGradient>
    <!-- Darker metallic stem -->
    <linearGradient id="ctStem" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#bfc3ca"/>
      <stop offset="30%" stop-color="#8a9096"/>
      <stop offset="100%" stop-color="#54575d"/>
    </linearGradient>
    <!-- Base shadow -->
    <radialGradient id="ctBaseShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7e7e7e" stop-opacity="0.22"/>
      <stop offset="80%" stop-color="#444" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#111" stop-opacity="0.08"/>
    </radialGradient>
    <!-- Gold rim -->
    <linearGradient id="ctGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffda6e" />
      <stop offset="45%" stop-color="#ffc107" />
      <stop offset="100%" stop-color="#cc9900" />
    </linearGradient>
  </defs>

  <!-- Soft shadow below base -->
  <ellipse cx="22" cy="56" rx="13" ry="4.5" fill="url(#ctBaseShadow)" />

  <!-- Stem shadow for depth -->
  <ellipse cx="22" cy="49" rx="3.8" ry="1.1" fill="#7e7e7e" opacity="0.22"/>

  <!-- Elegant metallic base -->
  <ellipse cx="22" cy="50.8" rx="8.5" ry="3.7" fill="url(#ctStem)" stroke="#6c7075" stroke-width="1"/>
  <ellipse cx="22" cy="50.8" rx="7.3" ry="2.7" fill="#9ba4ad" opacity="0.16"/>
  <!-- Gold rim accent -->
  <ellipse cx="22" cy="50.8" rx="8.5" ry="3.7" fill="none" stroke="url(#ctGold)" stroke-width="0.7"/>

  <!-- Slender stem -->
  <rect x="18.5" y="16.5" width="7" height="32" rx="3.5" fill="url(#ctStem)" stroke="#6c7075" stroke-width="0.7"/>
  <rect x="19.9" y="18.5" width="4.2" height="29" rx="2.1" fill="#e1e4ea" opacity="0.20"/>

  <!-- Table top: glass with soft rim and golden accent -->
  <ellipse cx="22" cy="15" rx="19" ry="8" fill="url(#ctGlassTop)" stroke="#7d8fa6" stroke-width="2"/>
  <!-- Subtle inner edge/shadow for glass -->
  <ellipse cx="22" cy="15" rx="16" ry="6.7" fill="url(#ctGlassEdge)"/>
  <!-- Gold accent rim -->
  <ellipse cx="22" cy="15" rx="18" ry="7.7" fill="none" stroke="url(#ctGold)" stroke-width="1.5" opacity="0.76"/>
  <!-- White highlight curve -->
  <path d="M10 14 Q20 6, 34 13" fill="none" stroke="#fff" stroke-width="1.4" opacity="0.16"/>

  <!-- Top-down highlight spot -->
  <ellipse cx="27" cy="11" rx="4.7" ry="1.7" fill="#fff" opacity="0.17"/>
</svg>`
,
"queue-pole": `<svg width="150" height="15" viewBox="0 0 120 16">
  <defs>
    <radialGradient id="queueBase" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fafafa" />
      <stop offset="100%" stop-color="#aaa" />
    </radialGradient>
    <linearGradient id="ropeGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#e53935"/>
      <stop offset="100%" stop-color="#ad1457"/>
    </linearGradient>
  </defs>
  <!-- Left base -->
  <ellipse cx="8" cy="8" rx="7" ry="7" fill="url(#queueBase)" stroke="#888" stroke-width="1"/>
  <!-- Right base -->
  <ellipse cx="112" cy="8" rx="7" ry="7" fill="url(#queueBase)" stroke="#888" stroke-width="1"/>
  <!-- Metal poles -->
  <rect x="6" y="0" width="4" height="13" rx="2" fill="#cfd8dc"/>
  <rect x="110" y="0" width="4" height="13" rx="2" fill="#cfd8dc"/>
  <!-- Rope -->
  <rect x="14" y="6" width="92" height="4" rx="2" fill="url(#ropeGrad)" stroke="#880E4F" stroke-width="1"/>
</svg>`,

};
// ------------- END INVENTORY CONFIG -------------


function renderLevel8FoyerPlan() {
  let html = `
  <style>
    .fp-level8foyer-svg-container {
      background: #f6f7fa;
      padding: 24px;
      border-radius: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 598px;
      height: 429px;
    }
    #level8foyer-svg {
      background: transparent;
      border-radius: 20px;
      display: block;
      box-shadow: 0 4px 24px rgba(60,60,55,0.10);
      width: 598px;
      height: 429px;
    }
    .wall {
      fill: #fff !important;
      stroke: #3d3d37;
      stroke-width: 3;
    }
    .escalator-rect {
      fill: url(#escalatorGradient);
      stroke: #c62828;
      stroke-width: 2;
    }
    .escalator-text {
      fill: #1a1a1a;
      font-size: 18px;
      font-weight: 600;
      text-anchor: middle;
      font-family: 'Segoe UI', Arial, sans-serif;
    }
    .gantry-rect {
      fill: url(#gantryBlueGlass);
      stroke: #2060ab;
      stroke-width: 1.2;
    }
    .gantry-text {
      fill: #2060ab;
      font-size: 13px;
      font-family: 'Segoe UI', Arial, sans-serif;
      text-anchor: middle;
      font-weight: 500;
      opacity: 0.93;
    }
  </style>
  <div id="floorplan-level8foyer-svg" class="fp-foyer-svg-container">

    <svg id="level8foyer-svg" viewBox="0 0 598 429" xmlns="http://www.w3.org/2000/svg" tabindex="0">
      <defs>
        <filter id="liftShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#c62828" flood-opacity="0.16"/>
        </filter>
        <linearGradient id="liftGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffebee"/>
          <stop offset="35%" stop-color="#ef9a9a"/>
          <stop offset="85%" stop-color="#e57373"/>
          <stop offset="100%" stop-color="#d32f2f"/>
        </linearGradient>
        <linearGradient id="gantryBlueGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#dde9fd" stop-opacity="0.9"/>
          <stop offset="55%" stop-color="#7db9fa" stop-opacity="0.98"/>
          <stop offset="100%" stop-color="#488edb" stop-opacity="0.97"/>
        </linearGradient>
        <linearGradient id="escalatorGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffebee"/>
          <stop offset="55%" stop-color="#ef9a9a"/>
          <stop offset="100%" stop-color="#e57373"/>
        </linearGradient>
        <pattern id="escalatorSteps" x="0" y="0" width="80" height="8" patternUnits="userSpaceOnUse">
          <rect width="80" height="4" fill="#e57373" opacity="0.4"/>
          <rect width="80" height="2" y="6" fill="#c62828" opacity="0.6"/>
        </pattern>
        <linearGradient id="liftDoorGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#c62828"/>
          <stop offset="48%" stop-color="#e84242"/>
          <stop offset="52%" stop-color="#d32f2f"/>
          <stop offset="100%" stop-color="#c62828"/>
        </linearGradient>
        <linearGradient id="handrailGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f44336"/>
          <stop offset="100%" stop-color="#c62828"/>
        </linearGradient>
      </defs>
      <!-- Walls -->
      <path class="wall"
        d="
          M 0,0
          H 598
          V 206
          H 514
          V 292
          H 439
          V 354
          H 159
          V 292
          H 84
          V 206
          H 0
          Z
        "/>
      <!-- Enhanced Escalator Group -->
      <g transform="translate(1,1)">
        <rect class="escalator-rect" x="0" y="0" width="80" height="130"/>
        <rect x="5" y="10" width="70" height="110" fill="url(#escalatorSteps)" opacity="0.6"/>
        <rect x="2" y="8" width="6" height="114" rx="3" fill="url(#handrailGrad)" opacity="0.9"/>
        <rect x="72" y="8" width="6" height="114" rx="3" fill="url(#handrailGrad)" opacity="0.9"/>
        <g stroke="#c62828" stroke-width="0.8" opacity="0.4">
          <line x1="10" y1="18" x2="70" y2="18"/>
          <line x1="10" y1="26" x2="70" y2="26"/>
          <line x1="10" y1="34" x2="70" y2="34"/>
          <line x1="10" y1="42" x2="70" y2="42"/>
          <line x1="10" y1="50" x2="70" y2="50"/>
          <line x1="10" y1="58" x2="70" y2="58"/>
          <line x1="10" y1="66" x2="70" y2="66"/>
          <line x1="10" y1="74" x2="70" y2="74"/>
          <line x1="10" y1="82" x2="70" y2="82"/>
          <line x1="10" y1="90" x2="70" y2="90"/>
          <line x1="10" y1="98" x2="70" y2="98"/>
          <line x1="10" y1="106" x2="70" y2="106"/>
          <line x1="10" y1="114" x2="70" y2="114"/>
        </g>
        <polygon points="25,20 35,15 35,18 45,18 45,22 35,22 35,25" fill="#1a1a1a" opacity="0.8"/>
        <circle cx="15" cy="15" r="3" fill="#ff5722" stroke="#d84315" stroke-width="1"/>
        <text class="escalator-text" x="40" y="80">Escalator</text>
      </g>
      <!-- Entry Gantries -->
      <g transform="translate(190,0)">
        <rect class="gantry-rect" x="-36" y="0" width="72" height="12"/>
        <text class="gantry-text" x="0" y="26">Entry Gantry</text>
      </g>
      <g transform="translate(485.5,0)">
        <rect class="gantry-rect" x="-36" y="0" width="72" height="12"/>
        <text class="gantry-text" x="0" y="26">Entry Gantry</text>
      </g>
      <!-- Enhanced Lifts Group -->
      <g filter="url(#liftShadow)" transform="translate(159,354)">
        <!-- 1st Lift -->
        <g>
          <rect x="0" y="0" width="93.333" height="75" rx="10"
            fill="url(#liftGrad)" stroke="#c62828" stroke-width="2.5"/>
          <rect x="8" y="8" width="35" height="59" rx="3" fill="url(#liftDoorGrad)" opacity="0.9"/>
          <rect x="50" y="8" width="35" height="59" rx="3" fill="url(#liftDoorGrad)" opacity="0.9"/>
          <rect x="40" y="35" width="2" height="8" rx="1" fill="#8d1313"/>
          <rect x="48" y="35" width="2" height="8" rx="1" fill="#8d1313"/>
          <rect x="72" y="12" width="16" height="12" rx="2" fill="#1a1a1a" stroke="#333" stroke-width="0.5"/>
          <text x="80" y="20" font-size="8" text-anchor="middle" fill="#00ff00" font-family="monospace">8</text>
          <circle cx="80" cy="32" r="4" fill="#d50000" stroke="#8d1313" stroke-width="1"/>
          <polygon points="80,29 82,35 78,35" fill="white" opacity="0.9"/>
          <circle cx="80" cy="44" r="4" fill="#d50000" stroke="#8d1313" stroke-width="1"/>
          <polygon points="80,47 82,41 78,41" fill="white" opacity="0.9"/>
          <line x1="5" y1="5" x2="88" y2="5" stroke="rgba(198,40,40,0.3)" stroke-width="1"/>
          <line x1="5" y1="70" x2="88" y2="70" stroke="rgba(198,40,40,0.3)" stroke-width="1"/>
          <text x="46.666" y="67" font-size="22" font-weight="normal" text-anchor="middle" fill="#000000">LIFT</text>
        </g>
        <!-- 2nd Lift -->
        <g transform="translate(93.333,0)">
          <rect x="0" y="0" width="93.333" height="75" rx="10"
            fill="url(#liftGrad)" stroke="#c62828" stroke-width="2.5"/>
          <rect x="8" y="8" width="35" height="59" rx="3" fill="url(#liftDoorGrad)" opacity="0.9"/>
          <rect x="50" y="8" width="35" height="59" rx="3" fill="url(#liftDoorGrad)" opacity="0.9"/>
          <rect x="40" y="35" width="2" height="8" rx="1" fill="#8d1313"/>
          <rect x="48" y="35" width="2" height="8" rx="1" fill="#8d1313"/>
          <rect x="72" y="12" width="16" height="12" rx="2" fill="#1a1a1a" stroke="#333" stroke-width="0.5"/>
          <text x="80" y="20" font-size="8" text-anchor="middle" fill="#00ff00" font-family="monospace">8</text>
          <circle cx="80" cy="32" r="4" fill="#d50000" stroke="#8d1313" stroke-width="1"/>
          <polygon points="80,29 82,35 78,35" fill="white" opacity="0.9"/>
          <circle cx="80" cy="44" r="4" fill="#d50000" stroke="#8d1313" stroke-width="1"/>
          <polygon points="80,47 82,41 78,41" fill="white" opacity="0.9"/>
          <line x1="5" y1="5" x2="88" y2="5" stroke="rgba(198,40,40,0.3)" stroke-width="1"/>
          <line x1="5" y1="70" x2="88" y2="70" stroke="rgba(198,40,40,0.3)" stroke-width="1"/>
          <text x="46.666" y="67" font-size="22" font-weight="normal" text-anchor="middle" fill="#000000">LIFT</text>
        </g>
        <!-- 3rd Lift -->
        <g transform="translate(186.666,0)">
          <rect x="0" y="0" width="93.333" height="75" rx="10"
            fill="url(#liftGrad)" stroke="#c62828" stroke-width="2.5"/>
          <rect x="8" y="8" width="35" height="59" rx="3" fill="url(#liftDoorGrad)" opacity="0.9"/>
          <rect x="50" y="8" width="35" height="59" rx="3" fill="url(#liftDoorGrad)" opacity="0.9"/>
          <rect x="40" y="35" width="2" height="8" rx="1" fill="#8d1313"/>
          <rect x="48" y="35" width="2" height="8" rx="1" fill="#8d1313"/>
          <rect x="72" y="12" width="16" height="12" rx="2" fill="#1a1a1a" stroke="#333" stroke-width="0.5"/>
          <text x="80" y="20" font-size="8" text-anchor="middle" fill="#00ff00" font-family="monospace">8</text>
          <circle cx="80" cy="32" r="4" fill="#d50000" stroke="#8d1313" stroke-width="1"/>
          <polygon points="80,29 82,35 78,35" fill="white" opacity="0.9"/>
          <circle cx="80" cy="44" r="4" fill="#d50000" stroke="#8d1313" stroke-width="1"/>
          <polygon points="80,47 82,41 78,41" fill="white" opacity="0.9"/>
          <line x1="5" y1="5" x2="88" y2="5" stroke="rgba(198,40,40,0.3)" stroke-width="1"/>
          <line x1="5" y1="70" x2="88" y2="70" stroke="rgba(198,40,40,0.3)" stroke-width="1"/>
          <text x="46.666" y="67" font-size="22" font-weight="normal" text-anchor="middle" fill="#000000">LIFT</text>
        </g>
      </g>
    </svg>
  </div>`;
  document.getElementById('fp-floorplan-container').innerHTML = html;
 document.getElementById('fp-floorplan-container').style.width = (598 * 1.35) + 'px';
document.getElementById('fp-floorplan-container').style.height = (429 * 1.5) + 'px';
document.getElementById('level8foyer-svg').style.width = (598 * 1.35) + 'px';
document.getElementById('level8foyer-svg').style.height = (429 * 1.35) + 'px';

}










function isLegalLevel8FoyerPlacement(x, y, type, angle = 0) {
    // Patch for scaling!
  const scale = 1.43;
  // If your SVG is scaled via .style.width/.height
  x = x / scale;
  y = y / scale;
  const sz = FURNITURE_SIZE[type];

  // 1. Must be fully inside the SVG area
  if (x < 0 || y < 0 || x + sz.w > 598 || y + sz.h > 429) return false;

  // 2. Check that ALL corners are inside the polygon
  const corners = getRotatedCorners(x, y, sz.w, sz.h, angle);
  for (const corner of corners) {
    if (!pointInPolygon(corner, level8Polygon)) return false;
  }

  // 3. Restricted rectangles (escalator, lifts, gantries, etc.)
  const restrictRects = [
    [0, 0, 80, 130],                        // Escalator
    [180 - 36, 0, 72, 12],                  // Entry Gantry 1
    [448.5 - 36, 0, 72, 12],                // Entry Gantry 2
    [159, 354, 93.333, 75],                 // Lift 1
    [252.333, 354, 93.333, 75],             // Lift 2
    [345.666, 354, 93.333, 75],             // Lift 3
  ];
  for (const [rx, ry, rw, rh] of restrictRects) {
    if (!(x + sz.w <= rx || x >= rx + rw || y + sz.h <= ry || y >= ry + rh)) return false;
  }

  return true;
}







// --- State ---
let counters = {};
for (const key in MAX_COUNTS) counters[key] = 0;
const counterEls = {};
document.querySelectorAll('.fp-counter').forEach(el => {
  counterEls[el.dataset.counter] = el;
});
function updateCounter(type) { if (counterEls[type]) counterEls[type].textContent = counters[type]; }
function updateAllCounters() { for (let type in counters) updateCounter(type); }

// -------------------- PLAN RENDERERS ------------------------

// Training Room Plan: old 600x495 px with entrance/screen
function renderTrainingRoomPlan() {
  let html = `<div id="floor-plan" class="fp-floor-plan" style="width:600px;height:495px;">
      <div class="fp-fixed-entrance" style="left:;top:0;width:80px;height:80px;">
        <span class="fp-fixed-label">ENTRANCE</span>
      </div>
      <div class="fp-fixed-screen" style="left:290px;top:460px;width:240px;height:35px;">
        <span class="fp-fixed-label">MAIN PRESENTATION SCREEN</span>
      </div>
    </div>`;
  document.getElementById('fp-floorplan-container').innerHTML = html;
}

// Foyer Plan: SVG plan, 1200x800px, drag furniture on white only
function renderFoyerPlan() {
  let html = `<div id="floorplan-foyer-svg" class="fp-foyer-svg-container">
  <svg id="level7foyer-svg" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="5" dy="5" stdDeviation="8" flood-color="#000" flood-opacity="0.10"/>
      </filter>
      <linearGradient id="escalatorGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f44336" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#d32f2f" stop-opacity="0.25"/>
      </linearGradient>
      <linearGradient id="stairsGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f44336" stop-opacity="0.30"/>
        <stop offset="50%" stop-color="#f44336" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#f44336" stop-opacity="0.35"/>
      </linearGradient>
      <radialGradient id="liftGrad" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#f44336" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#f44336" stop-opacity="0.35"/>
      </radialGradient>
      <radialGradient id="pillarMetal" cx="40%" cy="40%" r="70%">
        <stop offset="0%" stop-color="#eceff1"/>
        <stop offset="30%" stop-color="#cfd8dc"/>
        <stop offset="70%" stop-color="#b0bec5"/>
        <stop offset="100%" stop-color="#90a4ae"/>
      </radialGradient>
      <linearGradient id="gantryGlass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#9ec6ff" stop-opacity="0.4"/>
        <stop offset="50%" stop-color="#90caf9" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#81d4fa" stop-opacity="0.35"/>
      </linearGradient>
    </defs>
    <!-- Outer wall -->
    <polygon id="foyer-white-area"
      filter="url(#f1)"
      fill="#fafafa"
      stroke="#2c3e50" stroke-width="4"
      points="
        60,60
        1140,60
        1140,511.862
        946.345,511.862
        946.345,705.517
        439.862,705.517
        439.862,511.862
        208.966,511.862
        208.966,467.172
        89.793,467.172
        89.793,511.862
        60,511.862
        60,60
      "
    />
    <!-- Entry Gantries -->
    <g filter="url(#f1)">
      <rect x="295.366" y="60" width="148.966" height="34.262" rx="17.131"
        fill="url(#gantryGlass)" stroke="#1976d2" stroke-width="3"/>
      <text x="370.349" y="85" font-size="15" font-weight="bold" text-anchor="middle" fill="#0d47a1">Entry Gantry</text>
      <rect x="730.345" y="60" width="148.966" height="34.262" rx="17.131"
        fill="url(#gantryGlass)" stroke="#1976d2" stroke-width="3"/>
      <text x="805.331" y="85" font-size="15" font-weight="bold" text-anchor="middle" fill="#0d47a1">Entry Gantry</text>
    </g>
    <!-- Escalator, Stairs, Lifts, Dustbin, Pillars as in your SVG -->
    <g filter="url(#f1)">
      <rect x="60" y="60" width="148.966" height="148.966" rx="12"
        fill="url(#escalatorGrad)" stroke="#c62828" stroke-width="2.5"/>
      <g stroke="#c62828" stroke-width="1" stroke-opacity="0.4">
        <line x1="65" y1="78.621" x2="203.966" y2="78.621"/>
        <line x1="65" y1="97.242" x2="203.966" y2="97.242"/>
        <line x1="65" y1="115.862" x2="203.966" y2="115.862"/>
        <line x1="65" y1="134.483" x2="203.966" y2="134.483"/>
        <line x1="65" y1="153.104" x2="203.966" y2="153.104"/>
        <line x1="65" y1="171.725" x2="203.966" y2="171.725"/>
        <line x1="65" y1="190.345" x2="203.966" y2="190.345"/>
      </g>
      <line x1="68" y1="65" x2="200.966" y2="65" stroke="#b71c1c" stroke-width="4"/>
      <line x1="68" y1="203.966" x2="200.966" y2="203.966" stroke="#b71c1c" stroke-width="4"/>
      <rect x="66" y="62" width="6" height="142.966" rx="3" fill="#6d4c41"/>
      <rect x="198.966" y="62" width="6" height="142.966" rx="3" fill="#6d4c41"/>
      <rect x="200.966" y="63" width="6" height="142.966" fill="#333" fill-opacity="0.15"/>
      <text x="134.483" y="134.483" font-size="22" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Escalator</text>
    </g>
    <g filter="url(#f1)">
      <rect x="253.655" y="333.103" width="186.207" height="178.759" rx="10"
        fill="url(#stairsGrad)" stroke="#c62828" stroke-width="2.5"/>
      <g stroke="#c62828" stroke-width="1" stroke-opacity="0.4">
        <line x1="256.655" y1="347.999" x2="436.862" y2="347.999"/>
        <line x1="256.655" y1="362.896" x2="436.862" y2="362.896"/>
        <line x1="256.655" y1="377.793" x2="436.862" y2="377.793"/>
        <line x1="256.655" y1="392.689" x2="436.862" y2="392.689"/>
        <line x1="256.655" y1="407.586" x2="436.862" y2="407.586"/>
        <line x1="256.655" y1="422.483" x2="436.862" y2="422.483"/>
        <line x1="256.655" y1="437.379" x2="436.862" y2="437.379"/>
        <line x1="256.655" y1="452.276" x2="436.862" y2="452.276"/>
        <line x1="256.655" y1="467.172" x2="436.862" y2="467.172"/>
        <line x1="256.655" y1="482.069" x2="436.862" y2="482.069"/>
        <line x1="256.655" y1="496.966" x2="436.862" y2="496.966"/>
        <line x1="256.655" y1="511.862" x2="436.862" y2="511.862"/>
      </g>
      <line x1="256.655" y1="337.103" x2="256.655" y2="509.862" stroke="#8d6e63" stroke-width="2"/>
      <line x1="437.862" y1="337.103" x2="437.862" y2="509.862" stroke="#8d6e63" stroke-width="2"/>
      <text x="347.759" y="407.862" font-size="22" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Stairs</text>
      <text x="347.759" y="431.862" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Down</text>
    </g>
    <g filter="url(#f1)">
      <rect x="961.241" y="187.862" width="178.759" height="170.069" rx="10"
        fill="url(#stairsGrad)" stroke="#c62828" stroke-width="2.5"/>
      <g stroke="#c62828" stroke-width="1" stroke-opacity="0.4">
        <line x1="964.241" y1="202.759" x2="1139.999" y2="202.759"/>
        <line x1="964.241" y1="217.655" x2="1139.999" y2="217.655"/>
        <line x1="964.241" y1="232.552" x2="1139.999" y2="232.552"/>
        <line x1="964.241" y1="247.448" x2="1139.999" y2="247.448"/>
        <line x1="964.241" y1="262.345" x2="1139.999" y2="262.345"/>
        <line x1="964.241" y1="277.241" x2="1139.999" y2="277.241"/>
        <line x1="964.241" y1="292.138" x2="1139.999" y2="292.138"/>
        <line x1="964.241" y1="307.034" x2="1139.999" y2="307.034"/>
        <line x1="964.241" y1="321.931" x2="1139.999" y2="321.931"/>
        <line x1="964.241" y1="336.827" x2="1139.999" y2="336.827"/>
        <line x1="964.241" y1="351.724" x2="1139.999" y2="351.724"/>
      </g>
      <line x1="964.241" y1="190.862" x2="964.241" y2="355.931" stroke="#8d6e63" stroke-width="2"/>
      <line x1="1134.999" y1="190.862" x2="1134.999" y2="355.931" stroke="#8d6e63" stroke-width="2"/>
      <text x="1070" y="261" font-size="22" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Stairs</text>
      <text x="1070" y="285" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Up</text>
    </g>
    <g filter="url(#f1)">
      <rect x="439.862" y="511.862" width="168.966" height="193.655" rx="10"
        fill="url(#liftGrad)" stroke="#c62828" stroke-width="2.5"/>
      <line x1="524.344" y1="514.862" x2="524.344" y2="702.517" stroke="rgba(198,40,40,0.3)" stroke-width="1.5"/>
      <circle cx="596.828" cy="608.689" r="6" fill="#d50000"/>
      <text x="524.344" y="608.689" font-size="22" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Lift</text>
      <rect x="608.828" y="511.862" width="168.966" height="193.655" rx="10"
        fill="url(#liftGrad)" stroke="#c62828" stroke-width="2.5"/>
      <line x1="693.31" y1="514.862" x2="693.31" y2="702.517" stroke="rgba(198,40,40,0.3)" stroke-width="1.5"/>
      <circle cx="765.793" cy="608.689" r="6" fill="#d50000"/>
      <text x="693.31" y="608.689" font-size="22" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Lift</text>
      <rect x="777.793" y="511.862" width="168.966" height="193.655" rx="10"
        fill="url(#liftGrad)" stroke="#c62828" stroke-width="2.5"/>
      <line x1="862.276" y1="514.862" x2="862.276" y2="702.517" stroke="rgba(198,40,40,0.3)" stroke-width="1.5"/>
      <circle cx="934.759" cy="608.689" r="6" fill="#d50000"/>
      <text x="862.276" y="608.689" font-size="22" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Lift</text>
    </g>
    <g filter="url(#f1)">
      <rect x="89.793" y="467.172" width="119.172" height="44.689" rx="8"
        fill="rgba(244,67,54,0.25)" stroke="#c62828" stroke-width="2.5"/>
      <text x="149.359" y="495" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Dustbin</text>
    </g>
    <g filter="url(#f1)">
      <circle cx="223.862" cy="348.966" r="29.793" fill="url(#pillarMetal)" stroke="#546e7a" stroke-width="3"/>
      <ellipse cx="218" cy="343" rx="16" ry="9" fill="#b0bec5" opacity="0.6"/>
      <text x="223.862" y="355.966" font-size="13" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Pillar</text>
      <circle cx="1060.689" cy="391.379" r="29.793" fill="url(#pillarMetal)" stroke="#546e7a" stroke-width="3"/>
      <ellipse cx="1055" cy="385" rx="16" ry="9" fill="#b0bec5" opacity="0.6"/>
      <text x="1060.689" y="398.379" font-size="13" font-weight="bold" text-anchor="middle" fill="#1a1a1a">Pillar</text>
    </g>
  </svg>
</div>`;
  document.getElementById('fp-floorplan-container').innerHTML = html;
}




// ==================== PLAN LOADING + STATE ======================
let placed = []; // [{type, x, y, angle, id}]
function clearPlaced() {
  placed = [];
  for (let key in counters) counters[key] = 0;
  updateAllCounters();
  redrawPlacedFurniture();
}
function redrawPlacedFurniture() {
  let floor = document.querySelector('.fp-floor-plan') || document.querySelector('.fp-foyer-svg-container');
  if (!floor) return;
  // Remove all .placed-furniture
  Array.from(floor.querySelectorAll('.placed-furniture')).forEach(e=>e.remove());
  // Redraw
  for (const item of placed) {
    const el = document.createElement('div');
    el.className = 'placed-furniture';
    el.innerHTML = SVGs[item.type];
    let sz = FURNITURE_SIZE[item.type];
    el.style.width = sz.w + 'px';
    el.style.height = sz.h + 'px';
    el.style.left = item.x + 'px';
    el.style.top = item.y + 'px';
    el.style.transform = `rotate(${item.angle||0}deg)`;
    el.setAttribute('data-id', item.id);
    el.setAttribute('data-type', item.type);
    el.setAttribute('tabindex', '0');
    el.title = "Double-click to remove. Drag to move. Right-click to rotate.";
    // Drag logic
    addPlacedFurnitureEvents(el, item);
    floor.appendChild(el);
  }
  
}
function addPlacedFurnitureEvents(el, item) {
  let drag = false, rotating = false;
  let offsetX = 0, offsetY = 0;
  let rotateOrigin = 0, rotateStartAngle = 0, center = {};

  el.onmousedown = function(e) {
    if (e.button === 2) { // Right mouse for rotate
      rotating = true;
      const rect = el.getBoundingClientRect();
      center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      rotateOrigin = Math.atan2(e.clientY - center.y, e.clientX - center.x);
      rotateStartAngle = item.angle || 0;
      document.body.style.userSelect = "none";

      // Bind move/up only for this rotate
      function onMove(ev) {
        if (!rotating) return;
        let angle = Math.atan2(ev.clientY - center.y, ev.clientX - center.x);
        let deltaDeg = (angle - rotateOrigin) * (180 / Math.PI);
        let newAngle = ((rotateStartAngle || 0) + deltaDeg);
        // Test placement at same position with new angle
        if (canPlaceFurnitureAt(item.x, item.y, item.type, item.id, newAngle)) {
          item.angle = newAngle;
          el.style.transform = `rotate(${newAngle}deg)`;
        }
      }
      function onUp(ev) {
        rotating = false;
        document.body.style.userSelect = "";
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      }
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);

      e.preventDefault();
      return;
    }
    // Left mouse for drag
    drag = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.body.style.userSelect = "none";

    function onMove(ev) {
      if (!drag) return;
      let floor = document.querySelector('.fp-floor-plan') || document.querySelector('.fp-foyer-svg-container');
      let rect = floor.getBoundingClientRect();
      let nx = ev.clientX - rect.left - offsetX;
      let ny = ev.clientY - rect.top - offsetY;
      // Test if placement allowed
      if (canPlaceFurnitureAt(nx, ny, item.type, item.id, item.angle)) {
        el.style.left = nx + 'px';
        el.style.top = ny + 'px';
        item.x = nx;
        item.y = ny;
      }
    }
    function onUp(ev) {
      drag = false;
      document.body.style.userSelect = "";
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    e.preventDefault();
  };

  el.oncontextmenu = function(e) {
    // Block default context menu for right click
    e.preventDefault();
    return false;
  };
  el.ondblclick = function() {
    let idx = placed.findIndex(p => p.id === item.id);
    if (idx !== -1) {
      counters[item.type]--;
      placed.splice(idx, 1);
      updateCounter(item.type);
      redrawPlacedFurniture();
    }
  };
}











function canPlaceFurnitureAt(x, y, type, selfId, angle = 0) {
  // 1. Check bounds and restricted zones for the current plan
  if (!currentPlan.placementRestriction(x, y, type, angle)) return false;

  // 2. Check collision with other furniture
  const sz = FURNITURE_SIZE[type];
  function getRotatedCorners(x, y, w, h, angleDeg) {
    const angle = angleDeg * Math.PI / 180;
    const cx = x + w / 2, cy = y + h / 2;
    const corners = [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h]
    ];
    return corners.map(([px, py]) => {
      const dx = px - cx, dy = py - cy;
      const rx = cx + dx * Math.cos(angle) - dy * Math.sin(angle);
      const ry = cy + dx * Math.sin(angle) + dy * Math.cos(angle);
      return [rx, ry];
    });
  }
  const myCorners = getRotatedCorners(x, y, sz.w, sz.h, angle);

  for (const f of placed) {
    if (f.id === selfId) continue;
    // Allow queue poles to overlap each other!
    if (type === 'queue-pole' && f.type === 'queue-pole') continue;

    const fs = FURNITURE_SIZE[f.type];
    const theirCorners = getRotatedCorners(f.x, f.y, fs.w, fs.h, f.angle || 0);
    if (rectanglesIntersect(myCorners, theirCorners)) return false;
  }
  return true;
}


// Axis-Aligned Bounding Box for rotated rectangles, fallback: Separating Axis Theorem
function rectanglesIntersect(a, b) {
  // a, b are arrays of 4 points [ [x0,y0], [x1,y1], [x2,y2], [x3,y3] ]
  function getAxes(corners) {
    return [
      [corners[1][0] - corners[0][0], corners[1][1] - corners[0][1]],
      [corners[2][0] - corners[1][0], corners[2][1] - corners[1][1]]
    ];
  }
  function project(points, axis) {
    const norm = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1]);
    const [ax, ay] = [axis[0] / norm, axis[1] / norm];
    let min = Infinity, max = -Infinity;
    for (const [px, py] of points) {
      const proj = px * ax + py * ay;
      if (proj < min) min = proj;
      if (proj > max) max = proj;
    }
    return [min, max];
  }
  const axes = [...getAxes(a), ...getAxes(b)];
  for (const axis of axes) {
    const [minA, maxA] = project(a, axis);
    const [minB, maxB] = project(b, axis);
    if (maxA < minB || maxB < minA) return false;
  }
  return true;
}







// Inventory drag logic
document.querySelectorAll('.fp-furniture').forEach(f=>{
  f.ondragstart = e=>{
    e.dataTransfer.setData('type', f.dataset.type);
  };
});
// Main drop logic
document.getElementById('fp-floorplan-container').ondragover = e => e.preventDefault();
document.getElementById('fp-floorplan-container').ondrop = function(e) {
  let type = e.dataTransfer.getData('type');
  if (!type) return;
  if (counters[type]>=MAX_COUNTS[type]) return;
  let rect = this.getBoundingClientRect();
  let sz = FURNITURE_SIZE[type];
  let x = e.clientX - rect.left - sz.w/2;
  let y = e.clientY - rect.top - sz.h/2;
  // Placement restriction
if (!currentPlan.placementRestriction(x, y, type, 0)) return;


  let item = {type, x, y, angle: 0, id:Math.random().toString(36).slice(2)};
  placed.push(item);
  counters[type]++;
  updateCounter(type);
  redrawPlacedFurniture();
};

function getRotatedCorners(x, y, w, h, angle = 0) {
  const rad = (angle * Math.PI) / 180;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const corners = [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h]
  ];
  if (angle === 0) return corners;
  return corners.map(([px, py]) => {
    const dx = px - cx;
    const dy = py - cy;
    const rx = cx + dx * Math.cos(rad) - dy * Math.sin(rad);
    const ry = cy + dx * Math.sin(rad) + dy * Math.cos(rad);
    return [rx, ry];
  });
}


function isLegalTrainingRoomPlacement(x, y, type, angle = 0) {
  const sz = FURNITURE_SIZE[type];
  // Only axis-aligned (angle == 0). Rotation will come next.
  // Flush with walls
  if (x < 0 || y < 0 || x + sz.w > 600 || y + sz.h > 495) return false;

  // Entrance overlap (0,0,80,80)
  if (rectsOverlap(x, y, sz.w, sz.h, 0, 0, 80, 80)) return false;
  // Screen overlap (180,460,240,35)
  if (rectsOverlap(x, y, sz.w, sz.h, 180, 460, 240, 35)) return false;

  return true;
}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(x1 + w1 <= x2 ||
           x1 >= x2 + w2 ||
           y1 + h1 <= y2 ||
           y1 >= y2 + h2);
}


const level8Polygon = [
  [0, 0],          // Top-left corner
  [598, 0],        // Top-right
  [598, 206],      // Down right wall
  [514, 206],      // Step in for first 'L'
  [514, 292],      // Down first step
  [439, 292],      // In again
  [439, 354],      // Down to bottom right
  [159, 354],      // All the way left
  [159, 292],      // Up left 'L'
  [84, 292],       // Out again
  [84, 206],       // Up to main body
  [0, 206],        // Left up
  [0, 0]           // Close polygon
];


function isLegalFoyerPlacement(x, y, type, angle = 0) {
  // 1. Must be inside white area polygon (old logic)
  let pts = [
    [60,60], [1140,60], [1140,511.862], [946.345,511.862], [946.345,705.517],
    [439.862,705.517], [439.862,511.862], [208.966,511.862], [208.966,467.172], [89.793,467.172],
    [89.793,511.862], [60,511.862], [60,60]
  ];
 let sz = FURNITURE_SIZE[type];
const corners = getRotatedCorners(x, y, sz.w, sz.h, angle);
for (const corner of corners) {
  if (!pointInPolygon(corner, pts)) return false;
}


  // 2. Not over restricted areas (lifts, stairs, escalator, pillar, dustbin, gantry)
  // List of restricted rectangles/circles (all in SVG coordinates)
  // [type, x, y, w, h] or [type, cx, cy, r]
  const restrictRects = [
    // Escalator (rect)
    ['rect', 60, 60, 148.966, 148.966],
    // Stairs 1 (rect)
    ['rect', 253.655, 333.103, 186.207, 178.759],
    // Stairs 2 (rect)
    ['rect', 961.241, 187.862, 178.759, 170.069],
    // Lift 1
    ['rect', 439.862, 511.862, 168.966, 193.655],
    // Lift 2
    ['rect', 608.828, 511.862, 168.966, 193.655],
    // Lift 3
    ['rect', 777.793, 511.862, 168.966, 193.655],
    // Dustbin (rect)
    ['rect', 89.793, 467.172, 119.172, 44.689],
    // Gantry 1 (rect)
    ['rect', 295.366, 60, 148.966, 34.262],
    // Gantry 2 (rect)
    ['rect', 730.345, 60, 148.966, 34.262],
  ];
  const restrictCircles = [
    // Pillar 1 (circle)
    [223.862, 348.966, 29.793],
    // Pillar 2 (circle)
    [1060.689, 391.379, 29.793],
  ];

  // Get bounding box of this furniture (with angle, but fallback to axis-aligned)
  let bbox = {
    x1: x,
    y1: y,
    x2: x + sz.w,
    y2: y + sz.h
  };
  // Test against restricted rectangles
  for (const r of restrictRects) {
    const [_, rx, ry, rw, rh] = r;
    if (bbox.x2 > rx && bbox.x1 < rx + rw && bbox.y2 > ry && bbox.y1 < ry + rh) return false;
  }
  // Test against restricted circles (pillars)
  for (const c of restrictCircles) {
    const [cx0, cy0, rad] = c;
    // Check closest point on bbox to circle center
    let closestX = Math.max(bbox.x1, Math.min(cx0, bbox.x2));
    let closestY = Math.max(bbox.y1, Math.min(cy0, bbox.y2));
    let dx = closestX - cx0;
    let dy = closestY - cy0;
    if (dx * dx + dy * dy < rad * rad) return false;
  }
  return true;
}


function pointInPolygon(pt,poly) {
  let [x,y]=pt; let inside=false;
  for(let i=0,j=poly.length-1;i<poly.length;j=i++) {
    let xi=poly[i][0],yi=poly[i][1],xj=poly[j][0],yj=poly[j][1];
    let intersect=((yi>y)!=(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi);
    if(intersect) inside=!inside;
  }
  return inside;
}







// ----------- PLAN SWITCH LOGIC (btns in #spaces section) -----------
document.querySelectorAll('.design-btn').forEach(btn => {
  btn.onclick = function(e) {
    e.preventDefault();
    let which = btn.dataset.floor;
    if (plans.hasOwnProperty(which)) {
      switchPlan(which);
    }
    // else do nothing, or add an error if desired
  };
});
function switchPlan(key) {
  currentPlan = plans[key];

  // Update title
  document.getElementById('fp-section-title').textContent = currentPlan.title;

  // Room specs card
  document.getElementById('fp-room-specs-card').style.display = currentPlan.showSpecs ? '' : 'none';

  // Presets
  document.getElementById('fp-presets-compact').style.display = currentPlan.showPresets ? '' : 'none';

  // Description logic:
  // Hide all descriptions by default
  document.getElementById('fp-foyer-desc').style.display = 'none';
  const level8desc = document.getElementById('fp-level8foyer-desc');
  if (level8desc) level8desc.style.display = 'none';

  // Show description only for current plan if it has one
  if (key === 'foyer') {
    document.getElementById('fp-foyer-desc').style.display = '';
  } else if (key === 'level8foyer') {
    if (level8desc) level8desc.style.display = '';
  }

  // Floorplan dimensions
  document.getElementById('fp-floorplan-container').style.width = currentPlan.floorW + 'px';
  document.getElementById('fp-floorplan-container').style.height = currentPlan.floorH + 'px';

  // Clear and render
  clearPlaced();
  currentPlan.render();
  redrawPlacedFurniture();
}






document.getElementById('theatre-btn').onclick = ()=>{
  if(currentPlan.id!=='training') return;
  loadTheatreStyle();
};
document.getElementById('roundtable-btn').onclick = ()=>{
  if(currentPlan.id!=='training') return;
  loadRoundTableStyle();
};

function loadTheatreStyle() {
  clearPlaced();

  const floorW = 600, floorH = 495;
  const entranceBox = { x: 0, y: 0, w: 80, h: 80 };
  const screenBox = { x: floorW / 2 - 120, y: floorH - 35, w: 240, h: 35 };

  const rows = 10, perRow = 16;
  const chairW = FURNITURE_SIZE["chair"].w || 24;
  const chairH = FURNITURE_SIZE["chair"].h || 32;
  const minGapX = 2, aisleWidth = 18;
  const sideChairs = perRow / 2;
  const leftPad = entranceBox.w + 4;
  const rightPad = 10;
  const usableW = floorW - leftPad - rightPad - aisleWidth;
  const gapX = Math.max(minGapX, (usableW - sideChairs * chairW * 2) / (perRow - 1));

  // Chair x positions
  const rowXs = [];
  for (let i = 0; i < sideChairs; i++) {
    rowXs.push(leftPad + i * (chairW + gapX));
  }
  const rightStart = leftPad + sideChairs * (chairW + gapX) + aisleWidth;
  for (let i = 0; i < sideChairs; i++) {
    rowXs.push(rightStart + i * (chairW + gapX));
  }

  // Vertical Y positions
  const topLimit = entranceBox.h + chairH / 2 + 8;
  const botLimit = screenBox.y - chairH / 2 - 12;
  const rowYs = [];
  for (let i = 0; i < rows; i++) {
    if (rows === 1) {
      rowYs.push((topLimit + botLimit) / 2);
    } else {
      rowYs.push(topLimit + (botLimit - topLimit) * (i / (rows - 1)));
    }
  }

  // Place chairs
  let added = 0;
  for (let row = 0; row < rows; row++) {
    const y = rowYs[row];
    for (let c = 0; c < perRow; c++) {
      const x = rowXs[c] + chairW / 2;
      const cBox = { x: x - chairW / 2, y: y - chairH / 2, w: chairW, h: chairH };
      // Avoid entrance/screen overlap/bounds
      const overlapsEntrance =
        cBox.x + cBox.w > entranceBox.x &&
        cBox.x < entranceBox.x + entranceBox.w &&
        cBox.y + cBox.h > entranceBox.y &&
        cBox.y < entranceBox.y + entranceBox.h;
      const overlapsScreen =
        cBox.x + cBox.w > screenBox.x &&
        cBox.x < screenBox.x + screenBox.w &&
        cBox.y + cBox.h > screenBox.y &&
        cBox.y < screenBox.y + screenBox.h;
      const outOfBounds =
        cBox.x < 0 ||
        cBox.x + cBox.w > floorW ||
        cBox.y < 0 ||
        cBox.y + cBox.h > floorH;
      if (overlapsEntrance || overlapsScreen || outOfBounds) continue;

      if (counters['chair']<MAX_COUNTS['chair']) {
        placed.push({
          type: "chair",
          x: cBox.x,
          y: cBox.y,
          angle: 0,
          id: Math.random().toString(36).slice(2)
        });
        counters['chair']++;
        added++;
      }
    }
  }
  updateAllCounters();
  redrawPlacedFurniture();
}

function loadRoundTableStyle() {
  clearPlaced();

  const floorW = 600, floorH = 495;
  const entranceBox = { x: 0, y: 0, w: 80, h: 80 };
  const screenBox = { x: floorW / 2 - 120, y: floorH - 35, w: 240, h: 35 };
  const tableD = FURNITURE_SIZE["round-table"].w || 73;
  const chairD = FURNITURE_SIZE["chair"].w || 24;
  const chairPad = 6;

  const rows = 3, tablesPerRow = [3, 4, 3];
  const minX = entranceBox.w + chairD + 10;
  const maxX = floorW - chairD - 10;
  const minY = entranceBox.h + chairD + 16;
  const maxY = floorH - screenBox.h - chairD - 16;
  const rowYs = [];
  for (let r = 0; r < rows; r++) {
    rowYs.push(minY + ((maxY - minY) * r) / (rows - 1));
  }
  const tableXsByRow = [];
  for (let r = 0; r < rows; r++) {
    const cols = tablesPerRow[r];
    const usableW = maxX - minX - tableD;
    const spacing = cols > 1 ? usableW / (cols - 1) : 0;
    const xs = [];
    for (let c = 0; c < cols; c++) {
      xs.push(minX + c * spacing + tableD / 2);
    }
    tableXsByRow.push(xs);
  }

  // Compute safe chair radius
  let safeChairR = tableD / 2 + chairD / 2 + chairPad;
  let overlap = true;
  while (overlap && safeChairR >= tableD / 2 + chairD / 2) {
    overlap = false;
    const placedChairs = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < tablesPerRow[r]; c++) {
        let x = tableXsByRow[r][c], y = rowYs[r];
        for (let j = 0; j < 5; j++) {
          let angle = (-90 + j * 72) * Math.PI / 180;
          let cx = x + safeChairR * Math.cos(angle);
          let cy = y + safeChairR * Math.sin(angle);
          let cBox = { x: cx - chairD / 2, y: cy - chairD / 2, w: chairD, h: chairD };
          if (
            cBox.x < 0 ||
            cBox.x + cBox.w > floorW ||
            cBox.y < 0 ||
            cBox.y + cBox.h > floorH ||
            (cBox.x + cBox.w > entranceBox.x &&
              cBox.x < entranceBox.x + entranceBox.w &&
              cBox.y + cBox.h > entranceBox.y &&
              cBox.y < entranceBox.y + entranceBox.h) ||
            (cBox.x + cBox.w > screenBox.x &&
              cBox.x < screenBox.x + screenBox.w &&
              cBox.y + cBox.h > screenBox.y &&
              cBox.y < screenBox.y + screenBox.h)
          ) {
            overlap = true;
            break;
          }
          for (const prev of placedChairs) {
            if (
              cBox.x < prev.x + prev.w &&
              cBox.x + cBox.w > prev.x &&
              cBox.y < prev.y + prev.h &&
              cBox.y + cBox.h > prev.y
            ) {
              overlap = true;
              break;
            }
          }
          if (overlap) break;
          placedChairs.push(cBox);
        }
        if (overlap) break;
      }
      if (overlap) break;
    }
    if (overlap) safeChairR--;
  }

  // Place tables and 5 chairs each
  let tableIndex = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < tablesPerRow[r]; c++) {
      let x = tableXsByRow[r][c], y = rowYs[r];

      // Nudge for boundaries
      if (r === 0 && c === 0 && (x - tableD / 2 - chairD) < entranceBox.w) {
        x = entranceBox.w + chairD + tableD / 2 + 8;
      }
      if (y - tableD / 2 - chairD < entranceBox.h && r === 0) {
        y = entranceBox.h + tableD / 2 + chairD + 10;
      }
      if (y + tableD / 2 + chairD > screenBox.y && r === rows - 1) {
        y = screenBox.y - tableD / 2 - chairD - 10;
      }

      // Place table
      if (counters['round-table']<MAX_COUNTS['round-table']) {
        placed.push({
          type: "round-table",
          x: x - tableD / 2,
          y: y - tableD / 2,
          angle: 0,
          id: Math.random().toString(36).slice(2)
        });
        counters['round-table']++;
      }

      // Place 5 chairs
      for (let j = 0; j < 5; j++) {
        let angle = (-90 + j * 72) * Math.PI / 180;
        let cx = x + safeChairR * Math.cos(angle);
        let cy = y + safeChairR * Math.sin(angle);
        cx = Math.max(chairD / 2, Math.min(floorW - chairD / 2, cx));
        cy = Math.max(chairD / 2, Math.min(floorH - chairD / 2, cy));
        if (counters['chair']<MAX_COUNTS['chair']) {
          placed.push({
            type: "chair",
            x: cx - chairD / 2,
            y: cy - chairD / 2,
            angle: 0,
            id: Math.random().toString(36).slice(2)
          });
          counters['chair']++;
        }
      }

      tableIndex++;
      if (tableIndex >= MAX_COUNTS['round-table']) break;
    }
    if (tableIndex >= MAX_COUNTS['round-table']) break;
  }

  updateAllCounters();
  redrawPlacedFurniture();
}












// ----------- SAVE/LOAD LOGIC -----------
let saveModal = document.getElementById('fp-save-modal');
let loadModal = document.getElementById('fp-load-modal');
document.getElementById('fp-save-btn').onclick = ()=>{saveModal.style.display='block';};
document.getElementById('fp-save-modal-close').onclick = ()=>{saveModal.style.display='none';};
document.getElementById('fp-modal-save-confirm').onclick = function() {
  let name = document.getElementById('fp-save-name').value || 'Untitled';
  let desc = document.getElementById('fp-save-desc').value;
  let saveKey = 'ntuc_spaces_designs';
  let all = JSON.parse(localStorage.getItem(saveKey)||'[]');
  let entry = {name, desc, plan: currentPlan.id, placed:JSON.parse(JSON.stringify(placed)), date:Date.now()};
  all.push(entry); localStorage.setItem(saveKey,JSON.stringify(all));
  saveModal.style.display='none';
  alert('Floorplan saved!');
};
// PDF Download
document.getElementById('fp-modal-save-pdf').onclick = downloadCurrentFloorplanPDF;


function downloadCurrentFloorplanPDF() {
  const planArea = document.getElementById('fp-floorplan-container');
  // Get Design Name/Desc
  let name = document.getElementById('fp-save-name')?.value || document.getElementById('fp-section-title').textContent || 'Untitled';
  let desc = document.getElementById('fp-save-desc')?.value || '';
  // If both fields are blank, try to get from last save (optional)
  if (!name && window.lastSavedPlan) {
    name = window.lastSavedPlan.name;
    desc = window.lastSavedPlan.desc;
  }

  // Wait for UI layout
  setTimeout(() => {
    html2canvas(planArea, {
      backgroundColor: null,
      scale: 2, // higher-res PDF
      useCORS: true,
    }).then(canvas => {
      // Get full rendered image size
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Adjust PDF page to image aspect ratio
      let pdfW = imgWidth * 0.75; // px to pt (jsPDF default is 72pt per inch, so px * 0.75 is decent)
      let pdfH = imgHeight * 0.75 + 110; // add space at top for title/desc

      // Create PDF
      let pdf = new window.jspdf.jsPDF({
        orientation: (pdfW > pdfH) ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [pdfW, pdfH]
      });

      // Title/desc box at top
      pdf.setFillColor(240, 245, 250);
      pdf.rect(0, 0, pdfW, 95, 'F');
      pdf.setFontSize(24);
      pdf.setTextColor(30, 50, 80);
      pdf.text(name, 36, 44, {maxWidth: pdfW-60});
      pdf.setFontSize(13);
      pdf.setTextColor(70, 70, 80);
      if(desc) pdf.text(desc, 36, 70, {maxWidth: pdfW-60});

      // Add the image
      pdf.addImage(imgData, 'PNG', 0, 100, pdfW, pdfH-110);

      pdf.save('floorplan.pdf');
    });
  }, 180); // Wait a frame for any CSS/layout
}


document.getElementById('fp-load-btn').onclick = function() {
  const saveKey = 'ntuc_spaces_designs';
  let all = JSON.parse(localStorage.getItem(saveKey) || '[]');
  let list = document.getElementById('fp-saved-list');
  list.innerHTML = '';

  if (all.length === 0) {
    let li = document.createElement('li');
    li.innerHTML = `<em style="color:#999;">No saved floorplans yet.</em>`;
    list.appendChild(li);
  } else {
    all.slice().reverse().forEach((e, i) => {
      let idx = all.length - 1 - i; // reverse index for original array!
      let li = document.createElement('li');
      li.innerHTML = `
        <strong>${e.name}</strong>
        <span style="font-size:12px;color:#888;">(${new Date(e.date).toLocaleString()})</span>
        <br><span style="font-size:11px;">${e.desc || ''}</span>
        <br>
        <button class="fp-btn fp-load-plan-btn" data-idx="${idx}">Load</button>
        <button class="fp-btn fp-download-pdf-btn" data-idx="${idx}">PDF</button>
        <button class="fp-btn fp-delete-plan-btn" data-idx="${idx}" style="color:#b71c1c;background:#ffebee;">Delete</button>
      `;
      list.appendChild(li);
    });
  }

  document.getElementById('fp-load-modal').style.display = 'block';
};

document.getElementById('fp-saved-list').onclick = function(e) {
  const saveKey = 'ntuc_spaces_designs';
  let all = JSON.parse(localStorage.getItem(saveKey) || '[]');

  // Download PDF
  if (e.target.classList.contains('fp-download-pdf-btn')) {
    let idx = +e.target.dataset.idx;
    let entry = all[idx];
    switchPlan(entry.plan);
    placed = JSON.parse(JSON.stringify(entry.placed));
    for (let key in counters) counters[key] = 0;
    for (let item of placed) counters[item.type]++;
    updateAllCounters();
    redrawPlacedFurniture();
    setTimeout(downloadCurrentFloorplanPDF, 500);
    return;
  }

  // Load Plan
  if (e.target.classList.contains('fp-load-plan-btn')) {
    let idx = +e.target.dataset.idx;
    let entry = all[idx];
    switchPlan(entry.plan);
    placed = JSON.parse(JSON.stringify(entry.placed));
    for (let key in counters) counters[key] = 0;
    for (let item of placed) counters[item.type]++;
    updateAllCounters();
    redrawPlacedFurniture();
    document.getElementById('fp-load-modal').style.display = 'none';
    return;
  }

  // Delete Plan
  if (e.target.classList.contains('fp-delete-plan-btn')) {
    let idx = +e.target.dataset.idx;
    if (confirm('Are you sure you want to delete this floorplan? This cannot be undone.')) {
      all.splice(idx, 1); // Remove from array
      localStorage.setItem(saveKey, JSON.stringify(all));
      // Refresh the list
      document.getElementById('fp-load-btn').click();
    }
    return;
  }
};


// =========== INIT ==============
switchPlan('training'); // Start on training room




// Add after your other preset button bindings:
document.getElementById('empty-btn').onclick = () => {
  clearPlaced();
  redrawPlacedFurniture();
};



document.addEventListener('DOMContentLoaded', () => {
  const sliderImages = document.querySelectorAll('.slider-img');

  sliderImages.forEach((img) => {
    img.addEventListener('click', () => {
      sliderImages.forEach(el => el.classList.remove('active'));
      img.classList.add('active');
    });
  });
});


document.getElementById('fp-reset-btn').onclick = function() {
  clearPlaced();
  redrawPlacedFurniture();
};





// Fix: Always wire up the close button for the load modal
document.getElementById('fp-load-modal-close').onclick = function() {
  document.getElementById('fp-load-modal').style.display = 'none';
};
