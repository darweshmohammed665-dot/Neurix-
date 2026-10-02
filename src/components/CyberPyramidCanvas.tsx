import React, { useRef, useEffect } from 'react';

interface CyberPyramidCanvasProps {
  progress: number; // 0 to 100
  isGlitching?: boolean;
}

export const CyberPyramidCanvas: React.FC<CyberPyramidCanvasProps> = ({ progress, isGlitching = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set canvas dimensions with high-DPI scaling
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Hieroglyphic glyphs collection
    const hieroglyphs = [
      '𓂀', '☥', '𓊹', '𓆣', '𓇯', '𓋹', '𓊪', '𓏏', '𓈖', '𓎛', '𓍯', '𓇋', '𓅓', '𓁹',
      '01', '10', 'Φ', 'Δ', '1.618', 'BENBEN', 'NEURIX', '☥', '𓂀'
    ];

    // Particle sparks along the beam
    const particles: Array<{ x: number; y: number; z: number; speed: number; size: number; alpha: number }> = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 40,
        y: Math.random() * 400 - 200,
        z: (Math.random() - 0.5) * 40,
        speed: 1.5 + Math.random() * 2.5,
        size: 1 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.7,
      });
    }

    // Render loop
    const render = () => {
      time += 0.02;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 10;
      const fov = 420; // Perspective focal length

      // 3D rotation projection helper
      // Rotate around Y axis and slight pitch around X axis
      const baseRotationAngle = time * 0.35;
      const pitchAngle = 0.22; // Slightly looking down from above

      const project = (x: number, y: number, z: number, customAngle?: number, offsetY: number = 0) => {
        const ang = customAngle !== undefined ? customAngle : baseRotationAngle;
        
        // Rotate Y
        const cosY = Math.cos(ang);
        const sinY = Math.sin(ang);
        const rx1 = x * cosY - z * sinY;
        const rz1 = x * sinY + z * cosY;

        // Pitch X
        const cosX = Math.cos(pitchAngle);
        const sinX = Math.sin(pitchAngle);
        const ry2 = (y + offsetY) * cosX - rz1 * sinX;
        const rz2 = (y + offsetY) * sinX + rz1 * cosX;

        // Apply camera distance
        const distance = 460;
        const cameraZ = rz2 + distance;
        const scale = fov / Math.max(cameraZ, 20);

        return {
          x: centerX + rx1 * scale,
          y: centerY + ry2 * scale,
          z: cameraZ,
          scale,
        };
      };

      // -------------------------------------------------------------
      // 1. DIGITAL GROUND MATRIX & RAYS
      // -------------------------------------------------------------
      ctx.save();
      const groundY = 130;
      const groundPointsCount = 16;
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.08)';
      ctx.lineWidth = 1;

      // Concentric rings on the ground
      [140, 200, 260].forEach((radius, idx) => {
        ctx.beginPath();
        for (let i = 0; i <= 36; i++) {
          const theta = (i / 36) * Math.PI * 2;
          const p = project(Math.cos(theta) * radius, groundY, Math.sin(theta) * radius);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.stroke();
      });

      // Ground radial telemetry ticks
      for (let i = 0; i < groundPointsCount; i++) {
        const theta = (i / groundPointsCount) * Math.PI * 2 + time * 0.05;
        const p1 = project(Math.cos(theta) * 110, groundY, Math.sin(theta) * 110);
        const p2 = project(Math.cos(theta) * 250, groundY, Math.sin(theta) * 250);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = i % 4 === 0 ? 'rgba(255, 212, 59, 0.15)' : 'rgba(0, 217, 255, 0.05)';
        ctx.stroke();
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 2. VERTICAL BEAM OF LIGHT (Through Benben & Core)
      // -------------------------------------------------------------
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const beamTop = project(0, -320, 0);
      const beamBottom = project(0, 160, 0);

      // Core vertical light beam gradient
      const beamWidth = 14 + Math.sin(time * 4) * 3;
      const beamGrad = ctx.createLinearGradient(beamTop.x, beamTop.y, beamBottom.x, beamBottom.y);
      beamGrad.addColorStop(0, 'rgba(0, 217, 255, 0)');
      beamGrad.addColorStop(0.2, 'rgba(0, 217, 255, 0.35)');
      beamGrad.addColorStop(0.45, 'rgba(255, 212, 59, 0.85)'); // Gold pulse at Benben level
      beamGrad.addColorStop(0.55, 'rgba(0, 217, 255, 0.6)');
      beamGrad.addColorStop(0.85, 'rgba(0, 217, 255, 0.2)');
      beamGrad.addColorStop(1, 'rgba(0, 217, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(beamTop.x - beamWidth * 0.4, beamTop.y);
      ctx.lineTo(beamTop.x + beamWidth * 0.4, beamTop.y);
      ctx.lineTo(beamBottom.x + beamWidth, beamBottom.y);
      ctx.lineTo(beamBottom.x - beamWidth, beamBottom.y);
      ctx.closePath();
      ctx.fillStyle = beamGrad;
      ctx.fill();

      // Laser thin high-intensity spine
      ctx.beginPath();
      ctx.moveTo(beamTop.x, beamTop.y);
      ctx.lineTo(beamBottom.x, beamBottom.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Rising light particles along the beam
      particles.forEach((pt) => {
        pt.y -= pt.speed;
        if (pt.y < -260) {
          pt.y = 120;
          pt.x = (Math.random() - 0.5) * 30;
          pt.z = (Math.random() - 0.5) * 30;
        }
        const p = project(pt.x, pt.y, pt.z);
        const rad = pt.size * p.scale;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(rad, 1), 0, Math.PI * 2);
        ctx.fillStyle = pt.y < -40 
          ? `rgba(255, 212, 59, ${pt.alpha * (progress / 100)})` 
          : `rgba(0, 217, 255, ${pt.alpha * (progress / 100)})`;
        ctx.fill();
      });
      ctx.restore();

      // -------------------------------------------------------------
      // 3. TRUNCATED PYRAMID BASE (FRUSTUM WIREFRAME & SURFACES)
      // -------------------------------------------------------------
      // Base square: Y = +110, size = 180 (x: -90 to +90, z: -90 to +90)
      // Top truncated square: Y = -15, size = 64 (x: -32 to +32, z: -32 to +32)
      const bY = 110;
      const tY = -15;
      const bSize = 95;
      const tSize = 34;

      const baseVertices = [
        { x: -bSize, y: bY, z: -bSize }, // 0: back-left
        { x: bSize, y: bY, z: -bSize },  // 1: back-right
        { x: bSize, y: bY, z: bSize },   // 2: front-right
        { x: -bSize, y: bY, z: bSize },  // 3: front-left
      ];

      const topVertices = [
        { x: -tSize, y: tY, z: -tSize }, // 0: back-left
        { x: tSize, y: tY, z: -tSize },  // 1: back-right
        { x: tSize, y: tY, z: tSize },   // 2: front-right
        { x: -tSize, y: tY, z: tSize },  // 3: front-left
      ];

      // Faces of the truncated pyramid (4 trapezoids)
      const faces = [
        { indices: [3, 2, 2, 3], type: 'front', glyphsIndex: 0, text: '𓂀 NEURIX ☥' },
        { indices: [2, 1, 1, 2], type: 'right', glyphsIndex: 1, text: '𓊹 SPATIAL 𓆣' },
        { indices: [1, 0, 0, 1], type: 'back', glyphsIndex: 2, text: '𓇯 MATRIX 𓋹' },
        { indices: [0, 3, 3, 0], type: 'left', glyphsIndex: 3, text: '𓊪 BENBEN 𓏏' },
      ];

      // Project vertices
      const pBase = baseVertices.map(v => project(v.x, v.y, v.z));
      const pTop = topVertices.map(v => project(v.x, v.y, v.z));

      // Draw faces sorted by average Z depth
      const sortedFaces = [
        { name: 'front', p0: pBase[3], p1: pBase[2], p2: pTop[2], p3: pTop[3], idx: 0, avgZ: (pBase[3].z + pBase[2].z + pTop[2].z + pTop[3].z) / 4 },
        { name: 'right', p0: pBase[2], p1: pBase[1], p2: pTop[1], p3: pTop[2], idx: 1, avgZ: (pBase[2].z + pBase[1].z + pTop[1].z + pTop[2].z) / 4 },
        { name: 'back', p0: pBase[1], p1: pBase[0], p2: pTop[0], p3: pTop[1], idx: 2, avgZ: (pBase[1].z + pBase[0].z + pTop[0].z + pTop[1].z) / 4 },
        { name: 'left', p0: pBase[0], p1: pBase[3], p2: pTop[3], p3: pTop[0], idx: 3, avgZ: (pBase[0].z + pBase[3].z + pTop[3].z + pTop[0].z) / 4 },
      ];

      sortedFaces.sort((a, b) => b.avgZ - a.avgZ);

      // Render each trapezoid face
      sortedFaces.forEach((f) => {
        ctx.save();

        // Subtle holographic fill
        ctx.beginPath();
        ctx.moveTo(f.p0.x, f.p0.y);
        ctx.lineTo(f.p1.x, f.p1.y);
        ctx.lineTo(f.p2.x, f.p2.y);
        ctx.lineTo(f.p3.x, f.p3.y);
        ctx.closePath();

        const grad = ctx.createLinearGradient(f.p3.x, f.p3.y, f.p0.x, f.p0.y);
        grad.addColorStop(0, 'rgba(0, 217, 255, 0.07)');
        grad.addColorStop(0.5, 'rgba(8, 21, 34, 0.65)');
        grad.addColorStop(1, 'rgba(5, 11, 20, 0.9)');
        ctx.fillStyle = grad;
        ctx.fill();

        // Face outline with neon cyan
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Horizontal cyber masonry / stepped levels across face
        const steps = 6;
        for (let s = 1; s < steps; s++) {
          const t = s / steps;
          // Interpolate left edge (p3 to p0) and right edge (p2 to p1)
          const lx = f.p3.x + (f.p0.x - f.p3.x) * t;
          const ly = f.p3.y + (f.p0.y - f.p3.y) * t;
          const rx = f.p2.x + (f.p1.x - f.p2.x) * t;
          const ry = f.p2.y + (f.p1.y - f.p2.y) * t;

          ctx.beginPath();
          ctx.moveTo(lx, ly);
          ctx.lineTo(rx, ry);
          ctx.strokeStyle = s % 2 === 0 ? 'rgba(0, 217, 255, 0.25)' : 'rgba(255, 212, 59, 0.15)';
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // -----------------------------------------------------------
          // DIGITAL HIEROGLYPHICS ON THE FACES
          // -----------------------------------------------------------
          // Only show on front-facing or visible faces
          const isFacingCamera = f.avgZ < 470;
          if (isFacingCamera && s % 2 === 1) {
            const midX = (lx + rx) / 2;
            const midY = (ly + ry) / 2;
            const glyphIdx = (f.idx * 3 + s) % hieroglyphs.length;
            const glyph = hieroglyphs[glyphIdx];

            // Progress-based lighting threshold
            const activationProgress = (s / steps) * 80;
            const isActivated = progress >= activationProgress;

            ctx.font = '11px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            if (isActivated) {
              // Glowing active cyber hieroglyph
              const pulse = Math.sin(time * 5 + s) * 0.3 + 0.7;
              ctx.shadowColor = s % 3 === 0 ? '#FFD43B' : '#00D9FF';
              ctx.shadowBlur = 8;
              ctx.fillStyle = s % 3 === 0 
                ? `rgba(255, 212, 59, ${0.85 * pulse})` 
                : `rgba(0, 217, 255, ${0.9 * pulse})`;
              ctx.fillText(`${glyph}`, midX, midY);

              // Secondary binary / telemetry annotation
              ctx.font = '8px "JetBrains Mono", monospace';
              ctx.shadowBlur = 0;
              ctx.fillStyle = 'rgba(157, 178, 195, 0.4)';
              ctx.fillText(`0x${(s * 17).toString(16).toUpperCase()}`, midX + (rx - lx) * 0.28, midY);
            } else {
              // Dormant glyph waiting for power
              ctx.shadowBlur = 0;
              ctx.fillStyle = 'rgba(82, 103, 119, 0.25)';
              ctx.fillText(`${glyph}`, midX, midY);
            }
          }
        }

        ctx.restore();
      });

      // Top truncated ring of base pyramid (aperture platform)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pTop[0].x, pTop[0].y);
      ctx.lineTo(pTop[1].x, pTop[1].y);
      ctx.lineTo(pTop[2].x, pTop[2].y);
      ctx.lineTo(pTop[3].x, pTop[3].y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 217, 255, 0.15)';
      ctx.fill();
      ctx.strokeStyle = '#00D9FF';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#00D9FF';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------
      // 4. FLOATING BENBEN STONE (THE CAPSTONE / الهريم الطافي)
      // -------------------------------------------------------------
      // The Capstone floats detached above the truncated apex!
      // Gentle floating sine wave levitation
      const levitation = Math.sin(time * 2.2) * 9;
      // Independent slow rotation for the Capstone
      const capstoneAngle = baseRotationAngle + time * 0.45;

      const capstoneBaseY = -38 + levitation;
      const capstoneApexY = -105 + levitation;
      const cBaseSize = 28; // slightly smaller than top of base for elegant tapered separation

      const capstoneBasePts = [
        { x: -cBaseSize, y: capstoneBaseY, z: -cBaseSize },
        { x: cBaseSize, y: capstoneBaseY, z: -cBaseSize },
        { x: cBaseSize, y: capstoneBaseY, z: cBaseSize },
        { x: -cBaseSize, y: capstoneBaseY, z: cBaseSize },
      ];
      const capstoneApex = { x: 0, y: capstoneApexY, z: 0 };

      // Project capstone vertices with independent rotation
      const pCBase = capstoneBasePts.map(v => project(v.x, v.y, v.z, capstoneAngle));
      const pCApex = project(capstoneApex.x, capstoneApex.y, capstoneApex.z, capstoneAngle);

      // Energy discharge shockwave ring between base & Benben
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const gapY = (tY + capstoneBaseY) / 2;
      const ringRadius = 45 + Math.sin(time * 4) * 6;
      ctx.beginPath();
      for (let i = 0; i <= 32; i++) {
        const theta = (i / 32) * Math.PI * 2;
        const p = project(Math.cos(theta) * ringRadius, gapY, Math.sin(theta) * ringRadius);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255, 212, 59, ${0.4 + Math.sin(time * 6) * 0.2})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = '#FFD43B';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      // Capstone faces (4 triangles)
      const capstoneFaces = [
        { p0: pCBase[0], p1: pCBase[1], pApex: pCApex, idx: 0, avgZ: (pCBase[0].z + pCBase[1].z + pCApex.z) / 3 },
        { p0: pCBase[1], p1: pCBase[2], pApex: pCApex, idx: 1, avgZ: (pCBase[1].z + pCBase[2].z + pCApex.z) / 3 },
        { p0: pCBase[2], p1: pCBase[3], pApex: pCApex, idx: 2, avgZ: (pCBase[2].z + pCBase[3].z + pCApex.z) / 3 },
        { p0: pCBase[3], p1: pCBase[0], pApex: pCApex, idx: 3, avgZ: (pCBase[3].z + pCBase[0].z + pCApex.z) / 3 },
      ];

      capstoneFaces.sort((a, b) => b.avgZ - a.avgZ);

      // Render Benben stone crystal faces
      capstoneFaces.forEach((f, idx) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(f.p0.x, f.p0.y);
        ctx.lineTo(f.p1.x, f.p1.y);
        ctx.lineTo(f.pApex.x, f.pApex.y);
        ctx.closePath();

        // Golden Crystalline Facet Gradient
        const cGrad = ctx.createLinearGradient(f.pApex.x, f.pApex.y, (f.p0.x + f.p1.x) / 2, (f.p0.y + f.p1.y) / 2);
        cGrad.addColorStop(0, 'rgba(255, 248, 214, 0.95)'); // Radiant gold apex
        cGrad.addColorStop(0.4, 'rgba(255, 212, 59, 0.8)');
        cGrad.addColorStop(0.8, 'rgba(255, 184, 77, 0.55)');
        cGrad.addColorStop(1, 'rgba(0, 217, 255, 0.3)');

        ctx.fillStyle = cGrad;
        ctx.fill();

        // Golden glowing crystalline wireframe edges
        ctx.strokeStyle = '#FFD43B';
        ctx.lineWidth = 1.6;
        ctx.shadowColor = '#FFD43B';
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Inner sacred geometry lines inside Benben stone
        ctx.beginPath();
        ctx.moveTo(f.pApex.x, f.pApex.y);
        ctx.lineTo((f.p0.x + f.p1.x) / 2, (f.p0.y + f.p1.y) / 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      });

      // Bottom plate of Benben Stone
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pCBase[0].x, pCBase[0].y);
      ctx.lineTo(pCBase[1].x, pCBase[1].y);
      ctx.lineTo(pCBase[2].x, pCBase[2].y);
      ctx.lineTo(pCBase[3].x, pCBase[3].y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 212, 59, 0.3)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 212, 59, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Radiant Benben Apex Corona Point
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const coronaRad = 8 + Math.sin(time * 6) * 3;
      const coronaGrad = ctx.createRadialGradient(pCApex.x, pCApex.y, 0, pCApex.x, pCApex.y, coronaRad * 3);
      coronaGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      coronaGrad.addColorStop(0.3, 'rgba(255, 212, 59, 0.85)');
      coronaGrad.addColorStop(0.7, 'rgba(0, 217, 255, 0.4)');
      coronaGrad.addColorStop(1, 'rgba(0, 217, 255, 0)');

      ctx.beginPath();
      ctx.arc(pCApex.x, pCApex.y, coronaRad * 3, 0, Math.PI * 2);
      ctx.fillStyle = coronaGrad;
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [progress]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${isGlitching ? 'filter-glitch' : ''}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block max-w-full max-h-full"
        style={{
          filter: isGlitching ? 'hue-rotate(90deg) contrast(150%)' : 'none',
        }}
      />
    </div>
  );
};

export default CyberPyramidCanvas;
