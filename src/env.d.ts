/// <reference types="astro/client" />

type PostHogClient = typeof import('posthog-js').default;

declare global {
  interface Window {
    posthog?: PostHogClient;
  }
}

export {};
