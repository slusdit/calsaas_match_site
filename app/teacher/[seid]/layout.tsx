import { serverAuth } from "@/lib/auth";
import TeacherHeader from "./components/TeacherHeader";
import UnauthorizedButton from "@/app/components/buttons/UnauthorizedButton";

export default async function TeacherLayout({
    children,
    params
  }: {
    children: React.ReactNode;
    params: {seid: string}
  })  {

    const session = await serverAuth()
    return (
        <main>
            {/* <TeacherHeader name={params.seid} /> */}
            <div className="flex m-auto justify-between items-start 0-mt-11">
              {session ?
                children 
                :
                <UnauthorizedButton signIn/>
              }
            </div>
        </main>
    )
}