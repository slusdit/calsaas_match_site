'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent } from "react"
import SchoolSelector from "../SchoolSelector"
import { Switch } from "@/components/ui/switch"

const GlobalFilterControls = (
    { searchString, handleInputChange, doHighlight, setDoHighlight, setCompleteSwitch, setSelectedSchool }: {
        searchString: string,
        handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void,
        doHighlight: boolean,
        setDoHighlight: (doHighlight: boolean) => void,
        setCompleteSwitch: (completeSwitch: boolean) => void,
        setSelectedSchool: (selectedSchool: string | null) => void
    }
) => {

    return (
        <div className="p-6 m-auto">
            <div className=" flex w-full items-center gap-10">
                <div>

                    <Label htmlFor="searchOption">
                        Search for Teachers:
                    </Label>
                    <Input
                        id="searchOption"
                        type="text"
                        value={searchString}
                        onChange={handleInputChange}
                        placeholder="Last name / SEID"
                    />
                </div>
                <div>
                    <SchoolSelector onSchoolChange={setSelectedSchool} />
                </div>
            </div>
            <div className="p-2 flex flex-col min-w-full gap-5 justify-center">

                <div className="align-middle text-center flex">
                    <Switch
                        id="highlight-switch"
                        checked={doHighlight}
                        onCheckedChange={() => setDoHighlight(current => !current)}
                        aria-readonly
                    />
                    <div className="ml-4">
                        <Label htmlFor="highlight-switch">
                            Highlight
                        </Label>
                    </div>
                </div>
                <div className="align-middle text-center flex">
                    <Switch
                        id="complete-switch"
                        checked={doHighlight}
                        onCheckedChange={() => setCompleteSwitch(current:boolean => !current)}
                    aria-readonly
            />
                    <div className="ml-4">
                        <Label htmlFor="complete-switch">
                            Show Complete
                        </Label>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default GlobalFilterControls