'use client'

import {useState} from 'react'
import {createClient} from '../../lib/supabase/client'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState('')

  async function submit(e,signup=false){
    e.preventDefault()
    setMessage('')

    const s=createClient()

    const {error}=signup
      ? await s.auth.signUp({email,password})
      : await s.auth.signInWithPassword({email,password})

    if(error){
      setMessage(error.message)
    }else{
      location.href='/'
    }
  }

  return (
    <div className="auth">
      <form className="panel authbox" onSubmit={e=>submit(e,false)}>
        <div className="brand authbrand">
          <b>NOVA</b><span>GARAGE</span>
        </div>

        <h1>Connexion</h1>
        <p className="muted">Pilotez votre garage et vos demandes clients.</p>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            minLength="6"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
          />
        </label>

        {message&&<p>{message}</p>}

        <button className="primary" type="submit">
          Se connecter
        </button>

        <button
          className="secondary"
          type="button"
          onClick={e=>submit(e,true)}
        >
          Créer mon compte
        </button>
      </form>
    </div>
  )
}
