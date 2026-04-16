import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewRecord from "@/components/talks/NewRecord";
import RecordList from "@/components/talks/RecordList";

export default function TalkSection() {
  const [tab, setTab] = useState("new");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">谈心谈话</h1>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="new">新建记录</TabsTrigger>
          <TabsTrigger value="all">全部记录</TabsTrigger>
        </TabsList>
        <TabsContent value="new" className="mt-4">
          <NewRecord />
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          <RecordList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
