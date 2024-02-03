import Link from "next/link"
import LoginButton from "./LoginButton"

const UnauthorizedButton = ({
    signIn,
    home,
    role,
}:{
    signIn?: boolean,
    home?: boolean,
    role?: string[],

}) => {
    
    return (
        <div className="flex">
                {home &&
                <div className="flex-col items-center m-auto mt-10 rounded-lg place-content-center">
                    <div className="text-xl font-weight-800 mb-5">
                        Welcome!
                    </div>
                    <LoginButton />
                </div>
                }
                  {signIn &&
                <div className="m-auto mt-10 self-center rounded-lg bg-danger-200 hover:bg-danger-100 text-white">
                  <Link
                    className="text-xl text-center flex p-3"
                    href="/api/auth/signin"
                  >
                    Please Sign In
                  </Link>
                </div>
}
              </div>
    )
}

export default UnauthorizedButton