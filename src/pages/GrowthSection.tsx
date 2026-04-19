import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewGrowthRecord from "@/components/growth/NewGrowthRecord";
import GrowthTimeline from "@/components/growth/GrowthTimeline";

export default function GrowthSection() {
  const navigate = useNavigate();
  const { tab = "new" } = useParams();
  const value = tab === "timeline" ? "timeline" : "new";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">成长轨迹</h1>
      <Tabs value={value} onValueChange={(v) => navigate(`/growth/${v}`)}>
        <TabsList>
          <TabsTrigger value="new">新建记录</TabsTrigger>
          <TabsTrigger value="timeline">成长时光轴</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="mt-4">
          <NewGrowthRecord />
        </TabsContent>
        <TabsContent value="timeline" className="mt-4">
          <GrowthTimeline />
        </TabsContent>
      </Tabs>
    </div>
  );
}
