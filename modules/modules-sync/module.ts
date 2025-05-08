import { defineNuxtModule, createResolver, addServerHandler, useLogger } from "nuxt/kit";
import { ModuleLoader } from "./runtime/utils/";

export default defineNuxtModule({
  meta: {
    name: "modules-sync",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {},
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const logger = useLogger("[modules-sync]");

    // Add API endpoint
    addServerHandler({
      route: "/api/modules/:name",
      method: "get",
      handler: resolve("./runtime/server/api/modules/[name]"),
    });
    addServerHandler({
      route: "/api/modules",
      method: "get",
      handler: resolve("./runtime/server/api/modules"),
    });

    const moduleLoader = new ModuleLoader(logger);
    await moduleLoader.syncModules();

    logger.info("`Modules-sync` module loaded");
  },
});
