import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewRecord from "@/components/talks/NewRecord";
import RecordList from "@/components/talks/RecordList";

export default function TalkSection() {
  const navigate = useNavigate();
  const { tab = "new" } = useParams();
  const value = tab === "list" ? "list" : "new";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">谈心谈话</h1>
      <Tabs value={value} onValueChange={(v) => navigate(`/talks/${v}`)}>
        <TabsList>
          <TabsTrigger value="new">新建记录</TabsTrigger>
          <TabsTrigger value="list">全部记录</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="mt-4">
          <NewRecord />
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <RecordList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
