export interface CaseStudyScreenshot {
  path: string;
  label: { es: string; en: string };
}

export interface CaseStudy {
  slug: string;
  company: string;
  companyUrl: string;
  logoPath: string;
  productImagePath: string;
  coverImagePath: string;
  screenshots: CaseStudyScreenshot[];
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  period: string;
  role: { es: string; en: string };
  problem: { es: string; en: string };
  approach: { es: string; en: string };
  outcome: { es: string; en: string };
  // Full case study content
  context: { es: string; en: string };
  challenges: { es: string[]; en: string[] };
  solution: { es: string; en: string };
  architecture: { es: string; en: string };
  results: { es: string[]; en: string[] };
  metrics: Array<{ label: { es: string; en: string }; value: string; unit?: string }>;
  tags: string[];
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "kueski-ai-fintech-backend",
    company: "Kueski",
    companyUrl: "https://kueski.com",
    logoPath: "/images/companies/kueski.svg",
    productImagePath: "/images/products/kueski-1.webp",
    coverImagePath: "/images/case-studies/kueski-cover.webp",
    screenshots: [
      { path: "/images/products/kueski-1.webp", label: { es: "App Principal", en: "App Home" } },
      { path: "/images/products/kueski-2.webp", label: { es: "Préstamo Personal", en: "Personal Loan" } },
      { path: "/images/products/kueski-3.webp", label: { es: "KueskiPay B2B", en: "KueskiPay B2B" } },
    ],
    title: {
      es: "Backend de IA para Fintech a Escala",
      en: "AI-Powered Fintech Backend at Scale",
    },
    subtitle: {
      es: "Cómo construí el sistema de scoring crediticio con IA para 200K+ usuarios",
      en: "How I built the AI credit scoring system for 200K+ users",
    },
    period: "Aug 2024 – Present",
    role: {
      es: "Lead Software Engineer (Backend & AI Systems)",
      en: "Lead Software Engineer (Backend & AI Systems)",
    },
    problem: {
      es: "El proceso de evaluación crediticia era lento (15+ minutos) y manual, con alta tasa de falsos negativos que rechazaba clientes válidos.",
      en: "The credit evaluation process was slow (15+ minutes) and manual, with a high false-negative rate rejecting valid customers.",
    },
    approach: {
      es: "Diseñé una arquitectura RAG con OpenAI y modelos ML propios que analiza patrones de riesgo en tiempo real, integrada en el pipeline de backend de GCP.",
      en: "Designed a RAG architecture with OpenAI and proprietary ML models that analyzes risk patterns in real-time, integrated into the GCP backend pipeline.",
    },
    outcome: {
      es: "Reducción del 80% en tiempo de decisión crediticia. Aumento del 23% en aprobaciones válidas. 99.9% SLA en producción.",
      en: "80% reduction in credit decision time. 23% increase in valid approvals. 99.9% SLA in production.",
    },
    context: {
      es: "Kueski es la plataforma de préstamos digitales más grande de México, con más de 200,000 usuarios activos y millones de solicitudes de crédito procesadas anualmente. Al unirme como Lead Engineer, el equipo enfrentaba serios problemas de escalabilidad y precisión en su sistema de scoring crediticio.",
      en: "Kueski is Mexico's largest digital lending platform, with over 200,000 active users and millions of credit applications processed annually. When I joined as Lead Engineer, the team faced serious scalability and accuracy problems in their credit scoring system.",
    },
    challenges: {
      es: [
        "Sistema de scoring legacy en Python que tardaba 15+ minutos por solicitud",
        "Tasa de falsos negativos del 34% que rechazaba clientes válidos",
        "Infraestructura monolítica incapaz de escalar durante picos de demanda",
        "Sin trazabilidad de decisiones para cumplimiento regulatorio",
        "Equipo de 8 ingenieros con deuda técnica acumulada de 3 años",
      ],
      en: [
        "Legacy Python scoring system taking 15+ minutes per application",
        "34% false-negative rate rejecting valid customers",
        "Monolithic infrastructure unable to scale during demand spikes",
        "No decision traceability for regulatory compliance",
        "Team of 8 engineers with 3 years of accumulated technical debt",
      ],
    },
    solution: {
      es: "Diseñé e implementé una arquitectura de microservicios event-driven en GCP que separa el procesamiento de datos, la inferencia de modelos ML y la toma de decisiones. El corazón del sistema es un pipeline RAG que combina datos históricos del usuario, señales de mercado en tiempo real y modelos de riesgo propios para generar evaluaciones crediticias explicables en menos de 2 minutos.",
      en: "I designed and implemented an event-driven microservices architecture on GCP that separates data processing, ML model inference, and decision-making. The core of the system is a RAG pipeline that combines historical user data, real-time market signals, and proprietary risk models to generate explainable credit assessments in under 2 minutes.",
    },
    architecture: {
      es: "El sistema utiliza Cloud Pub/Sub para ingesta de eventos, Cloud Run para servicios stateless de inferencia, GKE para workloads intensivos de ML, BigQuery para análisis de datos históricos y Vertex AI para gestión del ciclo de vida de modelos. Redis Cache reduce latencia en consultas frecuentes y Cloud Armor protege contra ataques.",
      en: "The system uses Cloud Pub/Sub for event ingestion, Cloud Run for stateless inference services, GKE for ML-intensive workloads, BigQuery for historical data analysis, and Vertex AI for model lifecycle management. Redis Cache reduces latency on frequent queries and Cloud Armor protects against attacks.",
    },
    results: {
      es: [
        "Reducción del 80% en tiempo de decisión crediticia (de 15 min a <2 min)",
        "Aumento del 23% en aprobaciones de clientes válidos",
        "SLA del 99.9% mantenido durante picos de 50K solicitudes/hora",
        "Reducción del 35% en costos de infraestructura cloud",
        "100% de trazabilidad de decisiones para cumplimiento regulatorio (CNBV)",
        "Equipo de 8 ingenieros con velocity incrementado en 3x tras refactorización",
      ],
      en: [
        "80% reduction in credit decision time (from 15 min to <2 min)",
        "23% increase in valid customer approvals",
        "99.9% SLA maintained during peaks of 50K requests/hour",
        "35% reduction in cloud infrastructure costs",
        "100% decision traceability for regulatory compliance (CNBV)",
        "Team of 8 engineers with 3x increased velocity after refactoring",
      ],
    },
    metrics: [
      { label: { es: "Reducción tiempo decisión", en: "Decision time reduction" }, value: "80", unit: "%" },
      { label: { es: "Aprobaciones válidas +", en: "Valid approvals +" }, value: "23", unit: "%" },
      { label: { es: "SLA producción", en: "Production SLA" }, value: "99.9", unit: "%" },
      { label: { es: "Usuarios activos", en: "Active users" }, value: "200K", unit: "+" },
      { label: { es: "Ahorro infraestructura", en: "Infra savings" }, value: "35", unit: "%" },
    ],
    tags: ["Python", "Go", "GCP", "Kubernetes", "OpenAI", "LangChain", "RAG", "Vertex AI", "Pub/Sub", "BigQuery", "Terraform"],
    featured: true,
  },
  {
    slug: "retool-distributed-systems",
    company: "Retool",
    companyUrl: "https://retool.com",
    logoPath: "/images/companies/retool.svg",
    productImagePath: "/images/products/retool-1.webp",
    coverImagePath: "/images/case-studies/retool-cover.webp",
    screenshots: [
      { path: "/images/products/retool-1.webp", label: { es: "Constructor", en: "Build" } },
      { path: "/images/products/retool-2.webp", label: { es: "Gobernanza", en: "Govern" } },
      { path: "/images/products/retool-3.webp", label: { es: "Escalado", en: "Scale" } },
    ],
    title: {
      es: "Sistemas Distribuidos a Escala en Retool",
      en: "Distributed Systems at Scale at Retool",
    },
    subtitle: {
      es: "Arquitectura del motor de queries que procesa 100K+ operaciones diarias",
      en: "Architecture of the query engine processing 100K+ daily operations",
    },
    period: "Apr 2021 – Jul 2024",
    role: {
      es: "Ingeniero Backend Senior",
      en: "Senior Backend Engineer",
    },
    problem: {
      es: "El motor de queries de Retool tenía cuellos de botella que causaban timeouts al escalar a miles de usuarios concurrentes y 100K+ operaciones diarias.",
      en: "Retool's query engine had bottlenecks causing timeouts when scaling to thousands of concurrent users and 100K+ daily operations.",
    },
    approach: {
      es: "Migré de un sistema síncrono a arquitectura event-driven con Kafka y worker pools distribuidos en Kubernetes, con circuit breakers y backpressure automático.",
      en: "Migrated from a synchronous system to event-driven architecture with Kafka and distributed worker pools on Kubernetes, with circuit breakers and automatic backpressure.",
    },
    outcome: {
      es: "70% de reducción en latencia. 99.99% de uptime. Capacidad de escalar horizontalmente sin límites bajo carga.",
      en: "70% reduction in latency. 99.99% uptime. Ability to scale horizontally without limits under load.",
    },
    context: {
      es: "Retool procesa millones de operaciones de bases de datos diariamente para empresas como Amazon, Mercedes-Benz y DoorDash. El sistema de ejecución de queries necesitaba soportar crecimiento 10x manteniendo sub-segundo de latencia.",
      en: "Retool processes millions of database operations daily for companies like Amazon, Mercedes-Benz, and DoorDash. The query execution system needed to support 10x growth while maintaining sub-second latency.",
    },
    challenges: {
      es: [
        "Sistema síncrono que bloqueaba threads ante queries lentas",
        "Sin aislamiento entre tenants — una query lenta afectaba a todos",
        "Escalado vertical llegando a sus límites físicos",
        "500+ integraciones de bases de datos con protocolos diferentes",
        "SLA contractual de 99.99% con penalizaciones económicas por incumplimiento",
      ],
      en: [
        "Synchronous system blocking threads on slow queries",
        "No tenant isolation — one slow query affected everyone",
        "Vertical scaling reaching its physical limits",
        "500+ database integrations with different protocols",
        "Contractual 99.99% SLA with financial penalties for non-compliance",
      ],
    },
    solution: {
      es: "Redesigné el motor de queries como un sistema de colas distribuidas donde cada query se convierte en un mensaje de Kafka, procesado por worker pools especializados en Kubernetes. Implementé circuit breakers por tenant, rate limiting adaptativo y backpressure automático para garantizar el SLA bajo cualquier carga.",
      en: "I redesigned the query engine as a distributed queue system where each query becomes a Kafka message, processed by specialized worker pools on Kubernetes. I implemented per-tenant circuit breakers, adaptive rate limiting, and automatic backpressure to guarantee SLA under any load.",
    },
    architecture: {
      es: "El sistema utiliza Kafka con particionado por tenant para aislamiento, worker pools en Go para máxima eficiencia, Redis para caché de metadatos, PostgreSQL con read replicas para el control plane, y Prometheus/Grafana para observabilidad en tiempo real.",
      en: "The system uses Kafka with per-tenant partitioning for isolation, Go worker pools for maximum efficiency, Redis for metadata caching, PostgreSQL with read replicas for the control plane, and Prometheus/Grafana for real-time observability.",
    },
    results: {
      es: [
        "70% de reducción en latencia P99 (de 2.1s a 630ms)",
        "99.99% de uptime durante 3 años consecutivos",
        "Capacidad de 10x más operaciones diarias sin cambios de hardware",
        "Aislamiento completo entre 1000+ tenants activos",
        "Pipeline de sincronización en tiempo real para 500+ integraciones",
        "Reducción de incidentes de producción en 85%",
      ],
      en: [
        "70% reduction in P99 latency (from 2.1s to 630ms)",
        "99.99% uptime for 3 consecutive years",
        "10x more daily operations capacity without hardware changes",
        "Complete isolation between 1000+ active tenants",
        "Real-time sync pipeline for 500+ integrations",
        "85% reduction in production incidents",
      ],
    },
    metrics: [
      { label: { es: "Reducción latencia P99", en: "P99 latency reduction" }, value: "70", unit: "%" },
      { label: { es: "Uptime", en: "Uptime" }, value: "99.99", unit: "%" },
      { label: { es: "Ops diarias", en: "Daily operations" }, value: "100K", unit: "+" },
      { label: { es: "Integraciones DB", en: "DB integrations" }, value: "500", unit: "+" },
    ],
    tags: ["Node.js", "Go", "Kafka", "Kubernetes", "AWS EKS", "PostgreSQL", "Redis", "Terraform", "Prometheus", "Grafana"],
    featured: true,
  },
  {
    slug: "factorial-monolith-microservices",
    company: "Factorial",
    companyUrl: "https://factorialhr.com",
    logoPath: "/images/companies/factorial.svg",
    productImagePath: "/images/products/factorial-1.webp",
    coverImagePath: "/images/case-studies/factorial-cover.webp",
    screenshots: [
      { path: "/images/products/factorial-1.webp", label: { es: "HR Central", en: "HR Core" } },
      { path: "/images/products/factorial-2.webp", label: { es: "Horarios Auto.", en: "Auto Scheduling" } },
      { path: "/images/products/factorial-3.webp", label: { es: "Automatización", en: "Admin Automation" } },
    ],
    title: {
      es: "Migración de Monolito a Microservicios en Factorial",
      en: "Monolith to Microservices Migration at Factorial",
    },
    subtitle: {
      es: "Cómo dividimos un monolito Rails en microservicios Node.js para 50K+ usuarios",
      en: "How we split a Rails monolith into Node.js microservices for 50K+ users",
    },
    period: "Jan 2019 – Mar 2021",
    role: {
      es: "Ingeniero Full Stack Mid-Level",
      en: "Mid-Level Full Stack Engineer",
    },
    problem: {
      es: "El monolito de Rails de Factorial no podía escalar ante el crecimiento acelerado. Los deployments de 45 minutos bloqueaban la velocidad de desarrollo y causaban downtimes frecuentes.",
      en: "Factorial's Rails monolith couldn't scale with rapid growth. 45-minute deployments blocked development velocity and caused frequent downtimes.",
    },
    approach: {
      es: "Migración incremental siguiendo el patrón Strangler Fig: extraer dominios de negocio a microservicios Node.js progresivamente sin interrumpir el servicio.",
      en: "Incremental migration following the Strangler Fig pattern: extracting business domains to Node.js microservices progressively without service interruption.",
    },
    outcome: {
      es: "Deployments de 45 min → 8 min. Downtime cero durante la migración. Capacidad de escalar servicios independientemente según demanda.",
      en: "Deployments from 45 min → 8 min. Zero downtime during migration. Ability to scale services independently based on demand.",
    },
    context: {
      es: "Factorial creció de 5K a 50K usuarios en 18 meses. El monolito de Ruby on Rails que funcionaba bien para el MVP empezó a mostrar sus límites: deployments lentos, escalado difícil y equipos de desarrollo pisándose entre sí.",
      en: "Factorial grew from 5K to 50K users in 18 months. The Ruby on Rails monolith that worked well for MVP started showing its limits: slow deployments, difficult scaling, and development teams stepping on each other.",
    },
    challenges: {
      es: [
        "Monolito de 180K líneas de código Ruby con alto acoplamiento",
        "Deployments de 45 minutos que paralizaban nuevas funcionalidades",
        "Base de datos PostgreSQL sin sharding con cuellos de botella obvios",
        "4 equipos de desarrollo trabajando sobre el mismo codebase",
        "SLA de 99.5% que había fallado 3 veces en el último trimestre",
        "Migración sin downtime para 50K usuarios activos",
      ],
      en: [
        "180K line Ruby codebase with high coupling",
        "45-minute deployments freezing new feature development",
        "PostgreSQL database without sharding with obvious bottlenecks",
        "4 development teams working on the same codebase",
        "99.5% SLA that had failed 3 times in the last quarter",
        "Zero-downtime migration for 50K active users",
      ],
    },
    solution: {
      es: "Aplicamos el patrón Strangler Fig durante 18 meses: primero extrajimos los dominios con menor acoplamiento (notificaciones, informes), luego los más críticos (nóminas, control de presencia). Usamos un API Gateway en Node.js como enrutador inteligente que dirigía tráfico al monolito o a los nuevos servicios según el dominio.",
      en: "We applied the Strangler Fig pattern over 18 months: first extracting the lowest-coupling domains (notifications, reports), then the most critical ones (payroll, time tracking). We used a Node.js API Gateway as an intelligent router that directed traffic to the monolith or new services based on domain.",
    },
    architecture: {
      es: "API Gateway en Node.js/Express con service discovery, servicios individuales dockerizados en AWS ECS, RabbitMQ para comunicación async entre servicios, Redis para sesiones y caché, PostgreSQL por servicio (separación de base de datos por dominio) y GitLab CI/CD para deployments independientes.",
      en: "Node.js/Express API Gateway with service discovery, individual services dockerized on AWS ECS, RabbitMQ for async inter-service communication, Redis for sessions and caching, per-service PostgreSQL (domain database separation), and GitLab CI/CD for independent deployments.",
    },
    results: {
      es: [
        "Deployments de 45 min reducidos a 8 min por servicio",
        "Cero downtime durante 18 meses de migración",
        "SLA mejorado al 99.95% (de 99.2%)",
        "Servicio de nóminas procesando €10M+ mensuales con 99.99% uptime",
        "4 equipos con deployments completamente independientes",
        "Escalado específico: servicio de informes 4x durante cierres contables",
      ],
      en: [
        "Deployments reduced from 45 min to 8 min per service",
        "Zero downtime during 18 months of migration",
        "SLA improved to 99.95% (from 99.2%)",
        "Payroll service processing €10M+ monthly with 99.99% uptime",
        "4 teams with completely independent deployments",
        "Specific scaling: reports service 4x during accounting closes",
      ],
    },
    metrics: [
      { label: { es: "Reducción tiempo deploy", en: "Deploy time reduction" }, value: "82", unit: "%" },
      { label: { es: "SLA mejorado", en: "Improved SLA" }, value: "99.95", unit: "%" },
      { label: { es: "Usuarios servidos", en: "Users served" }, value: "50K", unit: "+" },
      { label: { es: "Downtime migración", en: "Migration downtime" }, value: "0", unit: "min" },
    ],
    tags: ["Node.js", "Ruby on Rails", "Docker", "AWS ECS", "PostgreSQL", "Redis", "RabbitMQ", "GraphQL", "GitLab CI"],
    featured: true,
  },
  {
    slug: "holded-frontend-erp",
    company: "Holded",
    companyUrl: "https://www.holded.com",
    logoPath: "/images/companies/holded.svg",
    productImagePath: "/images/products/holded-1.webp",
    coverImagePath: "/images/case-studies/holded-cover.webp",
    screenshots: [
      { path: "/images/products/holded-1.webp", label: { es: "Dashboard ERP", en: "ERP Dashboard" } },
      { path: "/images/products/holded-2.png",  label: { es: "Facturación",   en: "Invoicing"     } },
      { path: "/images/products/holded-3.png",  label: { es: "Contabilidad",  en: "Accounting"    } },
    ],
    title: {
      es: "Frontend Moderno para ERP Cloud en Holded",
      en: "Modern Frontend for Cloud ERP at Holded",
    },
    subtitle: {
      es: "Cómo migré el dashboard de jQuery a React y escalé la plataforma a 10K+ PYMEs",
      en: "How I migrated the dashboard from jQuery to React and scaled the platform to 10K+ SMBs",
    },
    period: "Jul 2016 – Dec 2018",
    role: {
      es: "Ingeniero Frontend Junior",
      en: "Junior Frontend Engineer",
    },
    problem: {
      es: "El dashboard de Holded estaba construido con jQuery y templates Handlebars, lo que causaba tiempos de carga de 4+ segundos y una experiencia de usuario inconsistente que frenaba la adopción.",
      en: "Holded's dashboard was built with jQuery and Handlebars templates, causing 4+ second load times and an inconsistent user experience that was slowing adoption.",
    },
    approach: {
      es: "Migración incremental de módulos de jQuery a React con Redux, priorizando los módulos de mayor uso (facturación y contabilidad) para impacto inmediato en retención.",
      en: "Incremental migration of modules from jQuery to React with Redux, prioritizing highest-usage modules (invoicing and accounting) for immediate impact on retention.",
    },
    outcome: {
      es: "Reducción del 30% en tiempos de carga. Bundle reducido en 40KB. Engagement de usuarios mejorado un 25%. Base para escalar a 10K+ clientes.",
      en: "30% reduction in load times. Bundle reduced by 40KB. User engagement improved 25%. Foundation to scale to 10K+ customers.",
    },
    context: {
      es: "Holded es un ERP cloud para PYMEs que integra facturación, contabilidad, proyectos y CRM. Durante mi tiempo allí, la plataforma estaba en fase de crecimiento acelerado y el frontend legacy se había convertido en el principal cuello de botella para la adopción y retención de usuarios.",
      en: "Holded is a cloud ERP for SMBs integrating invoicing, accounting, projects, and CRM. During my time there, the platform was in rapid growth phase and the legacy frontend had become the main bottleneck for user adoption and retention.",
    },
    challenges: {
      es: [
        "Dashboard monolítico en jQuery con tiempos de carga de 4+ segundos",
        "Sin sistema de componentes — cada módulo replicaba lógica de UI",
        "4 idiomas europeos a soportar (ES, EN, FR, DE) sin i18n estructurado",
        "Migración sin interrumpir el servicio a clientes activos",
        "Equipo pequeño de 3 frontends para un producto con 20+ módulos",
      ],
      en: [
        "Monolithic jQuery dashboard with 4+ second load times",
        "No component system — each module replicated UI logic",
        "4 European languages to support (ES, EN, FR, DE) without structured i18n",
        "Migration without interrupting active customers",
        "Small team of 3 frontend engineers for a product with 20+ modules",
      ],
    },
    solution: {
      es: "Propuse e implementé una migración modular: cada página nueva se construía en React mientras las antiguas permanecían funcionales en jQuery. Construí un sistema de componentes compartidos con Storybook que aceleró el desarrollo de los módulos siguientes. Implementé react-i18next para gestionar las 4 lenguas de forma centralizada.",
      en: "I proposed and implemented a modular migration: each new page was built in React while old ones remained functional in jQuery. I built a shared component system with Storybook that accelerated development of subsequent modules. Implemented react-i18next to manage all 4 languages centrally.",
    },
    architecture: {
      es: "Stack frontend: React 16 con Redux para estado global, React Router para navegación SPA, Webpack para bundling optimizado, Storybook para documentación de componentes, Jest + Enzyme para testing, y react-i18next para internacionalización. Integración con APIs REST del backend Rails.",
      en: "Frontend stack: React 16 with Redux for global state, React Router for SPA navigation, Webpack for optimized bundling, Storybook for component documentation, Jest + Enzyme for testing, and react-i18next for internationalization. Integration with Rails backend REST APIs.",
    },
    results: {
      es: [
        "Reducción del 35% en tiempos de carga del dashboard principal",
        "Bundle reducido en 40KB tras migración y tree-shaking",
        "Sistema de componentes con 60+ componentes reutilizables en Storybook",
        "i18n implementado para 4 idiomas (ES, EN, FR, DE) sin overhead de mantenimiento",
        "Retención de usuarios mejorada un 20% (métrica de producto)",
        "Base técnica que permitió escalar a 10K+ clientes en los 12 meses siguientes",
      ],
      en: [
        "35% reduction in main dashboard load times",
        "Bundle reduced by 40KB after migration and tree-shaking",
        "Component system with 60+ reusable components in Storybook",
        "i18n implemented for 4 languages (ES, EN, FR, DE) without maintenance overhead",
        "User retention improved 20% (product metric)",
        "Technical foundation that enabled scaling to 10K+ customers in the following 12 months",
      ],
    },
    metrics: [
      { label: { es: "Reducción tiempo carga",   en: "Load time reduction" },  value: "30", unit: "%" },
      { label: { es: "Engagement usuarios +",    en: "User engagement +" },    value: "25", unit: "%" },
      { label: { es: "Reducción bundle",          en: "Bundle reduction" },     value: "40", unit: "KB" },
      { label: { es: "Entrega funcionalidades +", en: "Feature delivery +" },   value: "20", unit: "%" },
    ],
    tags: ["React", "Redux", "TypeScript", "JavaScript", "Storybook", "Jest", "Webpack", "CSS Modules", "i18n", "Ruby on Rails"],
    featured: true,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured);
}
