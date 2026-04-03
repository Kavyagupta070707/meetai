import { ResponsiveDialog } from "@/components/responsive-dialog"
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const NewAgent = ({ open, onOpenChange }: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Agent"
      description="Fill in the details to create a new agent."
    >
      <AgentForm 
        onSuccess={()=> onOpenChange(false)}
        onCancel={()=> onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}

export default NewAgent