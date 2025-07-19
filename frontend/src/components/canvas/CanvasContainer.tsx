'use client';

import { useRef, useEffect } from 'react';
import Toolbar from './Toolbar';

export default function CanvasContainer() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    // --- CANVAS LIBRARY INITIALIZATION ---
    // For example, with Konva.js:
    // const stage = new Konva.Stage({
    //   container: canvasContainerRef.current,
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // });
    //
    // const layer = new Konva.Layer();
    // stage.add(layer);
    // ------------------------------------

    console.log("Canvas container is ready.");

    // Handle window resizing to keep the canvas full-screen
    const handleResize = () => {
      // stage.width(window.innerWidth);
      // stage.height(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // stage.destroy(); // Clean up the Konva stage on component unmount
    };
  }, []);

  return (
    <div id="canvas-container" className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toolbar />
      <div ref={canvasContainerRef} className="h-full w-full" />
    </div>
  );
};
