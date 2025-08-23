import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nom, prenom, email, filiere, ecole } = req.body;
    if (!nom || !prenom || !email || !filiere || !ecole) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }
    try {
      const inscription = await prisma.inscription.create({
        data: { nom, prenom, email, filiere, ecole },
      });
      return res.status(201).json(inscription);
    } catch (error) {
      return res.status(500).json({ error: 'Erreur lors de l\'enregistrement.' });
    }
  } else if (req.method === 'GET') {
    // Pour l'admin : liste des inscrits
    const inscriptions = await prisma.inscription.findMany({ orderBy: { createdAt: 'desc' } });
    return res.status(200).json(inscriptions);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 