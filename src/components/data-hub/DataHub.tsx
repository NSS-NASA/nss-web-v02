import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  ExternalLink,
  FileText,
  Globe,
  Satellite,
  Microscope,
  BookOpen,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'connected' | 'syncing' | 'error';
  datasets: number;
  lastUpdate: string;
  description: string;
}

interface Dataset {
  id: string;
  title: string;
  source: string;
  type: 'experiment' | 'imagery' | 'literature' | 'environmental';
  size: string;
  date: string;
  tags: string[];
  downloadUrl?: string;
  externalUrl?: string;
}

const dataSources: DataSource[] = [
  {
    id: 'genelab',
    name: 'NASA GeneLab',
    icon: <Microscope className="h-5 w-5" />,
    status: 'connected',
    datasets: 127,
    lastUpdate: '2 min ago',
    description: 'Space biology and omics datasets'
  },
  {
    id: 'ordem',
    name: 'ORDEM',
    icon: <AlertCircle className="h-5 w-5" />,
    status: 'connected',
    datasets: 45,
    lastUpdate: 'Live',
    description: 'Orbital debris environment data'
  },
  {
    id: 'worldview',
    name: 'NASA Worldview',
    icon: <Globe className="h-5 w-5" />,
    status: 'syncing',
    datasets: 2340,
    lastUpdate: '5 min ago',
    description: 'Near real-time Earth observation'
  },
  {
    id: 'copernicus',
    name: 'ESA Copernicus',
    icon: <Satellite className="h-5 w-5" />,
    status: 'connected',
    datasets: 890,
    lastUpdate: '1 hour ago',
    description: 'Sentinel satellite data'
  },
  {
    id: 'earthexplorer',
    name: 'USGS EarthExplorer',
    icon: <Globe className="h-5 w-5" />,
    status: 'connected',
    datasets: 1567,
    lastUpdate: '3 hours ago',
    description: 'Landsat historical imagery'
  },
  {
    id: 'pubmed',
    name: 'PubMed',
    icon: <BookOpen className="h-5 w-5" />,
    status: 'connected',
    datasets: 45670,
    lastUpdate: '30 min ago',
    description: 'Biomedical literature database'
  }
];

const sampleDatasets: Dataset[] = [
  {
    id: '1',
    title: 'Microgravity Effects on Insulin Crystallization',
    source: 'NASA GeneLab',
    type: 'experiment',
    size: '2.3 GB',
    date: '2024-01-15',
    tags: ['protein', 'crystallization', 'microgravity', 'insulin'],
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'ISS Protein Crystal Growth Experiment Data',
    source: 'NASA GeneLab',
    type: 'experiment',
    size: '1.8 GB',
    date: '2024-01-10',
    tags: ['protein', 'crystal', 'ISS', 'space'],
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Orbital Debris Population Model 2024',
    source: 'ORDEM',
    type: 'environmental',
    size: '450 MB',
    date: '2024-01-20',
    tags: ['debris', 'orbital', 'safety', 'tracking'],
    downloadUrl: '#'
  },
  {
    id: '4',
    title: 'Space-based Pharmaceutical Manufacturing Review',
    source: 'PubMed',
    type: 'literature',
    size: '15 MB',
    date: '2024-01-18',
    tags: ['pharmaceutical', 'space', 'manufacturing', 'review'],
    externalUrl: 'https://pubmed.ncbi.nlm.nih.gov'
  },
  {
    id: '5',
    title: 'Copernicus Sentinel-1 Europe Coverage',
    source: 'ESA Copernicus',
    type: 'imagery',
    size: '12.4 GB',
    date: '2024-01-22',
    tags: ['satellite', 'radar', 'europe', 'imaging'],
    downloadUrl: '#'
  }
];

