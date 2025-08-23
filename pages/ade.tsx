import Layout from "../components/Layout";
import Link from "next/link";

const texteADE = `L’Association des Étudiants de l’ENSA Tétouan (ADE) est une structure proactive qui enrichit la formation des étudiants au-delà du cadre académique. Elle favorise l’initiative, la responsabilisation et le développement des compétences transversales indispensables à la carrière d’ingénieur. À travers ses 17 clubs couvrant divers domaines, l’ADE organise une grande diversité d’événements et d’initiatives, renforçant les liens entre l’école et le monde professionnel. Ces actions facilitent la rencontre avec les entreprises, la découverte du tissu économique et la préparation à l’insertion professionnelle. L’ADE constitue ainsi un moteur d’ouverture, de mise en réseau et de valorisation du potentiel des étudiants ingénieurs de l’ENSA Tétouan.`;

const AdePage = () => (
  <Layout title="À propos de l’ADE">
    <div style={{ maxWidth: 800, margin: "40px auto", background: "#f5f7fa", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px #e3e3e3" }}>
      <h1 style={{ color: "#1a237e", textAlign: "center" }}>À propos de l’ADE</h1>
      <p style={{ fontSize: 18, lineHeight: 1.7, color: "#333", marginTop: 24 }}>{texteADE}</p>
      <div style={{ margin: "40px 0 0 0", textAlign: "center" }}>
        <Link href="/organisateurs">
          <button style={{ fontSize: 18, padding: "10px 28px", background: "#3949ab", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
            Voir les organisateurs
          </button>
        </Link>
      </div>
      <div style={{ marginTop: 48 }}>
        <h2 style={{ color: "#3949ab" }}>Programme du Forum</h2>
        <div style={{ background: "#fff", borderRadius: 8, padding: 24, minHeight: 120, boxShadow: "0 1px 6px #e0e0e0" }}>
          <p style={{ color: "#888" }}><em>Le programme détaillé sera affiché ici prochainement.</em></p>
        </div>
      </div>
    </div>
  </Layout>
);

export default AdePage; 