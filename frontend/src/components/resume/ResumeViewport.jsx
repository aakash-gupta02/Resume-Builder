'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

export default function ResumeViewport({
  children,
  className,
  pageWidth = PAGE_WIDTH,
  pageHeight = PAGE_HEIGHT,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const availableWidth = container.clientWidth;
      const nextScale = Math.min(1, availableWidth / pageWidth);
      setScale(nextScale > 0 ? nextScale : 1);
    };

    updateScale();

    const observer = new ResizeObserver(() => {
      updateScale();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [pageWidth]);

  const scaledWidth = pageWidth * scale;
  const scaledHeight = pageHeight * scale;

  return (
    <div ref={containerRef} className={cn('w-full', className)}>
      <div
        className="mx-auto"
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}
      >
        <div
          style={{
            width: `${pageWidth}px`,
            height: `${pageHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
