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
        "Desarrollé componentes de UI responsivos con React y Angular, mejorando el engagement de usuarios un 25% en los dashboards principales",
        "Colaboré con equipos de diseño y backend para implementar funcionalidades REST en los módulos de contabilidad y facturación",
        "Reduje el tiempo de carga de páginas un 30% mediante code splitting y optimizaciones de rendimiento frontend",
        "Mantuve librerías de componentes reutilizables, acelerando la entrega de funcionalidades un 20%",
        "Participé en sprints Agile, contribuyendo a la entrega puntual consistente de releases de producto",
      ],
      en: [
        "Developed responsive UI components using React and Angular, improving user engagement by 25% across core dashboards",
        "Collaborated with design and backend teams to implement REST-driven features for accounting and invoicing modules",
        "Reduced page load time by 30% through code splitting and frontend performance optimizations",
        "Maintained reusable component libraries, accelerating feature delivery by 20%",
        "Participated in Agile sprints, contributing to consistent on-time delivery of product releases",
      ],
    },
    tags: ["React", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3", "REST APIs", "Agile"],
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
    location: { es: "Barcelona, España (remoto)", en: "Barcelona, Spain (remote)" },
    commitHash: "b7d2e45",
    achievements: {
      es: [
        "Construí funcionalidades full-stack escalables con Node.js y React, apoyando el crecimiento de la plataforma HR SaaS a 50K+ usuarios",
        "Diseñé e implementé APIs RESTful, reduciendo la latencia de respuesta del backend un 35%",
        "Integré servicios de terceros (nóminas, analítica), mejorando la eficiencia operativa para clientes enterprise",
        "Lideré la migración de módulos monolíticos a microservicios, mejorando la fiabilidad del sistema y la velocidad de despliegue",
        "Implementé pipelines de CI automatizados, reduciendo errores de despliegue un 40%",
      ],
      en: [
        "Built scalable full-stack features using Node.js and React, supporting HR SaaS platform growth to 50K+ users",
        "Designed and implemented RESTful APIs, reducing backend response latency by 35%",
        "Integrated third-party services (payroll, analytics), improving operational efficiency for enterprise clients",
        "Led migration of monolithic modules to microservices, improving system reliability and deployment speed",
        "Implemented automated CI pipelines, reducing deployment errors by 40%",
      ],
    },
    tags: ["Node.js", "React", "TypeScript", "PostgreSQL", "REST APIs", "Microservices", "Docker", "CI/CD"],
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
        "Arquitecté y mantuve sistemas backend distribuidos para flujos de trabajo de herramientas internas de alto volumen (100K+ operaciones diarias)",
        "Diseñé microservicios escalables con Node.js y Java, mejorando el throughput del sistema un 45%",
        "Lideré la adopción de Kubernetes (EKS/GKE), reduciendo costos de infraestructura un 25% y mejorando la frecuencia de despliegues",
        "Implementé arquitectura event-driven con Pub/Sub y colas de mensajes, mejorando la resiliencia del sistema",
        "Construí pipelines de observabilidad con Prometheus y Grafana, reduciendo el tiempo de respuesta a incidentes un 50%",
        "Mentoricé ingenieros junior y lideré iniciativas de backend en equipos multifuncionales",
      ],
      en: [
        "Architected and maintained distributed backend systems handling high-volume internal tool workflows (100K+ daily operations)",
        "Designed scalable microservices using Node.js and Java, improving system throughput by 45%",
        "Led Kubernetes (EKS/GKE) adoption, reducing infrastructure costs by 25% and improving deployment frequency",
        "Implemented event-driven architecture using Pub/Sub and message queues, enhancing system resilience",
        "Built observability pipelines with Prometheus and Grafana, reducing incident response time by 50%",
        "Mentored junior engineers and led backend initiatives across cross-functional teams",
      ],
    },
    tags: ["Node.js", "Java", "Kubernetes", "AWS EKS", "GCP GKE", "Pub/Sub", "Prometheus", "Grafana", "Terraform"],
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
        "Diseñé y desplegué sistemas backend escalables para productos fintech que sirven a 200K+ usuarios en LATAM",
        "Integré funcionalidades potenciadas por LLMs con OpenAI APIs, habilitando soporte automatizado al cliente y copilotos internos",
        "Construí pipelines RAG con bases de datos vectoriales para mejorar la precisión de recuperación de datos financieros un 40%",
        "Lideré el desarrollo de herramientas de análisis de riesgo impulsadas por IA, mejorando la velocidad de toma de decisiones un 30%",
        "Arquitecté infraestructura cloud-native (AWS + Kubernetes), mejorando el uptime del sistema al 99.9%",
        "Establecí pipelines de CI/CD e IaC (Terraform, Argo CD), reduciendo los ciclos de release de días a horas",
      ],
      en: [
        "Designed and deployed scalable backend systems for fintech products serving 200K+ users across LATAM",
        "Integrated LLM-powered features using OpenAI APIs, enabling automated customer support and internal copilots",
        "Built RAG pipelines with vector databases to enhance financial data retrieval accuracy by 40%",
        "Led development of AI-driven risk analysis tools, improving decision-making speed by 30%",
        "Architected cloud-native infrastructure (AWS + Kubernetes), improving system uptime to 99.9%",
        "Established CI/CD and IaC pipelines (Terraform, Argo CD), reducing release cycles from days to hours",
      ],
    },
    tags: ["Python", "Node.js", "AWS", "Kubernetes", "OpenAI", "RAG", "Vector DBs", "Terraform", "Argo CD", "LLMs"],
  },
];
