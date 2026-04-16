import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/RiskBadge";
import { students, talkRecords, classes, majors, type Student } from "@/data/mockData";
import { AlertTriangle, Search } from "lucide-react";

export default function StudentProfiles() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [majorFilter, setMajorFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(students[0]?.id ?? null);

  const incomplete = students.filter((s) => !s.profileComplete);
  const filtered = incomplete.filter((s) => {
    const matchSearch = !search || s.name.includes(search) || s.studentId.includes(search);
    const matchClass = classFilter === "all" || s.class === classFilter;
    const matchMajor = majorFilter === "all" || s.major === majorFilter;
    return matchSearch && matchClass && matchMajor;
  });

  const selected = students.find((s) => s.id === selectedId) ?? filtered[0];
  const records = selected ? talkRecords.filter((r) => r.studentId === selected.studentId) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-6 h-full">
      {/* Left - list */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索姓名或学号" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger><SelectValue placeholder="全部班级" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部班级</SelectItem>
              {classes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={majorFilter} onValueChange={setMajorFilter}>
            <SelectTrigger><SelectValue placeholder="全部专业" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部专业</SelectItem>
              {majors.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <AlertTriangle className="h-3 w-3 text-risk-medium-text" /> 当前仅显示待补全档案（共 {filtered.length} 人）
        </p>
        <div className="flex flex-col gap-2 overflow-auto">
          {filtered.map((s) => (
            <Card
              key={s.id}
              className={`cursor-pointer transition-colors rounded-xl ${selectedId === s.id ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
              onClick={() => setSelectedId(s.id)}
            >
              <CardContent className="p-3">
                <p className="font-medium text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.studentId} · {s.class} · {s.major}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right - detail */}
      <div className="flex flex-col gap-6">
        {selected ? (
          <>
            <StudentProfileCard student={selected} />
            <RecordHistoryList records={records} />
          </>
        ) : (
          <div className="text-muted-foreground text-center mt-20">请选择一名学生</div>
        )}
      </div>
    </div>
  );
}

function StudentProfileCard({ student }: { student: Student }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <CardTitle className="text-xl">{student.name}</CardTitle>
          {!student.profileComplete && (
            <Badge className="bg-risk-medium-bg text-risk-medium-text border-0 hover:bg-risk-medium-bg">档案待补全</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {[
            ["学号", student.studentId],
            ["班级", student.class],
            ["专业", student.major],
            ["GPA", student.gpa.toFixed(2)],
            ["必修绩点", student.requiredGpa.toFixed(2)],
            ["首选意向", student.intention],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-muted-foreground text-xs">{label}</p>
              <p className="font-medium">{value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecordHistoryList({ records }: { records: typeof talkRecords }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">历史谈话记录</CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <p className="text-muted-foreground text-sm">暂无记录</p>
        ) : (
          <div className="space-y-3">
            {records.map((r) => (
              <div key={r.id} className="flex items-center gap-3 text-sm py-2 border-b border-border last:border-0">
                <span className="text-muted-foreground w-24 shrink-0">{r.date}</span>
                <RiskBadge level={r.riskLevel} />
                <span className="truncate">{r.attribution}</span>
                <span className="text-muted-foreground ml-auto shrink-0">{r.location}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
