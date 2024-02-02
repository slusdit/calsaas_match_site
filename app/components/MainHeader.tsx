import Link from "next/link";
import LoginButton from "./LoginButton";
import TestLogButton from "./TestLogButton";

export default function MainHeader(){    

    return (
        <div className="p-2 bg-foreground ">
            <div className=" ml-3 text-xl font-bold text-white text-center flex justify-between">
                <Link href={'/'} >
                    <div className="pt-1">
                        CALSAAS Early Warning
                    </div>
                </Link>
                <div className="justify-end">
                    <LoginButton />
                </div>
            </div>
        
        </div>
    )
}