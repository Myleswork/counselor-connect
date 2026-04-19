import { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronsUpDown, Check, Plus, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { toast } from "sonner";
import { growthDomains, growthNatures, growthProjects, students, type GrowthNature } from "@/data/mockData";

export default function NewGrowthRecord() {
  const [domain, setDomain] = useState<string>("");
  const [nature, setNature] = useState<GrowthNature>("特色工作");
  const [date, setDate] = useState<Date>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const [projects, setProjects] = useState(growthProjects);
  const [projectId, setProjectId] = useState<string>("");
  const [projectOpen, setProjectOpen] = useState(false);
  const [projectQuery, setProjectQuery] = useState("");

  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [studentOpen, setStudentOpen] = useState(false);

  const showStudents = nature === "学生荣誉" || nature === "特色工作";

  const selectedProject = useMemo(() => projects.find((p) => p.id === projectId), [projects, projectId]);
  const selectedStudents = useMemo(() => students.filter((s) => studentIds.includes(s.id)), [studentIds]);

  const handleCreateProject = () => {
    const name = projectQuery.trim();
    if (!name) return;
    const newP = { id: `p_${Date.now()}`, name, status: "进行中" as const, domain: (domain || growthDomains[0]) as any };
    setProjects((prev) => [...prev, newP]);
    setProjectId(newP.id);
    setProjectQuery("");
    setProjectOpen(false);
    toast.success(`已创建项目"${name}"`);
  };

  const toggleStudent = (id: string) => {
    setStudentIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...list]);
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!domain) return toast.error("请选择职能领域");
    if (!date) return toast.error("请选择发生日期");
    if (!title.trim()) return toast.error("请填写事项标题");
    toast.success("成长记录已保存");
    // reset
    setDomain(""); setDate(undefined); setTitle(""); setDescription("");
    setFiles([]); setProjectId(""); setStudentIds([]); setNature("特色工作");
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">新建成长记录</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 职能领域 + 日期 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>职能领域 <span className="text-destructive">*</span></Label>
            <Select value={domain} onValueChange={setDomain}>
              <SelectTrigger><SelectValue placeholder="选择九大职能之一" /></SelectTrigger>
              <SelectContent>
                {growthDomains.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>发生日期 <span className="text-destructive">*</span></Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "yyyy-MM-dd") : <span>选择日期</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className={cn("p-3 pointer-events-auto")} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* 记录性质 Tags */}
        <div className="space-y-2">
          <Label>记录性质</Label>
          <RadioGroup value={nature} onValueChange={(v) => setNature(v as GrowthNature)} className="flex flex-wrap gap-2">
            {growthNatures.map((n) => (
              <Label
                key={n}
                htmlFor={`nature-${n}`}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors",
                  nature === n
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:bg-muted",
                )}
              >
                <RadioGroupItem value={n} id={`nature-${n}`} className="sr-only" />
                {n}
              </Label>
            ))}
          </RadioGroup>
        </div>

        {/* 归属项目 + 标题 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>归属项目 <span className="text-xs text-muted-foreground">（可选）</span></Label>
            <Popover open={projectOpen} onOpenChange={setProjectOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between font-normal">
                  {selectedProject ? selectedProject.name : <span className="text-muted-foreground">搜索或创建项目</span>}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                  <CommandInput placeholder="搜索项目名称..." value={projectQuery} onValueChange={setProjectQuery} />
                  <CommandList>
                    <CommandEmpty>未找到项目</CommandEmpty>
                    <CommandGroup>
                      {projects.map((p) => (
                        <CommandItem
                          key={p.id}
                          value={p.name}
                          onSelect={() => { setProjectId(p.id === projectId ? "" : p.id); setProjectOpen(false); }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", projectId === p.id ? "opacity-100" : "opacity-0")} />
                          <span className="flex-1">{p.name}</span>
                          <Badge variant="secondary" className="text-[10px]">{p.status}</Badge>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem onSelect={handleCreateProject} className="text-primary">
                        <Plus className="mr-2 h-4 w-4" />
                        创建新项目{projectQuery && ` "${projectQuery}"`}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>事项标题 <span className="text-destructive">*</span></Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="一句话概括这件事" />
          </div>
        </div>

        {/* 关联学生 */}
        {showStudents && (
          <div className="space-y-2">
            <Label>关联学生 <span className="text-xs text-muted-foreground">（多选）</span></Label>
            <Popover open={studentOpen} onOpenChange={setStudentOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between font-normal min-h-10 h-auto py-2">
                  <div className="flex flex-wrap gap-1">
                    {selectedStudents.length === 0 ? (
                      <span className="text-muted-foreground">选择关联学生</span>
                    ) : (
                      selectedStudents.map((s) => (
                        <Badge key={s.id} variant="secondary" className="text-xs">
                          {s.name} · {s.studentId}
                        </Badge>
                      ))
                    )}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command>
                  <CommandInput placeholder="搜索姓名或学号..." />
                  <CommandList>
                    <CommandEmpty>未找到学生</CommandEmpty>
                    <CommandGroup>
                      {students.map((s) => (
                        <CommandItem key={s.id} value={`${s.name} ${s.studentId}`} onSelect={() => toggleStudent(s.id)}>
                          <Check className={cn("mr-2 h-4 w-4", studentIds.includes(s.id) ? "opacity-100" : "opacity-0")} />
                          <span className="flex-1">{s.name}</span>
                          <span className="text-xs text-muted-foreground">{s.studentId} · {s.class}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* 详细描述 */}
        <div className="space-y-2">
          <Label>详细描述</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="完整记录事项的背景、过程、思考与成果。"
          />
        </div>

        {/* 佐证附件 */}
        <div className="space-y-2">
          <Label>佐证附件</Label>
          <label
            htmlFor="growth-files"
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-8 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">点击上传或拖拽文件至此（PDF / JPG / DOCX）</p>
            <input id="growth-files" type="file" multiple className="hidden" onChange={handleFiles} />
          </label>
          {files.length > 0 && (
            <div className="space-y-1 mt-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-muted/50 rounded-md px-3 py-2 text-xs">
                  <span className="truncate">{f.name}</span>
                  <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">保存记录</Button>
        </div>
      </CardContent>
    </Card>
  );
}
