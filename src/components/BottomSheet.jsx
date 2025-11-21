// BottomSheet.jsx
import React, { useRef, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import './BottomSheet.css';

const VH = window.innerHeight;
const MIN_HEIGHT_RATIO = 0.2;
const MAX_HEIGHT_RATIO = 0.5;
const THRESHOLD_VELOCITY = 500;

const BottomSheet = ({ children }) => {
  const contentRef = useRef(null);
  const MOVE_DISTANCE = (MAX_HEIGHT_RATIO - MIN_HEIGHT_RATIO) * VH;
  const MIN_Y = 0; // 패널이 가장 확장되었을 때 (최대 높이)
  const MAX_Y = MOVE_DISTANCE; // 패널이 가장 축소되었을 때 (최소 높이)
  const SNAP_POINTS = [MIN_Y, MAX_Y];

  const y = useMotionValue(MAX_Y);
  const translateY = useSpring(y, { stiffness: 300, damping: 30 });
  const isExpanded = useTransform(y, [MIN_Y, MAX_Y], [1, 0]);
  // 패널이 확장된 상태(y ≈ MIN_Y)일 때만 overflow를 auto로 설정하여 스크롤 허용
  const contentOverflow = useTransform(isExpanded, v => (v > 0.99 ? 'auto' : 'hidden'));

  const snapTo = useCallback((point, velocity = 0) => {
    y.set(point, { type: 'spring', stiffness: 300, damping: 30, velocity });
  }, [y]);

  const bind = useDrag(
    ({ down, movement: [, my], velocity: [, vy], last }) => {
      const content = contentRef.current;
      const currentY = y.get();
      let newY = down ? my + currentY : currentY;

      if (content) {
        const scrollTop = content.scrollTop;
        
        // --- 🎯 수정/핵심 로직 시작 ---
        
        if (my < 0) {
          // 1. 위로 드래그 (확장 또는 스크롤)
          
          if (scrollTop > 0) {
            // 리스트가 최상단이 아닐 때: 스크롤만 처리하고 패널 이동은 막음
            
            // 리스트 스크롤 실행 (드래그 방향과 반대로 움직이도록)
            content.scrollTop -= my; 
            
            // 패널 이동 방지: y.set을 호출하지 않거나, currentY를 유지
            // 아래의 if(last) 로직이 currentY를 사용하므로, y.set()을 호출하지 않음
            
          } else {
            // 리스트가 최상단일 때 (scrollTop === 0): 패널 확장만 처리
            y.set(Math.max(MIN_Y, currentY + my));
          }
          
        } else if (my > 0) {
          // 2. 아래로 드래그 (축소)
          
          // 리스트가 최상단 위치(scrollTop === 0)일 때만 패널을 축소 허용
          if (scrollTop === 0) {
            y.set(Math.max(MIN_Y, Math.min(MAX_Y, currentY + my)));
          }
          // scrollTop > 0 이면 아무것도 하지 않음 (스크롤 락)
        }
        
        // --- 🎯 수정/핵심 로직 종료 ---
      }

      if (last) {
        // 스냅 로직은 그대로 유지
        const target =
          Math.abs(vy) > THRESHOLD_VELOCITY
            ? vy < 0 
              ? MIN_Y // 위로 빠르게: 확장
              : MAX_Y // 아래로 빠르게: 축소
            : SNAP_POINTS.reduce((prev, curr) => 
                Math.abs(curr - newY) < Math.abs(prev - newY) ? curr : prev
              );
        snapTo(target, vy);
      }
    },
    {
      axis: 'y',
      bounds: { top: MIN_Y, bottom: MAX_Y },
      from: () => [0, y.get()],
      filterTaps: true,
    }
  );

  const listContent = useMemo(() => (
    Array.from({ length: 50 }).map((_, i) => (
      <div key={i} className="list-item">
        [{i + 1}] 테스트 목록
      </div>
    ))
  ), []);

  return (
    <motion.div 
      {...bind()} 
      className="bottom-sheet-container" 
      style={{ y: translateY }}
    >
      <div className="bottom-sheet-handle">
        <div className="handle-bar" />
      </div>
      <motion.div
        ref={contentRef}
        className="bottom-sheet-content-wrapper"
        style={{ 
          overflowY: contentOverflow, 
          WebkitOverflowScrolling: 'touch',
          height: '100%' 
        }} 
      >
        {children}
        {listContent}
      </motion.div>
    </motion.div>
  );
};

export default BottomSheet;