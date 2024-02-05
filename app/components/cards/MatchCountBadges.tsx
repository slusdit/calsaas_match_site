import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle, Check, XOctagon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface MatchCounts {
    matchCount: number
    noMatchCount: number
    errorCount: number
}


const MatchCountBadges = ({
    counts,
    courseCount,
    setIsComplete,
    setIsFullError,
    setIsFullWarning
}: {
    counts: MatchCounts,
    courseCount: number,
    setIsComplete?: Dispatch<SetStateAction<boolean>>
    setIsFullError?: Dispatch<SetStateAction<boolean>>
    setIsFullWarning?: Dispatch<SetStateAction<boolean>>
}) => {
    const matchColor = () => {
        let colors = {
            match: {
                iconColor: "hsl(var(--muted))",
                badgeColor: "bg-muted"
            },
            warning: {
                iconColor: "hsl(var(--muted))",
                badgeColor: "bg-muted"
            },
            error: {
                iconColor: "hsl(var(--muted))",
                badgeColor: "bg-muted"
            }
        }
        if (counts.matchCount > 0) {
            colors.match = {
                iconColor: "hsl(var(--spotlight))",
                badgeColor: "bg-spotlight text-spotlight-foreground"
            }

        }

        if (counts.noMatchCount > 0) {
            colors.warning = {
                iconColor: "hsl(var(--warning))",
                badgeColor: "bg-warning text-warning-foreground"
            }
        }

        if (counts.errorCount > 0) {
            colors.error = {
                iconColor: "hsl(var(--destructive))",
                badgeColor: "bg-destructive text-destructive-foreground"
            }
        }

        return colors
    }
    if (setIsComplete && counts.matchCount === courseCount) {
        setIsComplete(true)
    }

    if (setIsFullError && counts.errorCount === courseCount) {
        setIsFullError(true)
    }
    if (setIsFullWarning && counts.noMatchCount === courseCount) {
        setIsFullWarning(true)
    }
    // const mainClass = counts.matchCount === courseCount ? "bg-spotlight text-spotlight-foreground flex justify-between h-4 mt-4 mb-4" : "flex justify-between h-4 mt-4 mb-4"
    // // const warningColor = counts.noMatchCount > 0 ? "hsl(var(--warning))" : "hsl(var(--muted))"
    return (
        <div className="flex justify-between h-4 mt-4 mb-4">

            <TooltipProvider>
            <div className="m-auto">
            <Tooltip>
                    <TooltipTrigger className="font-bold">
                <Check color={matchColor().match.iconColor} className="m-auto mb-1" />
                <Badge className={`${matchColor().match.badgeColor} text-md`}>
                    {counts.matchCount}
                </Badge>
                </TooltipTrigger>
                    <TooltipContent className="w-20">
                        Number of matched courses
                    </TooltipContent>
                </Tooltip>
            </div>

<div className="m-auto">

                <Tooltip>
                    <TooltipTrigger className="font-bold">
                        <AlertTriangle color={matchColor().warning.iconColor} className="m-auto mb-1" />
                        <Badge className={`${matchColor().warning.badgeColor} text-md`}  >
                            {counts.noMatchCount}
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="w-24">
                        Number of unmatched courses
                    </TooltipContent>
                </Tooltip>
</div>


            <div className="m-auto">
            <Tooltip>
                    <TooltipTrigger className="font-bold">
                <XOctagon color={matchColor().error.iconColor} className="m-auto mb-1" />
                <Badge className={`${matchColor().error.badgeColor}  text-md`}>
                    {counts.errorCount}
                </Badge>
                </TooltipTrigger>
                    <TooltipContent className="w-20">
                        Error! Possible data missing
                    </TooltipContent>
                </Tooltip>
            </div>
            </TooltipProvider>
        </div>

    )

}

export default MatchCountBadges