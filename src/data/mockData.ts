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

export type AttendanceStatus = "旷课" | "迟到" | "早退" | "病事假";

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  major: string;
  date: string;
  period: number; // 第几节
  course: string;
  teacher: string;
  status: AttendanceStatus;
  reason: string;
}

export type DormStatus = "优秀" | "正常" | "需要整改";

export interface DormCheckRecord {
  id: string;
  datetime: string;
  area: string;
  status: DormStatus;
  note: string;
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

// ========== 查课记录（Class Attendance） ==========
export const courses = [
  "高等数学A", "大学英语", "电路分析", "数据结构", "操作系统", "计算机组成原理",
  "自动控制原理", "机械原理", "电机学", "信号与系统", "马克思主义基本原理", "体育"
];

export const teachers = ["李建国教授", "王梅教授", "赵立军副教授", "孙海波讲师", "刘文博教授", "陈晓东副教授"];

export const attendanceRecords: AttendanceRecord[] = [
  { id: "a1", studentId: "161520201", studentName: "张明轩", class: "自动化2102", major: "自动化", date: "2025-04-15", period: 1, course: "自动控制原理", teacher: "赵立军副教授", status: "旷课", reason: "未请假，宿舍未起床" },
  { id: "a2", studentId: "161520201", studentName: "张明轩", class: "自动化2102", major: "自动化", date: "2025-04-12", period: 3, course: "高等数学A", teacher: "李建国教授", status: "旷课", reason: "未请假" },
  { id: "a3", studentId: "161520201", studentName: "张明轩", class: "自动化2102", major: "自动化", date: "2025-04-10", period: 5, course: "大学英语", teacher: "王梅教授", status: "迟到", reason: "迟到 15 分钟" },
  { id: "a4", studentId: "161520401", studentName: "周宇航", class: "机械2104", major: "机械工程", date: "2025-04-14", period: 1, course: "机械原理", teacher: "刘文博教授", status: "旷课", reason: "家中事务" },
  { id: "a5", studentId: "161520401", studentName: "周宇航", class: "机械2104", major: "机械工程", date: "2025-04-11", period: 2, course: "高等数学A", teacher: "李建国教授", status: "病事假", reason: "感冒发热，已提交假条" },
  { id: "a6", studentId: "161520401", studentName: "周宇航", class: "机械2104", major: "机械工程", date: "2025-04-09", period: 7, course: "体育", teacher: "孙海波讲师", status: "早退", reason: "身体不适提前离开" },
  { id: "a7", studentId: "161520102", studentName: "王雨萱", class: "电气2101", major: "电气工程", date: "2025-04-13", period: 3, course: "电路分析", teacher: "陈晓东副教授", status: "迟到", reason: "迟到 10 分钟" },
  { id: "a8", studentId: "161520102", studentName: "王雨萱", class: "电气2101", major: "电气工程", date: "2025-04-08", period: 2, course: "高等数学A", teacher: "李建国教授", status: "迟到", reason: "迟到 5 分钟" },
  { id: "a9", studentId: "161520301", studentName: "刘子豪", class: "计算机2103", major: "计算机科学", date: "2025-04-15", period: 4, course: "操作系统", teacher: "刘文博教授", status: "旷课", reason: "面试未到课" },
  { id: "a10", studentId: "161520301", studentName: "刘子豪", class: "计算机2103", major: "计算机科学", date: "2025-04-12", period: 5, course: "数据结构", teacher: "陈晓东副教授", status: "旷课", reason: "未请假" },
  { id: "a11", studentId: "161520301", studentName: "刘子豪", class: "计算机2103", major: "计算机科学", date: "2025-04-07", period: 1, course: "计算机组成原理", teacher: "刘文博教授", status: "迟到", reason: "宿舍闹钟未响" },
  { id: "a12", studentId: "161520302", studentName: "赵欣怡", class: "计算机2103", major: "计算机科学", date: "2025-04-10", period: 6, course: "马克思主义基本原理", teacher: "王梅教授", status: "病事假", reason: "腹痛就医" },
  { id: "a13", studentId: "161520101", studentName: "陈思远", class: "电气2101", major: "电气工程", date: "2025-04-09", period: 8, course: "信号与系统", teacher: "赵立军副教授", status: "迟到", reason: "图书馆赶来" },
  { id: "a14", studentId: "161520202", studentName: "李思琪", class: "自动化2102", major: "自动化", date: "2025-04-06", period: 3, course: "自动控制原理", teacher: "赵立军副教授", status: "病事假", reason: "感冒" },
  { id: "a15", studentId: "161520402", studentName: "孙雅琳", class: "机械2104", major: "机械工程", date: "2025-04-14", period: 4, course: "电机学", teacher: "陈晓东副教授", status: "迟到", reason: "迟到 8 分钟" },
  { id: "a16", studentId: "161520201", studentName: "张明轩", class: "自动化2102", major: "自动化", date: "2025-03-28", period: 2, course: "高等数学A", teacher: "李建国教授", status: "旷课", reason: "未请假" },
  { id: "a17", studentId: "161520401", studentName: "周宇航", class: "机械2104", major: "机械工程", date: "2025-03-25", period: 5, course: "机械原理", teacher: "刘文博教授", status: "旷课", reason: "未请假" },
  { id: "a18", studentId: "161520301", studentName: "刘子豪", class: "计算机2103", major: "计算机科学", date: "2025-03-20", period: 6, course: "操作系统", teacher: "刘文博教授", status: "迟到", reason: "迟到 20 分钟" },
];

// 课程缺课人次排行
export const courseAttendanceStats = [
  { course: "高等数学A", count: 14 },
  { course: "操作系统", count: 9 },
  { course: "自动控制原理", count: 7 },
  { course: "机械原理", count: 6 },
  { course: "数据结构", count: 5 },
  { course: "电路分析", count: 4 },
];

// 近 7 天缺课趋势
export const attendanceTrend = [
  { date: "04-09", count: 3 },
  { date: "04-10", count: 5 },
  { date: "04-11", count: 2 },
  { date: "04-12", count: 6 },
  { date: "04-13", count: 4 },
  { date: "04-14", count: 7 },
  { date: "04-15", count: 8 },
];

// ========== 查寝留痕（Dormitory Check） ==========
export const dormAreas = ["怡园 21 栋", "怡园 22 栋", "和园 5 栋", "和园 6 栋", "明故宫校区 6 号楼", "明故宫校区 7 号楼"];

export const dormCheckRecords: DormCheckRecord[] = [
  { id: "d1", datetime: "2025-04-15 22:30", area: "怡园 21 栋", status: "正常", note: "巡查 5 个房间，灯火通亮，部分同学仍在自习。301 房间存在饮酒嫌疑，已口头警告并约谈宿舍长，明日跟进。整体情况良好，宿舍卫生整洁。" },
  { id: "d2", datetime: "2025-04-14 21:45", area: "怡园 22 栋", status: "优秀", note: "本次走访 6 个房间。学生作息规律，宿舍氛围积极。612 房间已完成本周宿舍文化建设展板，被评为本月示范宿舍。建议在下周宿舍长例会上通报表扬。" },
  { id: "d3", datetime: "2025-04-13 22:00", area: "和园 5 栋", status: "需要整改", note: "508 房间发现违规使用大功率电器（电热水壶、电吹风同时使用），存在严重安全隐患。现场已没收并通知物管登记。要求该宿舍 4 名学生明日上午到办公室谈话，并在宿舍楼栋通报批评。" },
  { id: "d4", datetime: "2025-04-12 21:30", area: "和园 6 栋", status: "正常", note: "巡查正常。406 房间室友间存在轻微矛盾（关于熄灯时间），已现场调解，约定 23:30 统一熄灯。" },
  { id: "d5", datetime: "2025-04-11 22:15", area: "明故宫校区 6 号楼", status: "正常", note: "因六号楼存在新冠康复期学生 2 名，重点查看其作息状态，目前情况稳定。612 室一名学生表示考研压力较大，已记录并安排后续谈心。" },
  { id: "d6", datetime: "2025-04-10 22:00", area: "怡园 21 栋", status: "优秀", note: "整体卫生评分 95 分，房间整洁，物品摆放规范。已与宿管阿姨沟通，下月起增加楼栋绿植。" },
  { id: "d7", datetime: "2025-04-08 22:45", area: "明故宫校区 7 号楼", status: "需要整改", note: "703 房间存在熬夜打游戏现象（凌晨 2 点仍在线），影响其他舍友休息。已收缴游戏设备暂存辅导员办公室，要求其家长签字后方可领回。" },
  { id: "d8", datetime: "2025-04-05 21:00", area: "和园 5 栋", status: "正常", note: "巡查 8 间宿舍，全部按时返寝。学生反映宿舍洗澡热水偶有断供，已上报后勤集团跟进维修。" },
];

export const dormStatusStats = [
  { name: "优秀", value: 12 },
  { name: "正常", value: 28 },
  { name: "需要整改", value: 6 },
];
