import { PrismaClient, TeacherCredential,  } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import prisma from '@/lib/prisma'

export default async function handle(req, res) {
 if (req.method === 'POST') {
  console.log(req)
    const { credPersonId, seid, caltidesNumId, docTitle, authCode, subjectCodeMajor, subjectCodeMinor } = req.body;
    // try {
      const newCredential = await prisma.teacherCredential.create({
        data: {
          credPersonId,
          seid,
          caltidesNumId,
          docTitle,
          authCode,
          subjectCodeMajor,
          subjectCodeMinor,
        },
      });
      res.status(201).json(newCredential);
    // } catch (error) {
    //   res.status(500).json({ message: 'Error creating new TeacherCredential', error: error });
    // }
 } else if (req.method === 'GET') {
    const { seid } = req.query;
    try {
      const credentials = await prisma.teacherCredential.findMany({
        where: {
          seid: seid,
        },
      });
      res.status(200).json(credentials);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching TeacherCredentials' });
    }
 } else {
    res.status(405).json({ error: 'Method not allowed' });
 }
}