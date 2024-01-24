import { PrismaClient, Teacher } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    responseLimit: false,
  },
}
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const teachers: Teacher[] = await prisma.teacher.findMany({
        take: 50,
      orderBy: {
        // TODO: Add SC once table is setup
        // sc: 'asc', 
        lastName: 'asc'
      }, 
      include: {
        sections: true,
        credentials: true
        }});
    res.status(200).json(teachers);
  }
}
