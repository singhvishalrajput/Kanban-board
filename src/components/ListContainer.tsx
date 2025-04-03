import { useEffect, useRef, useState } from "react";
import { Board } from "../types";
import List from "./List.tsx";

interface ListContainerProps {
  board: Board;
}

const ListContainer = ({ board }: ListContainerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollInfo, setScrollInfo] = useState({
    scrollWidth: 0,
    clientWidth: 0, 
    scrollLeft: 0
  });
  
  const thumbWidth = scrollInfo.scrollWidth > 0 
    ? Math.max(30, (scrollInfo.clientWidth / scrollInfo.scrollWidth) * 100) 
    : 100;
  
  const thumbPosition = scrollInfo.scrollWidth > 0 
    ? (scrollInfo.scrollLeft / (scrollInfo.scrollWidth - scrollInfo.clientWidth)) * (100 - thumbWidth)
    : 0;
  
  const needsScrolling = scrollInfo.scrollWidth > scrollInfo.clientWidth;

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
        setScrollInfo({ scrollWidth, clientWidth, scrollLeft });
      }
    };

    handleScroll();
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(scrollContainer);
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, []);

  // Add touch handling for cards
  useEffect(() => {
    // Track touch position to determine horizontal scrolling intent
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isScrolling = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (!scrollContainerRef.current) return;
      
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTime = Date.now();
      isScrolling = false;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!scrollContainerRef.current || e.touches.length !== 1) return;
      
      const deltaX = startX - e.touches[0].clientX;
      const deltaY = startY - e.touches[0].clientY;
      
      // If horizontal movement is greater than vertical, it's likely a horizontal scroll attempt
      if (!isScrolling && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isScrolling = true;
      }
      
      if (isScrolling) {
        // Prevent the default behavior to stop card interactions while scrolling
        e.preventDefault();
        
        // Manually scroll the container
        scrollContainerRef.current.scrollLeft += deltaX;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      // Add listeners to the container for all touch events
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative">
      {/* Scroll indicator positioned absolutely to overlay content */}
      <div 
        className="absolute bottom-0  left-0 right-0 h-2 bg-gray-200 mx-4 rounded-full bg-transparent" 
        style={{ zIndex: 50 }}
      >
        {needsScrolling ? (
          <div 
            className="absolute top-0 h-full bg-gray-400 rounded-full transition-all duration-100"
            style={{ 
              width: `${thumbWidth}%`, 
              left: `${thumbPosition}%` 
            }}
          ></div>
        ) : (
          <div className="absolute top-0 h-full w-full bg-gray-400 rounded-full"></div>
        )}
      </div>
      
      {/* Main content container now extends fully */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto h-full w-full scrollbar-hide"
        style={{ 
          gap: '1.5rem',
          minWidth: '100%',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          paddingBottom: '1rem', // Add some padding at the bottom
        }}
      >
        {board.lists.map((list) => (
          <div 
            key={list.id} 
            className="flex-shrink-0 w-[280px] h-full" // Added h-full to make columns full height
          >
            <List 
              key={list.id} 
              list={list} 
              labelColors={board.labelColors}
            />
          </div>
        ))}
        <div className="flex-shrink-0 w-[5px]"></div>
      </div>
    </div>
  );
};

export default ListContainer;