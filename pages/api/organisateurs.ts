import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const organisateurs = await prisma.organisateur.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(organisateurs);
  }
  if (req.method === "POST") {
    const { nom, prenom, poste, filiere, linkedin, photoUrl } = req.body;
    const newOrg = await prisma.organisateur.create({
      data: { nom, prenom, poste, filiere, linkedin, photoUrl }
    });
    return res.status(201).json(newOrg);
  }
  if (req.method === "PUT") {
    const { id, ...data } = req.body;
    const updated = await prisma.organisateur.update({ where: { id }, data });
    return res.status(200).json(updated);
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.organisateur.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 