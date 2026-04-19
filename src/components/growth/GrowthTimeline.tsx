import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Trophy, Users, Sparkles, Brain, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import {
  growthRecords,
  growthProjects,
  growthDomains,
  growthNatures,
  growthRadarData,
  students,
  type GrowthRecord,
  type GrowthDomain,
  type GrowthNature,
} from "@/data/mockData";

const NATURE_COLORS: Record<GrowthNature, string> = {
  特色工作: "bg-blue-50 text-blue-700 border-blue-200",
  个人荣誉: "bg-amber-50 text-amber-700 border-amber-200",
  学生荣誉: "bg-emerald-50 text-emerald-700 border-emerald-200",
  深度复盘: "bg-violet-50 text-violet-700 border-violet-200",
};

interface TimelineNode {
  type: "single" | "project";
  date: string; // sort key (latest)
  record?: GrowthRecord;
  project?: { id: string; name: string; status: "进行中" | "已结项"; records: GrowthRecord[] };
}

function studentNames(ids?: string[]) {
  if (!ids?.length) return null;
  return students.filter((s) => ids.includes(s.id)).map((s) => s.name).join("、");
}

function RecordCardBody({ r, compact = false }: { r: GrowthRecord; compact?: boolean }) {
  const names = studentNames(r.relatedStudents);
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
            {r.domain}
          </Badge>
          <Badge variant="outline" className={cn("text-[10px] border", NATURE_COLORS[r.nature])}>
            {r.nature}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">{r.date}</span>
      </div>
      <h4 className={cn("font-semibold text-foreground", compact ? "text-sm" : "text-base")}>{r.title}</h4>
      <p className={cn("text-muted-foreground line-clamp-3", compact ? "text-xs" : "text-sm")}>{r.description}</p>
      {(names || r.attachments?.length) && (
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-1">
          {names && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" /> {names}
            </span>
          )}
          {r.attachments?.map((a) => (
            <span key={a} className="inline-flex items-center gap-1">
              <Paperclip className="h-3 w-3" /> {a}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GrowthTimeline() {
  const [domainFilter, setDomainFilter] = useState<GrowthDomain | "all">("all");
  const [natureFilter, setNatureFilter] = useState<GrowthNature | "all">("all");

  // 统计数据
  const stats = useMemo(() => {
    const personalAwards = growthRecords.filter((r) => r.nature === "个人荣誉").length;
    const studentAwards = growthRecords.filter((r) => r.nature === "学生荣誉").length;
    const featured = new Set(growthRecords.filter((r) => r.nature === "特色工作").map((r) => r.projectId || r.id)).size;
    const reflections = growthRecords.filter((r) => r.nature === "深度复盘").length;
    return { personalAwards, studentAwards, featured, reflections };
  }, []);

  // 过滤后构建时间轴节点
  const nodes = useMemo<TimelineNode[]>(() => {
    const filtered = growthRecords.filter((r) => {
      const d = domainFilter === "all" || r.domain === domainFilter;
      const n = natureFilter === "all" || r.nature === natureFilter;
      return d && n;
    });

    const projectMap = new Map<string, GrowthRecord[]>();
    const singles: GrowthRecord[] = [];
    for (const r of filtered) {
      if (r.projectId) {
        const arr = projectMap.get(r.projectId) ?? [];
        arr.push(r);
        projectMap.set(r.projectId, arr);
      } else {
        singles.push(r);
      }
    }

    const result: TimelineNode[] = [];
    for (const [pid, recs] of projectMap.entries()) {
      const proj = growthProjects.find((p) => p.id === pid);
      if (!proj) continue;
      const sorted = [...recs].sort((a, b) => a.date.localeCompare(b.date));
      result.push({
        type: "project",
        date: sorted[sorted.length - 1].date,
        project: { id: proj.id, name: proj.name, status: proj.status, records: sorted },
      });
    }
    for (const r of singles) {
      result.push({ type: "single", date: r.date, record: r });
    }
    return result.sort((a, b) => b.date.localeCompare(a.date));
  }, [domainFilter, natureFilter]);

  return (
    <div className="space-y-6">
      {/* 顶部数据看板 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 雷达图 */}
        <Card className="rounded-2xl lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">九大职能发力分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={growthRadarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="domain" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis tick={{ fontSize: 10 }} />
                <Radar
                  name="记录数"
                  dataKey="count"
                  stroke="hsl(214, 100%, 30%)"
                  fill="hsl(214, 100%, 30%)"
                  fillOpacity={0.45}
                />
                <Tooltip
                  formatter={(v: number) => [`${v} 条`, "记录数"]}
                  labelFormatter={(_, payload) => (payload?.[0] as any)?.payload?.fullDomain ?? ""}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 四个数据卡片 */}
        <div className="grid grid-cols-2 gap-4 content-start">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Trophy className="h-3.5 w-3.5" /> 累计荣获奖项
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.personalAwards}</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Users className="h-3.5 w-3.5" /> 指导学生获奖
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.studentAwards}</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Sparkles className="h-3.5 w-3.5" /> 主导特色项目
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.featured}</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Brain className="h-3.5 w-3.5" /> 记录复盘思考
              </div>
              <p className="text-2xl font-bold text-foreground">{stats.reflections}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 过滤器 */}
      <Card className="rounded-2xl">
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-2">按职能筛选</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={domainFilter === "all"} onClick={() => setDomainFilter("all")}>
                全部
              </FilterChip>
              {growthDomains.map((d) => (
                <FilterChip key={d} active={domainFilter === d} onClick={() => setDomainFilter(d)}>
                  {d}
                </FilterChip>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">按性质筛选</p>
            <div className="flex flex-wrap gap-2">
              <FilterChip active={natureFilter === "all"} onClick={() => setNatureFilter("all")}>
                全部
              </FilterChip>
              {growthNatures.map((n) => (
                <FilterChip key={n} active={natureFilter === n} onClick={() => setNatureFilter(n)}>
                  {n}
                </FilterChip>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 时间轴 */}
      <div className="relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
        <div className="space-y-5">
          {nodes.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">暂无符合条件的记录</p>
          )}
          {nodes.map((node, idx) => (
            <div key={idx} className="relative">
              <span
                className={cn(
                  "absolute -left-[18px] top-4 h-3 w-3 rounded-full ring-4 ring-background",
                  node.type === "project" ? "bg-primary" : "bg-primary/60",
                )}
              />
              {node.type === "single" && node.record ? (
                <Card className="rounded-2xl">
                  <CardContent className="p-5">
                    <RecordCardBody r={node.record} />
                  </CardContent>
                </Card>
              ) : node.project ? (
                <ProjectCard project={node.project} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-xs border transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-muted-foreground border-border hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}

function ProjectCard({ project }: { project: { id: string; name: string; status: "进行中" | "已结项"; records: GrowthRecord[] } }) {
  const [open, setOpen] = useState(false);
  const latest = project.records[project.records.length - 1];
  return (
    <Card className="rounded-2xl border-primary/30 bg-gradient-to-br from-primary/[0.03] to-transparent">
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground">{project.name}</h3>
            <Badge
              className={cn(
                "text-[10px] border-0",
                project.status === "进行中"
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-100",
              )}
            >
              {project.status}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">最近更新 {latest.date}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          共 {project.records.length} 个阶段记录 · 最新阶段：{latest.title}
        </p>

        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
              />
              {open ? "收起" : `展开 ${project.records.length} 个阶段记录`}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            {/* 嵌套子时间轴 */}
            <div className="relative pl-5 mt-4">
              <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border/50" />
              <div className="space-y-3">
                {project.records.map((r) => (
                  <div key={r.id} className="relative">
                    <span className="absolute -left-[14px] top-3 h-2 w-2 rounded-full bg-primary/40 ring-2 ring-background" />
                    <div className="rounded-xl bg-background border border-border/60 p-4">
                      <RecordCardBody r={r} compact />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
