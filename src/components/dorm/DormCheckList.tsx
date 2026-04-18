import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dormCheckRecords, dormStatusStats } from "@/data/mockData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  "优秀": "#10b981",
  "正常": "#3b82f6",
  "需要整改": "#ef4444",
};

const statusBadgeClass = (s: string) =>
  s === "优秀" ? "bg-emerald-50 text-emerald-700 border-emerald-200"
  : s === "正常" ? "bg-blue-50 text-blue-700 border-blue-200"
  : "bg-red-50 text-red-700 border-red-200";

export default function DormCheckList() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* 顶部状态分布 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-2xl md:col-span-1">
          <CardHeader className="pb-2"><CardTitle className="text-sm">状态分布</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={dormStatusStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                  {dormStatusStats.map((d) => <Cell key={d.name} fill={STATUS_COLORS[d.name]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl md:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-sm">本月查寝小结</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-3 gap-3">
            {dormStatusStats.map((s) => (
              <div key={s.name} className="text-center p-4 rounded-xl bg-muted/40">
                <p className="text-2xl font-bold" style={{ color: STATUS_COLORS[s.name] }}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.name}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 垂直时间轴 */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle className="text-base">查寝时间轴</CardTitle></CardHeader>
        <CardContent>
          <div className="relative pl-6 border-l-2 border-border space-y-6">
            {dormCheckRecords.map((r) => {
              const isExpanded = expanded.has(r.id);
              const truncated = r.note.length > 120 && !isExpanded;
              return (
                <div key={r.id} className="relative">
                  <div className="absolute -left-[calc(1.5rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-medium">{r.datetime}</span>
                    <Badge variant="outline" className={`text-xs ${statusBadgeClass(r.status)}`}>{r.status}</Badge>
                    <span className="text-xs text-muted-foreground">{r.area}</span>
                  </div>
                  <p className={`text-sm text-foreground/80 mt-1 whitespace-pre-line ${truncated ? "line-clamp-2" : ""}`}>
                    {r.note}
                  </p>
                  {r.note.length > 120 && (
                    <Button variant="link" size="sm" onClick={() => toggle(r.id)} className="h-auto p-0 mt-1 text-xs text-primary">
                      {isExpanded ? <>收起 <ChevronUp className="h-3 w-3 ml-0.5" /></> : <>展开全文 <ChevronDown className="h-3 w-3 ml-0.5" /></>}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
