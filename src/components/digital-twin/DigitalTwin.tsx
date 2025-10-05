import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  Box, 
  Play, 
  Pause, 
  RotateCcw, 
  Download,
  Zap,
  Thermometer,
  Waves,
  Activity,
  Target,
  Settings,
  BarChart3
} from 'lucide-react';

interface SimulationParams {
  temperature: number;
  pressure: number;
  vibration: number;
  radiation: number;
  bufferPH: number;
  proteinConc: number;
}

interface SimulationResult {
  successProbability: number;
  crystallizationTime: number;
  crystalQuality: number;
  costEstimate: number;
}

export function DigitalTwin() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [activeScenario, setActiveScenario] = useState('current');
  
  const [params, setParams] = useState<SimulationParams>({
    temperature: 4,
    pressure: 1.0,
    vibration: 0.1,
    radiation: 0.3,
    bufferPH: 7.2,
    proteinConc: 10
  });

  const [results, setResults] = useState<SimulationResult>({
    successProbability: 87,
    crystallizationTime: 18.5,
    crystalQuality: 94,
    costEstimate: 245000
  });

  const scenarios = [
    { id: 'current', name: 'Current Setup', color: 'primary' },
    { id: 'optimized', name: 'AI Optimized', color: 'success' },
    { id: 'earth', name: 'Earth Baseline', color: 'muted' }
  ];

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          // Update results based on params
          setResults({
            successProbability: Math.min(95, 65 + (params.temperature * 2) + (params.bufferPH * 3)),
            crystallizationTime: Math.max(12, 24 - (params.proteinConc * 0.8)),
            crystalQuality: Math.min(98, 80 + (params.pressure * 10) + (10 - params.vibration * 20)),
            costEstimate: Math.round(200000 + (params.proteinConc * 5000) + (params.temperature * 10000))
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const updateParam = (key: keyof SimulationParams, value: number[]) => {
    setParams(prev => ({
      ...prev,
      [key]: value[0]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Box className="h-8 w-8 text-primary" />
            Digital Twin Simulator
          </h1>
          <p className="text-muted-foreground">
            Physics-aware microgravity experiment simulation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="glass-chip">
            GPU Accelerated
          </Badge>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 3D Viewport */}
        <div className="lg:col-span-2">
          <Card className="nss-panel">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  3D Simulation View
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={runSimulation}
                    disabled={isSimulating}
                    variant={isSimulating ? "secondary" : "default"}
                  >
                    {isSimulating ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Simulation
                      </>
                    )}
                  </Button>
                  <Button size="sm" variant="outline">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-gradient-to-br from-background to-muted rounded-lg overflow-hidden border">
                {/* Simulated 3D Environment */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* Lab Module Representation */}
                    <div className="absolute inset-0 glass rounded-xl flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full ${
                              i < 6 ? 'bg-primary/30' : 'bg-muted/30'
                            } border border-primary/20 animate-pulse`}
                            style={{
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Parameter Overlays */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 glass-chip px-2 py-1 text-xs">
                      <Thermometer className="w-3 h-3 inline mr-1" />
                      {params.temperature}°C
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 glass-chip px-2 py-1 text-xs">
                      <Waves className="w-3 h-3 inline mr-1" />
                      {params.vibration.toFixed(1)}g
                    </div>
                  </div>
                </div>

                {/* Simulation Progress Overlay */}
                {isSimulating && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="glass-strong p-6 text-center">
                      <div className="text-lg font-semibold mb-2">Running Physics Simulation</div>
                      <Progress value={simulationProgress} className="w-48 mb-2" />
                      <div className="text-sm text-muted-foreground">
                        {simulationProgress.toFixed(0)}% complete
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Scenario Tabs */}
              <div className="mt-4 flex gap-2">
                {scenarios.map((scenario) => (
                  <Button
                    key={scenario.id}
                    size="sm"
                    variant={activeScenario === scenario.id ? "default" : "outline"}
                    onClick={() => setActiveScenario(scenario.id)}
                  >
                    {scenario.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Results Dashboard */}
          <Card className="nss-panel mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Simulation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-success">
                    {results.successProbability}%
                  </div>
                  <div className="text-sm text-muted-foreground">Success Probability</div>
                  <Progress value={results.successProbability} className="h-2" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    {results.crystallizationTime.toFixed(1)}h
                  </div>
                  <div className="text-sm text-muted-foreground">Crystallization Time</div>
                  <Progress value={(24 - results.crystallizationTime) * 4} className="h-2" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-info">
                    {results.crystalQuality}%
                  </div>
                  <div className="text-sm text-muted-foreground">Crystal Quality</div>
                  <Progress value={results.crystalQuality} className="h-2" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-warning">
                    ${(results.costEstimate / 1000).toFixed(0)}k
                  </div>
                  <div className="text-sm text-muted-foreground">Estimated Cost</div>
                  <Progress value={Math.max(0, 100 - (results.costEstimate / 5000))} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parameter Controls */}
        <div className="space-y-6">
          <Card className="nss-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Temperature</span>
                  <span className="text-primary">{params.temperature}°C</span>
                </div>
                <Slider
                  value={[params.temperature]}
                  onValueChange={(value) => updateParam('temperature', value)}
                  max={20}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pressure</span>
                  <span className="text-primary">{params.pressure.toFixed(1)} atm</span>
                </div>
                <Slider
                  value={[params.pressure]}
                  onValueChange={(value) => updateParam('pressure', value)}
                  max={2.0}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Vibration</span>
                  <span className="text-primary">{params.vibration.toFixed(2)}g</span>
                </div>
                <Slider
                  value={[params.vibration]}
                  onValueChange={(value) => updateParam('vibration', value)}
                  max={1.0}
                  min={0.0}
                  step={0.01}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Radiation</span>
                  <span className="text-primary">{params.radiation.toFixed(1)} mSv</span>
                </div>
                <Slider
                  value={[params.radiation]}
                  onValueChange={(value) => updateParam('radiation', value)}
                  max={2.0}
                  min={0.0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Buffer pH</span>
                  <span className="text-primary">{params.bufferPH.toFixed(1)}</span>
                </div>
                <Slider
                  value={[params.bufferPH]}
                  onValueChange={(value) => updateParam('bufferPH', value)}
                  max={9.0}
                  min={5.0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Protein Conc.</span>
                  <span className="text-primary">{params.proteinConc}mg/ml</span>
                </div>
                <Slider
                  value={[params.proteinConc]}
                  onValueChange={(value) => updateParam('proteinConc', value)}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="nss-card">
            <CardHeader>
              <CardTitle>Sensitivity Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { param: 'Temperature', impact: 'High', value: '+12%' },
                { param: 'Buffer pH', impact: 'High', value: '+8%' },
                { param: 'Protein Conc.', impact: 'Medium', value: '+5%' },
                { param: 'Pressure', impact: 'Low', value: '+2%' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{item.param}</span>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={item.impact === 'High' ? 'destructive' : item.impact === 'Medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {item.impact}
                    </Badge>
                    <span className="text-success">{item.value}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="nss-card">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Apply AI Optimization
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                Save Scenario
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                Export to Experiment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}