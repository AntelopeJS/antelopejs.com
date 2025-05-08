export interface Module {
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  repo: string;
  npm: string;
  icon: string;
  github: string;
  documentation: string;
  category: string[];
  interface: string[];
  stars: number | null;
  downloads: number | null;
  readme: string | null;
  official?: boolean;
  sponsor?: boolean;
}
