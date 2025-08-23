// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
  prenom?: string;
  email?: string;
  filiere?: string;
};

export type Speaker = {
  id: number;
  nom: string;
  prenom: string;
  poste: string;
  secteur: string;
  photoUrl?: string;
};

export type Entreprise = {
  id: number;
  nom: string;
  domaine: string;
  description: string;
  logoUrl?: string;
  siteWeb?: string;
};

export type ProgrammeEvent = {
  id: number;
  titre: string;
  description: string;
  date: string; // format ISO ou texte
  heure: string;
};
