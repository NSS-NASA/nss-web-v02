import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  Leaf,
  Satellite,
  Clock,
  TrendingDown,
  FileText,
  Eye,
  Download,
  MapPin
} from 'lucide-react';

interface DebrisAlert {
  id: string;
  object: string;
  missDistance: number;
  time: string;
  risk: 'low' | 'medium' | 'high';
  maneuverRequired: boolean;
}

interface Mission {
  id: string;
  name: string;
  launchDate: string;
  deorbitDate: string;
  status: 'active' | 'planned' | 'deorbited';
  complianceScore: number;
}

const debrisAlerts: DebrisAlert[] = [
  {
    id: '1',
    object: 'Cosmos 1408 Fragment',
    missDistance: 1.2,
    time: '2024-10-05 14:23:00',
    risk: 'medium',
    maneuverRequired: true
  },
  {
    id: '2',
    object: 'Unknown Debris',
    missDistance: 2.8,
    time: '2024-10-05 18:45:00',
    risk: 'low',
    maneuverRequired: false
  },
  {
    id: '3',
    object: 'Fengyun-1C Fragment',
    missDistance: 0.9,
    time: '2024-10-06 02:15:00',
    risk: 'high',
    maneuverRequired: true
  }
];

const missions: Mission[] = [
  {
    id: '1',
    name: 'NSS Pharma Lab Alpha',
    launchDate: '2023-03-15',
    deorbitDate: '2026-03-15',
    status: 'active',
    complianceScore: 96
  },
  {
    id: '2',
    name: 'NSS Materials Research',
    launchDate: '2023-08-22',
    deorbitDate: '2026-08-22',
    status: 'active',
    complianceScore: 94
  },
  {
    id: '3',
    name: 'NSS Data Relay',
    launchDate: '2022-11-10',
    deorbitDate: '2025-11-10',
    status: 'active',
    complianceScore: 98
  }
];

