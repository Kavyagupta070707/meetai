"use client"
import { Card, CardContent } from "@/components/ui/card"
import { OctagonAlert } from "lucide-react"
import { FaGoogle, FaGithub } from "react-icons/fa"
import Link from "next/link" 
import {z} from "zod"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle } from "@/components/ui/alert"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useState } from "react"
const formSchema = z.object({
    name: z.string().min(1,{message: "Name is required"}),
    email: z.string().email(),
    password: z.string().min(1,{message: "Password is required"}),
    confirmPassword: z.string().min(1,{message: "Confirm Password is required"}),

})
.refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const SignUpView =()=>{

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const router = useRouter()
    const [error,setError] = useState<string | null>(null);
    const [loading,setLoading] = useState(false);

    const onSubmit = (data: z.infer<typeof formSchema>)=>{
        setLoading(true);
       authClient.signUp.email(
  {
    name: data.name,
    email: data.email,
    password: data.password
  },
  {
    onSuccess: () => {
        setLoading(false);
        router.push("/");
    },
    onError: (ctx) => {
        setLoading(false);
      setError(ctx.error.message)
    }
  }
)
    }
    return(
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        
                        <form className="p-6 md:pd-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <h1 className="text-2xl text-center font-semibold">Let's get started</h1>
                                <h2 className="text-center text-muted-foreground">Create your account</h2>
                                
                                <FormField 
                                    control={form.control}
                                    name="name"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage /> 
                                        </FormItem>
                                    )}
                                >

                                </FormField>
                                <FormField 
                                    control={form.control}
                                    name="email"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage /> 
                                        </FormItem>
                                    )}
                                >

                                </FormField>
                                <FormField 
                                    control={form.control}
                                    name="password"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage /> 
                                        </FormItem>
                                    )}
                                >

                                </FormField>
                                <FormField 
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Reenter your password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage /> 
                                        </FormItem>
                                    )}
                                >

                                </FormField>

                                {!!error && (
                                    <Alert variant="destructive" className="bg-destructive/10 border-none">
                                        <OctagonAlert className="h-4 w-4 "/> 
                                        <AlertTitle>{error}</AlertTitle>
                                    </Alert>
                                )}
                                <Button disabled={loading} type="submit" className="w-full">Sign Up</Button>
                                <div className="after:border-border relative text-center text-sm after:absolute
                                 after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                    <span className="relative z-10 px-2 bg-card text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                    >
                                        <FaGoogle className="mr-2 h-4 w-4" />Google</Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                    ><FaGithub className="mr-2 h-4 w-4" />Github</Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/sign-in" className="text-blue-400 underline underline-offset-2">Sign In</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="bg-radial from-green-400 to-green-600 relative hidden md:flex flex-col items-center justify-center gap-y-4">
                        MeetAI
                    </div>
                </CardContent>

            </Card>
        </div>   
    )
}