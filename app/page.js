import {redirect} from 'next/navigation'
import {createClient} from '../lib/supabase/server'
import Dashboard from './Dashboard'

export default async function Home(){
  const s=await createClient()

  const {data:{user}}=await s.auth.getUser()
  if(!user) redirect('/login')

  const {data:membership}=await s
    .from('memberships')
    .select('garage_id,role,garages(name)')
    .limit(1)
    .maybeSingle()

  if(!membership) redirect('/onboarding')

  const {data:requests=[]}=await s
    .from('requests')
    .select('id,subject,description,status,customers(first_name,last_name,phone),vehicles(make,model,registration)')
    .eq('garage_id',membership.garage_id)
    .order('created_at',{ascending:false})

  return (
    <Dashboard
      garage={membership.garages?.name||'Mon garage'}
      rows={requests}
    />
  )
}
