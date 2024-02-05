import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Check, XOctagon } from "lucide-react"

interface MatchCounts {
    matchCount: number
    noMatchCount: number
    errorCount: number
}


const MatchCountBadges = ({ counts, courseCount }: { counts: MatchCounts, courseCount: number }) => {
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
        if (counts.matchCount === courseCount) {
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
    const warningColor = counts.noMatchCount > 0 ? "hsl(var(--warning))" : "hsl(var(--muted))"
    return (
        <div className="flex justify-between h-4 mt-4 mb-4">

            <div className="m-auto">
                <Check color={matchColor().match.iconColor} className="m-auto mb-1" />
                <Badge className={`${matchColor().match.badgeColor} text-md`}>
                    {counts.matchCount}
                </Badge>
            </div>

            <div className="m-auto ">
                <AlertTriangle color={matchColor().warning.iconColor} className="m-auto mb-1" />
                <Badge className={`${matchColor().warning.badgeColor} text-md`}  >
                    {counts.noMatchCount}
                </Badge>
            </div>

            <div className="m-auto">
                <XOctagon color={matchColor().error.iconColor} className="m-auto mb-1" />
                <Badge className={`${matchColor().error.badgeColor}  text-md`}>
                    {counts.errorCount}
                </Badge>
            </div>
        </div>

    )

}

export default MatchCountBadges