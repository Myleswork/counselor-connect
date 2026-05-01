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
  const name = student?.name ?? mock.name;
  const className = student?.class ?? mock.className;
  const major = student?.major ?? mock.major;

  return (
    <div className="space-y-5">
      {/* 1. 顶部画像头部卡 */}
      <SoftCard className="overflow-hidden">
        <div className="bg-gradient-to-br from-sky-50 via-white to-violet-50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{name}</h2>
                <span className="text-sm text-muted-foreground">
                  {mock.grade} · {className} · {major}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span>宿舍：{mock.dorm}</span>
                <span>发展意向：{mock.intentionPrimary} / {mock.intentionSecondary}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                基于档案、谈话、考勤与成长记录生成，帮助你快速了解近期支持重点。
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-start lg:items-end gap-2 text-xs text-muted-foreground">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span>最近更新 <span className="text-foreground/80 font-medium">{mock.updatedAt}</span></span>
                <span>数据来源 <span className="text-foreground/80 font-medium">档案 · 谈话 · 考勤 · 成长</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5" /> 仅供辅导参考
              </div>
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground">
                <RefreshCw className="h-3 w-3 mr-1" /> 重新生成
              </Button>
            </div>
          </div>
        </div>
      </SoftCard>

      {/* 2. 四个画像概览卡 */}
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

      {/* 3. 综合画像摘要卡 */}
      <SoftCard>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Compass className="h-4 w-4 text-primary" /> 综合画像摘要
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground/80">
            该生当前整体状态较平稳，发展方向较明确。近期支持重点可放在学习节奏、竞赛投入与阶段目标拆解上。后续沟通中可结合已有成长记录进行正向反馈，帮助其进一步明确阶段性行动计划。
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["发展方向明确", "状态整体平稳", "适合正向激励"].map((t) => (
              <Badge key={t} variant="outline" className="bg-sky-50 border-sky-200 text-sky-700 font-normal">
                {t}
              </Badge>
            ))}
          </div>
        </CardContent>
      </SoftCard>

      {/* 4. 三个重点画像卡 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <SectionCard icon={BookOpen} title="学业画像">
          <InsightBlock title="课堂参与" text="近期考勤整体较稳定，仅有零星异常，暂未呈现连续异常趋势。" />
          <InsightBlock title="课程关注点" text="异常记录涉及高等数学、数据结构，可结合课程难度、上课时间与个人作息进一步了解原因。" />
          <InsightBlock title="观察建议" text="如后续出现连续迟到或旷课，建议及时进行轻量沟通。" />
        </SectionCard>

        <SectionCard icon={HeartHandshake} title="谈心画像">
          <InsightBlock title="主题集中方向" text="谈话主题主要集中在学业规划、竞赛压力与时间管理，说明其近期关注点偏向发展规划与任务平衡。" />
          <InsightBlock title="主要诉求" text="希望平衡课程学习与竞赛准备。" />
          <InsightBlock title="沟通切入点" text="后续可采用开放式提问，引导其将长期目标拆解为近期可执行任务。" />
        </SectionCard>

        <SectionCard icon={Trophy} title="成长画像">
          <InsightBlock title="正向事件" text="近期参与学院程序设计训练营，体现出一定实践参与度。" />
          <InsightBlock title="能力倾向" text="成长记录集中在项目参与、活动实践和自我复盘，说明其具备一定主动发展意识。" />
          <InsightBlock title="反馈建议" text="后续谈话中可结合具体事件给予正向反馈，增强持续投入感。" />
        </SectionCard>
      </div>

      {/* 5. 基础特征摘要卡 */}
      <SoftCard>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> 基础特征摘要
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "学籍信息", value: "较完整" },
              { label: "发展方向", value: `${mock.intentionPrimary} / ${mock.intentionSecondary}` },
              { label: "住宿信息", value: "已登记" },
              { label: "生源地", value: mock.hometown },
              { label: "政治面貌", value: mock.politics },
              { label: "备注线索", value: "暂无特别备注" },
            ].map((it) => (
              <div key={it.label} className="rounded-xl bg-muted/40 border border-border/50 p-3">
                <p className="text-xs text-muted-foreground">{it.label}</p>
                <p className="text-sm font-medium mt-0.5 text-foreground/90">{it.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </SoftCard>

      {/* 6. 底部双栏：关注提醒 + 支持建议 */}
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
                text: "该生发展意向较明确，可结合竞赛与考研路径给予更具体的阶段建议。",
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