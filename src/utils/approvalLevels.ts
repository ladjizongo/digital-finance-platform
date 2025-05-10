
export interface ApprovalLevel {
  id: string;
  level: number;
  name: string;
  minAmount: number;
  maxAmount: number | null;
  requiredApprovers: number;
  description: string;
}

export const approvalLevels: ApprovalLevel[] = [
  {
    id: "level1",
    level: 1,
    name: "Standard",
    minAmount: 0,
    maxAmount: 999.99,
    requiredApprovers: 0,
    description: "No approval required for amounts under $1,000"
  },
  {
    id: "level2",
    level: 2,
    name: "Manager",
    minAmount: 1000,
    maxAmount: 9999.99,
    requiredApprovers: 1,
    description: "Requires 1 manager approval for amounts $1,000-$9,999.99"
  },
  {
    id: "level3",
    level: 3,
    name: "Director",
    minAmount: 10000,
    maxAmount: 99999.99,
    requiredApprovers: 2,
    description: "Requires 2 approvals (manager + director) for amounts $10,000-$99,999.99"
  },
  {
    id: "level4",
    level: 4,
    name: "Executive",
    minAmount: 100000,
    maxAmount: null,
    requiredApprovers: 3,
    description: "Requires 3 approvals (manager + director + executive) for amounts $100,000+"
  }
];

export function getApprovalLevel(amount: number): ApprovalLevel {
  return approvalLevels.find(
    level => amount >= level.minAmount && (level.maxAmount === null || amount <= level.maxAmount)
  ) || approvalLevels[0];
}
