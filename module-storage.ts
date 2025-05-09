import { existsSync, promises as fsp } from "node:fs";
import defu from "defu";

class ModuleStorage {
  private moduleRecord: Record<string, Module> = {};
  declare private cacheDir: string;
  private isInitialized: Promise<void>;

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
    this.isInitialized = this.loadModulesCache();
  }

  private async saveModules() {
    await fsp.writeFile(this.cacheDir, JSON.stringify(this.moduleRecord, null, 2));
  }

  /**
   * Adds a new module to the storage
   * @param {Module} module - The module to add
   */
  public async addModule(module: Module) {
    await this.isInitialized;
    this.moduleRecord[module.name] = module;
    await this.saveModules();
  }

  /**
   * Updates an existing module in the storage
   * @param {Partial<Module> & { name: string }} module - The module with updated properties
   * @throws {Error} If the module with the given name doesn't exist
   */
  public async updateModule(module: Partial<Module> & { name: string }) {
    await this.isInitialized;
    if (!this.moduleRecord[module.name]) {
      throw new Error(`Module ${module.name} not found`);
    }

    this.moduleRecord[module.name] = defu(this.moduleRecord[module.name], module);

    await this.saveModules();
  }

  /**
   * Retrieves a module by name
   * @param {string} name - The name of the module to get
   * @returns {Module | null} The module if found, null otherwise
   */
  public async getModule(name: string): Promise<Module | null> {
    await this.isInitialized;
    return this.moduleRecord[name] ?? null;
  }

  /**
   * Lists all modules in the storage
   * @returns {Module[]} Array of all modules
   */
  public async listModules(): Promise<Module[]> {
    await this.isInitialized;
    return Object.values(this.moduleRecord);
  }
}

export const moduleStorage = new ModuleStorage();
