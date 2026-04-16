import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, MessageSquareText, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const shortcuts = [
  { title: "学生档案", desc: "查看和管理学生个人档案信息", icon: Users, to: "/students", color: "bg-primary" },
  { title: "新建记录", desc: "发起一次新的谈心谈话记录", icon: MessageSquareText, to: "/talks", color: "bg-risk-medium-text" },
  { title: "数据管理", desc: "批量导入学生数据与档案", icon: Database, to: "/data", color: "bg-risk-low-text" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground">工作台</h1>
      <p className="text-muted-foreground mt-1 mb-8">这里提供学生档案、谈心记录和数据导入的快捷入口</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shortcuts.map((s) => (
          <Card
            key={s.title}
            className="cursor-pointer hover:shadow-md transition-shadow rounded-2xl"
            onClick={() => navigate(s.to)}
          >
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">{s.title}</CardTitle>
              <CardDescription>{s.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
