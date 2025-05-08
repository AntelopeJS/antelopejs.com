import { createResolver, type useLogger } from "nuxt/kit";
import { existsSync, promises as fsp } from "node:fs";
import { executeWithConcurrency } from ".";
import defu from "defu";
import * as yml from "js-yaml";
import { ofetch } from "ofetch";
import { moduleStorage } from "../../../../module-storage";

interface ModuleInfo {
  name: string;
  description: string;
  repo: string;
  npm: string;
  icon: string;
  github: string;
  documentation: string;
  category: string[];
  interface?: string[];
  official?: boolean;
  sponsor?: boolean;
}

interface NpmInfo {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

interface RepositoryInfo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
}

export class ModuleLoader {
  declare private resolver: (...path: string[]) => string;
  declare private logger: ReturnType<typeof useLogger>;

  static modulesDir = "../../../../content/modules";

  constructor(logger: ReturnType<typeof useLogger>) {
    const { resolve } = createResolver(import.meta.url);
    this.resolver = resolve;
    this.logger = logger;
  }

  /**
   * Retrieves information about a module from its YAML configuration file
   *
   * @param {string} name - The name of the module
   * @returns {Promise<ModuleInfo | undefined>} Module information object or undefined if file doesn't exist
   */
  private async getModuleInfo(name: string): Promise<ModuleInfo | undefined> {
    const mod: ModuleInfo = {
      name,
      description: "",
      repo: "", // antelope/example
      npm: "", // @antelope/core
      icon: "", // url or filename from /public/icons
      github: "", // github link
      documentation: "",
      category: ["Devtools"],
      interface: [],
      official: false,
    };
    const file = this.resolver(ModuleLoader.modulesDir, name + ".yml");

    if (existsSync(file)) {
      return defu(yml.load(await fsp.readFile(file, "utf-8")) as object, mod);
    }
  }

  /**
   * Loads information for all modules from YAML files in the modules directory
   *
   * @returns {Promise<ModuleInfo[]>} Array of module information objects
   */
  private async loadModulesInfo(): Promise<ModuleInfo[]> {
    this.logger.info("Start Loading modules data...");

    // Get all YAML files from the modules directory
    const files = await fsp.readdir(this.resolver(ModuleLoader.modulesDir));
    const moduleFiles = files.filter((file) => file.endsWith(".yml"));
    this.logger.info(`Found \`${moduleFiles.length} modules\` to load...`);

    // Load module info for each file
    const modulesRaw = await Promise.all(
      moduleFiles.map(async (file) => {
        const name = file.replace(/\.yml$/, "");
        return this.getModuleInfo(name);
      })
    );

    return modulesRaw.filter(Boolean) as ModuleInfo[];
  }

  /**
   * Fetches additional data for a module from external sources
   *
   * @param {ModuleInfo} info - Module information object
   * @returns {Promise<Object>} Object containing readme content, repository information, and npm download statistics
   */
  private async fetchModuleData(info: ModuleInfo) {
    const results = await Promise.allSettled([
      // README file as a string
      ofetch<string>(`https://raw.githubusercontent.com/${info.repo}/main/README.md`, {
        headers: {
          Accept: "text/plain",
        },
      }),
      // Repository info
      // TODO: fix rate limit by adding a token
      ofetch<RepositoryInfo>(`https://api.github.com/repos/${info.repo}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }),
      // npm info
      ofetch<NpmInfo>(`https://api.npmjs.org/downloads/point/last-month/${info.npm}`),
    ]);

    const [readme, repoInfo, npmInfo] = results;

    return {
      readme: readme.status === "fulfilled" ? readme.value : null,
      repoInfo: repoInfo.status === "fulfilled" ? repoInfo.value : null,
      npmInfo: npmInfo.status === "fulfilled" ? npmInfo.value : null,
    };
  }

  public async syncModules() {
    const modulesInfo = await this.loadModulesInfo();

    this.logger.info(`Found \`${modulesInfo.length} modules\` to sync...`);
    const modules = await executeWithConcurrency(
      modulesInfo,
      async (mod) => {
        const data = await this.fetchModuleData(mod);
        return {
          ...mod,
          ...data,
        };
      },
      10
    );

    this.logger.info(`Syncing \`${modules.length} modules\` to the storage...`);
    await executeWithConcurrency(
      modules,
      async (mod) => {
        const dbModule = await moduleStorage.getModule(mod.name);

        const moduleData: Module = {
          created_at: dbModule?.created_at ?? new Date(),
          updated_at: new Date(),
          name: mod.name,
          description: mod.description,
          repo: mod.repo,
          npm: mod.npm,
          icon: mod.icon,
          github: mod.github,
          documentation: mod.documentation,
          category: mod.category,
          interface: mod.interface || [],
          stars: mod.repoInfo?.stargazers_count ?? null,
          downloads: mod.npmInfo?.downloads ?? null,
          readme: mod.readme,
          official: mod.official,
          sponsor: mod.sponsor,
        };

        if (dbModule) {
          await moduleStorage.updateModule(moduleData);
        } else {
          await moduleStorage.addModule(moduleData);
        }
      },
      10
    );

    this.logger.info(`Modules synced successfully at ${new Date().toISOString()}`);
  }
}
