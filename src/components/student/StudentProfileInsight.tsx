import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Info,
  GraduationCap,
  CalendarClock,
  MessageCircle,
  Trophy,
  Home,
  Lightbulb,
  FilePlus2,
  FileText,
  MessageSquare,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Student } from "@/data/mockData";

interface Props {
  student?: Student;
}

const data = {
  name: "陈同学",
  studentId: "162340228",
  className: "软件2302",
  major: "软件工程",
  dorm: "B5-519",
  hometown: "江苏南京",
  summary:
    "该生近期主要关注点集中在学业与发展，出勤状态整体稳定。最近一次谈话反馈较积极，可继续围绕目标规划和学习节奏进行跟进。",
  summaryTags: ["发展目标较明确", "出勤整体稳定", "建议持续关注学业节奏"],
};

const dimensions: {
  title: string;
  icon: LucideIcon;
  items: [string, string][];
  tag: string;
}[] = [
  {
    title: "学业与发展",
    icon: GraduationCap,
    items: [
      ["GPA", "3.42"],
      ["必修绩点", "3.36"],
      ["首选意向", "考研"],
      ["备选意向", "就业"],
    ],
    tag: "目标较明确",
  },
  {
    title: "出勤与行为",
    icon: CalendarClock,
    items: [
      ["本月考勤记录", "8 次"],
      ["异常记录", "1 次"],
      ["最近异常", "高等数学缺勤"],
      ["趋势", "近期轻微波动"],
    ],
    tag: "整体稳定",
  },
  {
    title: "谈话与支持",
    icon: MessageCircle,
    items: [
      ["谈话次数", "4 次"],
      ["最近谈话", "2026-05-12"],
      ["高频主题", "学业与发展、职业与规划"],
      ["当前关注级别", "持续关注"],
    ],
    tag: "持续关注",
  },
  {
    title: "成长亮点",
    icon: Trophy,
    items: [
      ["学生荣誉", "程序设计竞赛三等奖"],
      ["参与项目", "班级学习互助小组"],
      ["最近亮点", "主动参与经验分享"],
    ],
    tag: "有实践积极性",
  },
  {
    title: "宿舍与生活",
    icon: Home,
    items: [
      ["宿舍", "B5-519"],
      ["楼栋", "B5"],
      ["近期走访", "整体情况正常"],
      ["备注", "暂无异常反馈"],
    ],
    tag: "状态正常",
  },
  {
    title: "跟进建议",
    icon: Lightbulb,
    items: [],
    tag: "",
  },
];

const suggestions = [
  "下次谈话可围绕学习节奏和目标拆解展开。",
  "可关注近期考勤波动是否与课程压力有关。",
  "鼓励其继续参与专业实践和同伴互助活动。",
];

const timeline: {
  date: string;
  type: "谈话" | "考勤" | "成长记录";
  title: string;
}[] = [
  { date: "2026-05-12", type: "谈话", title: "谈心谈话：学业与发展" },
  { date: "2026-05-09", type: "考勤", title: "考勤记录：高等数学缺勤" },
  { date: "2026-04-28", type: "成长记录", title: "成长记录：程序设计竞赛获奖" },
  { date: "2026-04-16", type: "谈话", title: "谈心谈话：职业与规划" },
];

const typeStyle: Record<string, { icon: LucideIcon; cls: string; dot: string }> = {
  谈话: { icon: MessageSquare, cls: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  考勤: { icon: CalendarClock, cls: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  成长记录: { icon: Trophy, cls: "bg-violet-50 text-violet-700", dot: "bg-violet-500" },
};

export default function StudentProfileInsight({ student }: Props) {
  const name = student?.name ?? data.name;

  return (
    <div className="space-y-6">
      {/* 顶部摘要区 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* 学生基础信息 */}
        <Card className="rounded-xl lg:col-span-2 border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-semibold shrink-0">
                {name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-sm text-muted-foreground">学号 {data.studentId}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5 text-sm">
              {[
                ["班级", data.className],
                ["专业", data.major],
                ["宿舍", data.dorm],
                ["生源地", data.hometown],
              ].map(([l, v]) => (
                <div key={l}>
                  <p className="text-xs text-muted-foreground">{l}</p>
                  <p className="font-medium mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 支持画像摘要 */}
        <Card className="rounded-xl lg:col-span-3 border-blue-100 bg-blue-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <CardTitle className="text-base flex items-center gap-2 text-blue-800">
                <Sparkles className="h-4 w-4" /> 支持画像摘要
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> 生成画像摘要
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <FilePlus2 className="h-3.5 w-3.5" /> 新建谈话记录
                </Button>
                <Button size="sm" variant="ghost" className="gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> 查看完整档案
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-foreground/80">{data.summary}</p>
            <div className="flex flex-wrap gap-2">
              {data.summaryTags.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="rounded-full bg-white text-blue-700 border-blue-200 font-normal"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="h-3 w-3" /> AI 生成，仅供辅导参考
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 画像维度卡片区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {dimensions.map((d) => {
          const Icon = d.icon;
          const isAdvice = d.title === "跟进建议";
          return (
            <Card key={d.title} className="rounded-xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <span className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </span>
                    {d.title}
                  </CardTitle>
                  {d.tag && (
                    <Badge variant="outline" className="rounded-full font-normal text-xs text-blue-700 border-blue-200">
                      {d.tag}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isAdvice ? (
                  <ul className="space-y-2.5">
                    {suggestions.map((s) => (
                      <li key={s} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <dl className="space-y-2.5 text-sm">
                    {d.items.map(([l, v]) => (
                      <div key={l} className="flex items-center justify-between gap-3">
                        <dt className="text-muted-foreground">{l}</dt>
                        <dd className="font-medium text-right">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 学生支持时间线 */}
      <Card className="rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">学生支持时间线</CardTitle>
        </CardHeader>
        <CardContent>
          {timeline.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">
              当前记录较少，可先补充谈话或考勤记录后生成更完整画像。
            </p>
          ) : (
            <div className="relative pl-6 border-l-2 border-border space-y-5">
              {timeline.map((t, i) => {
                const s = typeStyle[t.type];
                const Icon = s.icon;
                return (
                  <div key={i} className="relative">
                    <span
                      className={`absolute -left-[calc(1.5rem+5px)] top-1 w-2.5 h-2.5 rounded-full border-2 border-background ${s.dot}`}
                    />
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">{t.date}</span>
                      <Badge variant="outline" className={`rounded-full font-normal text-xs border-0 gap-1 ${s.cls}`}>
                        <Icon className="h-3 w-3" /> {t.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground/80 mt-1">{t.title}</p>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
