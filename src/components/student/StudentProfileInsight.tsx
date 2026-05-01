import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Info,
  GraduationCap,
  MessageCircleHeart,
  Sparkles,
  Eye,
  User,
  BookOpen,
  HeartHandshake,
  Trophy,
  Lightbulb,
  CalendarClock,
  Compass,
} from "lucide-react";
import { Student } from "@/data/mockData";

interface Props {
  student?: Student;
}

// 温和示例数据（按照需求文档）
const mock = {
  name: "林晓雨",
  college: "计算机科学与技术学院",
  major: "软件工程",
  grade: "2023级",
  className: "软件2302",
  dorm: "沁园 3 栋 516",
  hometown: "江苏南京",
  politics: "共青团员",
  intentionPrimary: "考研深造",
  intentionSecondary: "竞赛实践",
  updatedAt: "2026-04-25 10:32",
  academic: {
    gpa: 3.62,
    requiredGpa: 3.48,
    abnormalTotal: 2,
    absent: 0,
    late: 1,
    leaveEarly: 0,
    sickLeave: 1,
    frequentCourses: ["高等数学", "数据结构"],
    lastAbnormal: "2026-04-18",
  },
  talk: {
    total: 4,
    last: "2026-04-22",
    topics: ["学业规划", "竞赛压力", "时间管理"],
    maxLevel: "一般关注",
    recentLevel: "一般关注",
    appeal: "希望平衡课程学习与竞赛准备",
  },
  growth: {
    total: 3,
    recent: "参与学院程序设计训练营",
    types: ["项目参与", "活动实践", "自我复盘"],
    domains: ["学业发展", "实践育人"],
  },
};

function SoftCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Card className={`rounded-2xl border-border/60 shadow-sm ${className}`}>{children}</Card>
  );
}

