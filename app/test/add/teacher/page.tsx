// import TeacherForm from "./components/TeacherForm"
import { CredentialForm } from "./components/CredentialForm"
import FormDialog from "./components/FormDialogue"
const testPage = () => {
  const seid:string = '2015780964'
  return (
    <div className="flex">
      <div className="m-auto">
        <FormDialog title="Add Teacher Credential">
          <CredentialForm seid={seid}  />
        </FormDialog>
      </div>
    </div>
  )
}

export default testPage