import { defaultNS, resources } from "@/locales";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}
