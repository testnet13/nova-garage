'use client'

import {createClient} from '../lib/supabase/client'

const labels={
  new:'Nouveau',
  to_call:'À rappeler',
  appointment:'RDV confirmé',
  in_progress:'En atelier',
  done:'Terminé',
  cancelled:'Annulé'
}

export default function Dashboard({garage,rows}){
  async function logout(){
    await createClient().auth.signOut()
    location.href='/login'
  }

  return (
    <main>
      <aside>
        <div className="brand"><b>NOVA</b><span>GARAGE</span></div>
        <button className="active">Tableau de bord</button>
        <button>Demandes</button>
        <button>Rendez-vous</button>
        <button>Devis</button>
        <button>Assistant IA</button>

        <div className="garage">
          <b>{garage}</b>
          <small>NOVA Pro • Connecté</small>
        </div>
      </aside>

      <section>
        <header>
          <div>
            <h1>Bonjour 👋</h1>
            <p>Vos données NOVA sont connectées à Supabase.</p>
          </div>
          <button className="secondary" onClick={logout}>
            Déconnexion
          </button>
        </header>

        <div className="cards">
          <Card n={rows.length} t="Demandes"/>
          <Card n={rows.filter(x=>x.status==='new').length} t="Nouvelles"/>
          <Card n={rows.filter(x=>x.status==='appointment').length} t="RDV confirmés"/>
          <Card n={rows.filter(x=>x.status==='done').length} t="Terminées"/>
        </div>

        <div className="panel">
          <h2>Demandes clients</h2>

          {rows.length===0 ? (
            <p className="muted">Aucune demande pour le moment.</p>
          ) : rows.map(r=>(
            <div className="row" key={r.id}>
              <div>
                <b>
                  {[r.customers?.first_name,r.customers?.last_name]
                    .filter(Boolean).join(' ') || 'Client'}
                </b>
                <small>{r.customers?.phone||''}</small>
              </div>

              <div>
                <b>
                  {[r.vehicles?.make,r.vehicles?.model]
                    .filter(Boolean).join(' ') || r.subject}
                </b>
                <small>
                  {r.description||r.vehicles?.registration||''}
                </small>
              </div>

              <span className="pill">
                {labels[r.status]||r.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function Card({n,t}){
  return (
    <div className="card">
      <span>{t}</span>
      <strong>{n}</strong>
      <small>Données réelles</small>
    </div>
  )
}
