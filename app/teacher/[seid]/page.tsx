import { Prisma, PrismaClient } from "@prisma/client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../@/components/ui/tabs";
import { notFound } from "next/navigation";
import CredentialsTable from "./components/CredentialsTable";
import SectionsList from "./components/SectionsList";
import BackButton from "@/app/components/BackButton";
// Uncomment when in production
// import ma from "@/lib/prisma"

// Comment out when in production
const prisma = new PrismaClient();

interface Params {
  params: {
    seid: string
  }
}


const fetchTeacherBySeid = async (seid: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: {
      seid
    },
    include: {

      sections: {
        include: {
          course: {
            include: {
              authTableId: true
            }
          }
        }
      },

      credentials: true,
    },

  })

  if (!teacher) {
    notFound();
  }

  return teacher
}
export default async function TeacherPage({ params }: Params) {

  const seid = params.seid
  const teacher = await fetchTeacherBySeid(seid)
  return (
    <div className="m-auto md:flex-col">
      <div className="p-2 mt-8">
        <>
          <BackButton />
          <div className="mt-5">Name: <span className="font-bold">{teacher.firstName} {teacher.lastName}</span></div>
          <div className="mt-5">SEID: <span className="font-bold">{teacher.seid}</span></div>
        </>
      </div>
      <div className="flex space-x-4 mt-10">
        <div className="p-2 inline">
          <div className="font-bold">Teachers Credentials:</div>
          <CredentialsTable 
            credentials={teacher.credentials} 
            seid={seid}/>
        </div>
        <div className="p-2">
          <div className="font-bold">Classes</div>
            <SectionsList 
            sections={teacher.sections} 
            credentials={teacher.credentials} 
            />
          </div>
      </div>
    </div>
  );
}
