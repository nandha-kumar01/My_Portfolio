/**
 * Shared type definitions for the portfolio application
 */

export type MediaType = "image" | "youtube";

export interface ProjectMedia {
  type: MediaType;
  src: string | string[]; // image path/paths or YouTube video ID
}

export interface Project {
  id: number;
  title: string;
  description: string;
  media: ProjectMedia;
  tags: string[];
  link: string;
  github: string;
}

export interface ImageValidationResult {
  valid: boolean;
  missing: string[];
  found: string[];
}

export interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallbackSrc?: string;
  onError?: () => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface ErrorInfo {
  componentStack: string;
}