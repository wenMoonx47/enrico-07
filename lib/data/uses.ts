export interface UseItem {
  name: string;
  description: { es: string; en: string };
  link?: string;
}

export interface UsesCategory {
  id: string;
  icon: string;
  items: UseItem[];
}

export const usesData: UsesCategory[] = [
  {
    id: "hardware",
    icon: "Monitor",
    items: [
      {
        name: "MacBook Pro 16\" M3 Pro",
        description: {
          es: "Mi máquina principal. 18GB RAM unificada, perfecto para correr múltiples contenedores Docker y el IDE sin degradación de rendimiento.",
          en: "My main machine. 18GB unified RAM, perfect for running multiple Docker containers and the IDE without performance degradation.",
        },
      },
      {
        name: "LG 27UK850-W 4K Monitor",
        description: {
          es: "Monitor 4K de 27\" para trabajo principal. La resolución es fundamental para revisar código y diagramas de arquitectura.",
          en: "27\" 4K monitor for main work. Resolution is critical for reviewing code and architecture diagrams.",
        },
      },
      {
        name: "Keychron K2 Pro",
        description: {
          es: "Teclado mecánico inalámbrico con switches Gateron Brown. El tacto equilibrado entre oficina y gaming es ideal para largas sesiones de código.",
          en: "Wireless mechanical keyboard with Gateron Brown switches. The balanced feel between office and gaming is ideal for long coding sessions.",
        },
      },
      {
        name: "Logitech MX Master 3S",
        description: {
          es: "Ratón ergonómico con scroll electromagnético. La rueda de desplazamiento rápido es perfecta para revisar PRs largos.",
          en: "Ergonomic mouse with electromagnetic scroll. The fast scroll wheel is perfect for reviewing long PRs.",
        },
      },
    ],
  },
  {
    id: "editor",
    icon: "Terminal",
    items: [
      {
        name: "VS Code",
        description: {
          es: "Mi editor principal con tema Night Owl. Uso vim keybindings para navegación rápida.",
          en: "My main editor with Night Owl theme. I use vim keybindings for fast navigation.",
        },
        link: "https://code.visualstudio.com",
      },
      {
        name: "Neovim",
        description: {
          es: "Para edición rápida en terminal y sesiones SSH. Config minimalista con LSP, Telescope y Treesitter.",
          en: "For quick terminal editing and SSH sessions. Minimalist config with LSP, Telescope, and Treesitter.",
        },
        link: "https://neovim.io",
      },
      {
        name: "Warp Terminal",
        description: {
          es: "Terminal moderno con autocompletado inteligente y bloques de comandos. Reemplazó completamente iTerm2 en mi flujo.",
          en: "Modern terminal with smart autocomplete and command blocks. Completely replaced iTerm2 in my workflow.",
        },
        link: "https://www.warp.dev",
      },
      {
        name: "JetBrains Mono",
        description: {
          es: "Mi fuente de código monoespaciada favorita. Legibilidad superior en pantallas de alta densidad.",
          en: "My favorite monospace code font. Superior readability on high-density screens.",
        },
        link: "https://www.jetbrains.com/lp/mono/",
      },
    ],
  },
  {
    id: "apps",
    icon: "Layers",
    items: [
      {
        name: "Docker Desktop",
        description: {
          es: "Gestión de contenedores y compose stacks locales. Esencial para replicar entornos de producción.",
          en: "Container management and local compose stacks. Essential for replicating production environments.",
        },
      },
      {
        name: "TablePlus",
        description: {
          es: "GUI de bases de datos que soporta PostgreSQL, MySQL, Redis y más. Sustituye a DBeaver por su velocidad.",
          en: "Database GUI supporting PostgreSQL, MySQL, Redis, and more. Replaces DBeaver for its speed.",
        },
        link: "https://tableplus.com",
      },
      {
        name: "Insomnia / Bruno",
        description: {
          es: "Clientes de REST/GraphQL. Bruno para APIs que quiero versionar en git junto al código.",
          en: "REST/GraphQL clients. Bruno for APIs I want to version in git alongside code.",
        },
      },
      {
        name: "Notion",
        description: {
          es: "Documentación personal, notas de arquitectura y seguimiento de proyectos freelance.",
          en: "Personal documentation, architecture notes, and freelance project tracking.",
        },
        link: "https://notion.so",
      },
    ],
  },
  {
    id: "services",
    icon: "Cloud",
    items: [
      {
        name: "GitHub",
        description: {
          es: "Control de versiones, CI/CD con GitHub Actions y gestión de proyectos open source.",
          en: "Version control, CI/CD with GitHub Actions, and open source project management.",
        },
        link: "https://github.com",
      },
      {
        name: "Vercel",
        description: {
          es: "Deploy de proyectos frontend y Next.js. Preview deployments por rama son esenciales.",
          en: "Frontend and Next.js project deployment. Branch preview deployments are essential.",
        },
        link: "https://vercel.com",
      },
      {
        name: "Linear",
        description: {
          es: "Gestión de issues y sprints. La velocidad de la interfaz y el teclado-primero lo hacen insustituible.",
          en: "Issue and sprint management. Interface speed and keyboard-first approach make it irreplaceable.",
        },
        link: "https://linear.app",
      },
      {
        name: "Grafana Cloud",
        description: {
          es: "Observabilidad y dashboards de métricas para proyectos personales y clientes.",
          en: "Observability and metrics dashboards for personal projects and clients.",
        },
        link: "https://grafana.com",
      },
    ],
  },
];
