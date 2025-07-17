import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ifyoucan-tv',
  webDir: 'www',
  server: {
  /*   url:'https://online-bizz-theme-2024.web.app/', */
   // url: 'https://ifyoucanmove-tv.web.app/',
     url: 'http://192.168.29.179:8100', 
    cleartext: true,
  },
};

export default config;
