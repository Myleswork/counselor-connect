import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/RiskBadge";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { students, talkRecords, attributions } from "@/data/mockData";
import { AlertTriangle, Upload, FileAudio, Sparkles, Copy, Loader2 } from "lucide-react";

const mockAiResult = `【问题描述】该生近期因保研名额竞争激烈，感到压力很大，出现失眠和焦虑情绪。

【探索与澄清】经深入了解，该生目前 GPA 排名班级前五，但对是否能获得保研名额缺乏信心，主要担忧来自同学间的竞争压力和家长的期望。

【分析与评估】该生学业基础扎实，焦虑主要源于对结果不确定性的恐惧。目前情绪尚在可控范围内，但需要持续关注。

【讨论与方案】建议该生：1）制定明确的阶段性学习计划；2）定期参加心理辅导；3）与导师保持沟通了解保研政策。

【学生反馈】该生表示认同建议，愿意尝试调整心态，并主动预约了下周的心理咨询。`;

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
  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const matched = students.find((s) => s.studentId === studentIdInput);
  const records = matched ? talkRecords.filter((r) => r.studentId === matched.studentId) : [];

  const handleAudioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAudioFile(file);
  };

  const handleAiExtract = () => {
    if (aiOpen) {
      setAiOpen(false);
      return;
    }
    setAiOpen(true);
    setAiLoading(true);
    setAiText("");
    // Simulate AI processing
    setTimeout(() => {
      setAiLoading(false);
      setAiText(mockAiResult);
    }, 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(aiText);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left form */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">谈话记录表</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>学号</Label>
              <Input placeholder="请输入学号" value={studentIdInput} onChange={(e) => setStudentIdInput(e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">仅允许为已存在学生档案新增记录</p>
            </div>

            {/* Mobile: show student panel */}
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

            {/* Audio upload + AI */}
            <div>
              <Label>录音附件</Label>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={handleAudioSelect} />
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />上传录音附件
                </Button>
                <Button type="button" variant="outline" size="sm" className="border-primary/40 text-primary" onClick={handleAiExtract}>
                  <Sparkles className="h-4 w-4 mr-2" />AI 语音智能提取 (讯飞模型)
                </Button>
                {audioFile && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <FileAudio className="h-4 w-4 shrink-0" />
                    <span className="truncate max-w-[200px]">{audioFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* AI Collapsible Panel */}
            <Collapsible open={aiOpen} onOpenChange={setAiOpen}>
              <CollapsibleContent className="transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                <Card className="rounded-xl border-primary/30 bg-primary/5">
                  <CardContent className="p-4 space-y-3">
                    {aiLoading ? (
                      <div className="flex items-center gap-2 text-sm text-primary py-6 justify-center">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>AI 正在分析录音内容...</span>
                      </div>
                    ) : (
                      <>
                        <Textarea
                          readOnly
                          value={aiText}
                          className="min-h-[200px] border-primary/20 bg-background text-sm"
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">请选择上方内容复制，并填入下方对应的谈心五部曲中</p>
                          <Button size="sm" variant="outline" onClick={handleCopyAll}>
                            <Copy className="h-3.5 w-3.5 mr-1.5" />一键复制全部
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {["问题描述", "探索与澄清", "分析与评估", "讨论与方案", "学生反馈"].map((label) => (
              <div key={label}>
                <Label>{label}</Label>
                <Textarea placeholder={`请填写${label}...`} className="min-h-[80px]" />
              </div>
            ))}
            <Button disabled={!matched} className={!matched ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}>
              {matched ? "保存记录" : "未匹配学生档案，无法保存"}
            </Button>
          </CardContent>
        </Card>

        {/* Right panel - desktop */}
        <div className="hidden lg:flex flex-col gap-4">
          <StudentPanel matched={matched} records={records} />
        </div>
      </div>
    </div>
  );
}
