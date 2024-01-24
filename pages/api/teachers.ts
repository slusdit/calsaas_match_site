import { PrismaClient, Teacher } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const teachers:Teacher[] = await prisma.teacher.findMany();
    res.status(200).json(teachers);
  }
}
