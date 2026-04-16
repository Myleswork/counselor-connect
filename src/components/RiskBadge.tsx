import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  level: 1 | 2 | 3;
  className?: string;
}

const config = {
  1: { label: "一级", className: "bg-risk-high-bg text-risk-high-text hover:bg-risk-high-bg" },
  2: { label: "二级", className: "bg-risk-medium-bg text-risk-medium-text hover:bg-risk-medium-bg" },
  3: { label: "三级", className: "bg-risk-low-bg text-risk-low-text hover:bg-risk-low-bg" },
};

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const c = config[level];
  return <Badge className={cn(c.className, "font-medium border-0", className)}>{c.label}</Badge>;
}
