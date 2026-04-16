import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Download, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DataManagement() {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">数据管理</h1>

      {/* Import */}
      <Card className="rounded-2xl">
        <CardHeader><CardTitle className="text-base">数据导入</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <Button variant="outline"><Download className="h-4 w-4 mr-2" />下载模板</Button>
            <Input type="file" accept=".csv,.xlsx" className="max-w-[260px]" />
            <Button><Upload className="h-4 w-4 mr-2" />确认导入</Button>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">正在导入 45/100 条...</p>
            <Progress value={45} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Backfill alert */}
      <Card className="rounded-2xl border-risk-medium-text/30 bg-risk-medium-bg/30">
        <CardContent className="p-5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-risk-medium-text shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-sm">待补全档案提醒</p>
            <p className="text-xs text-muted-foreground mt-1">
              系统检测到部分学生档案 source_tag 为 <code className="bg-muted px-1 rounded">migration_backfill</code>，请尽快完善信息。
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => navigate("/students")}>
            前往补全
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
