import DashboardNavbar from '../components/DashboardNavbar'
import AddNewLinkSection from '../components/AddNewLinkSection'

export default function Dashboard() {
  return (
    <div
      className="w-full h-full bg-whiteM flex flex-col"
      style={{
        minHeight: '100vh',
      }}
    >
      <DashboardNavbar />

      <AddNewLinkSection />
    </div>
  )
}
