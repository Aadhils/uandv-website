'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const POSTER_SRC = '/videos/home-hero-story-poster.jpg';
const WEBM_SRC = '/videos/home-hero-story.webm';
const MP4_SRC = '/videos/home-hero-story.mp4';

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', onStoreChange);
  return () => media.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => true,
  );
}

/**
 * Decorative Home hero media layer only.
 * Keeps overlays / content untouched in the parent.
 */
export function HomeHeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.15, rootMargin: '40px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Defer enabling video until after mount so SSR/LCP can use the poster image.
    // Skip entirely when the user prefers reduced motion.
    setAllowVideo(!prefersReducedMotion);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (allowVideo && inView) {
      setVideoReady(true);
    }
  }, [allowVideo, inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return;

    if (inView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked — poster Image underneath remains visible.
        });
      }
    } else {
      video.pause();
    }
  }, [videoReady, inView]);

  const showVideo = videoReady && !prefersReducedMotion;

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Image
        src={POSTER_SRC}
        alt=""
        fill
        priority
        quality={70}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
        className="marketing-hero-media object-cover object-center"
        aria-hidden
      />
      {showVideo ? (
        <video
          ref={videoRef}
          className="marketing-hero-media absolute inset-0 h-full w-full object-cover object-center"
          poster={POSTER_SRC}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
          tabIndex={-1}
        >
          <source src={WEBM_SRC} type="video/webm" />
          <source src={MP4_SRC} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