export function DataHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('search');

  const getStatusIcon = (status: DataSource['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'syncing':
        return <Activity className="h-4 w-4 text-info animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getTypeIcon = (type: Dataset['type']) => {
    switch (type) {
      case 'experiment':
        return <Microscope className="h-4 w-4" />;
      case 'imagery':
        return <Satellite className="h-4 w-4" />;
      case 'literature':
        return <BookOpen className="h-4 w-4" />;
      case 'environmental':
        return <Globe className="h-4 w-4" />;
    }
  };

  const filteredDatasets = sampleDatasets.filter(dataset => {
    const matchesSearch = searchQuery === '' || 
      dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.some(filter => dataset.tags.includes(filter));

    return matchesSearch && matchesFilters;
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const popularTags = ['protein', 'crystallization', 'microgravity', 'space', 'satellite', 'debris', 'pharmaceutical'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Database className="h-8 w-8 text-primary" />
            Data Hub
          </h1>
          <p className="text-muted-foreground">
            Unified access to space and biological research datasets
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="glass-chip">
            <Activity className="w-3 h-3 mr-1" />
            6 Sources Active
          </Badge>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Bulk Export
          </Button>
        </div>
      </div>

      {/* Data Sources Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dataSources.map((source) => (
          <Card key={source.id} className="nss-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {source.icon}
                  <CardTitle className="text-base">{source.name}</CardTitle>
                </div>
                {getStatusIcon(source.status)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3">{source.description}</p>
              <div className="flex justify-between text-sm">
                <span>{source.datasets.toLocaleString()} datasets</span>
                <span className="text-muted-foreground">Updated {source.lastUpdate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass">
          <TabsTrigger value="search">Search & Browse</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          {/* Search and Filters */}
          <Card className="nss-panel">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search Datasets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search datasets, protocols, or keywords..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </div>

              {/* Popular Tags */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Popular Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Button
                      key={tag}
                      size="sm"
                      variant={selectedFilters.includes(tag) ? "default" : "outline"}
                      onClick={() => toggleFilter(tag)}
                      className="h-7 text-xs"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="nss-panel">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Dataset Results</CardTitle>
                <Badge variant="secondary" className="glass-chip">
                  {filteredDatasets.length} results
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {filteredDatasets.map((dataset) => (
                    <div key={dataset.id} className="glass rounded-lg p-4 border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getTypeIcon(dataset.type)}
                            <h3 className="font-semibold">{dataset.title}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span>{dataset.source}</span>
                            <span>{dataset.size}</span>
                            <span>{new Date(dataset.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {dataset.downloadUrl && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          {dataset.externalUrl && (
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {dataset.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="nss-panel">
            <CardHeader>
              <CardTitle>Data Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Usage analytics and data visualization</p>
                <p className="text-sm">Track downloads, popular datasets, and research trends</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="nss-card">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Production Key</label>
                  <div className="flex gap-2">
                    <Input 
                      type="password" 
                      value="nss_prod_****************************"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button size="sm" variant="outline">Copy</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Development Key</label>
                  <div className="flex gap-2">
                    <Input 
                      type="password" 
                      value="nss_dev_****************************"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button size="sm" variant="outline">Copy</Button>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Generate New Key
                </Button>
              </CardContent>
            </Card>

            <Card className="nss-card">
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Requests per minute</span>
                  <Badge variant="outline">1,000 / 5,000</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data transfer per day</span>
                  <Badge variant="outline">12.4 GB / 100 GB</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Concurrent connections</span>
                  <Badge variant="outline">3 / 10</Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  Upgrade Limits
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="nss-panel">
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Search Endpoint</h4>
                  <code className="text-sm text-muted-foreground">
                    GET /api/v1/datasets/search?q=protein&source=genelab
                  </code>
                </div>
                <div className="glass rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Download Endpoint</h4>
                  <code className="text-sm text-muted-foreground">
                    GET /api/v1/datasets/{'{id}'}/download
                  </code>
                </div>
                <div className="glass rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Metadata Endpoint</h4>
                  <code className="text-sm text-muted-foreground">
                    GET /api/v1/datasets/{'{id}'}/metadata
                  </code>
                </div>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}