function MetricCard({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: any;
  title: string;
  tone: "blue" | "violet" | "teal" | "amber";
  children: React.ReactNode;
}) {
  const toneMap = {
    blue: "bg-sky-50 text-sky-600",
    violet: "bg-violet-50 text-violet-600",
    teal: "bg-teal-50 text-teal-600",
    amber: "bg-amber-50 text-amber-600",
  } as const;
  return (
    <SoftCard>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${toneMap[tone]}`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">{children}</div>
      </CardContent>
    </SoftCard>
  );
}

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <SoftCard>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </SoftCard>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between py-1.5 border-b border-dashed border-border/60 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">{value}</span>
    </div>
  );
}

export default function StudentProfileInsight({ student }: Props) {
  // 优先使用传入学生姓名/班级，其余字段使用 mock
  const name = student?.name ?? mock.name;
  const className = student?.class ?? mock.className;
  const major = student?.major ?? mock.major;

  return (
    <div className="space-y-5">
      {/* 顶部头部 */}
      <SoftCard className="overflow-hidden">
        <div className="bg-gradient-to-br from-sky-50 via-white to-violet-50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{name}</h2>
                <Badge variant="outline" className="bg-white/70 border-sky-200 text-sky-700 font-normal">
                  {mock.grade}
                </Badge>
                <Badge variant="outline" className="bg-white/70 border-violet-200 text-violet-700 font-normal">
                  {className} · {major}
                </Badge>
              </div>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">学院</p>
                  <p className="font-medium">{mock.college}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">宿舍</p>
                  <p className="font-medium">{mock.dorm}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">首要发展意向</p>
                  <p className="font-medium">{mock.intentionPrimary}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">次要发展意向</p>
                  <p className="font-medium">{mock.intentionSecondary}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                基于档案、谈话、考勤与成长记录生成，帮助你快速了解近期支持重点。
              </p>
            </div>
            <div className="lg:w-72 shrink-0">
              <div className="rounded-xl bg-white/70 backdrop-blur border border-white p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">最近更新</span>
                  <span className="text-xs font-medium">{mock.updatedAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">数据来源</span>
                  <span className="text-xs font-medium">档案 · 谈话 · 考勤 · 成长</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  仅供辅导参考
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2 bg-white">
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> 刷新画像
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SoftCard>

      {/* 第二层：核心指标 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={GraduationCap} title="学业状态" tone="blue">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-foreground">{mock.academic.gpa.toFixed(2)}</span>
            <span className="text-xs">GPA</span>
          </div>
          <p>必修绩点 {mock.academic.requiredGpa.toFixed(2)} · 考勤异常 {mock.academic.abnormalTotal} 次</p>
        </MetricCard>
        <MetricCard icon={MessageCircleHeart} title="谈心情况" tone="violet">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-foreground">{mock.talk.total}</span>
            <span className="text-xs">累计谈话</span>
          </div>
          <p>最近 {mock.talk.last} · {mock.talk.recentLevel}</p>
        </MetricCard>
        <MetricCard icon={Sparkles} title="成长亮点" tone="teal">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-foreground">{mock.growth.total}</span>
            <span className="text-xs">条成长记录</span>
          </div>
          <p className="line-clamp-1">最近：{mock.growth.recent}</p>
        </MetricCard>
        <MetricCard icon={Eye} title="近期关注" tone="amber">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-foreground">3</span>
            <span className="text-xs">条提醒</span>
          </div>
          <p>方向：学业节奏 · 阶段目标</p>
        </MetricCard>
      </div>

      {/* 第三层：综合摘要 */}
      <SoftCard>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Compass className="h-4 w-4 text-primary" /> 综合画像摘要
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground/80">
            该生目前学籍信息较完整，发展意向较明确。近期谈心主题主要集中在学业适应与未来规划，考勤整体稳定，暂无明显连续异常记录。已有若干成长亮点，可在后续沟通中结合正向反馈，帮助其进一步明确阶段目标。
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["发展意向清晰", "考勤整体稳定", "适合正向激励"].map((t) => (
              <Badge key={t} variant="outline" className="bg-sky-50 border-sky-200 text-sky-700 font-normal">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </SoftCard>

      {/* 第四层：四个画像板块 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard icon={User} title="基础画像">
          <div className="space-y-0.5">
            <InfoRow label="学院" value={mock.college} />
            <InfoRow label="年级 / 班级" value={`${mock.grade} · ${className}`} />
            <InfoRow label="专业" value={major} />
            <InfoRow label="宿舍" value={mock.dorm} />
            <InfoRow label="生源地" value={mock.hometown} />
            <InfoRow label="政治面貌" value={mock.politics} />
            <InfoRow label="发展意向" value={`${mock.intentionPrimary} / ${mock.intentionSecondary}`} />
          </div>
        </SectionCard>

        <SectionCard icon={BookOpen} title="学业画像">
          <div className="space-y-0.5">
            <InfoRow label="GPA" value={mock.academic.gpa.toFixed(2)} />
            <InfoRow label="必修绩点" value={mock.academic.requiredGpa.toFixed(2)} />
            <InfoRow
              label="考勤异常"
              value={`共 ${mock.academic.abnormalTotal} 次（迟到 ${mock.academic.late} · 病事假 ${mock.academic.sickLeave}）`}
            />
            <InfoRow label="高频异常课程" value={mock.academic.frequentCourses.join("、")} />
            <InfoRow label="最近一次异常" value={mock.academic.lastAbnormal} />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground bg-muted/40 rounded-lg p-3">
            近期课堂参与整体较稳定，如后续出现连续迟到或旷课，可结合课程时间与个人作息进一步了解原因。
          </p>
        </SectionCard>

        <SectionCard icon={HeartHandshake} title="谈心画像">
          <div className="space-y-0.5">
            <InfoRow label="累计谈话次数" value={`${mock.talk.total} 次`} />
            <InfoRow label="最近一次谈话" value={mock.talk.last} />
            <InfoRow label="常见谈话主题" value={mock.talk.topics.join("、")} />
            <InfoRow label="最高关注级别" value={mock.talk.maxLevel} />
            <InfoRow label="最近关注级别" value={mock.talk.recentLevel} />
            <InfoRow label="主要诉求" value={mock.talk.appeal} />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground bg-muted/40 rounded-lg p-3">
            谈话主题主要集中在学业规划与适应情况，后续可采用开放式提问，引导其进一步梳理阶段目标。
          </p>
        </SectionCard>

        <SectionCard icon={Trophy} title="成长画像">
          <div className="space-y-0.5">
            <InfoRow label="成长记录数量" value={`${mock.growth.total} 条`} />
            <InfoRow label="最近成长事件" value={mock.growth.recent} />
            <InfoRow label="记录类型分布" value={mock.growth.types.join("、")} />
            <InfoRow label="功能领域分布" value={mock.growth.domains.join("、")} />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground bg-muted/40 rounded-lg p-3">
            已有成长记录显示该生在活动参与和自我复盘方面有一定积累，后续可结合具体事件给予正向反馈。
          </p>
        </SectionCard>
      </div>

      {/* 第五层：关注提醒 + 支持建议 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SoftCard>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="h-4 w-4 text-amber-600" /> 关注提醒
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                level: "普通提醒",
                tone: "bg-sky-50 text-sky-700 border-sky-200",
                text: "近期考勤整体稳定，仅有零星异常，可继续观察是否形成连续趋势。",
              },
              {
                level: "需要留意",
                tone: "bg-amber-50 text-amber-700 border-amber-200",
                text: "谈话主题集中在学业规划与时间管理，适合进行阶段目标梳理。",
              },
              {
                level: "建议跟进",
                tone: "bg-violet-50 text-violet-700 border-violet-200",
                text: "该生有明确发展意向，可结合竞赛与考研路径给予具体建议。",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start rounded-xl border border-border/60 p-3">
                <Badge variant="outline" className={`${item.tone} font-normal shrink-0`}>{item.level}</Badge>
                <p className="text-sm text-foreground/80 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </CardContent>
        </SoftCard>

        <SoftCard>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" /> 支持建议
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                icon: CalendarClock,
                title: "近期跟进重点",
                text: "关注学习节奏、竞赛投入与考研准备之间的平衡。",
              },
              {
                icon: MessageCircleHeart,
                title: "推荐沟通方式",
                text: "采用鼓励式、计划式沟通，先肯定已有行动，再一起拆解阶段任务。",
              },
              {
                icon: Compass,
                title: "下一步行动建议",
                text: "两周后可进行一次简短回访，了解课程压力与训练营参与情况。",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl bg-gradient-to-br from-sky-50/60 to-violet-50/40 border border-border/60 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{title}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed pl-6">{text}</p>
              </div>
            ))}
          </CardContent>
        </SoftCard>
      </div>

      <p className="text-center text-xs text-muted-foreground pt-2">
        以上内容基于已有记录自动整理，仅供辅导参考，不作为对学生的评价或定性。
      </p>
    </div>
  );
}