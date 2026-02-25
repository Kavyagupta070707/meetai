import { CommandDialog, CommandInput, CommandItem, CommandList,  } from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface Props{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

function DashboardCommand({open, setOpen}: Props) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
        
        <CommandInput placeholder="Find a meeting or agent"/>
        <CommandList>
            <CommandItem>
                Test
            </CommandItem>
        </CommandList>
        
    </CommandDialog>
  )
}

export default DashboardCommand