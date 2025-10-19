/**
 * Image validation utility
 * Helps prevent image loading issues by validating image paths
 */

import fs from 'fs';
import path from 'path';
import type { ImageValidationResult, Project } from '@/types';

/**
 * Validates if image files exist in the public directory
 */
export function validateImagePaths(imagePaths: string[]): ImageValidationResult {
  const result: ImageValidationResult = {
    valid: true,
    missing: [],
    found: []
  };

  for (const imagePath of imagePaths) {
    // Remove leading slash and add public directory
    const fullPath = path.join(process.cwd(), 'public', imagePath.replace(/^\//, ''));
    
    if (fs.existsSync(fullPath)) {
      result.found.push(imagePath);
    } else {
      result.missing.push(imagePath);
      result.valid = false;
    }
  }

  return result;
}

/**
 * Validates project media sources
 */
export function validateProjectImages(projects: Project[]): void {
  for (const project of projects) {
    if (project.media.type === 'image') {
      const imagePaths = Array.isArray(project.media.src) 
        ? project.media.src 
        : [project.media.src];
      
      const validation = validateImagePaths(imagePaths);
      
      if (!validation.valid) {
      } else {
      }
    }
  }
}

/**
 * Lists all images in the projects directory
 */
export function listProjectImages(): string[] {
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  
  try {
    const files = fs.readdirSync(projectsDir);
    return files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );
  } catch (error) {
    return [];
  }
}