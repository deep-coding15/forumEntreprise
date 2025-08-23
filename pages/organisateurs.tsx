import Layout from "../components/Layout";



const OrganisateursPage = () => (
  <Layout title="Organisateurs ADE">
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 24 }}>
      <h1 style={{ color: "#1a237e", textAlign: "center", marginBottom: 40 }}>Membres organisateurs</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
        {organisateurs.map((membre, idx) => (
          <div key={idx} style={{ background: "#f5f7fa", borderRadius: 16, boxShadow: "0 2px 12px #e3e3e3", padding: 24, width: 240, textAlign: "center" }}>
            <img src={membre.photo} alt={membre.nom} width={90} height={90} style={{ borderRadius: "50%", objectFit: "cover", marginBottom: 16, border: "3px solid #3949ab" }} />
            <h3 style={{ color: "#3949ab", margin: "8px 0 4px 0" }}>{membre.nom}</h3>
            <div style={{ color: "#5c6bc0", fontWeight: 500 }}>{membre.poste}</div>
            <div style={{ color: "#888", fontSize: 15, margin: "6px 0" }}>{membre.filiere}</div>
            <a href={membre.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 8 }}>
              <img src="linkedin1.webp" alt="LinkedIn" width={28} height={28} />
            </a>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default OrganisateursPage; 