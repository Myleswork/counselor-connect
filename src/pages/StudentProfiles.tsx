import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { students, classes, majors } from "@/data/mockData";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentProfiles() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [majorFilter, setMajorFilter] = useState("all");
  const navigate = useNavigate();

  const filtered = students.filter((s) => {
    const matchSearch = !search || s.name.includes(search) || s.studentId.includes(search);
    const matchClass = classFilter === "all" || s.class === classFilter;
    const matchMajor = majorFilter === "all" || s.major === majorFilter;
    return matchSearch && matchClass && matchMajor;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold">学生档案</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
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

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s) => (
          <Card
            key={s.id}
            className="rounded-2xl cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
            onClick={() => navigate(`/students/${s.id}`)}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{s.name}</span>
                {!s.profileComplete && (
                  <Badge className="bg-risk-medium-bg text-risk-medium-text border-0 text-[10px] hover:bg-risk-medium-bg">待补全</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{s.studentId}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.class} · {s.major}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">GPA {s.gpa.toFixed(2)}</span>
                <span className="text-xs text-primary font-medium">{s.intention}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
