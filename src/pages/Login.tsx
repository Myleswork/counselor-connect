import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError("请输入账号");
      return;
    }
    const ok = login(username, password);
    if (!ok) setError("登录失败，请重试");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Geometric decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/4 right-1/4 w-24 h-24 rotate-45 border-2 border-primary/10 rounded-lg" />
      <div className="absolute bottom-1/3 left-1/4 w-16 h-16 rotate-12 border-2 border-primary/10 rounded-full" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* School branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-card border-2 border-primary/20 shadow-lg flex items-center justify-center mb-4 aspect-square overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="校徽"
              className="w-12 h-12 object-contain opacity-60"
            />
          </div>
          <h1 className="text-xl font-bold text-foreground text-center">
            南京航空航天大学
          </h1>
          <p className="text-sm text-muted-foreground mt-1">辅导员管理系统</p>
        </div>

        {/* Login card */}
        <Card className="shadow-2xl rounded-3xl border-0 bg-card/95 backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground">账号登录</h2>
              <p className="text-xs text-muted-foreground mt-1">请使用工号登录系统</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="请输入账号"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-11 rounded-xl"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPwd ? "text" : "password"}
                  placeholder="请输入密码"
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

              {/* Remember me */}
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

              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              <Button type="submit" className="w-full h-11 rounded-xl text-base font-medium">
                登 录
              </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground">
              默认演示账号：admin / admin123
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
