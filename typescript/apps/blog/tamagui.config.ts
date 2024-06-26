import { config } from "@tamagui/config/v3";

import { createTamagui } from "tamagui";
import { createAnimations } from "@tamagui/animations-css";

const appConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
  },
  animations: {
    ...createAnimations({
      fast: "ease-in 150ms",
      medium: "ease-in 300ms",
      slow: "ease-in 450ms",
    }),
  },
});
export type AppConfig = typeof appConfig;
declare module "tamagui" {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}
export default appConfig;
