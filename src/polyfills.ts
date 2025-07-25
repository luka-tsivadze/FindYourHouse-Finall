import 'zone.js';

// Simple user agent check - load polyfills only for truly old browsers
const userAgent = navigator.userAgent;
const isOldBrowser = (
  /iPhone OS [5-9]/.test(userAgent) ||  // iOS 5-9
  /Android [4-6]/.test(userAgent) ||    // Android 4-6
  /Chrome\/[1-5]/.test(userAgent) ||    // Chrome 1-59
  /Safari\/[1-9]/.test(userAgent) && !/Chrome/.test(userAgent) // Old Safari
);

if (isOldBrowser) {
  // Only load for browsers that are 7+ years old
  import('core-js/es/promise');
  import('core-js/es/array');
  import('whatwg-fetch');
}