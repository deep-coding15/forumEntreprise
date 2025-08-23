import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const sponsors = await prisma.sponsor.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(sponsors);
  }
  if (req.method === "POST") {
    const { nom, niveau, logoUrl, siteWeb } = req.body;
    const newSponsor = await prisma.sponsor.create({
      data: { nom, niveau, logoUrl, siteWeb }
    });
    return res.status(201).json(newSponsor);
  }
  if (req.method === "PUT") {
    const { id, ...data } = req.body;
    const updated = await prisma.sponsor.update({ where: { id }, data });
    return res.status(200).json(updated);
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.sponsor.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 