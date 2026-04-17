export interface TechItem {
  name: string;
}

export interface TechCategory {
  id: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    id: "frontend",
    items: [
      { name: "React.js" },
      { name: "Angular" },
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "backend",
    items: [
      { name: "Node.js" },
      { name: "Python" },
      { name: "Java" },
      { name: "REST APIs" },
      { name: "GraphQL" },
      { name: "Microservices" },
    ],
  },
  {
    id: "cloud",
    items: [
      { name: "AWS EC2" },
      { name: "AWS EKS" },
      { name: "AWS Lambda" },
      { name: "AWS RDS" },
      { name: "AWS S3" },
      { name: "AWS CloudFront" },
      { name: "AWS CloudWatch" },
      { name: "GCP GKE" },
      { name: "GCP Cloud Run" },
      { name: "GCP Pub/Sub" },
      { name: "Azure AKS" },
      { name: "Azure Functions" },
    ],
  },
  {
    id: "devops",
    items: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "Helm" },
      { name: "Terraform" },
      { name: "AWS CDK" },
    ],
  },
  {
    id: "cicd",
    items: [
      { name: "GitHub Actions" },
      { name: "GitLab CI" },
      { name: "Jenkins" },
      { name: "Argo CD" },
    ],
  },
  {
    id: "observability",
    items: [
      { name: "Prometheus" },
      { name: "Grafana" },
      { name: "ELK Stack" },
      { name: "OpenSearch" },
      { name: "Datadog" },
    ],
  },
  {
    id: "ai",
    items: [
      { name: "OpenAI API" },
      { name: "RAG Pipelines" },
      { name: "Vector DBs" },
      { name: "LangChain" },
      { name: "LLMs" },
    ],
  },
  {
    id: "testing",
    items: [
      { name: "Jest" },
      { name: "Cypress" },
      { name: "Mocha" },
      { name: "Chai" },
      { name: "Postman" },
      { name: "Git" },
    ],
  },
];
