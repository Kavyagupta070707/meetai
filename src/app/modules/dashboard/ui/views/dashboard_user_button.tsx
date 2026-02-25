import { GeneratedAvatar } from "@/components/generated_avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenuSeparator, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client"

import { ChevronDownIcon, CreditCardIcon, Divide, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardUserButton() {
    const router = useRouter();
    const {data, isPending}= authClient.useSession()
    const isMobile = useIsMobile()
    const onLogout =()=>{
        authClient.signOut({
            fetchOptions:{
                onSuccess:()=>{
                    router.push("/sign-in");
                }
            }
        })
    }

    if(isPending || !data?.user){
        return null;
    }
    if(isMobile){
        return(
        <Drawer>
            <DrawerTrigger className="rounded-lg bg-amber-200 border border-border/10 p-3 w-full flex items-center justify-between overflow-hidden">
                {data.user.image?(
                    <Avatar>
                        <AvatarImage src={data.user.image} alt="KG"/>
                        <AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                ):(<GeneratedAvatar seed={data.user.name} variant="botttsNeutral" className="size-9 mr-3"/>)}

                <div className="flex flex-col text-left gap-0.5 overflow-hidden flex-1 min-w-0 ml-4">
                    <p className="text-sm font-medium truncate">{data.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{data.user.email}</p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0"/>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{data.user.name}</DrawerTitle>
                    <DrawerDescription>{data.user.email}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button 
                    variant="outline"
                    onClick={()=>{}}
                    >
                        Billing
                        <CreditCardIcon className="size-4 text-black"/>
                    </Button>
                    <Button 
                    variant="outline"
                    onClick={onLogout}
                    >
                        LogOut
                        <LogOutIcon className="size-4 text-black"/>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg bg-amber-200 border border-border/10 p-3 w-full flex items-center justify-between overflow-hidden">
                {data.user.image?(
                    <Avatar>
                        <AvatarImage src={data.user.image} alt="KG"/>
                        <AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                ):(<GeneratedAvatar seed={data.user.name} variant="botttsNeutral" className="size-9 mr-3"/>)}

                <div className="flex flex-col text-left gap-0.5 overflow-hidden flex-1 min-w-0 ml-4">
                    <p className="text-sm font-medium truncate">{data.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{data.user.email}</p>
                </div>
                <ChevronDownIcon className="size-4 shrink-0"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='right' className="w-72">
                <DropdownMenuLabel className="flex flex-col gap-1">
                    <span className="font-medium truncate">{data.user.name}</span>
                    <span className="text-xs text-muted-foreground">{data.user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
                    Billing
                    <CreditCardIcon className="size-4"/>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="flex items-center justify-between cursor-pointer">
                    LogOut
                    <LogOutIcon className="size-4"/>
                </DropdownMenuItem>
            </DropdownMenuContent>
            
        </DropdownMenu>
    )
}