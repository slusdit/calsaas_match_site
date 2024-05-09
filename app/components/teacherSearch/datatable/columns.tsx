'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Check, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { credentialAuthMatch, jp } from "@/lib/utils";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { redirect, useRouter } from "next/navigation"
// import Link from "next/link"
// import { toast } from "sonner"
import { type TeacherCardType } from "@/lib/types"
import { type Teacher } from "@prisma/client"
import MatchCountBadges from "../../cards/MatchCountBadges"

// export type Payment = {
//     id: string
//     amount: number
//     status: "pending" | "processing" | "success" | "failed"
//     email: string
// }




export type TeacherRow = {

}

const countMatches = (teacher: TeacherCardType) => {
    let matchCount = 0
    let noMatchCount = 0
    let errorCount = 0
    if (teacher.sections) {
        teacher.sections.forEach((section) => {
            const matched = credentialAuthMatch({
                credentials: teacher.credentials,
                stateCourseAuth: section.course.authTableId
            })


            if (matched === 'match') {
                matchCount++
            }
            if (matched === 'noAuth' || matched === 'noCredentials') {
                errorCount++
            }
            if (matched === 'noMatch') {
                noMatchCount++
            }
        });

        return {
            matchCount: matchCount,
            noMatchCount: noMatchCount,
            errorCount: errorCount
        };
    }
    return {
        matchCount: 0,
        noMatchCount: 0,
        errorCount: 99
    }
}

export const columns: ColumnDef<TeacherCardType, unknown>[] = [

    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'seid',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    SEID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.original.seid}
                </div>
            )
        }
    },
    {
        accessorKey: 'lastName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.original.lastName}
                </div>
            )
        }
    },
    {
        accessorKey: 'firstName',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    First Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.original.firstName}
                </div>
            )
        }
    },
    {
        accessorKey: 'credentialCount',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Credential Count
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.original.credentials?.length}
                </div>
            )
        }
    },
    {
        accessorKey: 'sectionCount',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Section Count
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.original.sections?.length}

                </div>
            )

        }

    },
    {
        accessorKey: 'matchCountBadges',
        header: 'CALSAAS Check',

        cell: ({ row }) => {
            return (
                <span className="text-center">

                    {/* <MatchCountBadges
                        counts={}
                        /> */}
                </span>
            )

        }

    },

    // {
    //     accessorKey: 'status',
    //     header: 'Status'
    // }, 

    // {
    //     accessorKey: 'requested',
    //     header: 'Requested',
    //     cell: ({ row }) => {
    //         if (row.getValue('requested') === true) {
    //             return <Check className="h-4 w-4 text-emerald-500" />
    //         } else {
    //             return null
    //         }
    //     }
    // },
    // {
    //     accessorKey: 'date',
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 Date
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         )
    //     },
    //     cell: ({ row }) => {
    //         return new Date(row.getValue('date')).toLocaleDateString('en-CA')
    //     }
    // },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const media = row.original

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() => navigator.clipboard.writeText(media.tmdb_id.toString())}
    //                     >
    //                         Copy tmdb ID
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <Link href={`/${media.tmdb_type}/${media.tmdb_id}`}>
    //                         <DropdownMenuItem
    //                             onClick={() => redirect(`/${media.tmdb_type}/${media.tmdb_id}`)}
    //                         >
    //                             View detail page
    //                         </DropdownMenuItem>
    //                     </Link>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem
    //                         className='bg-primary text-primary-foreground'
    //                         onClick={() => {
    //                             const id = media.id
    //                             toast.promise(
    //                                 database.updateDocument('watchlist', process.env.NEXT_PUBLIC_APPWRITE_WATCHLIST_COLLECTION_ID, id, {
    //                                     plex_request: !media.requested
    //                                 })
    //                                 ,
    //                                 {
    //                                     loading: 'Deleting...',
    //                                     success: () => {
    //                                         return 'Request toggled'
    //                                     },
    //                                     error: (error) => {
    //                                         console.error({ error })
    //                                         return 'Oops! There was an error deleting the request. Error: ' + error
    //                                     }
    //                                 }
    //                             )
    //                         }}
    //                     >
    //                         Toggle Request
    //                     </DropdownMenuItem>
    //                     <DropdownMenuItem
    //                         className='bg-destructive text-destructive-foreground'
    //                         onClick={() => {
    //                             const id = media.id
    //                             toast.promise(

    //                                 database.deleteDocument('watchlist', process.env.NEXT_PUBLIC_APPWRITE_WATCHLIST_COLLECTION_ID, id)
    //                                 ,
    //                                 {
    //                                     loading: 'Deleting...',
    //                                     success: () => {
    //                                         return 'Request deleted'
    //                                     },
    //                                     error: (error) => {
    //                                         console.error({ error })
    //                                         return 'Oops! There was an error deleting the request. Error: ' + error
    //                                     }
    //                                 }

    //                             )
    //                         }}
    //                     >Delete Request</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     },
    // },
]