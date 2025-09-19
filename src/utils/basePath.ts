// Utility to handle base path for GitHub Pages deployment
export const basePath = '/davidson-lab'

export function getAssetPath(path: string): string {
  // If path doesn't start with /, add it
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // In development, don't add base path
  if (process.env.NODE_ENV === 'development') {
    return normalizedPath
  }
  
  // In production (GitHub Pages), add base path
  return `${basePath}${normalizedPath}`
}