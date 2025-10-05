import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  Satellite, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Zap,
  Globe,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

interface StatusWidgetProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  status: 'success' | 'warning' | 'danger' | 'info';
}

function StatusWidget({ title, value, change, icon, status }: StatusWidgetProps) {
  const statusStyles = {
    success: 'border-success/20 bg-success/5',
    warning: 'border-warning/20 bg-warning/5', 
    danger: 'border-destructive/20 bg-destructive/5',
    info: 'border-info/20 bg-info/5'
  };

  return (
    <Card className={`nss-card ${statusStyles[status]}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function MissionControlDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
          <p className="text-muted-foreground">
            Real-time LEO operations & pharmaceutical research status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="glass-chip">
            <Activity className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusWidget
          title="LEO Constellation"
          value="24/25"
          change="↑ 1 satellite recovered"
          icon={<Satellite className="h-4 w-4 text-success" />}
          status="success"
        />
        <StatusWidget
          title="Active Experiments"
          value="7"
          change="3 pharma, 2 materials, 2 observation"
          icon={<Activity className="h-4 w-4 text-info" />}
          status="info"
        />
        <StatusWidget
          title="Debris Alerts"
          value="2"
          change="Miss distance: 1.2km, 2.8km"
          icon={<AlertTriangle className="h-4 w-4 text-warning" />}
          status="warning"
        />
        <StatusWidget
          title="Monthly Burn"
          value="$186k"
          change="↓ 12% from last month"
          icon={<DollarSign className="h-4 w-4 text-success" />}
          status="success"
        />
      </div>

      {/* Main Dashboard Widgets */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEO Status */}
        <Card className="nss-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              LEO Environment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-48 overflow-hidden rounded-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHN0YXRpb24lMjBvcmJpdCUyMGVhcnRofGVufDF8fHx8MTc1OTYxNDg2OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Earth from orbit"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between text-white text-sm">
                  <span>Next Window: 14:23 GMT</span>
                  <span>Coverage: 94%</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Comms Quality</span>
                  <span className="text-success">Excellent</span>
                </div>
                <Progress value={96} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Power Generation</span>
                  <span className="text-info">Normal</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pharma Runs */}
        <Card className="nss-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Pharmaceutical Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-48 overflow-hidden rounded-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1697603899273-7a79125c35a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwY3J5c3RhbCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzU5NjQ5NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Laboratory crystals"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Insulin Crystallization</span>
                <Badge variant="default" className="glass-chip">
                  <Clock className="w-3 h-3 mr-1" />
                  6h remaining
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Antibody Folding Study</span>
                <Badge variant="secondary" className="glass-chip">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Complete
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Protein Aggregation</span>
                <Badge variant="outline" className="glass-chip">
                  Queued
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Status Widgets */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sustainability Score */}
        <Card className="nss-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-success" />
              Sustainability Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-success">94</div>
              <p className="text-sm text-muted-foreground">Compliance Rating</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>De-orbit Plans</span>
                <span className="text-success">25/25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Debris Risk</span>
                <span className="text-success">Low</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Carbon Neutral</span>
                <span className="text-warning">87%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost & Utilization */}
        <Card className="nss-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Resource Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lab Capacity</span>
                  <span>76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Compute Usage</span>
                  <span>64%</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Data Storage</span>
                  <span>89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Hub Preview */}
        <Card className="nss-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Live Data Feeds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>NASA GeneLab</span>
              <Badge variant="outline" className="glass-chip text-xs">
                <Activity className="w-2 h-2 mr-1" />
                Syncing
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>ESA Copernicus</span>
              <Badge variant="outline" className="glass-chip text-xs">
                <CheckCircle className="w-2 h-2 mr-1" />
                Updated
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>ORDEM Debris</span>
              <Badge variant="outline" className="glass-chip text-xs">
                <CheckCircle className="w-2 h-2 mr-1" />
                Live
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>PubMed Citations</span>
              <Badge variant="outline" className="glass-chip text-xs">
                <Activity className="w-2 h-2 mr-1" />
                Processing
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}