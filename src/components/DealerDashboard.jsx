import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { TrendingUp, DollarSign, Target, BarChart3, Users, Package } from 'lucide-react'
import { useConfiguration } from '../contexts/ConfigurationContext.jsx'

export function DealerDashboard() {
  const { selectedVehicle, selectedOptions, pricing, formatCurrency } = useConfiguration()

  if (!selectedVehicle) {
    return null
  }

  const marginAmount = pricing.suggestedRetail - pricing.dealerInvoice
  const marginPercentage = pricing.suggestedRetail > 0 
    ? ((marginAmount / pricing.suggestedRetail) * 100).toFixed(1)
    : 0

  // Mock data for demonstration
  const dealerMetrics = {
    monthlyTarget: 150000,
    currentSales: 89500,
    avgMargin: 12.5,
    topOptions: [
      { name: 'Limited Slip Axle', attachment: 78 },
      { name: 'Spare Tire Package', attachment: 65 },
      { name: 'Metallic Paint', attachment: 45 }
    ]
  }

  const targetProgress = (dealerMetrics.currentSales / dealerMetrics.monthlyTarget) * 100

  return (
    <div className="space-y-6">
      {/* Dealer Performance Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dealerMetrics.currentSales)}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={targetProgress} className="flex-1" />
              <span className="text-xs text-muted-foreground">
                {targetProgress.toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: {formatCurrency(dealerMetrics.monthlyTarget)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {marginPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(marginAmount)} profit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Margin</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dealerMetrics.avgMargin}%
            </div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Options Selected</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedOptions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Current configuration
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Configuration Analysis
            </CardTitle>
            <CardDescription>
              Profitability breakdown for this configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Base Vehicle Margin</span>
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    {formatCurrency(pricing.baseRetail - pricing.baseInvoice)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((pricing.baseRetail - pricing.baseInvoice) / pricing.baseRetail * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Options Margin</span>
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    {formatCurrency(pricing.optionsRetail - pricing.optionsInvoice)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedOptions.length} options
                  </div>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Margin</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(marginAmount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {marginPercentage}% margin
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Margin Rating</span>
                <Badge variant={
                  marginPercentage > 15 ? 'default' : 
                  marginPercentage > 10 ? 'secondary' : 
                  'destructive'
                }>
                  {marginPercentage > 15 ? 'Excellent' : 
                   marginPercentage > 10 ? 'Good' : 
                   'Below Target'}
                </Badge>
              </div>
              <Progress 
                value={Math.min(marginPercentage, 20) / 20 * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Popular Options
            </CardTitle>
            <CardDescription>
              Most frequently selected options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dealerMetrics.topOptions.map((option, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{option.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={option.attachment} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground w-10">
                        {option.attachment}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Sales Recommendations
          </CardTitle>
          <CardDescription>
            Suggestions to optimize this configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {selectedOptions.length < 3 && (
              <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-primary" style={{ fontFamily: 'Montserrat, sans-serif' }}>Add More Options</div>
                  <div className="text-sm text-muted-foreground">
                    Consider suggesting popular options like Limited Slip Axle or Spare Tire Package to increase profitability.
                  </div>
                </div>
              </div>
            )}

            {marginPercentage < 10 && (
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <TrendingUp className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Low Margin Alert</div>
                  <div className="text-sm text-yellow-700">
                    This configuration has below-average margin. Consider highlighting value-added options.
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-green-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>Financing Opportunity</div>
                <div className="text-sm text-green-700">
                  Total configuration of {formatCurrency(pricing.suggestedRetail)} qualifies for commercial financing programs.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

