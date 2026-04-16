export interface Service {
  id: string;
  /** Terminal filename shown in the card header */
  filename: string;
  /** Lucide icon name */
  icon: string;
  /** Background code snippet at 10% opacity (decorative) */
  bgSnippet: string;
}

export const services: Service[] = [
  {
    id: "fullStack",
    filename: "full_stack.dev",
    icon: "Code2",
    bgSnippet: `const app = express();\napp.use(cors());\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'ok' });\n});`,
  },
  {
    id: "cloudArchitect",
    filename: "cloud_architect.ts",
    icon: "Cloud",
    bgSnippet: `resource "aws_eks_cluster" "main" {\n  name     = var.cluster_name\n  role_arn = aws_iam_role.eks.arn\n  version  = "1.28"\n}`,
  },
  {
    id: "devops",
    filename: "devops_pipelines.yaml",
    icon: "GitBranch",
    bgSnippet: `name: Deploy\non: push:\n  branches: [main]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4`,
  },
  {
    id: "ai",
    filename: "ai_integration.py",
    icon: "Brain",
    bgSnippet: `from langchain.chains import RetrievalQA\nfrom langchain.vectorstores import Chroma\n\nqa_chain = RetrievalQA.from_chain_type(\n  llm=ChatOpenAI(model="gpt-4o"),\n)`,
  },
  {
    id: "distributed",
    filename: "distributed_systems.go",
    icon: "Network",
    bgSnippet: `func (s *Service) ProcessEvent(\n  ctx context.Context,\n  msg *pubsub.Message,\n) error {\n  defer msg.Ack()\n  return s.handler.Handle(ctx, msg)\n}`,
  },
  {
    id: "leadership",
    filename: "tech_leadership.md",
    icon: "Users",
    bgSnippet: `# Architecture Decision Record\n## Status: Accepted\n## Context\nThe team needs a consistent\napproach to API design...\n## Decision\nWe will use REST + OpenAPI 3.0`,
  },
];
