npx serve staticfiles/nike-store/static

# Static Export Configuration

This directory contains configuration files specifically optimized for static export generation.

## Files

### `package.json`
- **Purpose**: Package configuration for static builds
- **Differences from main**: Includes `export` script, optimized for static generation
- **Usage**: Copied to each store directory during generation

### `next.config.js`
- **Purpose**: Next.js configuration for static export
- **Key Features**:
  - `output: 'export'` - Enables static export
  - `images.unoptimized: true` - Required for static builds
  - `trailingSlash: true` - Better compatibility with static hosting
  - Asset prefix and base path support for CDN deployment

## Why Separate Configs?

The main project (`/next.config.js` and `/package.json`) can use dynamic Next.js features like:
- API routes
- Server-side rendering (SSR)
- Incremental Static Regeneration (ISR)
- Image optimization

These static configs ensure clean, compatible builds for static hosting while keeping the main project flexible.

## Usage

These files are automatically used by `utils/staticgen.js` when generating store-specific static exports.

```bash
npm run generate-stores
``` 