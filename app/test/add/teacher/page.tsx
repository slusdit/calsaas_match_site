// import TeacherForm from "./components/TeacherForm"
import { CredentialForm } from "./components/CredentialForm"
const testPage = () => {
  const seid:string = '2015780964'
  return (
    <div className="flex">
      <div className="m-auto">
      <CredentialForm seid={seid}  />
      </div>
    </div>
  )
}

export default testPage