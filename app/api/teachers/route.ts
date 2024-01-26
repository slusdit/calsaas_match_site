import { PrismaClient, Teacher } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const config = {
  api: {
    responseLimit: false,
  },
}
export const teachers(req: Request, res: Response) {
    
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
    }
  });
   return res.status(200).json(teachers);
  }

export { teachers as POST }
