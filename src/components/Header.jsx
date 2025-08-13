import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Truck, Users, RotateCcw, Eye } from 'lucide-react'
import { useConfiguration } from '../contexts/ConfigurationContext.jsx'

export function Header() {
  const { selectedVehicle, selectedOptions, viewMode, dispatch } = useConfiguration()

  const handleViewModeToggle = (checked) => {
    dispatch({ 
      type: 'SET_VIEW_MODE', 
      payload: checked ? 'dealer' : 'customer' 
    })
  }

  const handleClearConfiguration = () => {
    dispatch({ type: 'CLEAR_CONFIGURATION' })
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/brand/endera-logo.svg" 
                alt="Endera" 
                className="h-8 w-auto"
                style={{ minWidth: '120px' }}
              />
              <Separator orientation="vertical" className="h-8" />
              <div>
                <h1 className="text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Ford E-Series Configurator</h1>
                <p className="text-sm text-muted-foreground">Vehicle Configuration Platform</p>
              </div>
            </div>
            
            <Separator orientation="vertical" className="h-8" />
            
            {/* Configuration Status */}
            <div className="flex items-center gap-3">
              {selectedVehicle ? (
                <Badge variant="default" className="gap-1">
                  <Truck className="h-3 w-3" />
                  {selectedVehicle.series_code}
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <Truck className="h-3 w-3" />
                  No Vehicle
                </Badge>
              )}
              
              <Badge variant="outline" className="gap-1">
                <Eye className="h-3 w-3" />
                {selectedOptions.length} Options
              </Badge>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Label htmlFor="view-mode" className="text-sm font-medium">
                Customer
              </Label>
              <Switch
                id="view-mode"
                checked={viewMode === 'dealer'}
                onCheckedChange={handleViewModeToggle}
              />
              <Label htmlFor="view-mode" className="text-sm font-medium">
                Dealer
              </Label>
            </div>

            <Separator orientation="vertical" className="h-8" />

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearConfiguration}
                disabled={!selectedVehicle && selectedOptions.length === 0}
                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              
              <Badge 
                variant={viewMode === 'dealer' ? 'default' : 'secondary'} 
                className="px-3 py-1"
              >
                {viewMode === 'dealer' ? (
                  <>
                    <Users className="h-3 w-3 mr-1" />
                    Dealer View
                  </>
                ) : (
                  <>
                    <Eye className="h-3 w-3 mr-1" />
                    Customer View
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

