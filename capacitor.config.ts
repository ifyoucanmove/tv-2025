import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ifyoucan-tv',
  webDir: 'www',
  server: {
    url: 'https://ifyoucanmove-tv.web.app/',
    cleartext: true,
  },
};

export default config;
