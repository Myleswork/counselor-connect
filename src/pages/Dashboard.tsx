import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquareText, AlertTriangle, FileWarning, ClipboardList, BedDouble } from "lucide-react";
import { students, talkRecords, attendanceRecords, dormCheckRecords } from "@/data/mockData";

const now = new Date();
const hour = now.getHours();
const greeting = hour < 12 ? "早上好" : hour < 18 ? "下午好" : "晚上好";
const dateStr = now.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric", weekday: "long" });

const totalStudents = students.length;
const thisMonthTalks = talkRecords.filter((r) => {
  const d = new Date(r.date);
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}).length;
const highRisk = talkRecords.filter((r) => r.riskLevel === 1).length;
const incomplete = students.filter((s) => s.sourceTag === "migration_backfill").length;

const thisMonthAttendance = attendanceRecords.filter((r) => r.date.startsWith("2025-04")).length;
const thisMonthAbsent = attendanceRecords.filter((r) => r.date.startsWith("2025-04") && r.status === "旷课").length;

const thisMonthDormChecks = dormCheckRecords.filter((r) => r.datetime.startsWith("2025-04")).length;
const lastDormDate = dormCheckRecords[0]?.datetime?.split(" ")[0] ?? "—";

const metrics = [
  { label: "带管学生总数", value: totalStudents, sub: "本学期", icon: Users, color: "text-primary" },
  { label: "本月谈心人次", value: thisMonthTalks, sub: "持续跟进中", icon: MessageSquareText, color: "text-emerald-600" },
  { label: "高危预警学生", value: highRisk, sub: "风险等级一级", icon: AlertTriangle, color: "text-red-600" },
  { label: "待补全档案数", value: incomplete, sub: "migration_backfill", icon: FileWarning, color: "text-amber-600" },
  { label: "本月查课次数", value: thisMonthAttendance, sub: `累计发现缺课 ${thisMonthAbsent} 人次`, icon: ClipboardList, color: "text-indigo-600" },
  { label: "本月查寝次数", value: thisMonthDormChecks, sub: `最近：${lastDormDate}`, icon: BedDouble, color: "text-cyan-600" },
];

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="rounded-2xl border-0 bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground overflow-hidden">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold">{greeting}，陈老师 👋</h1>
          <p className="mt-1 opacity-90">今天也是充满活力的一天！</p>
          <div className="mt-3 flex items-center gap-4 text-sm opacity-80">
            <span>{dateStr}</span>
            <span>·</span>
            <span>南京 · 多云 22°C</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} className="rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground font-medium">{m.label}</span>
                <m.icon className={`h-4 w-4 ${m.color}`} />
              </div>
              <p className="text-3xl font-bold">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
