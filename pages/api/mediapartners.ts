import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const medias = await prisma.mediaPartner.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(medias);
  }
  if (req.method === "POST") {
    const { nom, logoUrl, siteWeb } = req.body;
    const newMedia = await prisma.mediaPartner.create({
      data: { nom, logoUrl, siteWeb }
    });
    return res.status(201).json(newMedia);
  }
  if (req.method === "PUT") {
    const { id, ...data } = req.body;
    const updated = await prisma.mediaPartner.update({ where: { id }, data });
    return res.status(200).json(updated);
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    await prisma.mediaPartner.delete({ where: { id } });
    return res.status(204).end();
  }
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 