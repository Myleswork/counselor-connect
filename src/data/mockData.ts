export interface Student {
  id: string;
  name: string;
  studentId: string;
  class: string;
  major: string;
  gpa: number;
  requiredGpa: number;
  intention: string;
  sourceTag?: string;
  profileComplete: boolean;
}

export interface TalkRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  major: string;
  date: string;
  riskLevel: 1 | 2 | 3;
  attribution: string;
  location: string;
  summary: string;
  profileComplete: boolean;
  details?: {
    problem: string;
    exploration: string;
    analysis: string;
    discussion: string;
    feedback: string;
  };
}

export const students: Student[] = [
  { id: "1", name: "陈思远", studentId: "161520101", class: "电气2101", major: "电气工程", gpa: 3.72, requiredGpa: 3.85, intention: "保研", profileComplete: false, sourceTag: "migration_backfill" },
  { id: "2", name: "王雨萱", studentId: "161520102", class: "电气2101", major: "电气工程", gpa: 3.45, requiredGpa: 3.50, intention: "考研", profileComplete: false, sourceTag: "migration_backfill" },
  { id: "3", name: "张明轩", studentId: "161520201", class: "自动化2102", major: "自动化", gpa: 2.89, requiredGpa: 2.95, intention: "就业", profileComplete: false },
  { id: "4", name: "李思琪", studentId: "161520202", class: "自动化2102", major: "自动化", gpa: 3.91, requiredGpa: 4.02, intention: "出国", profileComplete: true },
  { id: "5", name: "刘子豪", studentId: "161520301", class: "计算机2103", major: "计算机科学", gpa: 3.15, requiredGpa: 3.20, intention: "就业", profileComplete: false, sourceTag: "migration_backfill" },
  { id: "6", name: "赵欣怡", studentId: "161520302", class: "计算机2103", major: "计算机科学", gpa: 3.68, requiredGpa: 3.75, intention: "考研", profileComplete: false },
  { id: "7", name: "周宇航", studentId: "161520401", class: "机械2104", major: "机械工程", gpa: 2.56, requiredGpa: 2.60, intention: "就业", profileComplete: false, sourceTag: "migration_backfill" },
  { id: "8", name: "孙雅琳", studentId: "161520402", class: "机械2104", major: "机械工程", gpa: 3.33, requiredGpa: 3.40, intention: "考研", profileComplete: true },
];

export const talkRecords: TalkRecord[] = [
  { id: "r1", studentId: "161520101", studentName: "陈思远", class: "电气2101", major: "电气工程", date: "2025-04-10", riskLevel: 2, attribution: "保研/考研压力", location: "辅导员办公室", summary: "该生近期因保研名额竞争压力较大，情绪波动明显，已建议其关注心理咨询中心...", profileComplete: false },
  { id: "r2", studentId: "161520102", studentName: "王雨萱", class: "电气2101", major: "电气工程", date: "2025-04-08", riskLevel: 3, attribution: "学业压力", location: "学生宿舍", summary: "了解该生高等数学期中考试成绩不理想，帮助分析原因并制定复习计划...", profileComplete: false },
  { id: "r3", studentId: "161520201", studentName: "张明轩", class: "自动化2102", major: "自动化", date: "2025-04-05", riskLevel: 1, attribution: "心理健康", location: "心理咨询室", summary: "该生近两周出现失眠、食欲下降症状，已转介至校心理咨询中心进行专业评估...", profileComplete: false },
  { id: "r4", studentId: "161520301", studentName: "刘子豪", class: "计算机2103", major: "计算机科学", date: "2025-04-03", riskLevel: 2, attribution: "就业焦虑", location: "辅导员办公室", summary: "秋招屡次面试未通过，产生自我怀疑情绪，已推荐就业指导中心一对一辅导...", profileComplete: false },
  { id: "r5", studentId: "161520302", studentName: "赵欣怡", class: "计算机2103", major: "计算机科学", date: "2025-03-28", riskLevel: 3, attribution: "人际关系", location: "学生活动中心", summary: "与室友在生活习惯上存在分歧，已协调双方沟通并达成初步共识...", profileComplete: false },
  { id: "r6", studentId: "161520401", studentName: "周宇航", class: "机械2104", major: "机械工程", date: "2025-03-25", riskLevel: 1, attribution: "家庭变故", location: "辅导员办公室", summary: "家中突发经济困难，该生情绪低落且有退学倾向，已启动困难补助申请流程...", profileComplete: false },
  { id: "r7", studentId: "161520101", studentName: "陈思远", class: "电气2101", major: "电气工程", date: "2025-03-20", riskLevel: 3, attribution: "学业压力", location: "教学楼", summary: "期中考试前学习焦虑，帮助其制定时间管理表并推荐学业辅导资源...", profileComplete: false },
  { id: "r8", studentId: "161520201", studentName: "张明轩", class: "自动化2102", major: "自动化", date: "2025-03-15", riskLevel: 2, attribution: "违纪处理", location: "辅导员办公室", summary: "旷课达到警告线，进行诫勉谈话并通知家长配合监督...", profileComplete: false },
];

export const classes = ["电气2101", "自动化2102", "计算机2103", "机械2104"];
export const majors = ["电气工程", "自动化", "计算机科学", "机械工程"];
export const attributions = ["学业压力", "保研/考研压力", "就业焦虑", "心理健康", "家庭变故", "人际关系", "违纪处理", "其他"];

export const attributionStats = [
  { name: "学业压力", value: 28 },
  { name: "保研/考研压力", value: 22 },
  { name: "就业焦虑", value: 18 },
  { name: "心理健康", value: 12 },
  { name: "家庭变故", value: 8 },
  { name: "人际关系", value: 7 },
  { name: "违纪处理", value: 3 },
  { name: "其他", value: 2 },
];

export const riskStats = [
  { name: "一级", count: 12 },
  { name: "二级", count: 25 },
  { name: "三级", count: 38 },
];
