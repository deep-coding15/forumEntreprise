import Layout from "../components/Layout";
import { useEffect, useState, useRef } from "react";
// Correction import QRCode pour Next.js/TypeScript
// @ts-ignore
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { backgroundSize } from "html2canvas/dist/types/css/property-descriptors/background-size";
import FontAwesome from "../components/common/FontAwesome";
import SphereAnimationWrapper from "../components/common/DynamicSphereAnimation";
import Membre from "./membre";
const eventDate = new Date("2025-10-15T09:00:00");

function getCountdown() {
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}




const texteADE = `L’Association des Étudiants de l’ENSA Tétouan (ADE) est une structure proactive qui enrichit la formation des étudiants au-delà du cadre académique. Elle favorise l’initiative, la responsabilisation et le développement des compétences transversales indispensables à la carrière d’ingénieur. À travers ses 17 clubs couvrant divers domaines, l’ADE organise une grande diversité d’événements et d’initiatives, renforçant les liens entre l’école et le monde professionnel. Ces actions facilitent la rencontre avec les entreprises, la découverte du tissu économique et la préparation à l’insertion professionnelle. L’ADE constitue ainsi un moteur d’ouverture, de mise en réseau et de valorisation du potentiel des étudiants ingénieurs de l’ENSA Tétouan.`;

// Ajout de données fictives pour intervenants, sponsors, programme




const programme = [
  {
    jour: "15 octobre 2025", events: [
      { heure: "08:30", titre: "Accueil des participants" },
      { heure: "09:00", titre: "Cérémonie d’ouverture", desc: "discours des intervenants, sponsors, partenaires" },
      { heure: "10:00", titre: "Atelier Pause-café" },
      { heure: "10:30", titre: "Inauguration et ouverture des stands", desc: "échanges avec entreprises et partenaires" },
      { heure: "11:30 ", titre: "Conférence", desc: "L’ingénieur marocain face aux défis de la Coupe du Monde 2030" },
      { heure: "13:30 ", titre: "Pause-déjeuner" },
      { heure: "15:30 ", titre: "Passage des entretiens de recrutement" },
      { heure: "18:00 ", titre: "Fermeture des stands" },
    ]
  },
  {
    jour: "16 octobre 2025", events: [
      { heure: "08:30", titre: "Accueil des participants et ouverture des stands" },
      { heure: "09:00", titre: "Conférence", desc: "Ingénierie durable et infrastructures sportives du futur" },
      { heure: "10:15", titre: "Atelier ", desc: "Innover pour 2030 – startup challenges et écosystèmes tech" },
      { heure: "11:30", titre: "Tables rondes ", desc: "Compétences clés pour l’ingénieur du futur" },
      { heure: "13:00", titre: "Pause-déjeuner" },
      { heure: "14:30", titre: "Fermeture des stands et Passage des entretiens" },
      { heure: "18:00", titre: "Cocktails de clôture" },
    ]
  }
];

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#ade", label: "ADE" },
  { href: "#organisateurs", label: "Organisateurs" },
  { href: "#programme", label: "Programme" },
  { href: "#intervenants", label: "Intervenants" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#medias", label: "Collaborateurs Médiatiques" },
  { href: "#contact", label: "Contact" },
];

