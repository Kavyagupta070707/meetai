"use client"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react"
import DashboardCommand from "./dashboard-command"
import { useState, useEffect } from "react"


const DashboardNavbar = () => {
    const {state, toggleSidebar, isMobile}= useSidebar()
    const [commandOpen, setcommandOpen]= useState(false)

    useEffect(()=>{
        const down = (e: KeyboardEvent)=>{
            if(e.key=='q' && (e.metaKey || e.ctrlKey)){
                e.preventDefault();
                setcommandOpen((open)=>!open)
            }
        }

        document.addEventListener("keydown", down)

        return () => document.removeEventListener("keydown", down)
    },[])
  return (
    <>
    <DashboardCommand open={commandOpen} setOpen={setcommandOpen}/>
    <nav className=" flex px-4 gap-x-2 items-center border-b py-3 bg-background">
        <Button variant="outline" className="size-9" onClick={toggleSidebar}>
           {(state==='collapsed' || isMobile)?
           ( <PanelLeftIcon className="size-4"/>):
           (<PanelLeftCloseIcon className="size-4"/>)}
        </Button>
        <Button
        variant="outline"
        className="h-9 w-[240px] justify-start text-muted-foreground font-normal"
        size="sm"
        onClick={()=>setcommandOpen((open)=>!open)}
        >
            <SearchIcon/>
            Search

            <kbd className="ml-auto">
                <span className="text-xs">&#8984;</span>q
            </kbd>
        </Button>
    </nav>
    </>
  )
}

export default DashboardNavbar