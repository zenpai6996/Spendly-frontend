
import React, { use } from 'react'
import { useUserAuth } from '@/hooks/useUserAuth'
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import SpendlyAI from '@/components/AI/SpendlyAI';

const Home = () => {
  useUserAuth();

  return (
  
    <DashboardLayout activeMenu={"SpendlyAI"}>
      <div className="p-6">
        <SpendlyAI />
      </div>
    </DashboardLayout>

  )
}

export default Home