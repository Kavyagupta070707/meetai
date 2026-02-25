import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "../modules/dashboard/ui/views/dashboard-sidebar"
import DashboardNavbar from "../modules/dashboard/ui/views/dashboard-navbar"

interface Props{
    children: React.ReactNode
}

const Layout = ({children}: Props)=>{
    return(
        <SidebarProvider>
            <DashboardSidebar/>
        <div className="flex flex-col w-screen h-screen bg-muted">
            <DashboardNavbar/>
            {children}
        </div>
        </SidebarProvider>
    )
}

export default Layout