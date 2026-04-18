import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("admin@nuaa.edu.cn");
  const [password, setPassword] = useState("admin123");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("请输入邮箱和密码");
      return;
    }
    if (password.length < 6) {
      setError("密码至少 6 位");
      return;
    }

    setLoading(true);
    if (tab === "login") {
      const res = await login(email.trim(), password);
      setLoading(false);
      if (!res.ok) {
        setError(res.error || "登录失败");
        return;
      }
      toast({ title: "登录成功", description: "欢迎回来，陈老师" });
    } else {
      const res = await signup(email.trim(), password);
      setLoading(false);
      if (!res.ok) {
        setError(res.error || "注册失败");
        return;
      }
      toast({ title: "注册成功", description: "已自动登录系统" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/4 right-1/4 w-24 h-24 rotate-45 border-2 border-primary/10 rounded-lg" />
      <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rotate-12 border-2 border-primary/10 rounded-full" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-card border-2 border-primary/20 shadow-lg flex items-center justify-center mb-4 aspect-square overflow-hidden">
            <img src="/placeholder.svg" alt="校徽" className="w-12 h-12 object-contain opacity-60" />
          </div>
          <h1 className="text-xl font-bold text-foreground text-center">南京航空航天大学</h1>
          <p className="text-sm text-muted-foreground mt-1">辅导员管理系统</p>
        </div>

        <Card className="shadow-2xl rounded-3xl border-0 bg-card/95 backdrop-blur-sm">
          <CardContent className="p-8 space-y-5">
            <Tabs value={tab} onValueChange={(v) => { setTab(v as "login" | "signup"); setError(""); }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="signup">注册</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-5">
                <p className="text-xs text-muted-foreground text-center mb-4">使用邮箱账号登录系统</p>
              </TabsContent>
              <TabsContent value="signup" className="mt-5">
                <p className="text-xs text-muted-foreground text-center mb-4">首次使用，请创建您的辅导员账号</p>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="请输入邮箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-xl"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPwd ? "text" : "password"}
                  placeholder="请输入密码（至少 6 位）"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {tab === "login" && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(v) => setRemember(v === true)}
                  />
                  <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                    记住我
                  </Label>
                </div>
              )}

              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl text-base font-medium">
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {tab === "login" ? "登 录" : "注 册"}
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground">
              首次使用请先注册账号 · 演示账号 admin@nuaa.edu.cn / admin123
            </p>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center mt-6">
          © 2025 南京航空航天大学 · 学生工作处
        </p>
      </div>
    </div>
  );
}
