import { useEffect, useRef } from 'react';

export function useCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx - 6 + 'px';
      cursor.style.top = my - 6 + 'px';
    };

    const animate = () => {
      rx += (mx - rx - 18) * 0.14;
      ry += (my - ry - 18) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => { cursor.classList.add('hover'); ring.classList.add('hover'); };
    const onLeave = () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    animate();
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return { cursorRef, ringRef };
}
