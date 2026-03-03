import { CommandResponsiveDialog, CommandInput, CommandItem, CommandList,  } from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface Props{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

function DashboardCommand({open, setOpen}: Props) {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
        
        <CommandInput placeholder="Find a meeting or agent"/>
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
        
    </CommandResponsiveDialog>
  )
}

export default DashboardCommand