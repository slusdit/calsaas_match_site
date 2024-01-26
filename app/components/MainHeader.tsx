import LoginButton from "./LoginButton";

export default function MainHeader(){    

    return (
        <div className="p-2 bg-blue-600 ">
            <div className=" ml-3 text-xl font-bold text-white text-center flex justify-between ">
                <div>
                    CALSAAS Early Warning
                </div>
                <div className="justify-end">
                    <LoginButton />
                </div>
            </div>
        
        </div>
    )
}