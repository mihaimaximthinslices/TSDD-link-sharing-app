import DashboardNavbar from '../components/DashboardNavbar'
import DashboardMainScreen from '../components/DashboardMainScreen'

export default function Dashboard() {
  return (
    <div
      className="w-full h-full bg-whiteM flex flex-col"
      style={{
        minHeight: '100vh',
      }}
    >
      <DashboardNavbar />

      <DashboardMainScreen />
    </div>
  )
}
