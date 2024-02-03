import { PrismaClient, TeacherCredential,  } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import prisma from '@/lib/prisma'

type CredentialCreate = Pick<TeacherCredential, 
'seid' | 
'docTitle' | 
'caltidesNumId' |
'authCode' | 
'subjectCodeMajor' | 
'subjectCodeMinor'
>;

export default async function handle(req, res) {
 if (req.method === 'POST') {
    const { seid, docTitle, authCode, subjectCodeMajor, subjectCodeMinor }:CredentialCreate = req.body;
    
    const caltidesNumId = seid   
    // try {
      const newCredential = await prisma.teacherCredential.create({
        data: {
          seid,
          docTitle,
          caltidesNumId,
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
      console.log(error)
      res.status(500).json({ error: error });
    }
 } else {
    res.status(405).json({ error: 'Method not allowed' });
 }
}