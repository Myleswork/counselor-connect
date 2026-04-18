import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students, courses, teachers } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const periods = Array.from({ length: 10 }, (_, i) => i + 1);
const statuses = ["旷课", "迟到", "早退", "病事假"];

export default function NewAttendance() {
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [period, setPeriod] = useState("1");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");
  const [teacher, setTeacher] = useState("");
  const [reason, setReason] = useState("");

  const matched = students.find((s) => s.studentId === studentId);

  const handleSave = () => {
    if (!matched) return toast({ title: "学号未匹配", variant: "destructive" });
    if (!course || !status) return toast({ title: "请填写课程和出勤状态", variant: "destructive" });
    toast({ title: "保存成功", description: `已记录 ${matched.name} 的查课信息（演示模式）` });
    setReason("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      <Card className="rounded-2xl">
        <CardHeader><CardTitle className="text-base">查课记录表</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>学生学号</Label>
              <Input placeholder="请输入学号" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
              {matched && <p className="text-xs text-emerald-600 mt-1">✓ {matched.name} · {matched.class}</p>}
            </div>
            <div>
              <Label>日期</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>节次</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {periods.map((p) => <SelectItem key={p} value={String(p)}>第 {p} 节</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>课程名称</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger><SelectValue placeholder="选择课程" /></SelectTrigger>
                <SelectContent>
                  {courses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>出勤状态</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue placeholder="选择状态" /></SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>任课教师</Label>
              <Select value={teacher} onValueChange={setTeacher}>
                <SelectTrigger><SelectValue placeholder="选择教师" /></SelectTrigger>
                <SelectContent>
                  {teachers.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>缺课原因</Label>
            <Textarea placeholder="请描述缺课原因..." value={reason} onChange={(e) => setReason(e.target.value)} className="min-h-[100px]" />
          </div>

          <Button disabled={!matched} onClick={handleSave}>{matched ? "保存查课记录" : "请先输入有效学号"}</Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl h-fit">
        <CardHeader><CardTitle className="text-base">学生速览</CardTitle></CardHeader>
        <CardContent className="text-sm space-y-2">
          {matched ? (
            <>
              <p><span className="text-muted-foreground">姓名：</span>{matched.name}</p>
              <p><span className="text-muted-foreground">学号：</span>{matched.studentId}</p>
              <p><span className="text-muted-foreground">班级：</span>{matched.class}</p>
              <p><span className="text-muted-foreground">专业：</span>{matched.major}</p>
              <p><span className="text-muted-foreground">GPA：</span>{matched.gpa}</p>
            </>
          ) : (
            <p className="text-muted-foreground py-6 text-center">输入学号后加载学生信息</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
