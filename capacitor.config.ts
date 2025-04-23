import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ifyoucan-newtv',
  webDir: 'www',
  server: {
    "url": "http://192.168.29.179:8100",
    "cleartext": true
  }
};

export default config;
