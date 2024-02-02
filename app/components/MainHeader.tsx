import Link from "next/link";
import LoginButton from "./buttons/LoginButton";
import { Button } from "@/components/ui/button";
import { serverAuth } from "@/lib/auth";

export default async function MainHeader() {

    const session = await serverAuth()
    console.log(session)
    

    return (
        <nav
            className="
          flex flex-wrap
          items-center
          justify-between
          bg-secondary
          text-secondary-foreground
          w-full
          py-4
          md:py-0
          px-4
          text-xl
          font-bold
        "
        >
            <div>
                <Button variant="link" className="text-secondary-foreground text-xl font-bold hover">

                    <Link href="/">
                        Calsaas Early Warning
                    </Link>
                </Button>
            </div>


            <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
                <ul
                    className="
              text-base 
              text-secondary
              md:flex
              md:justify-between 
              md:pt-0"
                >
                    {session?.user?.role.some( (role:string) => {
                        
                        role ==='SUPERADMIN'}) && (
                    <li>
                        <Button asChild variant="link">
                            <Link
                                className="md:p-4 py-2 block text-primary-foreground"
                                href="/admin"
                            >
                                Admin
                            </Link>
                        </Button>
                    </li>
                        )
                    }
                </ul>
                <div className="py-3">
                    <LoginButton />
                </div>
            </div>
        </nav>
    )
}