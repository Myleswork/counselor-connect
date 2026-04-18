import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewAttendance from "@/components/attendance/NewAttendance";
import AttendanceList from "@/components/attendance/AttendanceList";

export default function AttendanceSection() {
  const navigate = useNavigate();
  const { tab = "new" } = useParams();
  const value = tab === "list" ? "list" : "new";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">查课记录</h1>
      <Tabs value={value} onValueChange={(v) => navigate(`/attendance/${v}`)}>
        <TabsList>
          <TabsTrigger value="new">新建记录</TabsTrigger>
          <TabsTrigger value="list">全部记录</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="mt-4">
          <NewAttendance />
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <AttendanceList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
