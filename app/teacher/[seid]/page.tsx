import { Prisma, PrismaClient } from "@prisma/client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../@/components/ui/tabs";
import { notFound } from "next/navigation";
import CredentialsTable from "./components/CredentialsTable";

interface Params {
  params
}

const prisma = new PrismaClient();

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
                      // sectionTableId: true,
                      authTableId: true
                  }
              }
          }
      },

      credentials: true,  
    }
  })
  
  if (!teacher) {
    notFound();
  }
 
  return teacher
}
export default async function TeacherPage({params}: Params) {

  const teacher = await fetchTeacherBySeid(params.seid)

  return (
    <>
      <div className="">
        <div className="p-2 mt-8">
          <h1>Name: {teacher.firstName} {teacher.lastName}</h1>
        </div>
        <div className="p-2 mt-10 border-4">
          <div>Credentials:</div>
          <CredentialsTable credentials={teacher.credentials} />

        </div>

      
        
      </div>
    </>
  );
}
