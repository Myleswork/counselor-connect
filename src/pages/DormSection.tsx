import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewDormCheck from "@/components/dorm/NewDormCheck";
import DormCheckList from "@/components/dorm/DormCheckList";

export default function DormSection() {
  const navigate = useNavigate();
  const { tab = "new" } = useParams();
  const value = tab === "list" ? "list" : "new";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">查寝留痕</h1>
      <Tabs value={value} onValueChange={(v) => navigate(`/dorm/${v}`)}>
        <TabsList>
          <TabsTrigger value="new">新建记录</TabsTrigger>
          <TabsTrigger value="list">全部记录</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="mt-4">
          <NewDormCheck />
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <DormCheckList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
