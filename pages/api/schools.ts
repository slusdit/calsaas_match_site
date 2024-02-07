import { PrismaClient, Teacher, Section, TeacherCredential, School } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const schools: School[] = await prisma.school.findMany({
        where:{
          sections:{
            some:{}
          }
        }
      });
      res.status(200).json(schools);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else
  if (req.method === "GET") {
    const sc = req.query.sc
    try {
      const school:School | null = await prisma.school.findUnique({
        where: {
          sc:sc
        }
      });
      res.status(200).json({"sc":school?.sc, "name":school?.name})
    } catch (error) {
      {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

export const config = {
  // api: {
  //   responseLimit: false,
  // }
}
// export { handler as POST}