import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const entreprises = await prisma.entreprise.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(entreprises);
  }
  if (req.method === "POST") {
    const { nom, domaine, description, logoUrl, siteWeb } = req.body;
    const newEnt = await prisma.entreprise.create({
      data: { nom, domaine, description, logoUrl, siteWeb }
    });
    return res.status(201).json(newEnt);
  }
  if (req.method === "PUT") {
    const { id, ...data } = req.body;
    const updated = await prisma.entreprise.update({ where: { id }, data });
    return res.status(200).json(updated);
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.entreprise.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 