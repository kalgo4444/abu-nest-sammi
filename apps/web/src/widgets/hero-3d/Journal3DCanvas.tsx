"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Journal3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Root group for the 3D Journal
    const bookGroup = new THREE.Group();
    scene.add(bookGroup);

    // Book Dimensions
    const bookW = 1.85;
    const bookH = 2.45;
    const bookD = 0.42;
    const coverThickness = 0.04;

    // Geometries
    const coverGeo = new THREE.BoxGeometry(bookW, bookH, coverThickness);
    const spineGeo = new THREE.CylinderGeometry(
      bookD / 2,
      bookD / 2,
      bookH,
      32,
      1,
      false,
      -Math.PI / 2,
      Math.PI
    );
    const pagesGeo = new THREE.BoxGeometry(
      bookW - 0.08,
      bookH - 0.12,
      bookD - coverThickness * 1.5
    );
    const ribbonGeo = new THREE.BoxGeometry(0.08, 1.4, 0.015);
    const emblemGeo = new THREE.TorusGeometry(0.38, 0.025, 16, 48);
    const innerEmblemGeo = new THREE.IcosahedronGeometry(0.18, 0);

    // Materials - initial creation (Light vs Dark)
    const isDark = document.documentElement.classList.contains("dark");

    const coverMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1c1917 : 0xfbf9f5,
      roughness: isDark ? 0.35 : 0.45,
      metalness: isDark ? 0.25 : 0.05,
    });

    const spineMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x292524 : 0xede8e1,
      roughness: isDark ? 0.4 : 0.5,
      metalness: isDark ? 0.2 : 0.05,
    });

    const pagesMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x2d2a28 : 0xfffcf7,
      roughness: 0.85,
      metalness: 0.02,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xf97316 : 0x9a3412,
      emissive: isDark ? 0x9a3412 : 0x000000,
      emissiveIntensity: isDark ? 0.4 : 0.0,
      roughness: 0.25,
      metalness: isDark ? 0.6 : 0.3,
    });

    const ribbonMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xea580c : 0xb45309,
      roughness: 0.4,
      metalness: 0.1,
    });

    // Meshes
    // Front Cover
    const frontCover = new THREE.Mesh(coverGeo, coverMat);
    frontCover.position.set(0, 0, bookD / 2);
    bookGroup.add(frontCover);

    // Back Cover
    const backCover = new THREE.Mesh(coverGeo, coverMat);
    backCover.position.set(0, 0, -bookD / 2);
    bookGroup.add(backCover);

    // Spine
    const spine = new THREE.Mesh(spineGeo, spineMat);
    spine.rotation.y = Math.PI / 2;
    spine.position.set(-bookW / 2 + 0.02, 0, 0);
    bookGroup.add(spine);

    // Paper Pages Block
    const pagesBlock = new THREE.Mesh(pagesGeo, pagesMat);
    pagesBlock.position.set(0.04, 0, 0);
    bookGroup.add(pagesBlock);

    // Front Cover Emblem
    const emblem = new THREE.Mesh(emblemGeo, accentMat);
    emblem.position.set(0, 0.2, bookD / 2 + 0.025);
    bookGroup.add(emblem);

    const innerEmblem = new THREE.Mesh(innerEmblemGeo, accentMat);
    innerEmblem.position.set(0, 0.2, bookD / 2 + 0.025);
    innerEmblem.scale.set(0.9, 0.9, 0.3);
    bookGroup.add(innerEmblem);

    // Bookmark Ribbon hanging down
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    ribbon.position.set(0.2, -bookH / 2 - 0.4, 0.05);
    ribbon.rotation.z = -0.15;
    ribbon.rotation.x = 0.2;
    bookGroup.add(ribbon);

    // Floating Particles (ambient constellation / dust)
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4.8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3.8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      particleSpeeds[i] = 0.002 + Math.random() * 0.004;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0xfdba74 : 0xd97706,
      size: 0.045,
      transparent: true,
      opacity: isDark ? 0.75 : 0.45,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(
      isDark ? 0x27272a : 0xfffaf0,
      isDark ? 1.5 : 2.0
    );
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(
      isDark ? 0xffedd5 : 0xffffff,
      isDark ? 2.8 : 2.5
    );
    mainKeyLight.position.set(4, 5, 5);
    scene.add(mainKeyLight);

    const rimLight = new THREE.DirectionalLight(
      isDark ? 0xf97316 : 0xd97706,
      isDark ? 2.0 : 1.2
    );
    rimLight.position.set(-4, -2, -2);
    scene.add(rimLight);

    // Initial orientation: slightly tilted open, angled toward camera
    bookGroup.rotation.x = 0.22;
    bookGroup.rotation.y = -0.48;
    bookGroup.rotation.z = 0.05;

    // Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.22;
    let targetRotY = -0.48;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const xRel = ((clientX - rect.left) / rect.width) * 2 - 1;
      const yRel = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = clientX - prevPointerX;
        const deltaY = clientY - prevPointerY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevPointerX = clientX;
        prevPointerY = clientY;
      } else {
        mouseX = xRel;
        mouseY = yRel;
        targetRotX = 0.22 - mouseY * 0.35;
        targetRotY = -0.48 + mouseX * 0.55;
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);
    container.addEventListener("touchmove", onPointerMove, { passive: true });
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Theme synchronization helper
    const updateThemeColors = (dark: boolean) => {
      coverMat.color.setHex(dark ? 0x1c1917 : 0xfbf9f5);
      coverMat.roughness = dark ? 0.35 : 0.45;
      coverMat.metalness = dark ? 0.25 : 0.05;

      spineMat.color.setHex(dark ? 0x292524 : 0xede8e1);
      spineMat.metalness = dark ? 0.2 : 0.05;

      pagesMat.color.setHex(dark ? 0x2d2a28 : 0xfffcf7);

      accentMat.color.setHex(dark ? 0xf97316 : 0x9a3412);
      accentMat.emissive.setHex(dark ? 0x9a3412 : 0x000000);
      accentMat.emissiveIntensity = dark ? 0.4 : 0.0;
      accentMat.metalness = dark ? 0.6 : 0.3;

      ribbonMat.color.setHex(dark ? 0xea580c : 0xb45309);

      particleMat.color.setHex(dark ? 0xfdba74 : 0xd97706);
      particleMat.opacity = dark ? 0.75 : 0.45;
      particleMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;

      ambientLight.color.setHex(dark ? 0x27272a : 0xfffaf0);
      ambientLight.intensity = dark ? 1.5 : 2.0;

      mainKeyLight.color.setHex(dark ? 0xffedd5 : 0xffffff);
      mainKeyLight.intensity = dark ? 2.8 : 2.5;

      rimLight.color.setHex(dark ? 0xf97316 : 0xd97706);
      rimLight.intensity = dark ? 2.0 : 1.2;
    };

    const handleThemeEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: "light" | "dark" }>;
      updateThemeColors(customEvent.detail.theme === "dark");
    };

    window.addEventListener("themechange", handleThemeEvent);

    // Observer for pausing rendering off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Idle gentle floating bob
        bookGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.08;

        // Damped rotation lerp
        bookGroup.rotation.x += (targetRotX - bookGroup.rotation.x) * 0.08;
        bookGroup.rotation.y += (targetRotY - bookGroup.rotation.y) * 0.08;

        // Slow spin on the inner emblem
        innerEmblem.rotation.y = elapsedTime * 0.8;
        innerEmblem.rotation.x = elapsedTime * 0.4;

        // Animate particles
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleSpeeds[i];
          if (positions[i * 3 + 1] > 2.2) {
            positions[i * 3 + 1] = -2.2;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsInteractive(true);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("themechange", handleThemeEvent);
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("touchmove", onPointerMove);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchend", onPointerUp);

      coverGeo.dispose();
      spineGeo.dispose();
      pagesGeo.dispose();
      ribbonGeo.dispose();
      emblemGeo.dispose();
      innerEmblemGeo.dispose();
      particleGeo.dispose();

      coverMat.dispose();
      spineMat.dispose();
      pagesMat.dispose();
      accentMat.dispose();
      ribbonMat.dispose();
      particleMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="group relative flex h-[320px] w-full max-w-[420px] select-none items-center justify-center overflow-hidden rounded-3xl border border-stone-200/60 bg-gradient-to-b from-stone-100/50 to-white/20 p-2 shadow-inner backdrop-blur-xs transition-all duration-300 hover:border-stone-300 dark:border-stone-800/80 dark:from-stone-900/40 dark:to-stone-950/20 dark:hover:border-stone-700/80 sm:h-[360px]"
    >
      <canvas
        ref={canvasRef}
        className={`h-full w-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          isInteractive ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Interactive Hint Overlay */}
      <div className="pointer-events-none absolute bottom-3 right-4 rounded-full border border-stone-300/60 bg-white/70 px-2.5 py-1 text-[11px] font-mono tracking-wider text-stone-500 uppercase backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 dark:border-stone-700/60 dark:bg-stone-900/70 dark:text-stone-400">
        3D Drag • Tilt
      </div>
    </div>
  );
}
