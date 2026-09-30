import { Outlet } from "react-router-dom"
import Styles from "./_admin.module.css"
import AdminSidebar from "./AdminSidebar"

const AdminDashboard = () => {
  return (
    <section className={Styles.admin_dashboard}>
      <article className='admin-container'>
          <aside>
            <AdminSidebar/>
          </aside>
          <aside>
            <Outlet/>
          </aside>
      </article>
    </section>
  )
}

export default AdminDashboard