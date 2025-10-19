"use client";

import { useEffect } from "react";

interface PerformanceMetric {
  name: string;
  value: number;
  rating?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reportMetric = (metric: PerformanceMetric) => {
      // Send to analytics in production
      if (process.env.NODE_ENV === "production" && window.gtag) {
        window.gtag("event", "web_vital", {
          name: metric.name,
          value: Math.round(metric.value),
          event_category: "performance",
          rating: metric.rating,
        });
      }
    };

    // Monitor Core Web Vitals
    if (typeof window !== "undefined") {
      import("web-vitals").then((webVitals) => {
        if (webVitals.onCLS) webVitals.onCLS(reportMetric);
        if (webVitals.onINP) webVitals.onINP(reportMetric); // Updated from onFID
        if (webVitals.onFCP) webVitals.onFCP(reportMetric);
        if (webVitals.onLCP) webVitals.onLCP(reportMetric);
        if (webVitals.onTTFB) webVitals.onTTFB(reportMetric);
      }).catch(() => {
        // Fallback if web-vitals is not available
      });
    }

    // Monitor custom performance metrics
    const measurePageLoad = () => {
      if (!performance || !performance.timing) return;

      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
      const firstByte = timing.responseStart - timing.navigationStart;

      // Report these metrics to analytics
      reportMetric({ name: "page_load_time", value: loadTime });
      reportMetric({ name: "dom_ready_time", value: domReady });
      reportMetric({ name: "first_byte_time", value: firstByte });
    };

    // Monitor memory usage (if available)
    const monitorMemory = () => {
      if ("memory" in performance) {
        const memory = (performance as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        if (memory) {
          reportMetric({ name: "memory_usage", value: memory.usedJSHeapSize });
        }
      }
    };

    // Wait for page to load
    if (document.readyState === "complete") {
      measurePageLoad();
      monitorMemory();
    } else {
      window.addEventListener("load", () => {
        measurePageLoad();
        monitorMemory();
      });
    }

    // Monitor navigation timing
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === "navigation") {
        }
      });
    });

    try {
      observer.observe({ entryTypes: ["navigation", "paint"] });
    } catch {
      // Some browsers might not support all entry types
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
