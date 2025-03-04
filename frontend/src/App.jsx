import { Route, Routes } from 'react-router-dom'
import AdminChallenges from './pages/AdminChallenges'
import AdminCompleters from './pages/AdminCompleters'
import AdminDashboard from './pages/AdminDashboard'
import AdminFounders from './pages/AdminFounders'
import AdminSubscribers from './pages/AdminSubscribers'
import Home from './pages/Home'



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="challenges" element={<AdminChallenges />} />
        <Route path="completers" element={<AdminCompleters />} />
        <Route path="founders" element={<AdminFounders />} />
        <Route path="subscribers" element={<AdminSubscribers />} />
      </Route>
    </Routes>
  )
}
