
import { Table } from '@tanstack/react-table'
import xlsx, { IJsonSheet } from 'json-as-xlsx'
export function downloadToExcel(
    table: Table<any>,
    // exportAll: boolean
){
    
    const { data } = table.options
    const { rowSelection, columnFilters, columnVisibility } = table.options.state
    // console.log(exportAll)

    let filteredData = table.getRowModel().rows.map((row) => row.original)

    // if (!exportAll) {

        if (columnFilters && columnFilters.length > 0) {
            filteredData = table.getFilteredRowModel()
                .rows.map((row) => row.original)

            console.log({ filteredData })

        }
        console.log(table.getSelectedRowModel().rows.length)
        if (rowSelection && table.getSelectedRowModel().rows.length > 0) {
            console.log(rowSelection)
            filteredData = table.getSelectedRowModel()
                .rows.map((row) => row.original)
            console.log({ filteredData })
        }
    // }


    let columns: IJsonSheet[] = [
        {
            sheet: 'Plex Requests',
            columns: [
                { label: 'SEID', value: 'seid' },
                { label: 'Last Name', value: 'lastName' },
                { label: 'First Name', value: 'firstName' },
                { label: 'Credential Count', value: 'credentialCount' },
                { label: 'Section Count', value: 'sectionCount' },
                { label: 'Match Count', value: (row) => (row?.matchCountBadges?.matchCount ? row.matchCountBadges.matchCount : 'matchCountBadges') },

                // { label: 'Date', value: (row: any) => row.date ? new Date(row.date).toLocaleDateString() : '' },
            ],
            content: filteredData
        }

    ]
    let settings = {
        fileName: 'Teachers', // Name of the resulting spreadsheet
    }
    xlsx(columns, settings)
}