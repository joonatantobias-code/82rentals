/**
 * Ambient types for the Google Ads / Analytics tag. The
 * `gtag.js` loader is injected from app/layout.tsx via
 * next/script; this declaration just lets TypeScript know the
 * global is callable without us pulling in @types/gtag.js.
 *
 * Minimal signature: gtag(command, action, params?). Real
 * signature is overloaded heavily but anything we use ends up
 * hitting this catch-all form.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export {};
