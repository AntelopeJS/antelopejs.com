import { moduleStorage } from "../../../../../../module-storage";

export default defineEventHandler(async () => {
  return moduleStorage.listModules();
});
