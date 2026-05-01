import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/RiskBadge";
import { students, talkRecords, attendanceRecords } from "@/data/mockData";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StudentProfileInsight from "@/components/student/StudentProfileInsight";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="text-center mt-20 text-muted-foreground">
        <p>未找到该学生</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/students")}>返回列表</Button>
      </div>
    );
  }

  const records = talkRecords.filter((r) => r.studentId === student.studentId);

  const infoCards = [
    { title: "基本信息", items: [["姓名", student.name], ["学号", student.studentId], ["班级", student.class], ["专业", student.major]] },
    { title: "家庭信息", items: [["家庭所在地", "江苏南京"], ["家庭类型", "双亲家庭"], ["是否独生", "否"], ["经济状况", "一般"]] },
    { title: "住宿信息", items: [["宿舍楼", "明故宫校区 6号楼"], ["房间号", "612"], ["床位", "上铺"], ["室友关系", "良好"]] },
    { title: "学业状态", items: [["GPA", student.gpa.toFixed(2)], ["必修绩点", student.requiredGpa.toFixed(2)], ["首选意向", student.intention], ["学业预警", student.gpa < 3.0 ? "是" : "否"]] },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Button variant="ghost" className="gap-1.5 -ml-2 text-muted-foreground" onClick={() => navigate("/students")}>
        <ArrowLeft className="h-4 w-4" /> 返回学生列表
      </Button>

      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">{student.name}</h1>
        {!student.profileComplete && (
          <Badge className="bg-risk-medium-bg text-risk-medium-text border-0 hover:bg-risk-medium-bg">档案待补全</Badge>
        )}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">档案概览</TabsTrigger>
          <TabsTrigger value="insight">学生画像</TabsTrigger>
        </TabsList>
        <TabsContent value="insight" className="mt-5">
          <StudentProfileInsight student={student} />
        </TabsContent>
        <TabsContent value="overview" className="mt-5 space-y-6">
          {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoCards.map((card) => (
          <Card key={card.title} className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {card.items.map(([label, value]) => (
                  <div key={label}>
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timeline */}
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">谈话记录时间轴</CardTitle>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <p className="text-muted-foreground text-sm">暂无谈话记录</p>
          ) : (
            <div className="relative pl-6 border-l-2 border-border space-y-6">
              {records.map((r) => (
                <div key={r.id} className="relative">
                  <div className="absolute -left-[calc(1.5rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{r.date}</span>
                    <RiskBadge level={r.riskLevel} />
                  </div>
                  <p className="text-xs text-muted-foreground">{r.attribution} · {r.location}</p>
                  <p className="text-sm mt-1 text-foreground/80 line-clamp-2">{r.summary}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance Panel */}
      <AttendancePanel studentId={student.studentId} />

      {/* Notes Section */}
      <StudentNotes studentId={student.studentId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AttendancePanel({ studentId }: { studentId: string }) {
  const [open, setOpen] = useState(false);
  const records = attendanceRecords.filter((r) => r.studentId === studentId);
  const absent = records.filter((r) => r.status === "旷课").length;
  const late = records.filter((r) => r.status === "迟到").length;
  const leaveEarly = records.filter((r) => r.status === "早退").length;

  return (
    <Card className="rounded-2xl">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full text-left">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">出勤情况</CardTitle>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span>累计旷课 <strong className="text-red-600">{absent}</strong> 次</span>
                <span>累计迟到 <strong className="text-amber-600">{late}</strong> 次</span>
                <span>累计早退 <strong className="text-orange-600">{leaveEarly}</strong> 次</span>
              </div>
            </CardHeader>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <CardContent className="pt-0">
            {records.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">暂无缺课记录，表现良好</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期</TableHead>
                    <TableHead>节次</TableHead>
                    <TableHead>课程</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>原因</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-xs">{r.date}</TableCell>
                      <TableCell className="text-xs">第 {r.period} 节</TableCell>
                      <TableCell className="text-xs">{r.course}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{r.status}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{r.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function StudentNotes({ studentId }: { studentId: string }) {
  const storageKey = `student_note_${studentId}`;
  const [note, setNote] = useState(() => localStorage.getItem(storageKey) || "");

  const handleSave = () => {
    localStorage.setItem(storageKey, note);
    toast({ title: "备注已保存", description: "临时备注已存储到浏览器本地。" });
  };

  return (
    <Card className="rounded-2xl border-dashed border-amber-300 bg-amber-50/40">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">📝 学生备注 (Temporary Notes)</CardTitle>
        <p className="text-xs text-muted-foreground">随手记录该生的临时信息，数据保存在浏览器本地</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          placeholder="在此输入对该学生的临时备注..."
          className="min-h-[120px] bg-white/60 border-amber-200 focus-visible:ring-amber-300"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleSave}>保存备注</Button>
        </div>
      </CardContent>
    </Card>
  );
}
