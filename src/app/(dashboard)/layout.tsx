import { SidebarProvider } from "@/components/ui/sidebar"
import DashboardSidebar from "../modules/dashboard/ui/views/dashboard-sidebar"

interface Props{
    children: React.ReactNode
}

const Layout = ({children}: Props)=>{
    return(
        <SidebarProvider>
            <DashboardSidebar/>
        <div>
            {children}
        </div>
        </SidebarProvider>
    )
}

export default Layout