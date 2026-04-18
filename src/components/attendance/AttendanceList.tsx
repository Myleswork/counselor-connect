import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { attendanceRecords, courseAttendanceStats, attendanceTrend, classes } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { Search, AlertCircle } from "lucide-react";

const statusColor = (s: string) =>
  s === "旷课" ? "bg-red-50 text-red-700 border-red-200"
  : s === "迟到" ? "bg-amber-50 text-amber-700 border-amber-200"
  : s === "早退" ? "bg-orange-50 text-orange-700 border-orange-200"
  : "bg-blue-50 text-blue-700 border-blue-200";

export default function AttendanceList() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => attendanceRecords.filter((r) => {
    const s = !search || r.studentName.includes(search) || r.studentId.includes(search) || r.course.includes(search);
    const c = classFilter === "all" || r.class === classFilter;
    const st = statusFilter === "all" || r.status === statusFilter;
    return s && c && st;
  }), [search, classFilter, statusFilter]);

  // 重点关注学生
  const studentRanking = useMemo(() => {
    const map = new Map<string, { name: string; count: number }>();
    attendanceRecords.forEach((r) => {
      const cur = map.get(r.studentId) ?? { name: r.studentName, count: 0 };
      cur.count++;
      map.set(r.studentId, cur);
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count).slice(0, 5);
  }, []);

  return (
    <div className="space-y-6">
      {/* 顶部排行 + 趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="rounded-2xl">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-1.5"><AlertCircle className="h-4 w-4 text-red-500" />重点关注学生</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {studentRanking.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                <Badge variant="secondary">{s.count} 次</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2"><CardTitle className="text-sm">重点关注课程</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={courseAttendanceStats} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" fontSize={11} />
                <YAxis dataKey="course" type="category" fontSize={11} width={90} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(214, 100%, 30%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-2"><CardTitle className="text-sm">近 7 日缺课趋势</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="hsl(214, 100%, 30%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 检索栏 */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索学生或课程" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="全部班级" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部班级</SelectItem>
            {classes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="全部状态" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="旷课">旷课</SelectItem>
            <SelectItem value="迟到">迟到</SelectItem>
            <SelectItem value="早退">早退</SelectItem>
            <SelectItem value="病事假">病事假</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 列表 */}
      <div className="space-y-3">
        {filtered.map((r) => (
          <Card key={r.id} className="rounded-2xl">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{r.studentName}</span>
                  <span className="text-xs text-muted-foreground">{r.studentId} · {r.class}</span>
                  <Badge variant="outline" className={`text-xs ${statusColor(r.status)}`}>{r.status}</Badge>
                </div>
                <span className="text-xs text-muted-foreground">{r.date} · 第 {r.period} 节</span>
              </div>
              <p className="text-sm mt-2"><span className="text-muted-foreground">课程：</span>{r.course} · {r.teacher}</p>
              <p className="text-sm text-muted-foreground mt-1">原因：{r.reason}</p>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">暂无符合条件的记录</p>}
      </div>
    </div>
  );
}
