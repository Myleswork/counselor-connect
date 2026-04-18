import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { dormAreas } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const statusOptions = [
  { value: "优秀", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "正常", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "需要整改", color: "bg-red-50 text-red-700 border-red-200" },
];

export default function NewDormCheck() {
  const [datetime, setDatetime] = useState(new Date().toISOString().slice(0, 16));
  const [area, setArea] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!area || !status) return toast({ title: "请选择检查区域和总体评价", variant: "destructive" });
    if (!note.trim()) return toast({ title: "请填写查寝手记", variant: "destructive" });
    toast({ title: "保存成功", description: "查寝记录已存档（演示模式）" });
    setNote("");
  };

  const selectedStatus = statusOptions.find((s) => s.value === status);

  return (
    <Card className="rounded-2xl max-w-3xl">
      <CardHeader><CardTitle className="text-base">查寝留痕</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>日期时间</Label>
            <Input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} />
          </div>
          <div>
            <Label>检查区域</Label>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger><SelectValue placeholder="选择宿舍楼" /></SelectTrigger>
              <SelectContent>
                {dormAreas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="block mb-2">总体评价</Label>
          <div className="flex gap-2 flex-wrap">
            {statusOptions.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStatus(s.value)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                  status === s.value ? s.color + " ring-2 ring-offset-1 ring-primary/30" : "bg-muted text-muted-foreground border-transparent"
                }`}
              >
                {s.value}
              </button>
            ))}
            {selectedStatus && (
              <Badge variant="outline" className={`ml-auto ${selectedStatus.color}`}>当前：{status}</Badge>
            )}
          </div>
        </div>

        <div>
          <Label>查寝手记</Label>
          <Textarea
            placeholder="请记录此次查寝的详细情况、发现的问题、与学生的沟通要点、后续跟进事项等..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[200px]"
          />
          <p className="text-xs text-muted-foreground mt-1">支持长文本，将完整存档以便后续追溯</p>
        </div>

        <Button onClick={handleSave}>保存查寝记录</Button>
      </CardContent>
    </Card>
  );
}
