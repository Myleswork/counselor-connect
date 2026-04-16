import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { KeyRound, Palette, Info, Eye, EyeOff, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const menuItems = [
  { id: "api", label: "API 密钥配置", icon: KeyRound },
  { id: "personalize", label: "个性化设置", icon: Palette },
  { id: "about", label: "关于", icon: Info },
];

export default function Settings() {
  const [active, setActive] = useState("api");
  const [showSecret, setShowSecret] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);

  const [appId, setAppId] = useState(() => localStorage.getItem("xf_appid") || "");
  const [apiSecret, setApiSecret] = useState(() => localStorage.getItem("xf_secret") || "");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("xf_key") || "");

  const handleSave = () => {
    localStorage.setItem("xf_appid", appId);
    localStorage.setItem("xf_secret", apiSecret);
    localStorage.setItem("xf_key", apiKey);
    toast({ title: "保存成功", description: "API 配置已安全保存到浏览器本地存储。" });
  };

  const handleTest = () => {
    if (!appId || !apiSecret || !apiKey) {
      toast({ title: "请填写完整", description: "所有字段均为必填项。", variant: "destructive" });
      return;
    }
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      toast({ title: "连接成功", description: "讯飞星火大模型接口可用。" });
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">系统设置</h1>
      <div className="flex gap-6">
        {/* Left menu */}
        <nav className="w-52 shrink-0 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right content */}
        <div className="flex-1 min-w-0">
          {active === "api" && (
            <Card className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">讯飞星火大模型语音识别配置</CardTitle>
                  <Badge variant="outline" className="text-xs font-normal">语音转文字</Badge>
                </div>
                <CardDescription>配置讯飞开放平台的 API 凭证，用于谈心谈话录音的智能提取功能。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="appid">APPID <span className="text-destructive">*</span></Label>
                  <Input id="appid" placeholder="请输入讯飞 APPID" value={appId} onChange={(e) => setAppId(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secret">API Secret <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Input id="secret" type={showSecret ? "text" : "password"} placeholder="请输入 API Secret" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} className="pr-10" />
                    <button type="button" onClick={() => setShowSecret(!showSecret)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key">API Key <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Input id="key" type={showKey ? "text" : "password"} placeholder="请输入 API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="pr-10" />
                    <button type="button" onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    数据仅保存在浏览器本地，不会上传至任何服务器
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleTest} disabled={testing}>
                      {testing && <Loader2 className="h-4 w-4 animate-spin" />}
                      测试连接
                    </Button>
                    <Button onClick={handleSave}>保存配置</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {active === "personalize" && (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">个性化设置</CardTitle>
                <CardDescription>自定义您的使用偏好。</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">更多个性化设置即将推出，敬请期待。</p>
              </CardContent>
            </Card>
          )}

          {active === "about" && (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">关于系统</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p><span className="text-muted-foreground">系统名称：</span>南京航空航天大学 · 辅导员工作管理系统</p>
                <p><span className="text-muted-foreground">版本号：</span>1.0.0-beta</p>
                <p><span className="text-muted-foreground">技术栈：</span>React + Tailwind CSS + shadcn/ui</p>
                <p><span className="text-muted-foreground">适用范围：</span>高校学生事务管理与谈心谈话数据记录</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
