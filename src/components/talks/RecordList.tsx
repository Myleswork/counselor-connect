import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/RiskBadge";
import { talkRecords, attributionStats, riskStats, classes, majors } from "@/data/mockData";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Search, Eye, UserRound, Trash2 } from "lucide-react";

const PIE_COLORS = ["#004098", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe", "#eff6ff"];

export default function RecordList() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [majorFilter, setMajorFilter] = useState("all");

  const filtered = talkRecords.filter((r) => {
    const s = !search || r.studentName.includes(search) || r.studentId.includes(search);
    const c = classFilter === "all" || r.class === classFilter;
    const m = majorFilter === "all" || r.major === majorFilter;
    return s && c && m;
  });

  const thisMonth = talkRecords.filter((r) => r.date.startsWith("2025-04")).length;
  const keyStudents = [...new Set(talkRecords.filter((r) => r.riskLevel <= 2).map((r) => r.studentName))];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索姓名或学号" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="全部班级" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部班级</SelectItem>
            {classes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={majorFilter} onValueChange={setMajorFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="全部专业" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部专业</SelectItem>
            {majors.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-sm">本月谈心谈话次数</p>
            <p className="text-3xl font-bold text-foreground mt-1">{thisMonth}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <p className="text-muted-foreground text-sm">重点关注学生</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {keyStudents.map((n) => (
                <Badge key={n} variant="secondary" className="text-xs">{n}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-2xl">
          <CardHeader><CardTitle className="text-sm">归因统计</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={attributionStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                  {attributionStats.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader><CardTitle className="text-sm">风险分布</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={riskStats}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(214, 100%, 30%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Record cards */}
      <div className="space-y-4">
        {filtered.map((r) => (
          <Card key={r.id} className="rounded-2xl">
            <CardContent className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{r.studentName}</span>
                  {!r.profileComplete && (
                    <Badge className="bg-risk-medium-bg text-risk-medium-text border-0 hover:bg-risk-medium-bg text-xs">档案待补全</Badge>
                  )}
                  <RiskBadge level={r.riskLevel} />
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{r.studentId} · {r.major} · {r.attribution}</p>
              <p className="text-sm text-foreground line-clamp-3">{r.summary}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="text-xs"><Eye className="h-3 w-3 mr-1" />查看详情</Button>
                <Button size="sm" variant="outline" className="text-xs"><UserRound className="h-3 w-3 mr-1" />查看档案</Button>
                <Button size="sm" variant="outline" className="text-xs text-destructive hover:text-destructive"><Trash2 className="h-3 w-3 mr-1" />删除记录</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
