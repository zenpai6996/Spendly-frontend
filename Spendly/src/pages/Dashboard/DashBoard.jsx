import React from 'react'
import DashboardLayout from '@/components/Layouts/DashboardLayout'
import { useUserAuth } from '@/hooks/useUserAuth';

const Dashboard = () => {
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
      Home
      </div>
    </DashboardLayout>
  )
}

export default Dashboard