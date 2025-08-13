import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { 
  getBaseVehicles, 
  getVehicleOptions, 
  getOptionCategories,
  getOptionCompatibility,
  formatCurrency 
} from '../lib/vehicleService.js'

const ConfigurationContext = createContext()

// Configuration state reducer
function configurationReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_DATA':
      return {
        ...state,
        baseVehicles: action.payload.baseVehicles,
        vehicleOptions: action.payload.vehicleOptions,
        optionCategories: action.payload.optionCategories,
        compatibilityRules: action.payload.compatibilityRules,
        loading: false
      }
    
    case 'SELECT_VEHICLE':
      return {
        ...state,
        selectedVehicle: action.payload,
        selectedOptions: [] // Reset options when vehicle changes
      }
    
    case 'TOGGLE_OPTION':
      const option = action.payload
      const isSelected = state.selectedOptions.some(opt => opt.id === option.id)
      
      return {
        ...state,
        selectedOptions: isSelected
          ? state.selectedOptions.filter(opt => opt.id !== option.id)
          : [...state.selectedOptions, option]
      }
    
    case 'CLEAR_CONFIGURATION':
      return {
        ...state,
        selectedVehicle: null,
        selectedOptions: []
      }
    
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload
      }
    
    default:
      return state
  }
}

// Initial state
const initialState = {
  loading: true,
  baseVehicles: [],
  vehicleOptions: [],
  optionCategories: [],
  compatibilityRules: [],
  selectedVehicle: null,
  selectedOptions: [],
  viewMode: 'customer' // 'customer' or 'dealer'
}

// Configuration provider component
export function ConfigurationProvider({ children }) {
  const [state, dispatch] = useReducer(configurationReducer, initialState)

  // Load initial data
  useEffect(() => {
    async function loadData() {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      try {
        const [baseVehicles, vehicleOptions, optionCategories, compatibilityRules] = 
          await Promise.all([
            getBaseVehicles(),
            getVehicleOptions(),
            getOptionCategories(),
            getOptionCompatibility()
          ])

        dispatch({
          type: 'SET_DATA',
          payload: {
            baseVehicles,
            vehicleOptions,
            optionCategories,
            compatibilityRules
          }
        })
      } catch (error) {
        console.error('Error loading configuration data:', error)
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    loadData()
  }, [])

  // Calculate total pricing
  const calculatePricing = () => {
    if (!state.selectedVehicle) {
      return { dealerInvoice: 0, suggestedRetail: 0, destinationCharge: 0, total: 0 }
    }

    const basePricing = state.selectedVehicle.base_vehicle_pricing?.[0] || {}
    const baseInvoice = basePricing.dealer_invoice_price || 0
    const baseRetail = basePricing.suggested_retail_price || 0
    const destinationCharge = basePricing.destination_delivery_charge || 0

    let optionsInvoice = 0
    let optionsRetail = 0

    state.selectedOptions.forEach(option => {
      const pricing = option.vehicle_option_pricing?.[0] || {}
      const invoicePrice = pricing.dealer_invoice_price || 0
      const retailPrice = pricing.suggested_retail_price || 0
      
      if (pricing.is_credit) {
        optionsInvoice -= Math.abs(invoicePrice)
        optionsRetail -= Math.abs(retailPrice)
      } else {
        optionsInvoice += invoicePrice
        optionsRetail += retailPrice
      }
    })

    const totalInvoice = baseInvoice + optionsInvoice + destinationCharge
    const totalRetail = baseRetail + optionsRetail + destinationCharge

    return {
      dealerInvoice: totalInvoice,
      suggestedRetail: totalRetail,
      destinationCharge,
      baseInvoice,
      baseRetail,
      optionsInvoice,
      optionsRetail
    }
  }

  const value = {
    ...state,
    dispatch,
    pricing: calculatePricing(),
    formatCurrency
  }

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  )
}

// Custom hook to use configuration context
export function useConfiguration() {
  const context = useContext(ConfigurationContext)
  if (!context) {
    throw new Error('useConfiguration must be used within a ConfigurationProvider')
  }
  return context
}

