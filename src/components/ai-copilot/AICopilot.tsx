import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX,
  Sparkles,
  Database,
  FlaskConical,
  BarChart3,
  Copy,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: Array<{
    source: string;
    title: string;
    year?: string;
  }>;
  suggestions?: string[];
}

interface VoiceState {
  isRecording: boolean;
  isPlaying: boolean;
  waveform: number[];
}

export function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m NSS Vibe, your AI copilot for space-enabled pharmaceutical research. I can help you design experiments, analyze data, search scientific literature, and optimize protocols using NASA GeneLab and other space biology databases. What would you like to explore today?',
      timestamp: new Date(),
      suggestions: [
        'Design a protein crystallization experiment',
        'Search GeneLab for microgravity studies',
        'Compare Earth vs space crystallization results',
        'Analyze structural biology data'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isRecording: false,
    isPlaying: false,
    waveform: Array.from({ length: 20 }, () => Math.random() * 100)
  });
  const [isTyping, setIsTyping] = useState(false);

  // Simulate voice waveform animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (voiceState.isRecording) {
      interval = setInterval(() => {
        setVoiceState(prev => ({
          ...prev,
          waveform: Array.from({ length: 20 }, () => Math.random() * 100)
        }));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [voiceState.isRecording]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        citations: [
          { source: 'GeneLab', title: 'Microgravity Effects on Protein Crystallization', year: '2023' },
          { source: 'PubMed', title: 'Space-Based Pharmaceutical Manufacturing', year: '2024' }
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (input: string): string => {
    const responses = [
      "Based on GeneLab data analysis, I recommend optimizing your crystallization buffer pH to 7.2-7.4 for microgravity conditions. This has shown 40% improvement in crystal quality compared to Earth-based studies.",
      "I found 127 relevant studies in our database. The most promising approach combines temperature gradient crystallization with controlled convection suppression, achieving 3.2x larger crystal sizes.",
      "Your protein shows excellent potential for space-based crystallization. Historical data suggests you could expect 65% improvement in diffraction quality and reduced mosaicity.",
      "I've analyzed similar experiments and suggest modifying your protocol timeline. Extending the nucleation phase to 72 hours in microgravity typically yields superior results."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleRecording = () => {
    setVoiceState(prev => ({
      ...prev,
      isRecording: !prev.isRecording
    }));
  };

  const togglePlayback = () => {
    setVoiceState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying
    }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            NSS Vibe AI Copilot
          </h1>
          <p className="text-muted-foreground">
            Voice & chat interface powered by Claude Opus 4.1
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="glass-chip">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Active
          </Badge>
          <Badge variant="secondary" className="glass-chip">
            Claude Opus 4.1
          </Badge>
        </div>
      </div>

      {/* Voice Interface */}
      <Card className="nss-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Voice Interface
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {/* Voice Controls */}
            <div className="flex gap-2">
              <Button
                variant={voiceState.isRecording ? "destructive" : "default"}
                size="lg"
                onClick={toggleRecording}
                className="glass-strong"
              >
                {voiceState.isRecording ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
                {voiceState.isRecording ? 'Stop' : 'Record'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={togglePlayback}
                disabled={!voiceState.isPlaying}
              >
                {voiceState.isPlaying ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
                TTS
              </Button>
            </div>

            {/* Voice Waveform */}
            <div className="flex-1 flex items-center justify-center gap-1 h-16">
              {voiceState.waveform.map((height, index) => (
                <div
                  key={index}
                  className={`bg-primary rounded-full transition-all duration-100 ${
                    voiceState.isRecording ? 'animate-pulse' : ''
                  }`}
                  style={{
                    width: '4px',
                    height: `${Math.max(4, height * 0.4)}px`,
                    opacity: voiceState.isRecording ? 0.8 : 0.3
                  }}
                />
              ))}
            </div>

            {/* Voice Status */}
            <div className="text-sm text-muted-foreground min-w-24 text-right">
              {voiceState.isRecording ? 'Listening...' : 'Ready'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="nss-panel h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Chat Conversation</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'glass border'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        
                        {message.citations && (
                          <div className="mt-3 space-y-1">
                            <p className="text-xs opacity-75">Sources:</p>
                            {message.citations.map((citation, index) => (
                              <Badge key={index} variant="outline" className="mr-1 text-xs">
                                {citation.source}: {citation.title}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {message.suggestions && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs opacity-75">Try asking:</p>
                            <div className="space-y-1">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="block text-xs text-left hover:underline opacity-75 hover:opacity-100"
                                >
                                  "{suggestion}"
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs opacity-50">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.type === 'assistant' && (
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="glass border rounded-lg p-4 max-w-[80%]">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-primary animate-pulse" />
                          <span className="text-sm">NSS Vibe is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input Area */}
              <div className="flex gap-2 pt-4 border-t">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about experiments, data analysis, or protocol optimization..."
                  className="flex-1 nss-input"
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Tools Sidebar */}
        <div className="space-y-4">
          <Card className="nss-card">
            <CardHeader>
              <CardTitle className="text-lg">AI Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                Search Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FlaskConical className="h-4 w-4 mr-2" />
                Plan Experiment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze Results
              </Button>
            </CardContent>
          </Card>

          <Card className="nss-card">
            <CardHeader>
              <CardTitle className="text-lg">Data Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: 'NASA GeneLab', status: 'Connected', count: '12,000+ datasets' },
                { name: 'PubMed', status: 'Connected', count: '2M+ papers' },
                { name: 'UniProt', status: 'Connected', count: '200M+ proteins' },
                { name: 'ORDEM', status: 'Live', count: 'Debris tracking' },
              ].map((source, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{source.name}</span>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {source.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {source.count}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="nss-card">
            <CardHeader>
              <CardTitle className="text-lg">Model Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Current Model:</span>
                <span className="text-primary">Claude Opus 4.1</span>
              </div>
              <div className="flex justify-between">
                <span>Fallback:</span>
                <span className="text-muted-foreground">Apertus 70B</span>
              </div>
              <div className="flex justify-between">
                <span>Voice:</span>
                <span className="text-muted-foreground">ElevenLabs</span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                AI-generated content. Verify results before use in research.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}