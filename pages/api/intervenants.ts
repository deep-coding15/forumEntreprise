import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Liste tous les intervenants
    const intervenants = await prisma.intervenant.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(intervenants);
  }
  if (req.method === "POST") {
    // Ajout d'un intervenant
    const { nom, prenom, poste, secteur, photoUrl, linkedin, description } = req.body;
    const newInterv = await prisma.intervenant.create({
      data: { nom, prenom, poste, secteur, photoUrl, linkedin, description }
    });
    return res.status(201).json(newInterv);
  }
  if (req.method === "PUT") {
    // Modification d'un intervenant
    const { id, ...data } = req.body;
    const updated = await prisma.intervenant.update({ where: { id }, data });
    return res.status(200).json(updated);
  }
  if (req.method === "DELETE") {
    // Suppression d'un intervenant
    const { id } = req.body;
    await prisma.intervenant.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 