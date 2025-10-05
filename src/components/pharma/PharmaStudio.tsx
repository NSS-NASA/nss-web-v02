import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  FlaskConical, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Bot,
  Beaker,
  Zap,
  Download,
  Eye,
  Settings
} from 'lucide-react';

interface ExperimentProps {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'queued' | 'failed';
  progress: number;
  timeRemaining?: string;
  protocol: string;
  temperature: string;
  results?: {
    crystalSize: string;
    diffraction: string;
    quality: string;
  };
}

const experiments: ExperimentProps[] = [
  {
    id: 'exp-001',
    name: 'Insulin Crystallization Alpha',
    status: 'running',
    progress: 67,
    timeRemaining: '6h 23m',
    protocol: 'Microgravity Enhanced Crystal Growth v2.1',
    temperature: '4°C',
  },
  {
    id: 'exp-002', 
    name: 'Antibody Folding Study',
    status: 'completed',
    progress: 100,
    protocol: 'Protein Folding Analysis v1.8',
    temperature: '37°C',
    results: {
      crystalSize: '1.2mm',
      diffraction: '1.1 Å',
      quality: 'Excellent'
    }
  },
  {
    id: 'exp-003',
    name: 'Cancer Drug Protein Complex',
    status: 'queued',
    progress: 0,
    protocol: 'Complex Formation Study v3.0',
    temperature: '20°C',
  }
];

function ExperimentCard({ experiment }: { experiment: ExperimentProps }) {
  const statusIcons = {
    running: <Play className="h-4 w-4 text-info" />,
    completed: <CheckCircle className="h-4 w-4 text-success" />,
    queued: <Clock className="h-4 w-4 text-muted-foreground" />,
    failed: <Pause className="h-4 w-4 text-destructive" />
  };

  const statusColors = {
    running: 'info',
    completed: 'default',
    queued: 'secondary',
    failed: 'destructive'
  } as const;

  return (
    <Card className="nss-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{experiment.name}</CardTitle>
          <Badge variant={statusColors[experiment.status]} className="glass-chip">
            {statusIcons[experiment.status]}
            <span className="ml-1 capitalize">{experiment.status}</span>
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{experiment.protocol}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {experiment.status === 'running' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{experiment.progress}%</span>
            </div>
            <Progress value={experiment.progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Time Remaining: {experiment.timeRemaining}</span>
              <span>Temp: {experiment.temperature}</span>
            </div>
          </div>
        )}

        {experiment.results && (
          <div className="grid grid-cols-3 gap-4 p-3 glass rounded-lg">
            <div className="text-center">
              <div className="font-semibold text-success">{experiment.results.crystalSize}</div>
              <div className="text-xs text-muted-foreground">Crystal Size</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-primary">{experiment.results.diffraction}</div>
              <div className="text-xs text-muted-foreground">Diffraction</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-info">{experiment.results.quality}</div>
              <div className="text-xs text-muted-foreground">Quality</div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          {experiment.status === 'completed' && (
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDB
            </Button>
          )}
          {experiment.status === 'queued' && (
            <Button size="sm" variant="default">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function PharmaStudio() {
  const [activeTab, setActiveTab] = useState('experiments');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pharma Studio</h1>
          <p className="text-muted-foreground">
            Microgravity pharmaceutical research platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="glass-chip">
            <Bot className="h-4 w-4 mr-2" />
            Ask AI for Protocol
          </Button>
          <Button>
            <FlaskConical className="h-4 w-4 mr-2" />
            New Experiment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="nss-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Beaker className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm text-muted-foreground">Active Studies</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="nss-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="nss-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="nss-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-info" />
              <div>
                <div className="text-2xl font-bold">3.2x</div>
                <div className="text-sm text-muted-foreground">Faster Results</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass">
          <TabsTrigger value="experiments">Active Experiments</TabsTrigger>
          <TabsTrigger value="protocols">Protocols</TabsTrigger>
          <TabsTrigger value="results">Results Library</TabsTrigger>
          <TabsTrigger value="design">Experiment Design</TabsTrigger>
        </TabsList>

        <TabsContent value="experiments" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {experiments.map((experiment) => (
              <ExperimentCard key={experiment.id} experiment={experiment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Protein Crystallization', version: 'v2.1', usage: '15 times', success: '96%' },
              { name: 'Antibody Folding', version: 'v1.8', usage: '8 times', success: '94%' },
              { name: 'Drug Complex Formation', version: 'v3.0', usage: '22 times', success: '91%' },
              { name: 'Enzyme Kinetics', version: 'v1.5', usage: '6 times', success: '89%' },
            ].map((protocol, index) => (
              <Card key={index} className="nss-card">
                <CardHeader>
                  <CardTitle className="text-base">{protocol.name}</CardTitle>
                  <Badge variant="outline" className="w-fit">{protocol.version}</Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Usage</span>
                    <span className="text-muted-foreground">{protocol.usage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span className="text-success">{protocol.success}</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3">
                    Use Protocol
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card className="nss-panel">
            <CardHeader>
              <CardTitle>Results Analysis Dashboard</CardTitle>
              <p className="text-sm text-muted-foreground">
                Compare crystallization outcomes and download structural data
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FlaskConical className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Results visualization and analysis tools</p>
                <p className="text-sm">Advanced analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <Card className="nss-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                AI-Assisted Experiment Design
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Design optimal protocols using GeneLab data and published research
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Intelligent protocol design wizard</p>
                <p className="text-sm">AI recommendations based on historical data</p>
                <Button className="mt-4">
                  Start New Design
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}