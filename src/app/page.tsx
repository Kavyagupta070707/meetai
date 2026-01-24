import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import HomeView from "./modules/home/ui/views/Home-view";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session){
    redirect("/sign-in");
  }

  return (
    <HomeView/>
  );
}
