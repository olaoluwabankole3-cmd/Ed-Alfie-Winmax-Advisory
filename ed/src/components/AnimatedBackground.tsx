import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const STATES_COUNT = 5;
const PARTICLES_COUNT = 350;

interface ThreeParticle {
  id: number;
  x: number;
  y: number;
  z: number;
  r: number;
  g: number;
  b: number;
  size: number;
  pulseOffset: number;
  pulseSpeed: number;
  layer: number;
  towerIdx: number;
  heightOffset: number;
  statesConfig: { x: number; y: number; z: number }[];
  colorsConfig: { r: number; g: number; b: number }[];
}

// Check WebGL availability helper for robust fallback safety
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStateIdx, setCurrentStateIdx] = useState(0);
  const [useFallback, setUseFallback] = useState(false);

  const states = [
    { name: "Global Wealth Flow", desc: "Capital flow networks & collaborative investment streams" },
    { name: "Strategic Asset Horizons", desc: "Digital globe transformation and logistic orbital paths" },
    { name: "Performance Intelligence", desc: "Predictive Analytics Curves and Executive Performance Grids" },
    { name: "Co-cognitive AI Pathways", desc: "Deep neural networks & artificial intelligence nodes" },
    { name: "Connected Infrastructure", desc: "Sovereign cloud cityscapes & digital architecture systems" }
  ];

  useEffect(() => {
    // 1. Detect WebGL support. If missing, flag fallback model.
    if (!isWebGLAvailable()) {
      setUseFallback(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // --- Create Custom Soft Circle Texture (No external files) ---
    function createCircleTexture() {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 64;
      texCanvas.height = 64;
      const texCtx = texCanvas.getContext("2d");
      if (texCtx) {
        const grad = texCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.2, "rgba(255, 255, 255, 0.85)");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 0.25)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        texCtx.fillStyle = grad;
        texCtx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(texCanvas);
    }

    // --- Scene Setup ---
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    // Add atmospheric deep fog to scene to blend far objects into rich dark navy space
    scene.fog = new THREE.FogExp2(0x03060c, 0.0016);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1200);
    camera.position.set(0, 0, 480);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Dynamic Lighting Setup ---
    const ambLight = new THREE.AmbientLight(0x061530, 1.2);
    scene.add(ambLight);

    const pointLight1 = new THREE.PointLight(0x1d4ed8, 4, 800); // Cobalt Electric Blue
    pointLight1.position.set(-150, 150, 100);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xb08d57, 3.5, 700); // Sovereign Gold
    pointLight2.position.set(150, -150, 100);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x06b6d4, 3, 600); // Cyan
    pointLight3.position.set(0, 200, -50);
    scene.add(pointLight3);

    // --- Precompute Positions & Colors for 5 Visual States ---
    const particles: ThreeParticle[] = [];

    // State 0: Hub centroids
    const hubsS0 = [
      { x: -160, y: -90, z: 40 },
      { x: 160, y: -110, z: -40 },
      { x: 0, y: 90, z: 80 },
      { x: -130, y: 110, z: -80 },
      { x: 140, y: 80, z: 20 },
    ];

    // State 4: Tower bases
    const towerBasesS4 = [
      { x: -180, z: -80 },
      { x: -80, z: 60 },
      { x: 10, z: -50 },
      { x: 100, z: 80 },
      { x: 190, z: -60 },
      { x: -10, z: -110 },
    ];

    for (let i = 0; i < PARTICLES_COUNT; i++) {
      const pulseOffset = Math.random() * Math.PI * 2;
      const pulseSpeed = Math.random() * 1.6 + 0.8;
      const size = Math.random() * 2.5 + 1.2;

      const statesConfig: { x: number; y: number; z: number }[] = [];
      const colorsConfig: { r: number; g: number; b: number }[] = [];

      // Determine helper subdivisions for State 3 (Neural network) and State 4 (Cityscape)
      let neuralLayer = 0;
      if (i < 70) neuralLayer = 0;
      else if (i < 160) neuralLayer = 1;
      else if (i < 260) neuralLayer = 2;
      else neuralLayer = 3;

      const towerIdx = i % towerBasesS4.length;

      // --- Compute coordinates across 5 states ---

      // STATE 0: Connected Business Nodes (Network Hubs)
      const s0Hub = hubsS0[i % hubsS0.length];
      const s0Angle = Math.random() * Math.PI * 2;
      const s0Rad = Math.random() * 85 + 5;
      statesConfig.push({
        x: s0Hub.x + Math.cos(s0Angle) * s0Rad,
        y: s0Hub.y + Math.sin(s0Angle) * s0Rad,
        z: s0Hub.z + (Math.random() - 0.5) * 60,
      });
      colorsConfig.push({ r: 0.02, g: 0.71, b: 0.83 }); // Cyan nodes

      // STATE 1: Rotating Digital Globe (Unified Sphere)
      const u = (i + 0.5) / PARTICLES_COUNT;
      const phi = Math.acos(1 - 2 * u);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const rSphere = 175;
      statesConfig.push({
        x: rSphere * Math.cos(theta) * Math.sin(phi),
        y: rSphere * Math.sin(theta) * Math.sin(phi),
        z: rSphere * Math.cos(phi),
      });
      colorsConfig.push({ r: 0.69, g: 0.55, b: 0.34 }); // Sovereign Amber Gold

      // STATE 2: Floating Financial Analytics Curves
      if (i < 80) {
        // Curve track (Exponential Ascent curve)
        const curvePct = i / 79;
        statesConfig.push({
          x: -250 + curvePct * 500,
          y: 100 - Math.pow(curvePct, 1.8) * 240,
          z: (Math.random() - 0.5) * 20,
        });
        colorsConfig.push({ r: 0.95, g: 0.95, b: 1.0 }); // Pure clean silver white
      } else if (i < 190) {
        // Strategic Data columns
        const colVal = (i - 80) % 5;
        const colRow = Math.floor((i - 80) / 5);
        statesConfig.push({
          x: -180 + colVal * 90 + (Math.random() - 0.5) * 6,
          y: 190 - colRow * 12,
          z: -40 + (Math.random() - 0.5) * 15,
        });
        colorsConfig.push({ r: 0.1, g: 0.4, b: 1.0 }); // Deep electric blue
      } else {
        // Perspective Floor matrix plane
        const gridPct = (i - 190) / (PARTICLES_COUNT - 190);
        statesConfig.push({
          x: -300 + gridPct * 600,
          y: 200 + (Math.random() - 0.5) * 8,
          z: -160 + Math.sin(gridPct * Math.PI * 4) * 100,
        });
        colorsConfig.push({ r: 0.05, g: 0.18, b: 0.38 }); // Muted tactical navy
      }

      // STATE 3: AI Neural Pathways (Layer segments)
      let idxInLayer = 0;
      let sizeOfLayer = 1;
      if (neuralLayer === 0) { idxInLayer = i; sizeOfLayer = 70; }
      else if (neuralLayer === 1) { idxInLayer = i - 70; sizeOfLayer = 90; }
      else if (neuralLayer === 2) { idxInLayer = i - 160; sizeOfLayer = 100; }
      else { idxInLayer = i - 260; sizeOfLayer = PARTICLES_COUNT - 260; }

      const lx = -220 + neuralLayer * 145;
      const lys = 300 / (sizeOfLayer - 1 || 1);
      const ly = -150 + idxInLayer * lys;
      statesConfig.push({
        x: lx,
        y: ly + Math.sin(idxInLayer * 2.5) * 6,
        z: Math.cos(idxInLayer * 1.3) * 30,
      });
      colorsConfig.push(
        neuralLayer % 2 === 0 
          ? { r: 0.1, g: 0.4, b: 1.0 } // Electric Blue
          : { r: 0.02, g: 0.71, b: 0.83 } // Electric Cyan
      );

      // STATE 4: Connected Infrastructure Cityscape (Glowing towers)
      const towerBase = towerBasesS4[towerIdx];
      const sliceIdx = Math.floor(i / towerBasesS4.length);
      const maxTowerHt = 200 - sliceIdx * 14;
      const widthD = sliceIdx % 2 === 0 ? -12 : 12;
      const depthD = sliceIdx % 4 < 2 ? -12 : 12;

      statesConfig.push({
        x: towerBase.x + widthD,
        y: maxTowerHt,
        z: towerBase.z + depthD,
      });
      colorsConfig.push({ r: 0.69, g: 0.55, b: 0.34 }); // Sovereign Amber Gold

      particles.push({
        id: i,
        x: statesConfig[0].x,
        y: statesConfig[0].y,
        z: statesConfig[0].z,
        r: colorsConfig[0].r,
        g: colorsConfig[0].g,
        b: colorsConfig[0].b,
        size,
        pulseOffset,
        pulseSpeed,
        layer: neuralLayer,
        towerIdx,
        heightOffset: Math.random() * 100,
        statesConfig,
        colorsConfig,
      });
    }

    // --- Build BufferGeometry Attributes ---
    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(PARTICLES_COUNT * 3);
    const colArray = new Float32Array(PARTICLES_COUNT * 3);

    particles.forEach((p, idx) => {
      const idx3 = idx * 3;
      posArray[idx3] = p.x;
      posArray[idx3 + 1] = p.y;
      posArray[idx3 + 2] = p.z;

      colArray[idx3] = p.r;
      colArray[idx3 + 1] = p.g;
      colArray[idx3 + 2] = p.b;
    });

    geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colArray, 3));

    const material = new THREE.PointsMaterial({
      size: 15.5, // Crisp high visibility
      vertexColors: true,
      transparent: true,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointsMesh = new THREE.Points(geometry, material);
    scene.add(pointsMesh);

    // --- Build Wireframe Connections Material & Elements ---
    const lineGeometry = new THREE.BufferGeometry();
    const maxLines = 380;
    const linePosArray = new Float32Array(maxLines * 2 * 3);
    const lineColArray = new Float32Array(maxLines * 2 * 3);

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePosArray, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColArray, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.75,
      linewidth: 1, // WebGL specification constraint
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // --- Interactive Coordinates & Mouse Tracking ---
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Dynamic Resizing ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- Transition State Master Controller ---
    let activeState = 0;
    let activeTimer = 0;
    let lastState = 0;

    const transitionProxy = { progress: 1.0 };

    (window as any).triggerThreeBackgroundState = (idx: number) => {
      lastState = activeState;
      activeState = idx;
      
      // Animate transition variables triggers
      transitionProxy.progress = 0;
      gsap.killTweensOf(transitionProxy);
      gsap.to(transitionProxy, {
        progress: 1.0,
        duration: 2.1,
        ease: "power2.inOut",
      });
    };

    // --- Rendering loop ---
    let time = 0;
    let animationId = 0;

    const tick = () => {
      time += 0.007;

      // Camera Spring Inertia movement based on mouse client placement
      targetCameraX += (mouseX * 55 - targetCameraX) * 0.045;
      targetCameraY += (-mouseY * 45 - targetCameraY) * 0.045;
      camera.position.x = targetCameraX;
      camera.position.y = targetCameraY;
      camera.lookAt(0, 0, 0);

      // Sphere rotate parameterization
      if (activeState === 1) {
        pointsMesh.rotation.y += 0.0065;
        lineSegments.rotation.y += 0.0065;
      } else {
        // Slow standard architectural drift rotation
        pointsMesh.rotation.y += 0.0016;
        lineSegments.rotation.y += 0.0016;

        // Reset sphere alignment back to coordinate indices smoothly
        pointsMesh.rotation.y += (0 - pointsMesh.rotation.y % (Math.PI * 2)) * 0.02;
        lineSegments.rotation.y += (0 - lineSegments.rotation.y % (Math.PI * 2)) * 0.02;
      }

      // --- Morph Positioning & Colors updates ---
      const activePositions = geometry.attributes.position.array as Float32Array;
      const activeColors = geometry.attributes.color.array as Float32Array;

      particles.forEach((p, idx) => {
        const idx3 = idx * 3;
        
        // Morph interpolation computation
        const srcPos = p.statesConfig[lastState];
        const tgtPos = p.statesConfig[activeState];
        const morphP = transitionProxy.progress;

        p.x = srcPos.x + (tgtPos.x - srcPos.x) * morphP;
        p.y = srcPos.y + (tgtPos.y - srcPos.y) * morphP;
        p.z = srcPos.z + (tgtPos.z - srcPos.z) * morphP;

        const srcCol = p.colorsConfig[lastState];
        const tgtCol = p.colorsConfig[activeState];
        p.r = srcCol.r + (tgtCol.r - srcCol.r) * morphP;
        p.g = srcCol.g + (tgtCol.g - srcCol.g) * morphP;
        p.b = srcCol.b + (tgtCol.b - srcCol.b) * morphP;

        // Micro atmospheric noise parameters
        let driftX = 0;
        let driftY = 0;
        let driftZ = 0;

        if (activeState === 0) {
          driftX = Math.sin(time * 0.8 + p.pulseOffset) * 4.5;
          driftY = Math.cos(time * 0.7 + p.pulseOffset) * 4.5;
        } else if (activeState === 2) {
          driftY = Math.sin(time * 0.6 + p.pulseOffset) * 3.5;
        } else if (activeState === 3) {
          driftX = Math.sin(time * 2.5 + p.pulseOffset) * 1.8;
          driftY = Math.cos(time * 2.2 + p.pulseOffset) * 1.8;
        } else if (activeState === 4) {
          p.heightOffset += 0.35;
          if (p.heightOffset > 210) p.heightOffset = 0;
        }

        activePositions[idx3] = p.x + driftX;
        activePositions[idx3 + 1] = p.y + driftY - (activeState === 4 ? p.heightOffset : 0);
        activePositions[idx3 + 2] = p.z + driftZ;

        // Custom pulsing brightness
        const pulse = 0.85 + 0.15 * Math.sin(time * 2.5 * p.pulseSpeed + p.pulseOffset);
        activeColors[idx3] = p.r * pulse;
        activeColors[idx3 + 1] = p.g * pulse;
        activeColors[idx3 + 2] = p.b * pulse;
      });

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // --- Line connections mapping updates ---
      let linesAdded = 0;
      const step = activeState === 3 ? 1 : 2; // Sample higher nodes mapping limits for AI synapses

      const lPositions = lineGeometry.attributes.position.array as Float32Array;
      const lColors = lineGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < PARTICLES_COUNT && linesAdded < maxLines; i += step) {
        const pA = particles[i];
        for (let j = i + 1; j < PARTICLES_COUNT && linesAdded < maxLines; j += step * 2) {
          const pB = particles[j];

          if (activeState === 3 && pA.layer !== pB.layer && Math.abs(pA.layer - pB.layer) !== 1) {
            continue; // Force neat sequential layer mappings
          }

          if (activeState === 4 && pA.towerIdx !== pB.towerIdx) {
            continue; // Keep cityscape wireframes bound to skyscrapers Base columns
          }

          const dx = pA.x - pB.x;
          const dy = pA.y - pB.y;
          const dz = pA.z - pB.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          const limitDistSq = activeState === 1 ? 110 * 110 : 155 * 155;

          if (distSq < limitDistSq) {
            const dist = Math.sqrt(distSq);
            // Dynamic alpha coordinates fading
            const intensityAlpha = (1.0 - dist / Math.sqrt(limitDistSq)) * 0.35;

            const idx = linesAdded * 6;
            
            // Populate arrays
            lPositions[idx] = pA.x;
            lPositions[idx + 1] = pA.y;
            lPositions[idx + 2] = pA.z;

            lPositions[idx + 3] = pB.x;
            lPositions[idx + 4] = pB.y;
            lPositions[idx + 5] = pB.z;

            const lineR = (pA.r + pB.r) * 0.5;
            const lineG = (pA.g + pB.g) * 0.5;
            const lineB = (pA.b + pB.b) * 0.5;

            lColors[idx] = lineR * intensityAlpha;
            lColors[idx + 1] = lineG * intensityAlpha;
            lColors[idx + 2] = lineB * intensityAlpha;

            lColors[idx + 3] = lineR * intensityAlpha;
            lColors[idx + 4] = lineG * intensityAlpha;
            lColors[idx + 5] = lineB * intensityAlpha;

            linesAdded++;
          }
        }
      }

      lineGeometry.setDrawRange(0, linesAdded * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(tick);
    };

    tick();

    // --- Component Teardown Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      gsap.killTweensOf(transitionProxy);

      // Memory dispose optimization rules
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [useFallback]);

  // Sync automatic State interval triggers every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStateIdx((prev) => {
        const next = (prev + 1) % STATES_COUNT;
        
        // Push state index updates to both WebGL Three instance AND local fallbacks
        if ((window as any).triggerThreeBackgroundState) {
          (window as any).triggerThreeBackgroundState(next);
        }
        return next;
      });
    }, 3000); // Ticks every 3 seconds as requested

    return () => clearInterval(interval);
  }, []);

  // Graceful Canvas Fallback Render (Runs smoothly on unsupported low-end devices)
  useEffect(() => {
    if (!useFallback) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const pointsList: { x: number; y: number; originX: number; originY: number }[] = [];
    for (let i = 0; i < 90; i++) {
      pointsList.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: Math.random() * width,
        originY: Math.random() * height,
      });
    }

    let time = 0;
    let animationId = 0;

    const render = () => {
      time += 0.005;
      ctx.fillStyle = "#03060c";
      ctx.fillRect(0, 0, width, height);

      // Render simple connection networks
      ctx.lineWidth = 0.5;
      for (let i = 0; i < pointsList.length; i++) {
        const p1 = pointsList[i];
        p1.x = p1.originX + Math.sin(time + i) * 15;
        p1.y = p1.originY + Math.cos(time * 0.8 + i) * 15;

        for (let j = i + 1; j < pointsList.length; j++) {
          const p2 = pointsList[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(176, 141, 87, ${1.0 - dist / 110})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = "#06b6d4";
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [useFallback]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#03060c] select-none pointer-events-none"
      style={{ zIndex: -10 }}
      id="immersive-bain-webgl-background"
    >
      {useFallback ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-[2]"
        />
      ) : null}

      {/* Cinematic Linear Gradient shield for ultra-readable corporate typography */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#03060c]/85 via-[#07111F]/60 to-[#010306]/98 z-[3] pointer-events-none" />

      {/* Corporate HUD Indicators */}
      <div 
        className="absolute bottom-6 left-6 md:left-12 z-[8] pointer-events-none select-none font-mono hidden sm:block"
        id="bain-active-map-tracker-hud"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B08D57] animate-pulse" />
          <span className="text-[9px] text-[#B08D57] font-bold tracking-[0.25em] uppercase">
            3D IMMERSIVE DATAFRAME
          </span>
        </div>
        <div className="text-white text-xs font-semibold uppercase tracking-wider relative overflow-hidden h-4 w-72">
          <div
            className="transition-transform duration-700 ease-out flex flex-col"
            style={{ transform: `translateY(-${currentStateIdx * 20}%)` }}
          >
            {states.map((st) => (
              <span key={st.name} className="h-5 block leading-none font-serif text-[11px] text-zinc-300">
                {st.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
