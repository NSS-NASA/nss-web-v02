import Image from "next/image";
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { MissionControlDashboard } from './components/dashboard/MissionControlDashboard';
import { PharmaStudio } from './components/pharma/PharmaStudio';
import { AICopilot } from './components/ai-copilot/AICopilot';
import { DigitalTwin } from './components/digital-twin/DigitalTwin';
import { DataHub } from './components/data-hub/DataHub';
import { Sustainability } from './components/sustainability/Sustainability';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Settings, Users, CreditCard, BarChart3 } from 'lucide-react';

export default function Home() {
    const [currentPage, setCurrentPage] = useState('dashboard');

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'dashboard':
                return <MissionControlDashboard />;
            case 'pharma':
                return <PharmaStudio />;
            case 'digital-twin':
                return <DigitalTwin />;
            case 'data-hub':
                return <DataHub />;
            case 'ai-copilot':
                return <AICopilot />;
            case 'sustainability':
                return <Sustainability />;
            case 'admin':
                return <AdminPanel />;
            default:
                return <MissionControlDashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-background dark">
            <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
                {renderCurrentPage()}
            </Layout>
        </div>
    );
}