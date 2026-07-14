import { BrowserRouter } from "react-router";
import { Loading } from "../components/Loading";
import { AuthRoutes} from "./auth-routes"
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";

const isLoadind = false
//const session = undefined

const session = {
  user: {
    role: "employee",
  }
}


export function Routes() {
  function Route() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes/>

      case "manager":
        return <ManagerRoutes/>
    
      default:
        return <AuthRoutes />
        
    }
  }
  if(isLoadind) {
    return <Loading/>
  }
  return (
    <BrowserRouter>
      <Route/>
    </BrowserRouter>
  )
}