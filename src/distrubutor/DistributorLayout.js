import { Navigate } from 'react-router-dom'
import { isDistributor } from '../auth/AuthProvider'
import MainLayout from '../layout/MainLayout'
import menuItems from './menuItems'



export default function DistributorLayout() {
  return isDistributor() ?  <MainLayout menuItems={menuItems} /> : <Navigate to="/login" />
}





