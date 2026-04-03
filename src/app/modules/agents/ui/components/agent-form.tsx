import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../../types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentSchema } from "../../schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated_avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
interface AgentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;

    initialValues?: AgentGetOne;
}

export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();

    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

                if(initialValues?.id){
                    queryClient.invalidateQueries(trpc.agents.getOne.queryOptions({ id: initialValues.id }));
                }

                onSuccess?.();
            },
            onError: (error) => {
                toast.error(error.message || "Failed to create agent. Please try again.")
            },
        })
    )

    const form = useForm<z.infer<typeof agentSchema>>({
        resolver: zodResolver(agentSchema),
        defaultValues: {
            name: initialValues?.name || "",
            instructions: initialValues?.instructions || "",
        }
    })

    const isEdit = !!initialValues?.id;
    const isPending = createAgent.isPending;

    const onSubmit = async (data: z.infer<typeof agentSchema>) => {
        if(isEdit){
            console.log("Edit agent");
        }else{
            createAgent.mutate(data);
        }
    }

    return(
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <GeneratedAvatar seed = {form.watch("name")} variant="botttsNeutral"
                    className="border size-16"
                />
                <FormField
                    name="name"
                    control={form.control}
                    render = {({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="eg. Agent77" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="instructions"
                    control={form.control}
                    render = {({field})=>(
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between gap-x-2">
                {onCancel && (
                    <Button
                        variant="ghost"
                        disabled={isPending}
                        type="button"
                        onClick={()=> onCancel()}
                    >Cancel</Button>
                )}

                <Button disabled={isPending} type="submit">
                    {isEdit ? "Save Changes" : "Create Agent"}
                </Button>
            </div>
            </form>
            
        </Form>
    )

}