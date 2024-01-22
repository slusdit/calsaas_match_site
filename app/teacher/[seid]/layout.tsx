import TeacherHeader from "./components/TeacherHeader";

export default function TeacherLayout({
    children,
    params
  }: {
    children: React.ReactNode;
    params: {seid: string}
  })  {

    
    return (
        <main>
            {/* <TeacherHeader name={params.seid} /> */}
            <div className="flex m-auto w-2/3 justify-between items-start 0-mt-11">
                {children}
            </div>
        </main>
    )
}