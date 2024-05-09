import { DataTable } from './datatable/DataTable';
import { columns } from './datatable/columns';
import { type TeacherCardType } from '@/lib/types';

export default async function TeacherListDatatable({
    teachers,
    doHighlight,
    showComplete,
    showError,
    showWarning
}: {
    teachers: TeacherCardType[],
    doHighlight?: boolean
    showComplete?: boolean,
    showError?: boolean,
    showWarning?: boolean,
}) {

    return (
        <section className='pt-6'>
            <div className="container">
                <DataTable columns={columns} data={teachers}  />
            </div>
        </section>
    )
}