import { LayoutDashboard, Users, MessageSquareText, Database } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "工作台", url: "/", icon: LayoutDashboard },
  { title: "学生档案", url: "/students", icon: Users },
  { title: "谈心谈话", url: "/talks", icon: MessageSquareText },
  { title: "数据管理", url: "/data", icon: Database },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        <div className={`py-5 flex items-center gap-3 ${collapsed ? 'justify-center px-0' : 'px-4'}`}>
          <div className="w-8 h-8 rounded-full bg-card border border-border shadow-sm flex items-center justify-center shrink-0 aspect-square overflow-hidden">
            <img src="/placeholder.svg" alt="校徽" className="w-5 h-5 object-contain opacity-60" />
          </div>
          {!collapsed && <span className="font-semibold text-foreground text-sm">辅导员系统</span>}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>导航菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
