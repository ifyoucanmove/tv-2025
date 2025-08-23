import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.movefitness.ifyoucanmovetv',
  appName: 'Ifyoucanmove TV',
  webDir: 'www',
  server: {
  "url": "https://tv-2025.netlify.app",
  "cleartext": true
}
};

export default config;
