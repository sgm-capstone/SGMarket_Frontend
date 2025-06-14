// src/hooks/useVirtual.ts
import { useVirtualizer } from "@tanstack/react-virtual";
import { RefObject, useEffect } from "react";

interface UseVirtualOpts {
  parentRef: RefObject<HTMLElement>;
  itemCount: number;
  itemHeight: number;
  overscan?: number;
}

export function useVirtual({
  parentRef,
  itemCount,
  itemHeight,
  overscan = 5,
}: UseVirtualOpts) {
  const virtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current!,
    estimateSize: () => itemHeight,
    overscan,
  });

  // 가상 컨테이너 높이 CSS 변수로 셋팅
  useEffect(() => {
    const el = parentRef.current!;
    el.style.setProperty(
      "--virtual-total-size",
      `${virtualizer.getTotalSize()}px`
    );
  }, [virtualizer, parentRef]);

  return virtualizer.getVirtualItems();
}
