import { existsSync, promises as fsp } from "node:fs";
import defu from "defu";

class ModuleStorage {
  private moduleRecord: Record<string, Module> = {};
  declare private cacheDir: string;

  private async loadModulesCache() {
    if (!existsSync(this.cacheDir)) {
      await fsp.writeFile(this.cacheDir, "{}");
      return;
    }

    const modules = await fsp.readFile(this.cacheDir, "utf-8");

    this.moduleRecord = JSON.parse(modules);
  }

  constructor() {
    this.cacheDir = "build-modules.json";
    this.loadModulesCache();
  }

  private async saveModules() {
    await fsp.writeFile(this.cacheDir, JSON.stringify(this.moduleRecord, null, 2));
  }

  /**
   * Adds a new module to the storage
   * @param {Module} module - The module to add
   */
  public addModule(module: Module) {
    this.moduleRecord[module.name] = module;
    this.saveModules();
  }

  /**
   * Updates an existing module in the storage
   * @param {Partial<Module> & { name: string }} module - The module with updated properties
   * @throws {Error} If the module with the given name doesn't exist
   */
  public updateModule(module: Partial<Module> & { name: string }) {
    if (!this.moduleRecord[module.name]) {
      throw new Error(`Module ${module.name} not found`);
    }

    this.moduleRecord[module.name] = defu(this.moduleRecord[module.name], module);
    this.saveModules();
  }

  /**
   * Retrieves a module by name
   * @param {string} name - The name of the module to get
   * @returns {Module | null} The module if found, null otherwise
   */
  public getModule(name: string): Module | null {
    return this.moduleRecord[name] ?? null;
  }

  /**
   * Lists all modules in the storage
   * @returns {Module[]} Array of all modules
   */
  public listModules(): Module[] {
    return Object.values(this.moduleRecord);
  }
}

export const moduleStorage = new ModuleStorage();
