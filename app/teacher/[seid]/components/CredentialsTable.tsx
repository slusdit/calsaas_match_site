 
interface credential {
    key_id: number;
    credPersonId: string;
    caltidesNumId: string | null;
    docTitle: string;
    authCode: string;
    subjectCodeMajor: string | null;
    subjectCodeMinor: string | null;
    created_at: Date;
    updated_at: Date;
}
export default function CredentialsTable({ credentials }: { credentials: credential[] }) {
    console.log(credentials)
    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th>Document Title</th>
                    <th>Auth Code</th>
                    <th>Major</th>
                    <th>Minor</th>
                </tr>
            </thead>
        <tbody>
        {credentials.map((cred) => (
            <tr >
            <td>{cred.docTitle}</td>
                <td>{cred.authCode}</td>
                <td>{cred.subjectCodeMajor}</td>
                <td>{cred.subjectCodeMinor}</td>
            </tr>
        ))}
        </tbody>
        </table>
    )
}