export function Sustainability() {
  const [activeTab, setActiveTab] = useState('overview');

  const getRiskColor = (risk: DebrisAlert['risk']) => {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'destructive';
    }
  };

  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'planned':
        return 'info';
      case 'deorbited':
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Sustainability & Compliance
          </h1>
          <p className="text-muted-foreground">
            Orbital safety, debris mitigation, and regulatory compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="glass-chip">
            <CheckCircle className="w-3 h-3 mr-1" />
            Compliant
          </Badge>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="nss-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">94</div>
                <div className="text-sm text-muted-foreground">Compliance Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="nss-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">25/25</div>
                <div className="text-sm text-muted-foreground">De-orbit Plans</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="nss-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="nss-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">87%</div>
                <div className="text-sm text-muted-foreground">Carbon Neutral</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="debris">Debris Tracking</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="lifecycle">Mission Lifecycle</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Sustainability Score */}
            <Card className="nss-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Sustainability Scorecard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-success mb-2">94</div>
                  <Badge variant="default" className="glass-chip">
                    Excellent Rating
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Debris Mitigation</span>
                      <span className="text-success">98/100</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Regulatory Compliance</span>
                      <span className="text-success">95/100</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Collision Avoidance</span>
                      <span className="text-warning">89/100</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Carbon Footprint</span>
                      <span className="text-info">87/100</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="nss-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Recent Debris Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {debrisAlerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="glass rounded-lg p-3 border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{alert.object}</span>
                        <Badge variant={getRiskColor(alert.risk) as any} className="text-xs">
                          {alert.risk.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Miss Distance: {alert.missDistance}km</span>
                        <span>{new Date(alert.time).toLocaleString()}</span>
                      </div>
                      {alert.maneuverRequired && (
                        <div className="mt-2">
                          <Button size="sm" variant="outline" className="w-full">
                            Plan Maneuver
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Environmental Impact */}
          <Card className="nss-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-success">0.08</div>
                  <div className="text-sm text-muted-foreground">Debris Objects per Mission</div>
                  <div className="text-xs text-success">Target: &lt;0.1</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-success">99.2%</div>
                  <div className="text-sm text-muted-foreground">De-orbit Success Rate</div>
                  <div className="text-xs text-success">Target: &gt;99%</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-info">87%</div>
                  <div className="text-sm text-muted-foreground">Carbon Neutral Progress</div>
                  <div className="text-xs text-warning">Target: 100% by 2026</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debris" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Debris Map */}
            <Card className="nss-panel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  ORDEM Debris Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gradient-to-br from-background to-muted rounded-lg border relative overflow-hidden">
                  {/* Simulated orbital map */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Earth representation */}
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-green-500 relative">
                        {/* Orbital rings */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute inset-0 rounded-full border border-primary/20"
                            style={{
                              width: `${150 + i * 60}px`,
                              height: `${150 + i * 60}px`,
                              left: `${-10 - i * 30}px`,
                              top: `${-10 - i * 30}px`
                            }}
                          />
                        ))}
                        
                        {/* Debris points */}
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className={`absolute w-2 h-2 rounded-full ${
                              i < 3 ? 'bg-destructive' : i < 6 ? 'bg-warning' : 'bg-success'
                            }`}
                            style={{
                              left: `${Math.random() * 200 + 50}px`,
                              top: `${Math.random() * 200 + 50}px`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <span>High Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <span>Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span>Low Risk</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts List */}
            <Card className="nss-panel">
              <CardHeader>
                <CardTitle>All Debris Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {debrisAlerts.map((alert) => (
                    <div key={alert.id} className="glass rounded-lg p-4 border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{alert.object}</span>
                        <Badge variant={getRiskColor(alert.risk) as any}>
                          {alert.risk.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>Miss Distance: {alert.missDistance} km</div>
                        <div>Time: {new Date(alert.time).toLocaleString()}</div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        {alert.maneuverRequired && (
                          <Button size="sm" className="flex-1">
                            Plan Maneuver
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="nss-panel">
              <CardHeader>
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'FCC License', status: 'Valid', expires: '2025-12-15', score: 100 },
                  { name: 'FAA Launch License', status: 'Valid', expires: '2024-08-30', score: 95 },
                  { name: 'NOAA Remote Sensing', status: 'Valid', expires: '2026-01-22', score: 98 },
                  { name: 'UN Registration', status: 'Complete', expires: 'N/A', score: 100 },
                  { name: 'ITU Coordination', status: 'In Progress', expires: '2024-11-15', score: 75 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 glass rounded-lg border">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.expires !== 'N/A' ? `Expires: ${item.expires}` : 'Permanent'}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={item.score >= 95 ? 'default' : item.score >= 80 ? 'secondary' : 'destructive'}
                        className="mb-1"
                      >
                        {item.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">{item.score}/100</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="nss-panel">
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Quarterly Debris Assessment', date: '2024-Q3', status: 'Submitted' },
                  { name: 'Annual Safety Review', date: '2024', status: 'In Review' },
                  { name: 'Environmental Impact Report', date: '2024', status: 'Draft' },
                  { name: 'De-orbit Plan Update', date: '2024-09', status: 'Approved' }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 glass rounded-lg border">
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">{report.date}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{report.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lifecycle" className="space-y-6">
          <Card className="nss-panel">
            <CardHeader>
              <CardTitle>Mission Lifecycle Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {missions.map((mission) => (
                  <div key={mission.id} className="glass rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{mission.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          Launched: {new Date(mission.launchDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusColor(mission.status) as any} className="mb-1">
                          {mission.status.toUpperCase()}
                        </Badge>
                        <div className="text-sm">Score: {mission.complianceScore}/100</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Planned De-orbit:</span>
                        <div>{new Date(mission.deorbitDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time Remaining:</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {Math.ceil((new Date(mission.deorbitDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 365 * 2))} years
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Compliance Score</span>
                        <span>{mission.complianceScore}%</span>
                      </div>
                      <Progress value={mission.complianceScore} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}