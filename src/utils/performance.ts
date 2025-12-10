import { useCallback, useMemo } from 'react';
import { debounce } from 'lodash-es';

// Debounced auto-save hook
export const useDebouncedSave = (saveFunction: () => void, delay = 1000) => {
  return useCallback(
    debounce(saveFunction, delay),
    [saveFunction, delay]
  );
};

// Memoized node filtering for large workflows
export const useFilteredNodes = (nodes: any[], searchTerm: string) => {
  return useMemo(() => {
    if (!searchTerm) return nodes;
    
    return nodes.filter(node => 
      node.data.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.data.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.data.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [nodes, searchTerm]);
};

// Performance monitoring utility
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// Virtual scrolling helper for large node lists
export const useVirtualizedList = (items: any[], containerHeight: number, itemHeight: number) => {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = 0; // This would be calculated based on scroll position
    const endIndex = Math.min(startIndex + visibleCount, items.length);
    
    return {
      visibleItems: items.slice(startIndex, endIndex),
      totalHeight: items.length * itemHeight,
      startIndex,
      endIndex,
    };
  }, [items, containerHeight, itemHeight]);
};