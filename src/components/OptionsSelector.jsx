import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Badge } from "@/components/ui/badge.jsx"
import { Checkbox } from "@/components/ui/checkbox.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.jsx"
import { Settings, Package, AlertCircle, Search } from "lucide-react"
import { useConfiguration } from "../contexts/ConfigurationContext.jsx"
import { isOptionCompatible } from "../lib/vehicleService.js"

export function OptionsSelector() {
  const { 
    vehicleOptions, 
    optionCategories, 
    selectedVehicle, 
    selectedOptions, 
    compatibilityRules,
    dispatch, 
    formatCurrency 
  } = useConfiguration()

  const [searchTerm, setSearchTerm] = useState("")

  const handleOptionToggle = (option) => {
    dispatch({ type: "TOGGLE_OPTION", payload: option })
  }

  if (!selectedVehicle) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configure Options
          </CardTitle>
          <CardDescription>
            Select a vehicle first to see available options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Please select a base vehicle to configure options</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Group options by category
  const optionsByCategory = vehicleOptions.reduce((acc, option) => {
    const categoryId = option.option_category_id
    const category = optionCategories.find(cat => cat.id === categoryId)
    const categoryName = category?.category_name || "Other"
    
    if (!acc[categoryName]) {
      acc[categoryName] = []
    }
    acc[categoryName].push(option)
    return acc
  }, {})

  // Filter compatible options for selected vehicle
  const getCompatibleOptions = (options) => {
    return options.filter(option => 
      isOptionCompatible(option, selectedVehicle, compatibilityRules)
    )
  }

  // Filter options based on search
  const filterOptions = (options) => {
    if (!searchTerm) return options
    
    return options.filter(option =>
      option.option_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.option_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.option_code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const isOptionSelected = (option) => {
    return selectedOptions.some(selected => selected.id === option.id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configure Options
        </CardTitle>
        <CardDescription>
          Customize your {selectedVehicle.series_code} with available options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search options by name, description, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Accordion type="multiple" className="w-full">
          {Object.entries(optionsByCategory).map(([categoryName, options]) => {
            const compatibleOptions = getCompatibleOptions(options)
            const filteredOptions = filterOptions(compatibleOptions)
            
            if (compatibleOptions.length === 0) return null
            
            return (
              <AccordionItem key={categoryName} value={categoryName}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center justify-between w-full mr-4">
                    <span className="font-semibold" style={{ fontFamily: "Montserrat, sans-serif" }}>{categoryName}</span>
                    <Badge variant="secondary" className="text-xs">
                      {filteredOptions.length} available
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {filteredOptions.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      <Search className="h-6 w-6 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No options match your search</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredOptions.map((option) => {
                        const pricing = option.vehicle_option_pricing?.[0]
                        const isSelected = isOptionSelected(option)
                        const isNoCharge = pricing?.is_no_charge
                        const isCredit = pricing?.is_credit
                        
                        return (
                          <Card 
                            key={option.id} 
                            className={`cursor-pointer transition-all hover:shadow-sm ${
                              isSelected ? "ring-1 ring-primary bg-primary/5" : ""
                            }`}
                            onClick={() => handleOptionToggle(option)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start gap-3">
                                <Checkbox 
                                  checked={isSelected}
                                  onChange={() => handleOptionToggle(option)}
                                  className="mt-1"
                                />
                                
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <h4 className="font-medium text-xs leading-tight">
                                        {option.option_name}
                                      </h4>
                                      {option.option_description && (
                                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                          {option.option_description}
                                        </p>
                                      )}
                                    </div>
                                    
                                    <div className="text-right flex-shrink-0">
                                      {isNoCharge ? (
                                        <Badge variant="secondary" className="text-xs">
                                          No Charge
                                        </Badge>
                                      ) : isCredit ? (
                                        <div className="text-xs font-semibold text-green-600">
                                          -{formatCurrency(Math.abs(pricing.suggested_retail_price))}
                                        </div>
                                      ) : (
                                        <div className="text-xs font-semibold text-primary">
                                          {formatCurrency(pricing?.suggested_retail_price || 0)}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {option.option_code}
                                    </Badge>
                                    
                                    {option.is_standard && (
                                      <Badge variant="default" className="text-xs">
                                        Standard
                                      </Badge>
                                    )}
                                    
                                    {option.is_package && (
                                      <Badge variant="secondary" className="text-xs">
                                        <Package className="h-3 w-3 mr-1" />
                                        Package
                                      </Badge>
                                    )}
                                    
                                    {option.is_limited_production && (
                                      <Badge variant="destructive" className="text-xs">
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        Limited
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
        
        {Object.keys(optionsByCategory).length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No options available for this vehicle</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
