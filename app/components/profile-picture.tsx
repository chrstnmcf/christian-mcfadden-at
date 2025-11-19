import React, { useState, useEffect, useRef } from 'react';

const P_MIN = -15;
const P_MAX = 15;
const STEP = 3;
const SIZE = 256;
const NUMBER_OF_IMAGES = ((P_MAX - P_MIN) / STEP) ** 2;

const basePath = '/images/';

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function quantizeToGrid(val: number): number {
  const raw = P_MIN + ((val + 1) * (P_MAX - P_MIN)) / 2; // [-1,1] -> [-15,15]
  const snapped = Math.round(raw / STEP) * STEP;
  return clamp(snapped, P_MIN, P_MAX);
}

function sanitize(val: number): string {
  const str = Number(val).toFixed(1); // force one decimal, e.g. 0 -> 0.0
  return str.replace('-', 'm').replace('.', 'p');
}

function gridToFilename(px: number, py: number): string {
  return `gaze_px${sanitize(px)}_py${sanitize(py)}_${SIZE}.webp`;
}

interface ProfilePictureProps {
  className?: string;
}

export function ProfilePicture({ className = '' }: ProfilePictureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<string>('/images/me.jpg');
  const [enabled, setEnabled] = useState<boolean>(false);
  const preloadedImages = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function updateImageSrc(clientX: number, clientY: number) {
      const rect = container?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const nx = (clientX - centerX) / (rect.width / 2);
      const ny = (centerY - clientY) / (rect.height / 2);

      const clampedX = clamp(nx, -1, 1);
      const clampedY = clamp(ny, -1, 1);

      const px = quantizeToGrid(clampedX);
      const py = quantizeToGrid(clampedY);

      const filename = gridToFilename(px, py);
      const imagePath = `${basePath}${filename}`;
      setImageSrc(imagePath);
    }

    function handleMouseMove(e: MouseEvent) {
      updateImageSrc(e.clientX, e.clientY);
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.touches && e.touches.length > 0) {
        const t = e.touches[0];
        updateImageSrc(t.clientX, t.clientY);
      }
    }

    // Track pointer anywhere on the page
    if (enabled) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      setImageSrc('/images/me.jpg');
    }

    // Initialize at center
    const rect = container.getBoundingClientRect();
    updateImageSrc(rect.left + rect.width / 2, rect.top + rect.height / 2);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [basePath, enabled]);

  useEffect(() => {
    if (
      !enabled ||
      preloadedImages.current.length > 0 ||
      preloadedImages.current.length >= NUMBER_OF_IMAGES
    ) {
      return;
    }

    // Preload all face images
    for (let py = -15; py <= 15; py += 3) {
      for (let px = -15; px <= 15; px += 3) {
        const img = new Image();
        img.src = `${basePath}${gridToFilename(px, py)}`;
        preloadedImages.current.push(img);
      }
    }
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-gray-100 overflow-hidden ${className}`.trim()}
      onClick={() => setEnabled((value) => !value)}
    >
      <picture>
        <source srcSet={imageSrc} type="image/webp" />
        <img
          src="/images/me.jpg"
          alt="Christian"
          className="w-full h-full object-contain transition-opacity duration-100 ease-out"
        />
      </picture>
    </div>
  );
}
