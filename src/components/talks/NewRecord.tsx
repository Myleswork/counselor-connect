import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/RiskBadge";
import { Label } from "@/components/ui/label";
import { students, talkRecords, attributions } from "@/data/mockData";
import { AlertTriangle, Upload, FileAudio } from "lucide-react";

function StudentPanel({ matched, records }: { matched: typeof students[0] | undefined; records: typeof talkRecords }) {
  if (!matched) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="py-12 text-center">
          <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">输入学号后加载学生档案</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{matched.name}</CardTitle>
            {!matched.profileComplete && (
              <Badge className="bg-risk-medium-bg text-risk-medium-text border-0 hover:bg-risk-medium-bg text-xs">档案待补全</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <p><span className="text-muted-foreground">学号：</span>{matched.studentId}</p>
          <p><span className="text-muted-foreground">班级：</span>{matched.class}</p>
          <p><span className="text-muted-foreground">专业：</span>{matched.major}</p>
          <p><span className="text-muted-foreground">GPA：</span>{matched.gpa}</p>
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader><CardTitle className="text-sm">历史记录</CardTitle></CardHeader>
        <CardContent>
          {records.length === 0 ? <p className="text-muted-foreground text-xs">暂无记录</p> : (
            <div className="space-y-2">
              {records.map((r) => (
                <div key={r.id} className="flex items-center gap-2 text-xs border-b border-border pb-2 last:border-0">
                  <span className="text-muted-foreground">{r.date}</span>
                  <RiskBadge level={r.riskLevel} />
                  <span className="truncate">{r.attribution}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default function NewRecord() {
  const [studentIdInput, setStudentIdInput] = useState("161520101");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const matched = students.find((s) => s.studentId === studentIdInput);
  const records = matched ? talkRecords.filter((r) => r.studentId === matched.studentId) : [];

  const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAudioFile(file);
  };

  return (
    <div className="space-y-6">
      {/* Desktop: grid layout; Mobile: stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left form */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">谈话记录表</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>学号</Label>
              <Input
                placeholder="请输入学号"
                value={studentIdInput}
                onChange={(e) => setStudentIdInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">仅允许为已存在学生档案新增记录</p>
            </div>

            {/* Mobile: show student panel right after student ID */}
            <div className="lg:hidden">
              <StudentPanel matched={matched} records={records} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>风险等级</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="选择风险等级" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">一级</SelectItem>
                    <SelectItem value="2">二级</SelectItem>
                    <SelectItem value="3">三级</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>谈话归因</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="选择归因" /></SelectTrigger>
                  <SelectContent>
                    {attributions.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Audio upload */}
            <div>
              <Label>录音附件</Label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleAudioSelect}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  上传录音附件
                </Button>
                {audioFile && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <FileAudio className="h-4 w-4 shrink-0" />
                    <span className="truncate max-w-[200px]">{audioFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            {["问题描述", "探索与澄清", "分析与评估", "讨论与方案", "学生反馈"].map((label) => (
              <div key={label}>
                <Label>{label}</Label>
                <Textarea placeholder={`请填写${label}...`} className="min-h-[80px]" />
              </div>
            ))}
            <Button
              disabled={!matched}
              className={!matched ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}
            >
              {matched ? "保存记录" : "未匹配学生档案，无法保存"}
            </Button>
          </CardContent>
        </Card>

        {/* Right panel - desktop only */}
        <div className="hidden lg:flex flex-col gap-4">
          <StudentPanel matched={matched} records={records} />
        </div>
      </div>
    </div>
  );
}