const IndexPage = () => {
  const [countdown, setCountdown] = useState(getCountdown());

  // DYNAMIQUE : fetch depuis l'API
  
  const [intervenants, setIntervenants] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [medias, setMedias] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', filiere: '', ecole: '' });
  const [badge, setBadge] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('/api/intervenants').then(r => r.json()).then(setIntervenants);
    fetch('/api/sponsors').then(r => r.json()).then(setSponsors);
    fetch('/api/entreprises').then(r => r.json()).then(setEntreprises);
    fetch('/api/mediapartners').then(r => r.json()).then(setMedias);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    //Nettoyage des anciens points si le composants se remonte
    container.innerHTML = "";

    const pointCount = 20;
    const minSize = 2;
    const maxSize = 8;

    function createPoint() {
      const point = document.createElement('div');
      point.classList.add('point');

      //Taille aléatoire
      const size = Math.floor(Math.random() * (maxSize - minSize + 1) + minSize);
      point.style.width = `${size}px`;
      point.style.height = `${size}px`;

      // Position initiale aléatoire
      const initialX = Math.random() * window.innerWidth;
      const initialY = Math.random() * window.innerHeight;
      point.style.left = `${initialX}px`;
      point.style.top = `${initialY}px`;

      // Couleur aléatoire
      const hue = Math.floor(Math.random() * 360);
      point.style.backgroundColor = `hsla(${hue}, 70%, 60%, 0.7)`;

      // Définir les variables CSS pour l'animation
      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200;
      point.style.setProperty('--tx', `${tx}px`);
      point.style.setProperty('--ty', `${ty}px`);

      // Durée d'animation aléatoire
      const duration = 10 + Math.random() * 20;
      point.style.animationDuration = `${duration}s`;

      container.appendChild(point);

      // Redémarrer l'animation avec de nouvelles valeurs quand elle se termine
      point.addEventListener('animationiteration', function () {
        const newTx = (Math.random() - 0.5) * 200;
        const newTy = (Math.random() - 0.5) * 200;
        point.style.setProperty('--tx', `${newTx}px`);
        point.style.setProperty('--ty', `${newTy}px`);
        const newDuration = 10 + Math.random() * 20;
        point.style.animationDuration = `${newDuration}s`;
      });
    }

    for (let i = 0; i < pointCount; i++) {
      createPoint();
    }

    // Ajuster les positions si la fenêtre est redimensionnée
    const handleResize = () => {
      container.querySelectorAll('.point').forEach(point => {
        const currentX = parseFloat((point as HTMLElement).style.left);
        const currentY = parseFloat((point as HTMLElement).style.top);
        if (currentX > window.innerWidth || currentY > window.innerHeight) {
          (point as HTMLElement).style.left = `${Math.random() * window.innerWidth}px`;
          (point as HTMLElement).style.top = `${Math.random() * window.innerHeight}px`;
        }
      });
    };
    window.addEventListener('resize', handleResize);

    // Nettoyage à la destruction du composant
    return () => {
      window.removeEventListener('resize', handleResize);
      container.innerHTML = "";
    };
  }, []);


  

  const badgeRef = useRef(null);

  const handleDownloadBadge = async () => {
    if (badgeRef.current) {
      const canvas = await html2canvas(badgeRef.current);
      const link = document.createElement('a');
      link.download = `badge-${form.nom}-${form.prenom}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <Layout title="Forum d'Entreprises ENSA Tétouan">
      {/* NAVIGATION ONE PAGE - Responsive avec menu burger */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "#fff",
          zIndex: 100,
          boxShadow: "0 2px 8px #e0e0e0",
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        {/* Logo à gauche */}
        <style>
          {` @media (max-width:480px){
                .logos { display: none !important;} 
                .enter { display: inline !important;}
              }
              @media (min-width:481px){ 
                .enter { display: none !important;} 
              }
            `}
        </style>
        <div className="enter" style={{ flex: 1, display: "flex", alignItems: "baseline", fontSize: 14, fontWeight: 600, color: "#3949ab", marginLeft: 16 }}>
          <img src="forum logo.png" alt="forum logo" style={{ flex: 1, height: 70, marginRight: 15 }} />
          <div style={{ display: "inline-flex", transform: "translate(10%, -70%)", textAlign: "center" }}>Forum des entreprises <br /> ENSA de Tétouan</div>
        </div>

        <div className="logos" style={{ flex: 1, display: "flex", alignItems: "center", alignContent: "center", gap: "2rem", width: "100%" }}>
          <li style={{ flex: 1, listStyle: "none" }}><img src="LOGOENSA.png" alt="Ensatetouna" style={{ flex: 1, height: 60, marginRight: 13 }} /></li>
          <li style={{ flex: 1, listStyle: "none" }}><img src="LOGO ADE.png" alt="Ade" style={{ flex: 1, height: 80, marginRight: 13 }} /></li>
          <li style={{ flex: 1, listStyle: "none" }}><img src="forum logo.png" alt="forum logo" style={{ flex: 1, height: 70, marginRight: 15 }} /></li>
          <li style={{ flex: 1, listStyle: "none" }}><img src="LOGO UAE.png" alt="forum logo" style={{ flex: 1, height: 70, marginRight: 15 }} /></li>
        </div>


        {/* Menu burger mobile */}
        <button
          className="nav-burger"
          style={{
            display: "inline",
            background: "none",
            border: "none",
            fontSize: 28,
            color: "#3949ab",
            marginLeft: 16,
            cursor: "pointer",
          }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          &#9776;
        </button>
        {/* Menu mobile déroulant */}
        {menuOpen && (
          <div
            className="nav-mobile"
            style={{
              position: "absolute",
              top: 60,
              left: 0,
              right: 0,
              background: "rgba(255, 255, 255, 0.98)", // légèrement translucide
              backdropFilter: "blur(10px)", // effet flou derrière
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // ombre douce et élégante
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              padding: 20,
              borderRadius: 12, // coins arrondis
              transition: "transform 0.3s ease, opacity 0.3s ease", // animation smooth
              zIndex: 1000, // au-dessus de tout
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  setMenuOpen(false);
                  const element = document.querySelector(link.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  color: "#1a237e",
                  display: "block",
                  left: "50%",
                  translate: "-50% 0",
                  margin: "12px",
                  border: "2px solid transparent",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 8px 20px rgba(26, 35, 126, 0.15)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: "80%",
                  maxWidth: "160px",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";  // léger mouvement
                  e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.06)"; // ombre plus marquée
                  e.currentTarget.style.background = "#f5f5f5";          // léger contraste
                  e.currentTarget.style.color = "#1a237e";               // reste lisible
                  e.currentTarget.style.border = "1px solid rgba(26,35,126,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.color = "#1a237e";
                  e.currentTarget.style.border = "1px solid rgba(0,0,0,0.05)";
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
      <div ref={containerRef} id="container" style={{ height: Infinity }}></div>

      {/* Responsive CSS pour masquer/afficher menu burger */}
      <style>{`
        
        @media (max-width: 900px) {
          .nav-desktop { display: block !important; } 
        }
        @media (min-width: 901px) {
          
        }
        .nav-burger { display: block !important; }
        .nav-mobile { display: block !important; }
        
        /* Nouvelle police pour tout le site sauf le titre principal */
        body, h2, h3, h4, h5, h6, p, span, div, button, input, textarea, label {
          font-family: 'Poppins', 'Inter', 'Roboto', sans-serif !important;
        }
        h1 {
          font-family: 'Playfair Display', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        }

        /* Programme : affichage colonne sur mobile */
        @media (max-width: 700px) {
          .programme-event-row {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
            padding: 12px 10px !important;
          }
          .programme-event-row > span {
            margin-left: 0 !important;
            width: 100% !important;
            text-align: left !important;
          }
          .programme-event-row .desc {
            font-size: 13px !important;
            color: #888 !important;
            text-align: left !important;
            margin-top: 2px !important;
            margin-left: 0 !important;
            width: 100% !important;
            line-height: 1.5 !important;
          }
        }

        /* Affichage vertical pour organisateurs, sponsors, collaborateurs sur mobile */
        @media (max-width: 700px) {
          .org-list, .sponsor-list, .media-list, .entreprise-list, .interv-list {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 25px !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 20px 10px !important;
            width: 100% !important;
            margin: 0 auto !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
          
          .org-card, .sponsor-card, .media-card, .entreprise-card, .interv-card {
            width: 250px !important;
            min-width: 250px !important;
            max-width: 250px !important;
            margin: 0 auto !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
            flex: 0 0 250px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          
          /* Supprimer les indicateurs de scroll */
          .org-list::before, .org-list::after,
          .sponsor-list::before, .sponsor-list::after,
          .media-list::before, .media-list::after,
          .entreprise-list::before, .entreprise-list::after,
          .interv-list::before, .interv-list::after {
            display: none !important;
          }
          
          /* Animation pour attirer l'attention */
          .org-list, .sponsor-list, .media-list, .entreprise-list, .interv-list {
            animation: fadeInGrid 0.5s ease-in-out !important;
          }
          
          @keyframes fadeInGrid {
            from { opacity: 0.8; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
        


        /* Ajustements pour les cartes sur mobile */
        @media (max-width: 700px) {
          .org-card img {
            width: 85px !important;
            height: 85px !important;
          }
          
          .org-card h3 {
            font-size: 19px !important;
            margin: 12px 0 5px 0 !important;
            line-height: 1.4 !important;
          }
          
          .org-card div {
            font-size: 16px !important;
            margin-bottom: 5px !important;
            line-height: 1.4 !important;
          }
          
          .org-card {
            padding: 25px 20px !important;
          }
          
          .org-card a img {
            width: 32px !important;
            height: 32px !important;
          }
          
          /* Texte À propos de l'ADE sur mobile */
          #ade h2 {
            font-size: 24px !important;
            margin-bottom: 15px !important;
          }
          
          #ade p {
            font-size: 16px !important;
            line-height: 1.6 !important;
            text-align: left !important;
            max-width: 100% !important;
            margin: 0 auto !important;
          }
        }
      `}</style>


      {/* SECTION ACCUEIL responsive et centré */}
      {/* <video className="video-bg" autoPlay muted loop>
        <source src="/video/video.mp4" type="video/mp4" />
        Ton navigateur ne supporte pas la vidéo en background.
      </video> */}
      {/* <div className="overlay"></div> */}
      <div
        id="accueil"
        style={{
          textAlign: "center",
          marginTop: 100,
          padding: "0 16px",
          fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif",
        }}
      >
        <h3 style={{
          color: "#fff",
          fontSize: "1.2rem",
          marginTop: 6,
          fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif",
          fontWeight: 400,
          

        }}>Vous invites Au</h3>
        <h1 className="change-color text-3d"
          style={{
            fontSize: "2.8rem",
            color: "#0A74DA",
            marginBottom: 20,
            fontWeight: 800,
            lineHeight: 1.3,
            fontFamily: "'Playfair Display', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Forum des Entreprises ENSA Tétouan
        </h1>

        <h2 style={{
          color: "#fff",
          fontSize: "1.4rem",
          margin: "8px 0",
          fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif",
          fontWeight: 500
        }}>
          15 & 16 octobre 2025
        </h2>
        <style>
          {
            `.blinking-text {
              font-size: 24px;
              font-weight: bold;
              color: red;
              animation: blink 2s infinite;
            }

            @keyframes blink {
              0%, 50%, 100% {
                opacity: 1;
              }
              25%, 75% {
                opacity: 0;
              }
            }`
          }
        </style>
        <h3 style={{
          color: "#69F0AE",
          fontSize: "1.2rem",
          marginTop: 6,
          fontFamily: "'Poppins', 'Inter', 'Roboto', sans-serif",
          fontWeight: 400
        }}>
          À l'École Nationale des Sciences Appliquées de Tétouan
        </h3>

        <div style={{ margin: "40px 0" }}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
            style={{
              fontSize: "1.3rem",
              padding: "16px 42px",
              fontWeight: 500,
              background: "linear-gradient(135deg, #1e88e5, #354cb1ff)",
              color: "#fff",
              lineHeight: 1.3,
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(94, 53, 177, 0.4)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(30, 136, 229, 0.5)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(94, 53, 177, 0.4)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span className="blinking-text" style={{color: "#fff"}}> S’inscrire maintenant </span>
           

          </button>
        </div>
        {/* <SphereAnimationWrapper /> */}
        {countdown ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
              marginTop: 20,
            }}
          >
            {[
              { label: "Jours", value: countdown.days },
              { label: "Heures", value: countdown.hours },
              { label: "Minutes", value: countdown.minutes },
              { label: "Secondes", value: countdown.seconds },
            ].map((item, index) => (
              <div className="countdown-item"
                key={index}
                style={{
                  backgroundColor: "#e8eaf6",
                  color: "#1a237e",
                  padding: "16px 20px",
                  borderRadius: 12,
                  minWidth: 90,
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(26, 35, 126, 0.1)",
                }}
              >
                <style>
                  {
                    ` 
                    .countdown-item:hover{
                      transition: all 0.3s ease;
                      scale: 1.1;
                    }
                    `
                  }
                </style>
                <div style={{ fontSize: "2rem", fontWeight: 700 }}>{item.value}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>{item.label}</div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#c62828",
              marginTop: 20,
            }}
          >
            L'événement a commencé !
          </div>
        )}

      </div>


      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 320, maxWidth: 350, width: '90vw', boxShadow: '0 4px 24px #0002', position: 'relative' }}>
            <button onClick={() => { setShowModal(false); setBadge(null); setErrorMsg(null); }} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#3949ab', cursor: 'pointer' }}>&times;</button>
            {!badge ? (
              <form onSubmit={async e => {
                e.preventDefault();
                setErrorMsg(null);
                try {
                  const res = await fetch('/api/inscriptions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                  });
                  if (!res.ok) {
                    const data = await res.json();
                    setErrorMsg(data.error || 'Erreur lors de l\'inscription.');
                    return;
                  }
                  setBadge({ ...form });
                } catch (err) {
                  setErrorMsg('Erreur réseau ou serveur.');
                }
              }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h2 style={{ color: '#3949ab', textAlign: 'center', marginBottom: 10 }}>Inscription</h2>
                <input required placeholder="Nom" value={form.nom} onChange={e => setForm(f => ({ ...f, nom: e.target.value }))} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
                <input required placeholder="Prénom" value={form.prenom} onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
                <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
                <input required placeholder="Filière" value={form.filiere} onChange={e => setForm(f => ({ ...f, filiere: e.target.value }))} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
                <input required placeholder="École" value={form.ecole} onChange={e => setForm(f => ({ ...f, ecole: e.target.value }))} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
                <button type="submit" style={{ background: '#3949ab', color: 'white', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: 17, cursor: 'pointer', width: '100%', marginTop: 8 }}>Valider</button>
                {errorMsg && <div style={{ color: 'red', marginTop: 8, textAlign: 'center' }}>{errorMsg}</div>}
              </form>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#3949ab', marginBottom: 10 }}>Badge d'inscription</h2>
                <div ref={badgeRef} style={{ background: '#f5f7fa', borderRadius: 12, padding: 18, margin: '0 auto', display: 'inline-block', minWidth: 220 }}>
                  <div style={{ fontWeight: 600, fontSize: 18, color: '#3949ab' }}>{badge.nom} {badge.prenom}</div>
                  <div style={{ color: '#5c6bc0', fontSize: 15 }}>{badge.filiere} - {badge.ecole}</div>
                  <div style={{ color: '#888', fontSize: 14 }}>{badge.email}</div>
                  <div style={{ margin: '14px 0 0 0' }}>
                    <QRCode value={JSON.stringify(badge)} size={90} />
                  </div>
                </div>
                <button onClick={handleDownloadBadge} style={{ marginTop: 18, background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 16, cursor: 'pointer', marginRight: 10 }}>Télécharger le badge</button>
                <button onClick={() => { setBadge(null); setShowModal(false); }} style={{ marginTop: 18, background: '#3949ab', color: 'white', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 16, cursor: 'pointer' }}>Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* SECTION ADE */}
      <section
        id="ade"
        style={{
          maxWidth: 900,
          margin: "80px auto 0 auto",
          background: "linear-gradient(145deg, #e3e9f7, #f5f7fa)",
          borderRadius: 24,
          padding: 40,
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h2 style={{ color: "#1a237e", textAlign: "center", fontSize: 28, marginBottom: 20 }}>
          À propos de l’ADE
        </h2>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.8,
            color: "#333",
            textAlign: "justify",
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          {texteADE}
        </p>
      </section>
      {/* SECTION ORGANISATEURS */}
      <section
        id="organisateurs"
        style={{
          maxWidth: 1100,
          margin: "80px auto 0 auto",
          padding: "40px 12px",
        }}
      >
        <Membre />
        

        {/* Debug: nombre d'organisateurs */}
        {/* <div style={{ textAlign: "center", marginBottom: 10, fontSize: 12, color: "#666" }}>
          {(organisateurs.length === 0 ? testOrganisateurs : organisateurs).length} organisateur(s)
        </div> */}
        <div className="list-membres">
          {/* org-list */}
          <style>
            {
              `
        @keyframes loop{
          0%{
            transform: translateX(0);
          }
          100%{
            transform: translateX(-50%);
          }
        }

        .list-membres{
          width: 30rem;
          width: 100%;
          font-family: "Montserrat";
          position: relative;
          overflow: hidden;
        }
        .list-inner{
          width: 100%;
          display: flex;
          gap: 1rem;
          animation: loop 10s linear infinite;
        }
        .tag{
          display: flex;
          align-items: center;
          gap: 0 0.2rem;
          color: #e2e8f0;
          font-size: 0.9rem;
          background-color: #334155;
          padding: 0.7rem 1rem;
          border-radius: 0.4rem;
          width: 2/5;
          box-shadow: 0 0.1rem 0.2rem #00000033, 0 0.1rem 0.5rem #0000004d, 0 0.2rem 1.5rem #00000066
        }
        .fade{
          position: absolute;
          background: linear-gradient(90deg, #1e293b, transparent 30%, transparent 70%, #1e293b);
          width: 00%;
          top: 0;
          bottom: 0;
          left: 0;
          pointer-events: none;
        }
      `
            }
          </style>
          {/* <div
            className="list-inner"

          >
            {/* org-card  *}
            {(organisateurs.length === 0 ? testOrganisateurs : organisateurs).map((membre, idx) => (
              <div className="tag"
                key={membre.id || idx}

                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                  padding: "0 28px",

                  textAlign: "center",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div >
                  <img
                    src={membre.photoUrl}
                    alt={membre.nom}
                    width={90}
                    height={90}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: 16,
                      border: "3px solid #5c6bc0",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <h3
                    style={{
                      color: "#1a237e",
                      margin: "10px 0 4px 0",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    {membre.prenom} {membre.nom}
                  </h3>
                  <div
                    style={{
                      color: "#5c6bc0",
                      fontWeight: 500,
                      fontSize: 15,
                      marginBottom: 4,
                    }}
                  >
                    {membre.poste}
                  </div>
                  <div style={{ color: "#888", fontSize: 14 }}>{membre.filiere}</div>
                  {membre.linkedin && (
                    <a
                      href={membre.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: 12,
                      }}
                    >
                      <img
                        src="/linkedin1.webp"
                        alt="LinkedIn"
                        width={28}
                        height={28}
                        style={{ transition: "transform 0.3s ease" }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </a>
                  )}
                </div>
              </div>
            ))}

          </div> */}
          <div className="fade"></div>
        </div>
      </section>
      {/* SECTION PROGRAMME */}
      <section id="programme" style={{ maxWidth: 900, margin: "80px auto 0 auto", background: "linear-gradient(120deg,#e3e9ff 60%,#f5f7fa 100%)", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px #e3e3e3" }}>
        <h2 style={{ color: "#3949ab", textAlign: "center", marginBottom: 32 }}>Programme du Forum</h2>
        {programme.map((day, idx) => (
          <div key={idx} style={{ marginBottom: 32 }}>
            <h3 style={{ color: "#1a237e", marginBottom: 12 }}>{day.jour}</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {day.events.map((ev, i) => (
                <li key={i} className="programme-event-row" style={{ background: "#fff", borderRadius: 8, marginBottom: 12, padding: "16px 20px", boxShadow: "0 1px 6px #e0e0e0", display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#3949ab", width: 70 }}>{ev.heure}</span>
                  <span style={{ fontWeight: 500, marginLeft: 16 }}>{ev.titre}</span>
                  <span className="desc" style={{ color: "#888", marginLeft: 16, fontSize: 15 }}>{ev.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      {/* SECTION INTERVENANTS */}
      <section id="intervenants" style={{ maxWidth: 1200, margin: "80px auto", background: "#f0f4ff", borderRadius: 20, padding: 48, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
        <h2 style={{ color: "#1a237e", textAlign: "center", marginBottom: 48, fontSize: 26, fontWeight: "bold" }}>Nos Intervenants</h2>
        <div className="interv-list" style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center" }}>
          {intervenants.length === 0 ? (
            <div style={{ color: '#888' }}>Aucun intervenant pour le moment.</div>
          ) : intervenants.map((interv, idx) => (
            <div key={interv.id || idx} className="interv-card" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.05)", padding: 24, width: 260, textAlign: "center", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer" }}>
              <img src={interv.photoUrl} alt={interv.nom} width={90} height={90} style={{ borderRadius: "50%", objectFit: "cover", marginBottom: 16, border: "3px solid #1a237e" }} />
              <h3 style={{ color: "#1a237e", fontSize: 18, margin: "10px 0 4px" }}>{interv.nom}</h3>
              <div style={{ color: "#3f51b5", fontWeight: 500, fontSize: 15 }}>{interv.poste}</div>
              <div style={{ color: "#777", fontSize: 14 }}>{interv.secteur}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION SPONSORS */}
      <section id="sponsors" style={{ maxWidth: 1200, margin: "80px auto", background: "#e9f0ff", borderRadius: 20, padding: 48, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
        <h2 style={{ color: "#1a237e", textAlign: "center", marginBottom: 48, fontSize: 26, fontWeight: "bold" }}>Sponsors & Partenaires</h2>
        <div className="sponsor-list" style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center" }}>
          {sponsors.length === 0 ? (
            <div style={{ color: '#888' }}>Aucun sponsor pour le moment.</div>
          ) : sponsors.map((s, idx) => (
            <div key={s.id || idx} className="sponsor-card" style={{
              background: "#fff", borderRadius: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.05)", padding: 24, width: 240, textAlign: "center",
              borderTop: `6px solid ${s.niveau === 'Platinum' ? '#b3a369' : s.niveau === 'Gold' ? '#ffd700' : s.niveau === 'Silver' ? '#c0c0c0' : '#cd7f32'}`
            }}>
              <img src={s.logoUrl} alt={s.nom} width={70} height={70} style={{ objectFit: "contain", marginBottom: 12 }} />
              <h3 style={{ color: "#1a237e", fontSize: 18 }}>{s.nom}</h3>
              <div style={{ color: "#666", fontWeight: 500, marginBottom: 8, fontSize: 15 }}>{s.niveau}</div>
              {s.siteWeb && (
                <a href={s.siteWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#1a237e", textDecoration: "underline", fontSize: 14 }}>
                  Voir le site
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION ENTREPRISES */}
      <section id="entreprises" style={{ maxWidth: 1200, margin: "80px auto", background: "#f7faff", borderRadius: 20, padding: 48, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
        <h2 style={{ color: "#1a237e", textAlign: "center", marginBottom: 48, fontSize: 26, fontWeight: "bold" }}>Entreprises Participantes</h2>
        <div className="entreprise-list" style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center" }}>
          {entreprises.length === 0 ? (
            <div style={{ color: '#888' }}>Aucune entreprise pour le moment.</div>
          ) : entreprises.map((e, idx) => (
            <div key={e.id || idx} className="entreprise-card" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.05)", padding: 24, width: 260, textAlign: "center" }}>
              <img src={e.logoUrl} alt={e.nom} width={70} height={70} style={{ objectFit: "contain", marginBottom: 12 }} />
              <h3 style={{ color: "#1a237e", fontSize: 18 }}>{e.nom}</h3>
              <div style={{ color: "#3f51b5", fontWeight: 500, fontSize: 15 }}>{e.domaine}</div>
              <div style={{ color: "#777", fontSize: 14, marginBottom: 8 }}>{e.description}</div>
              {e.siteWeb && (
                <a href={e.siteWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#1a237e", textDecoration: "underline", fontSize: 14 }}>
                  Voir le site
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION MÉDIAS */}
      <section id="medias" style={{ maxWidth: 1200, margin: "80px auto", background: "#f0f4ff", borderRadius: 20, padding: 48, boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
        <h2 style={{ color: "#1a237e", textAlign: "center", marginBottom: 48, fontSize: 26, fontWeight: "bold" }}>Collaborateurs Médiatiques</h2>
        <div className="media-list" style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center" }}>
          {medias.length === 0 ? (
            <div style={{ color: '#888' }}>Aucun partenaire médiatique pour le moment.</div>
          ) : medias.map((m, idx) => (
            <div key={m.id || idx} className="media-card" style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 16px rgba(0,0,0,0.05)", padding: 24, width: 240, textAlign: "center" }}>
              <img src={m.logoUrl} alt={m.nom} width={70} height={70} style={{ objectFit: "contain", marginBottom: 12 }} />
              <h3 style={{ color: "#1a237e", fontSize: 18 }}>{m.nom}</h3>
              {m.siteWeb && (
                <a href={m.siteWeb} target="_blank" rel="noopener noreferrer" style={{ color: "#1a237e", textDecoration: "underline", fontSize: 14 }}>
                  Voir le site
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" style={{ maxWidth: 900, margin: "80px auto 40px auto", background: "#f5f7fa", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px #e3e3e3" }}>
        <h2 style={{ color: "#1a237e", textAlign: "center", fontSize: 22 }}>Contact</h2>
        <form style={{ maxWidth: 400, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ marginBottom: 16 }}>
            <label>Nom</label>
            <input type="text" required style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Email</label>
            <input type="email" required style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Message</label>
            <textarea required style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }} rows={4} />
          </div>
          <button type="submit" style={{ background: "#3949ab", color: "white", border: "none", borderRadius: 8, padding: "12px 0", fontSize: 17, cursor: "pointer", width: "100%", marginTop: 8 }}>Envoyer</button>
        </form>
        {/* <div className="icons">
          <style>
            {`
            .icons{
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 30px;
            }
            .icon-i{
                margin: 0 10px;
                border-radius: 50%;
                box-sizing: border-box;
                background-color: gray;
                width: 100%;
                height: 30px
                justify-content: center;
                align-items: center;
                text-decoration: none;
                transition: 0.5s;
                background-color: rgba(0 0 0 0);
                font-size: 2.5rem;
                -webkit-box-reflect: below 5px linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.4));
                }
                .icon-i:hover{
                  background: var(--color);
                  color: #050801;
                  box-shadow: 0 0 5px var(--color), 0 0 25px var(--color), 0 0 50px var(--color), 0 0 200px var(--color);
                  
                }
            `}
          </style>
          <a className="icon-i" href=""style={{color: '#0072b1', width: 35, height:35, backgroundColor: "yellow"}}><i className="fa-brands fa-linkedln-in"></i></a>
          <a className="icon-i" href=""style={{color: '#0072b1', width: 35, height:35, backgroundColor: "yellow"}}><i className="fa-brands fa-instagram"></i></a>
          <a className="icon-i" href=""style={{color: '#0072b1', width: 35, height:35, backgroundColor: "yellow"}}><i className="fa-brands fa-facebook-f"></i></a>
        </div> */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          marginTop: 24
        }}>
          <style>
            {`
              .icon{
                position: relative;
                padding: 10px;
                width: 35px;
                background-color: white;
                box-shadow: 0 0 5px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.2), 0 0 25px rgba(0,0,0,0.5);
                border-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                transition: all 0.5s ease;
                cursor: pointer;
                
              }
              .icon span{
                display: relative;
                justify-content: center;
                align-items: center;
              }
              .icon span img{
                font-size: 24px;
                border-radius: 10%;
                color: #333;
                transition: all 1s ease;
              }
              .label{
                margin-left: 15px;
                color: black;
                display: none;
                opacity: 0;
                
                text-decoration-line: none;
                font-weight: 650;
                transition: all 0.5 ease;
              }
              .icon:hover{
                transform: scale(0.9);
                width: 120px;
              }
              .icon:hover span img{
                color: white;
              }
              .icon:hover .label{
                opacity: 1;
                display: inline;
                text-decoration-line: none;
                transform: translateX(0);
              }
              .instagram:hover span img{
                background-color: white;
                box-shadow: 0 0 15px white, 0 0 30px white;              
              }
              .email span img{
                background-color: white;
                box-shadow: 0 0 15px white, 0 0 30px white;
              }
              .linkedln span img{
                background-color: white;
                box-shadow: 0 0 15px white, 0 0 30px white;
              }  
              `
            }
          </style>
          {/* instagram => backgrong-color: linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4) */}
          <a href="https://www.instagram.com/ade.ensate/" className="icon instagram" target="_blank" rel="noopener noreferrer">
            <span> <img src="instagram1.webp" alt="Instagram ADE" width={35} height={35} /></span>

            <span className="label">instagram</span>
          </a>
          <a href="mailto:ade.ensa.tetouan@uae.ac.ma" className="icon email">
            <span > <img src="email1.png" alt="Email ADE" width={35} height={35} /></span>
            <span className="label">email</span>
          </a>
          <a href="https://www.linkedin.com/in/ade-ensa-t%C3%A9touan-145a071b4/" className="icon linkedln" target="_blank" rel="noopener noreferrer">
            <span > <img src="linkedin1.webp" alt="LinkedIn ADE" width={35} height={35} /></span>
            <span className="label">linkedln</span><i className="fab fa-linkedin"></i>
          </a>
        </div>
      </section>

    </Layout>
  );
};

export default IndexPage;
