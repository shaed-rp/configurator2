import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Truck, Gauge, Weight } from 'lucide-react'
import { useConfiguration } from '../contexts/ConfigurationContext.jsx'
import { getVehicleDisplayName } from '../lib/vehicleService.js'

export function VehicleSelector() {
  const { baseVehicles, selectedVehicle, dispatch, formatCurrency } = useConfiguration()

  const handleVehicleSelect = (vehicle) => {
    dispatch({ type: 'SELECT_VEHICLE', payload: vehicle })
  }

  if (!baseVehicles || baseVehicles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Select Your Vehicle
          </CardTitle>
          <CardDescription>
            Choose your Ford E-Series base configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading vehicles...</p>
        </CardContent>
      </Card>
    )
  }

  // Group vehicles by category
  const vehiclesByCategory = baseVehicles.reduce((acc, vehicle) => {
    const category = vehicle.vehicle_categories?.category_name || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(vehicle)
    return acc
  }, {})

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Select Your Vehicle
        </CardTitle>
        <CardDescription>
          Choose your Ford E-Series base configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(vehiclesByCategory).map(([category, vehicles]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">{category}</h3>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => {
                const pricing = vehicle.base_vehicle_pricing?.[0]
                const isSelected = selectedVehicle?.id === vehicle.id
                
                return (
                  <Card 
                    key={vehicle.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleVehicleSelect(vehicle)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm">
                            {getVehicleDisplayName(vehicle)}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {vehicle.model_description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            <Gauge className="h-3 w-3 mr-1" />
                            {vehicle.gvwr_pounds?.toLocaleString()} lbs GVWR
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {vehicle.wheelbase_inches}"
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {vehicle.drivetrain_type}
                          </Badge>
                        </div>
                        
                        {pricing && (
                          <div className="space-y-1">
                            <div className="text-sm font-semibold text-primary">
                              {formatCurrency(pricing.suggested_retail_price)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              MSRP + {formatCurrency(pricing.destination_delivery_charge)} dest.
                            </div>
                          </div>
                        )}
                        
                        <Button 
                          size="sm" 
                          className="w-full"
                          variant={isSelected ? "default" : "outline"}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

