import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import SettingsForm from "./ui";
export default async function Page(){
  const a=await requireAdmin(); if(!a) redirect("/admin/login");
  const settings = await prisma.setting.findFirst();
  return (<div className="card" style={{padding:18}}><h2 style={{marginTop:0}}>Settings</h2><SettingsForm settings={settings} /></div>);
}
