import React from 'react'
import './App.css'
import { ConfigurationProvider } from './contexts/ConfigurationContext.jsx'
import { Header } from './components/Header.jsx'
import { VehicleSelector } from './components/VehicleSelector.jsx'
import { OptionsSelector } from './components/OptionsSelector.jsx'
import { PricingSummary } from './components/PricingSummary.jsx'
import { DealerDashboard } from './components/DealerDashboard.jsx'
import { useConfiguration } from './contexts/ConfigurationContext.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Loader2 } from 'lucide-react'

function ConfiguratorContent() {
  const { loading, viewMode } = useConfiguration()

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading vehicle data...</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <VehicleSelector />
            <OptionsSelector />
            
            {/* Dealer-specific dashboard */}
            {viewMode === 'dealer' && (
              <DealerDashboard />
            )}
          </div>
          
          {/* Right Column - Pricing Summary */}
          <div className="lg:col-span-1">
            <PricingSummary />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>© 2025 Endera. All rights reserved.</span>
              <span>Ford E-Series Configurator</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Powered by Supabase</span>
              <span>Built with React</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <ConfigurationProvider>
      <ConfiguratorContent />
    </ConfigurationProvider>
  )
}

export default App
