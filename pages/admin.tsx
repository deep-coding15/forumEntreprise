import Layout from "../components/Layout";
import { User } from "../interfaces";
import { Speaker } from "../interfaces";
import type { Entreprise, ProgrammeEvent } from "../interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const emptyOrg = { id: null, nom: "", prenom: "", poste: "", filiere: "", linkedin: "", photoUrl: "" };
const emptyInterv = { id: null, nom: "", prenom: "", poste: "", secteur: "", photoUrl: "", linkedin: "", description: "" };
const emptySponsor = { id: null, nom: "", niveau: "", logoUrl: "", siteWeb: "" };
const emptyEnt = { id: null, nom: "", domaine: "", description: "", logoUrl: "", siteWeb: "" };
const emptyMedia = { id: null, nom: "", logoUrl: "", siteWeb: "" };

const AdminPage = () => {
  // TOUS LES HOOKS EN HAUT
  const { data: session, status } = useSession();
  const router = useRouter();

  // ORGANISATEURS
  const [organisateurs, setOrganisateurs] = useState([]);
  const [orgForm, setOrgForm] = useState(emptyOrg);
  const [orgEdit, setOrgEdit] = useState(false);

  // INTERVENANTS
  const [intervenants, setIntervenants] = useState([]);
  const [intervForm, setIntervForm] = useState(emptyInterv);
  const [intervEdit, setIntervEdit] = useState(false);

  // SPONSORS
  const [sponsors, setSponsors] = useState([]);
  const [sponsorForm, setSponsorForm] = useState(emptySponsor);
  const [sponsorEdit, setSponsorEdit] = useState(false);

  // ENTREPRISES
  const [entreprises, setEntreprises] = useState([]);
  const [entForm, setEntForm] = useState(emptyEnt);
  const [entEdit, setEntEdit] = useState(false);

  // MEDIAS
  const [medias, setMedias] = useState([]);
  const [mediaForm, setMediaForm] = useState(emptyMedia);
  const [mediaEdit, setMediaEdit] = useState(false);

  // INSCRIPTIONS
  const [inscriptions, setInscriptions] = useState([]);

  // LOADING (pour les actions)
  const [loading, setLoading] = useState(false);

  // REDIRECTION AUTH
  useEffect(() => { if (status === "unauthenticated") router.replace("/admin-login"); }, [status, router]);

  // FETCH FUNCTIONS
  const fetchOrganisateurs = async () => {
    const res = await fetch("/api/organisateurs");
    setOrganisateurs(await res.json());
  };
  const fetchIntervenants = async () => {
    const res = await fetch("/api/intervenants");
    setIntervenants(await res.json());
  };
  const fetchSponsors = async () => {
    const res = await fetch("/api/sponsors");
    setSponsors(await res.json());
  };
  const fetchEntreprises = async () => {
    const res = await fetch("/api/entreprises");
    setEntreprises(await res.json());
  };
  const fetchMedias = async () => {
    const res = await fetch("/api/mediapartners");
    setMedias(await res.json());
  };
  const fetchInscriptions = async () => {
    const res = await fetch('/api/inscriptions');
    setInscriptions(await res.json());
  };

  useEffect(() => { fetchOrganisateurs(); }, []);
  useEffect(() => { fetchIntervenants(); }, []);
  useEffect(() => { fetchSponsors(); }, []);
  useEffect(() => { fetchEntreprises(); }, []);
  useEffect(() => { fetchMedias(); }, []);
  useEffect(() => { fetchInscriptions(); }, []);

  // HANDLERS ORGANISATEURS
  const handleOrgChange = e => setOrgForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleOrgSubmit = async e => {
    e.preventDefault();
    const method = orgEdit ? "PUT" : "POST";
    await fetch("/api/organisateurs", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(orgEdit ? orgForm : { ...orgForm, id: undefined }) });
    setOrgForm(emptyOrg); setOrgEdit(false); fetchOrganisateurs();
  };
  const handleOrgEdit = (o) => { setOrgForm(o); setOrgEdit(true); };
  const handleOrgDelete = async (id) => { if (!window.confirm("Supprimer ?")) return; await fetch("/api/organisateurs", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); fetchOrganisateurs(); };

  // HANDLERS INTERVENANTS
  const handleIntervChange = e => setIntervForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleIntervSubmit = async e => {
    e.preventDefault();
    const method = intervEdit ? "PUT" : "POST";
    await fetch("/api/intervenants", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(intervEdit ? intervForm : { ...intervForm, id: undefined }) });
    setIntervForm(emptyInterv); setIntervEdit(false); fetchIntervenants();
  };
  const handleIntervEdit = (i) => { setIntervForm(i); setIntervEdit(true); };
  const handleIntervDelete = async (id) => { if (!window.confirm("Supprimer ?")) return; await fetch("/api/intervenants", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); fetchIntervenants(); };

  // HANDLERS SPONSORS
  const handleSponsorChange = e => setSponsorForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSponsorSubmit = async e => {
    e.preventDefault();
    const method = sponsorEdit ? "PUT" : "POST";
    await fetch("/api/sponsors", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(sponsorEdit ? sponsorForm : { ...sponsorForm, id: undefined }) });
    setSponsorForm(emptySponsor); setSponsorEdit(false); fetchSponsors();
  };
  const handleSponsorEdit = (s) => { setSponsorForm(s); setSponsorEdit(true); };
  const handleSponsorDelete = async (id) => { if (!window.confirm("Supprimer ?")) return; await fetch("/api/sponsors", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); fetchSponsors(); };

  // HANDLERS ENTREPRISES
  const handleEntChange = e => setEntForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleEntSubmit = async e => {
    e.preventDefault();
    const method = entEdit ? "PUT" : "POST";
    await fetch("/api/entreprises", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(entEdit ? entForm : { ...entForm, id: undefined }) });
    setEntForm(emptyEnt); setEntEdit(false); fetchEntreprises();
  };
  const handleEntEdit = (e) => { setEntForm(e); setEntEdit(true); };
  const handleEntDelete = async (id) => { if (!window.confirm("Supprimer ?")) return; await fetch("/api/entreprises", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); fetchEntreprises(); };

  // HANDLERS MEDIAS
  const handleMediaChange = e => setMediaForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleMediaSubmit = async e => {
    e.preventDefault();
    const method = mediaEdit ? "PUT" : "POST";
    await fetch("/api/mediapartners", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(mediaEdit ? mediaForm : { ...mediaForm, id: undefined }) });
    setMediaForm(emptyMedia); setMediaEdit(false); fetchMedias();
  };
  const handleMediaEdit = (m) => { setMediaForm(m); setMediaEdit(true); };
  const handleMediaDelete = async (id) => { if (!window.confirm("Supprimer ?")) return; await fetch("/api/mediapartners", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); fetchMedias(); };

  function exportInscriptionsCSV(inscriptions: any[]) {
    if (!inscriptions.length) return;
    const header = ['Nom', 'Prénom', 'Email', 'Filière', 'École', 'Date'];
    const rows = inscriptions.map(i => [i.nom, i.prenom, i.email, i.filiere, i.ecole, new Date(i.createdAt).toLocaleString()]);
    const csvContent = [header, ...rows].map(row => row.map(field => '"' + String(field).replace(/"/g, '""') + '"').join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'inscriptions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (status === "loading") return <div>Chargement...</div>;
  if (!session) return <div>Redirection...</div>;

  return (
    <Layout title="Espace Admin">
      {/* ORGANISATEURS */}
      <section style={{ margin: "40px 0", background: "#f5f7fa", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#1a237e" }}>Organisateurs</h2>
        <form onSubmit={handleOrgSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <input name="nom" placeholder="Nom" value={orgForm.nom} onChange={handleOrgChange} required style={{ flex: 1 }} />
          <input name="prenom" placeholder="Prénom" value={orgForm.prenom} onChange={handleOrgChange} required style={{ flex: 1 }} />
          <input name="poste" placeholder="Poste" value={orgForm.poste} onChange={handleOrgChange} required style={{ flex: 1 }} />
          <input name="filiere" placeholder="Filière" value={orgForm.filiere} onChange={handleOrgChange} required style={{ flex: 1 }} />
          <input name="linkedin" placeholder="LinkedIn" value={orgForm.linkedin} onChange={handleOrgChange} style={{ flex: 1 }} />
          <input name="photoUrl" placeholder="URL Photo" value={orgForm.photoUrl} onChange={handleOrgChange} style={{ flex: 1 }} />
          <button type="submit" style={{ background: "#3949ab", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>{orgEdit ? "Modifier" : "Ajouter"}</button>
          {orgEdit && <button type="button" onClick={() => { setOrgEdit(false); setOrgForm(emptyOrg); }} style={{ background: "#888", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>Annuler</button>}
        </form>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {organisateurs.map((o) => (
            <div key={o.id} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #e3e3e3", padding: 20, width: 220, textAlign: "center" }}>
              <img src={o.photoUrl} alt={o.nom} width={70} height={70} style={{ borderRadius: "50%", objectFit: "cover", marginBottom: 10, border: "3px solid #3949ab" }} />
              <h3 style={{ color: "#3949ab" }}>{o.prenom ? o.prenom + " " : ""}{o.nom}</h3>
              <div style={{ color: "#5c6bc0", fontWeight: 500 }}>{o.poste}</div>
              <div style={{ color: "#888", fontSize: 15 }}>{o.filiere}</div>
              <a href={o.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8 }}>
                <img src="linkedin1.webp" alt="LinkedIn" width={24} height={24} />
              </a>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => handleOrgEdit(o)} style={{ marginRight: 8 }}>✏️</button>
                <button onClick={() => handleOrgDelete(o.id)} style={{ color: "#c62828" }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* INTERVENANTS */}
      <section style={{ margin: "40px 0", background: "#f5f7fa", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#1a237e" }}>Intervenants</h2>
        <form onSubmit={handleIntervSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <input name="nom" placeholder="Nom" value={intervForm.nom} onChange={handleIntervChange} required style={{ flex: 1 }} />
          <input name="prenom" placeholder="Prénom" value={intervForm.prenom} onChange={handleIntervChange} required style={{ flex: 1 }} />
          <input name="poste" placeholder="Poste" value={intervForm.poste} onChange={handleIntervChange} required style={{ flex: 1 }} />
          <input name="secteur" placeholder="Secteur" value={intervForm.secteur} onChange={handleIntervChange} required style={{ flex: 1 }} />
          <input name="photoUrl" placeholder="URL Photo" value={intervForm.photoUrl} onChange={handleIntervChange} style={{ flex: 1 }} />
          <input name="linkedin" placeholder="LinkedIn" value={intervForm.linkedin} onChange={handleIntervChange} style={{ flex: 1 }} />
          <input name="description" placeholder="Description" value={intervForm.description} onChange={handleIntervChange} style={{ flex: 2 }} />
          <button type="submit" style={{ background: "#3949ab", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>{intervEdit ? "Modifier" : "Ajouter"}</button>
          {intervEdit && <button type="button" onClick={() => { setIntervEdit(false); setIntervForm(emptyInterv); }} style={{ background: "#888", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>Annuler</button>}
        </form>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {intervenants.map((i) => (
            <div key={i.id} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #e3e3e3", padding: 20, width: 220, textAlign: "center" }}>
              <img src={i.photoUrl} alt={i.nom} width={70} height={70} style={{ borderRadius: "50%", objectFit: "cover", marginBottom: 10, border: "3px solid #3949ab" }} />
              <h3 style={{ color: "#3949ab" }}>{i.nom} {i.prenom}</h3>
              <div style={{ color: "#5c6bc0", fontWeight: 500 }}>{i.poste}</div>
              <div style={{ color: "#888", fontSize: 15 }}>{i.secteur}</div>
              <a href={i.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8 }}>
                <img src="linkedin1.webp" alt="LinkedIn" width={24} height={24} />
              </a>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => handleIntervEdit(i)} style={{ marginRight: 8 }}>✏️</button>
                <button onClick={() => handleIntervDelete(i.id)} style={{ color: "#c62828" }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* SPONSORS */}
      <section style={{ margin: "40px 0", background: "#f5f7fa", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#1a237e" }}>Sponsors</h2>
        <form onSubmit={handleSponsorSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <input name="nom" placeholder="Nom" value={sponsorForm.nom} onChange={handleSponsorChange} required style={{ flex: 1 }} />
          <input name="niveau" placeholder="Niveau (Platinum, Gold...)" value={sponsorForm.niveau} onChange={handleSponsorChange} required style={{ flex: 1 }} />
          <input name="logoUrl" placeholder="URL Logo" value={sponsorForm.logoUrl} onChange={handleSponsorChange} style={{ flex: 1 }} />
          <input name="siteWeb" placeholder="Site Web" value={sponsorForm.siteWeb} onChange={handleSponsorChange} style={{ flex: 1 }} />
          <button type="submit" style={{ background: "#3949ab", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>{sponsorEdit ? "Modifier" : "Ajouter"}</button>
          {sponsorEdit && <button type="button" onClick={() => { setSponsorEdit(false); setSponsorForm(emptySponsor); }} style={{ background: "#888", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>Annuler</button>}
        </form>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {sponsors.map((s) => (
            <div key={s.id} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #e3e3e3", padding: 20, width: 220, textAlign: "center", borderTop: `6px solid ${s.niveau === 'Platinum' ? '#b3a369' : s.niveau === 'Gold' ? '#ffd700' : s.niveau === 'Silver' ? '#c0c0c0' : '#cd7f32'}` }}>
              <img src={s.logoUrl} alt={s.nom} width={60} height={60} style={{ objectFit: "contain", marginBottom: 10 }} />
              <h3 style={{ color: "#3949ab" }}>{s.nom}</h3>
              <div style={{ color: "#888", fontWeight: 500, marginBottom: 6 }}>{s.niveau}</div>
              <a href={s.siteWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#3949ab", fontWeight: 500, textDecoration: "underline" }}>Voir le site</a>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => handleSponsorEdit(s)} style={{ marginRight: 8 }}>✏️</button>
                <button onClick={() => handleSponsorDelete(s.id)} style={{ color: "#c62828" }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ENTREPRISES */}
      <section style={{ margin: "40px 0", background: "#f5f7fa", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#1a237e" }}>Entreprises</h2>
        <form onSubmit={handleEntSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <input name="nom" placeholder="Nom" value={entForm.nom} onChange={handleEntChange} required style={{ flex: 1 }} />
          <input name="domaine" placeholder="Domaine" value={entForm.domaine} onChange={handleEntChange} required style={{ flex: 1 }} />
          <input name="description" placeholder="Description" value={entForm.description} onChange={handleEntChange} required style={{ flex: 2 }} />
          <input name="logoUrl" placeholder="URL Logo" value={entForm.logoUrl} onChange={handleEntChange} style={{ flex: 1 }} />
          <input name="siteWeb" placeholder="Site Web" value={entForm.siteWeb} onChange={handleEntChange} style={{ flex: 1 }} />
          <button type="submit" style={{ background: "#3949ab", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>{entEdit ? "Modifier" : "Ajouter"}</button>
          {entEdit && <button type="button" onClick={() => { setEntEdit(false); setEntForm(emptyEnt); }} style={{ background: "#888", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>Annuler</button>}
        </form>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {entreprises.map((e) => (
            <div key={e.id} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #e3e3e3", padding: 20, width: 220, textAlign: "center" }}>
              <img src={e.logoUrl} alt={e.nom} width={60} height={60} style={{ objectFit: "contain", marginBottom: 10 }} />
              <h3 style={{ color: "#3949ab" }}>{e.nom}</h3>
              <div style={{ color: "#5c6bc0", fontWeight: 500 }}>{e.domaine}</div>
              <div style={{ color: "#888", fontSize: 15 }}>{e.description}</div>
              <a href={e.siteWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#3949ab", fontWeight: 500, textDecoration: "underline" }}>Voir le site</a>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => handleEntEdit(e)} style={{ marginRight: 8 }}>✏️</button>
                <button onClick={() => handleEntDelete(e.id)} style={{ color: "#c62828" }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* MEDIAS */}
      <section style={{ margin: "40px 0", background: "#f5f7fa", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#1a237e" }}>Collaborateurs Médiatiques</h2>
        <form onSubmit={handleMediaSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <input name="nom" placeholder="Nom" value={mediaForm.nom} onChange={handleMediaChange} required style={{ flex: 1 }} />
          <input name="logoUrl" placeholder="URL Logo" value={mediaForm.logoUrl} onChange={handleMediaChange} style={{ flex: 1 }} />
          <input name="siteWeb" placeholder="Site Web" value={mediaForm.siteWeb} onChange={handleMediaChange} style={{ flex: 1 }} />
          <button type="submit" style={{ background: "#3949ab", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>{mediaEdit ? "Modifier" : "Ajouter"}</button>
          {mediaEdit && <button type="button" onClick={() => { setMediaEdit(false); setMediaForm(emptyMedia); }} style={{ background: "#888", color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 16, cursor: "pointer" }}>Annuler</button>}
        </form>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          {medias.map((m) => (
            <div key={m.id} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 12px #e3e3e3", padding: 20, width: 220, textAlign: "center" }}>
              <img src={m.logoUrl} alt={m.nom} width={60} height={60} style={{ objectFit: "contain", marginBottom: 10 }} />
              <h3 style={{ color: "#3949ab" }}>{m.nom}</h3>
              {m.siteWeb && <a href={m.siteWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#3949ab", fontWeight: 500, textDecoration: "underline" }}>Voir le site</a>}
              <div style={{ marginTop: 8 }}>
                <button onClick={() => handleMediaEdit(m)} style={{ marginRight: 8 }}>✏️</button>
                <button onClick={() => handleMediaDelete(m.id)} style={{ color: "#c62828" }}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* INSCRIPTIONS */}
      <section style={{ margin: "40px 0", background: "#f5f7fa", borderRadius: 16, padding: 24 }}>
        <h2 style={{ color: "#1a237e" }}>Inscriptions</h2>
        <button onClick={() => exportInscriptionsCSV(inscriptions)} style={{ marginBottom: 16, background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, padding: '8px 22px', fontSize: 15, cursor: 'pointer' }}>Exporter en CSV</button>
        {inscriptions.length === 0 ? (
          <div style={{ color: '#888' }}>Aucune inscription pour le moment.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12 }}>
              <thead>
                <tr style={{ background: '#e3e9ff' }}>
                  <th style={{ padding: 8, border: '1px solid #ddd' }}>Nom</th>
                  <th style={{ padding: 8, border: '1px solid #ddd' }}>Prénom</th>
                  <th style={{ padding: 8, border: '1px solid #ddd' }}>Email</th>
                  <th style={{ padding: 8, border: '1px solid #ddd' }}>Filière</th>
                  <th style={{ padding: 8, border: '1px solid #ddd' }}>École</th>
                  <th style={{ padding: 8, border: '1px solid #ddd' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {inscriptions.map((i) => (
                  <tr key={i.id}>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>{i.nom}</td>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>{i.prenom}</td>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>{i.email}</td>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>{i.filiere}</td>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>{i.ecole}</td>
                    <td style={{ padding: 8, border: '1px solid #eee' }}>{new Date(i.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default AdminPage; 