import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { DollarSign, FileText, Download, Share } from 'lucide-react'
import { useConfiguration } from '../contexts/ConfigurationContext.jsx'
import { getVehicleDisplayName } from '../lib/vehicleService.js'

export function PricingSummary() {
  const { 
    selectedVehicle, 
    selectedOptions, 
    pricing, 
    formatCurrency, 
    viewMode 
  } = useConfiguration()

  const handleGenerateQuote = () => {
    // TODO: Implement quote generation
    console.log('Generate quote clicked')
  }

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Share configuration clicked')
  }

  if (!selectedVehicle) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing Summary
          </CardTitle>
          <CardDescription>
            Your configuration pricing will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a vehicle to see pricing</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const showDealerPricing = viewMode === 'dealer'

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Pricing Summary
        </CardTitle>
        <CardDescription>
          {getVehicleDisplayName(selectedVehicle)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Base Vehicle Pricing */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Base Vehicle</span>
            <span className="font-semibold">
              {formatCurrency(showDealerPricing ? pricing.baseInvoice : pricing.baseRetail)}
            </span>
          </div>
          
          {showDealerPricing && (
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>MSRP</span>
              <span>{formatCurrency(pricing.baseRetail)}</span>
            </div>
          )}
        </div>

        {/* Options Pricing */}
        {selectedOptions.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Selected Options</h4>
              {selectedOptions.map((option) => {
                const optionPricing = option.vehicle_option_pricing?.[0]
                const price = showDealerPricing 
                  ? optionPricing?.dealer_invoice_price || 0
                  : optionPricing?.suggested_retail_price || 0
                const isCredit = optionPricing?.is_credit
                const isNoCharge = optionPricing?.is_no_charge
                
                return (
                  <div key={option.id} className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <span className="text-xs leading-tight">{option.option_name}</span>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {option.option_code}
                        </Badge>
                      </div>
                    </div>
                    <span className={`text-xs font-medium flex-shrink-0 ${
                      isCredit ? 'text-green-600' : ''
                    }`}>
                      {isNoCharge ? (
                        <Badge variant="secondary" className="text-xs">NC</Badge>
                      ) : isCredit ? (
                        `-${formatCurrency(Math.abs(price))}`
                      ) : (
                        formatCurrency(price)
                      )}
                    </span>
                  </div>
                )
              })}
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium">Options Subtotal</span>
                <span className={`font-semibold ${
                  pricing.optionsRetail < 0 ? 'text-green-600' : ''
                }`}>
                  {pricing.optionsRetail < 0 ? '-' : ''}
                  {formatCurrency(Math.abs(showDealerPricing ? pricing.optionsInvoice : pricing.optionsRetail))}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Destination Charge */}
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-sm">Destination Charge</span>
          <span className="font-medium">
            {formatCurrency(pricing.destinationCharge)}
          </span>
        </div>

        {/* Total */}
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">
            {showDealerPricing ? 'Dealer Invoice' : 'Total MSRP'}
          </span>
          <span className="text-lg font-bold text-primary">
            {formatCurrency(showDealerPricing ? pricing.dealerInvoice : pricing.suggestedRetail)}
          </span>
        </div>

        {/* Dealer-specific information */}
        {showDealerPricing && (
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span>Customer MSRP</span>
              <span className="font-semibold">{formatCurrency(pricing.suggestedRetail)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Potential Margin</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(pricing.suggestedRetail - pricing.dealerInvoice)}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-4">
          <Button 
            onClick={handleGenerateQuote} 
            className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all duration-200 rounded-md"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Quote
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleShare} 
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Configuration Summary */}
        <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
          <div className="flex justify-between">
            <span>Vehicle:</span>
            <span>{selectedVehicle.series_code}</span>
          </div>
          <div className="flex justify-between">
            <span>Options:</span>
            <span>{selectedOptions.length} selected</span>
          </div>
          <div className="flex justify-between">
            <span>GVWR:</span>
            <span>{selectedVehicle.gvwr_pounds?.toLocaleString()} lbs</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

