import { style } from "p5";
import React, { useState, useRef, useEffect } from "react";
//import "./Carousel.css"; // tu mets ton CSS ici


// Données de test si aucun organisateur n'est trouvé
  const testOrganisateurs = [
    { id: 1, nom: "Alami", prenom: "Ahmed", poste: "Président", filiere: "Génie Informatique", photoUrl: "https://via.placeholder.com/90x90/1a237e/ffffff?text=AA", linkedin: "#" },
    { id: 2, nom: "Benjelloun", prenom: "Fatima", poste: "Vice-Présidente", filiere: "Génie Électrique", photoUrl: "https://via.placeholder.com/90x90/3949ab/ffffff?text=FB", linkedin: "#" },
    { id: 3, nom: "Chraibi", prenom: "Omar", poste: "Secrétaire Général", filiere: "Génie Mécanique", photoUrl: "https://via.placeholder.com/90x90/5c6bc0/ffffff?text=OC", linkedin: "#" },
    { id: 4, nom: "Dahmani", prenom: "Layla", poste: "Trésorière", filiere: "Génie Civil", photoUrl: "https://via.placeholder.com/90x90/3f51b5/ffffff?text=LD", linkedin: "#" },
    { id: 5, nom: "El Fassi", prenom: "Youssef", poste: "Responsable Événements", filiere: "Génie Industriel", photoUrl: "https://via.placeholder.com/90x90/303f9f/ffffff?text=YE", linkedin: "#" },
    { id: 6, nom: "Fassi", prenom: "Amina", poste: "Responsable Communication", filiere: "Génie Informatique", photoUrl: "https://via.placeholder.com/90x90/1a237e/ffffff?text=AF", linkedin: "#" },
  ];

const cardsData = [
  {
    title: "Paris, France",
    image:
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=800&q=80",
    description:
      "La ville de l'amour et de la lumière. Découvrez la Tour Eiffel, les Champs-Élysées et la cuisine française.",
    buttonText: "Visiter",
  },
  {
    title: "Kyoto, Japon",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    description:
      "Ancienne capitale impériale, célèbre pour ses temples bouddhistes, ses jardins et ses palais impériaux.",
    buttonText: "Explorer",
  },
  {
    title: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=800&q=80",
    description:
      "La ville qui ne dort jamais. Découvrez Times Square, Central Park et la Statue de la Liberté.",
    buttonText: "Découvrir",
  },
  {
    title: "Venise, Italie",
    image:
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80",
    description:
      "La cité des canaux. Promenez-vous en gondole et explorez la place Saint-Marc.",
    buttonText: "Voir plus",
  },
  {
    title: "Sydney, Australie",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    description:
      "Découvrez l'opéra de Sydney, les plages de Bondi et la baie magnifique.",
    buttonText: "Explorer",
  },
  {
    title: "Marrakech, Maroc",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
    description:
      "La ville rouge. Explorez les souks, les palais et les jardins magnifiques.",
    buttonText: "Visiter",
  },
];

export default function Membre() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const wrapperRef = useRef(null);
  const [organisateurs, setOrganisateurs] = useState([]);

  const cardWidth = 300; // Largeur d'une carte + marge
useEffect(() => {
    fetch('/api/organisateurs').then(r => r.json()).then(setOrganisateurs);
});
  // Ajuste le nombre de cartes visibles selon la taille de l'écran
  useEffect(() => {
    const updateVisibleCards = () => {
      const containerWidth = wrapperRef.current
        ? wrapperRef.current.offsetWidth
        : 900;
      setVisibleCards(Math.floor(containerWidth / cardWidth));
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const goToCard = (index) => {
    if (index < 0) {
      setCurrentPosition(testOrganisateurs.length - visibleCards);
    } else if (index > testOrganisateurs.length - visibleCards) {
      setCurrentPosition(0);
    } else {
      setCurrentPosition(index);
    }
  };

  return (
    <div className="container">
      <h2
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: 48,
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          Membres organisateurs
        </h2>
        <style>
            {`.container {
            max-width: 900px;
            width: 100%;
            text-align: center;
        }
        
        h1 {
            color: white;
            margin-bottom: 30px;
            font-size: 2.5rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .carousel-container {
            position: relative;
            margin: 0 auto;
            width: 100%;
            overflow: hidden;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .cards-wrapper {
            display: flex;
            transition: transform 0.5s ease;
        }
        
        .card {
            flex: 0 0 auto;
            width: 260px;
            height: 350px;
            margin: 20px;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
        }
        
        .card-header {
            height: 160px;
            overflow: hidden;
        }
        
        .card-header img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .card-content {
            padding: 20px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .card-title {
            font-size: 1.4rem;
            margin-bottom: 10px;
            color: #333;
        }
        
        .card-description {
            color: #666;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .card-button {
            display: inline-block;
            margin-top: 15px;
            padding: 8px 16px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 20px;
            font-size: 0.9rem;
            transition: background 0.3s ease;
        }
        
        .card-button:hover {
            background: #5a6fd5;
        }
        
        .navigation {
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 15px;
        }
        
        .nav-btn {
            background: white;
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .nav-btn:hover {
            background: #f8f9fa;
            transform: scale(1.05);
        }
        
        .nav-btn:active {
            transform: scale(0.95);
        }
        
        .indicator {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            gap: 8px;
        }
        
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .dot.active {
            background: white;
            transform: scale(1.2);
        }
        
        @media (max-width: 768px) {
            .card {
                width: 220px;
                height: 320px;
            }
            
            .nav-btn {
                width: 50px;
                height: 50px;
            }
        }
    </style>`}
        </style>
      <div className="carousel-container" ref={wrapperRef}>
        <div
          className="cards-wrapper"
          style={{
            transform: `translateX(-${currentPosition * cardWidth}px)`,
          }}
        >
          {(organisateurs.length === 0 ? testOrganisateurs : organisateurs).map((membre, index) => (
            <div className="card"
                key={membre.id }

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
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation">
        <button className="nav-btn" onClick={() => goToCard(currentPosition - 1)}>
          ←
        </button>
        <button className="nav-btn" onClick={() => goToCard(currentPosition + 1)}>
          →
        </button>
      </div>

      {/* Indicateurs */}
      <div className="indicator">
        {testOrganisateurs.map((_, index) => (
          <div
            key={index}
            className={`dot ${
              index === currentPosition ? "active" : ""
            }`}
            onClick={() => goToCard(index)}
          />
        ))}
      </div>
    </div>
  );
}
