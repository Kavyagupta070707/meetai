"use client"

import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DashboardUserButton from "./dashboard_user_button"

const firstsection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings"
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"
    }
]
const secondsection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    }
    
]




const DashboardSidebar = () => {
    const pathname = usePathname()
    return ( 
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                    <BotIcon/>
                    <span className="font-bold">MeetAI</span>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]"/>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstsection.map((item)=>(
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.href} className={cn("flex items-center gap-2", pathname === item.href ? "bg-yellow-200 text-sidebar-accent-foreground" : "")}  >
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                    <Separator className="opacity-10 text-[#5D6B68]"/>
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondsection.map((item)=>(
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.href} className={cn("flex items-center gap-2", pathname === item.href ? "bg-yellow-200 text-sidebar-accent-foreground" : "")}  >
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter >
                <DashboardUserButton/>
            </SidebarFooter>
        </Sidebar>
 ) } 

export default DashboardSidebar