import ProgramForm from '../ui';
import { requireAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
export default async function Page(){ const a=await requireAdmin(); if(!a) redirect('/admin/login'); return (<div className='card' style={{padding:18}}><h2 style={{marginTop:0}}>New Program</h2><ProgramForm /></div>); }
