
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enhanced minification for better performance
    minify: mode === 'production' ? 'terser' : true,
    terserOptions: {
      compress: {
        // Remove console.logs in production
        drop_console: mode === 'production',
        // Remove debugger statements in production
        drop_debugger: mode === 'production',
        // Additional optimizations
        pure_funcs: mode === 'production' ? ['console.log', 'console.warn'] : [],
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        safari10: true, // Fix Safari 10 issues
      },
    },
    // Generate source maps only in development
    sourcemap: mode === 'development',
    // Optimized chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          vendor: ['react', 'react-dom'],
          // Router for navigation
          router: ['react-router-dom'],
          // UI components
          ui: ['@radix-ui/react-slot', '@radix-ui/react-toast'],
          // Query library
          query: ['@tanstack/react-query'],
          // Icons
          icons: ['lucide-react'],
          // Supabase as separate chunk
          supabase: ['@supabase/supabase-js'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Optimize assets
    assetsInlineLimit: 2048, // 2kb - reduced for better caching
    // Target modern browsers for better performance
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Ensure proper module format
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    // Pre-bundle core dependencies only
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
      '@supabase/supabase-js',
    ],
    // Force re-optimization on every build
    force: true,
  },
  // Enhanced CSS optimization
  css: {
    devSourcemap: mode === 'development',
    preprocessorOptions: {
      // Add any CSS preprocessing options here
    },
  },
  // Performance optimizations
  esbuild: {
    // Remove console logs in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    // Optimize for modern browsers
    target: 'es2020',
  },
  // Module resolution fixes
  define: {
    global: 'globalThis',
    'process.env': '{}',
  },
}));
