export interface ExperienceEntry {
  id: string;
  company: string;
  companyUrl: string;
  logoPath: string;
  role: { es: string; en: string };
  startDate: string;
  endDate: string | null;
  location: { es: string; en: string };
  commitHash: string;
  achievements: {
    es: string[];
    en: string[];
  };
  tags: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "holded",
    company: "Holded",
    companyUrl: "https://www.holded.com",
    logoPath: "/images/companies/holded.svg",
    role: {
      es: "Ingeniero Frontend Junior",
      en: "Junior Frontend Engineer",
    },
    startDate: "Jul 2016",
    endDate: "Dec 2018",
    location: { es: "Barcelona, España (remoto)", en: "Barcelona, Spain (remote)" },
    commitHash: "a3f8c12",
    achievements: {
      es: [
        "Desarrollé módulos de UI para el dashboard de contabilidad, mejorando el tiempo de carga en un 35%",
        "Migré componentes legacy de jQuery a React, reduciendo el bundle en 40KB",
        "Implementé internacionalización (i18n) para 4 idiomas europeos, ampliando el mercado potencial",
        "Colaboré con diseño para construir un sistema de componentes reutilizable con Storybook",
      ],
      en: [
        "Developed UI modules for the accounting dashboard, improving load time by 35%",
        "Migrated legacy jQuery components to React, reducing bundle size by 40KB",
        "Implemented internationalization (i18n) for 4 European languages, expanding potential market",
        "Collaborated with design to build a reusable component system with Storybook",
      ],
    },
    tags: ["React", "TypeScript", "JavaScript", "Redux", "Storybook", "Jest", "CSS Modules"],
  },
  {
    id: "factorial",
    company: "Factorial",
    companyUrl: "https://factorialhr.com",
    logoPath: "/images/companies/factorial.svg",
    role: {
      es: "Ingeniero Full Stack Mid-Level",
      en: "Mid-Level Full Stack Engineer",
    },
    startDate: "Jan 2019",
    endDate: "Mar 2021",
    location: { es: "Barcelona, España (híbrido)", en: "Barcelona, Spain (hybrid)" },
    commitHash: "b7d2e45",
    achievements: {
      es: [
        "Lideré la migración de una arquitectura monolítica de Rails a microservicios en Node.js, sirviendo a 50K+ usuarios",
        "Diseñé y construí el servicio de cálculo de nóminas que procesa €10M+ mensuales",
        "Reduje los tiempos de respuesta de la API en un 60% mediante Redis caching y optimización de consultas PostgreSQL",
        "Mentoreé a 3 ingenieros junior, estableciendo prácticas de code review y estándares de calidad",
      ],
      en: [
        "Led migration from Rails monolith to Node.js microservices, serving 50K+ users",
        "Designed and built the payroll calculation service processing €10M+ monthly",
        "Reduced API response times by 60% through Redis caching and PostgreSQL query optimization",
        "Mentored 3 junior engineers, establishing code review practices and quality standards",
      ],
    },
    tags: ["Node.js", "Ruby on Rails", "React", "PostgreSQL", "Redis", "Docker", "GraphQL", "AWS"],
  },
  {
    id: "retool",
    company: "Retool",
    companyUrl: "https://retool.com",
    logoPath: "/images/companies/retool.svg",
    role: {
      es: "Ingeniero Backend Senior",
      en: "Senior Backend Engineer",
    },
    startDate: "Apr 2021",
    endDate: "Jul 2024",
    location: { es: "San Francisco, EE.UU. (remoto)", en: "San Francisco, USA (remote)" },
    commitHash: "c9a1f78",
    achievements: {
      es: [
        "Arquitecté el sistema de ejecución de queries que procesa 100K+ operaciones diarias con 99.99% de uptime",
        "Lideré la migración a arquitectura event-driven con Kafka, reduciendo la latencia en un 70%",
        "Construí el pipeline de sincronización en tiempo real para 500+ integraciones de bases de datos",
        "Diseñé el sistema de RBAC multi-tenant que escala a miles de organizaciones concurrentes",
        "Participé en el diseño de la infraestructura en Kubernetes (EKS) para el sistema de sandboxing de código",
      ],
      en: [
        "Architected the query execution system processing 100K+ daily operations with 99.99% uptime",
        "Led migration to event-driven architecture with Kafka, reducing latency by 70%",
        "Built real-time sync pipeline for 500+ database integrations",
        "Designed multi-tenant RBAC system scaling to thousands of concurrent organizations",
        "Participated in Kubernetes (EKS) infrastructure design for the code sandboxing system",
      ],
    },
    tags: ["Node.js", "Go", "Kafka", "PostgreSQL", "Redis", "Kubernetes", "AWS EKS", "Terraform", "TypeScript"],
  },
  {
    id: "kueski",
    company: "Kueski",
    companyUrl: "https://kueski.com",
    logoPath: "/images/companies/kueski.svg",
    role: {
      es: "Lead Software Engineer (Backend & AI Systems)",
      en: "Lead Software Engineer (Backend & AI Systems)",
    },
    startDate: "Aug 2024",
    endDate: null,
    location: { es: "Ciudad de México, México (remoto)", en: "Mexico City, Mexico (remote)" },
    commitHash: "d4b5e90",
    achievements: {
      es: [
        "Lidero el equipo de 8 ingenieros responsable de los sistemas de scoring crediticio impulsados por IA que sirven a 200K+ usuarios",
        "Diseñé la arquitectura de RAG pipelines para automatizar el análisis de riesgo financiero, reduciendo el tiempo de decisión de crédito en un 80%",
        "Implementé integración con OpenAI y modelos propios de ML en producción con SLA de 99.9%",
        "Establecí las prácticas de MLOps para el ciclo de vida de modelos de IA en sistemas financieros regulados",
        "Reduje costos de infraestructura cloud en 35% mediante optimización de GKE y migración a Cloud Run",
      ],
      en: [
        "Lead team of 8 engineers responsible for AI-powered credit scoring systems serving 200K+ users",
        "Designed RAG pipeline architecture to automate financial risk analysis, reducing credit decision time by 80%",
        "Implemented OpenAI and proprietary ML model integration in production with 99.9% SLA",
        "Established MLOps practices for AI model lifecycle in regulated financial systems",
        "Reduced cloud infrastructure costs by 35% through GKE optimization and Cloud Run migration",
      ],
    },
    tags: ["Python", "Go", "GCP", "Kubernetes", "OpenAI", "LangChain", "PostgreSQL", "Pub/Sub", "Terraform", "MLOps"],
  },
];
