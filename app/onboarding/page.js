'use client'

import {useState} from 'react'
import {createClient} from '../../lib/supabase/client'

export default function Onboarding(){
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [address,setAddress]=useState('')
  const [error,setError]=useState('')

  async function save(e){
    e.preventDefault()
    setError('')

    const s=createClient()

    const {error}=await s.rpc(
      'create_garage_for_current_user',
      {
        p_name:name,
        p_phone:phone||null,
        p_address:address||null
      }
    )

    if(error){
      setError(error.message)
    }else{
      location.href='/'
    }
  }

  return (
    <div className="auth">
      <form className="panel authbox" onSubmit={save}>
        <h1>Créer votre garage</h1>

        <label>
          Nom du garage
          <input
            value={name}
            onChange={e=>setName(e.target.value)}
            required
          />
        </label>

        <label>
          Téléphone
          <input
            value={phone}
            onChange={e=>setPhone(e.target.value)}
          />
        </label>

        <label>
          Adresse
          <input
            value={address}
            onChange={e=>setAddress(e.target.value)}
          />
        </label>

        {error&&<p>{error}</p>}

        <button className="primary">
          Démarrer NOVA
        </button>
      </form>
    </div>
  )
}
