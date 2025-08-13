import { supabase } from './supabase.js'

// Fetch all base vehicles with their pricing
export async function getBaseVehicles() {
  try {
    const { data, error } = await supabase
      .from('base_vehicles')
      .select(`
        *,
        base_vehicle_pricing (
          dealer_invoice_price,
          suggested_retail_price,
          destination_delivery_charge
        ),
        vehicle_categories (
          category_name,
          category_code
        )
      `)
      .eq('is_active', true)
      .order('series_code')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching base vehicles:', error)
    return []
  }
}

// Fetch all vehicle options with pricing
export async function getVehicleOptions() {
  try {
    const { data, error } = await supabase
      .from('vehicle_options')
      .select(`
        *,
        vehicle_option_pricing (
          dealer_invoice_price,
          suggested_retail_price,
          is_no_charge,
          is_credit
        ),
        option_categories (
          category_name,
          category_code
        )
      `)
      .eq('is_active', true)
      .order('option_category_id')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching vehicle options:', error)
    return []
  }
}

// Fetch option categories
export async function getOptionCategories() {
  try {
    const { data, error } = await supabase
      .from('option_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching option categories:', error)
    return []
  }
}

// Fetch vehicle categories
export async function getVehicleCategories() {
  try {
    const { data, error } = await supabase
      .from('vehicle_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching vehicle categories:', error)
    return []
  }
}

// Fetch option compatibility rules
export async function getOptionCompatibility() {
  try {
    const { data, error } = await supabase
      .from('option_compatibility')
      .select('*')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching option compatibility:', error)
    return []
  }
}

// Fetch engines
export async function getEngines() {
  try {
    const { data, error } = await supabase
      .from('engines')
      .select('*')
      .order('engine_name')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching engines:', error)
    return []
  }
}

// Fetch axles
export async function getAxles() {
  try {
    const { data, error } = await supabase
      .from('axles')
      .select('*')
      .order('axle_description')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching axles:', error)
    return []
  }
}

// Fetch payload packages
export async function getPayloadPackages() {
  try {
    const { data, error } = await supabase
      .from('payload_packages')
      .select('*')
      .order('series_code', 'wheelbase_inches')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching payload packages:', error)
    return []
  }
}

// Helper function to format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Helper function to get vehicle display name
export function getVehicleDisplayName(vehicle) {
  const series = vehicle.series_code.replace('E', 'E-').replace('F', '50').replace('K', '50 Stripped')
  return `${series} ${vehicle.wheelbase_inches}" WB ${vehicle.drivetrain_type}`
}

// Helper function to check option compatibility
export function isOptionCompatible(option, selectedVehicle, compatibilityRules) {
  // If no compatibility rules, assume compatible
  if (!compatibilityRules || compatibilityRules.length === 0) {
    return true
  }
  
  // Check if option has specific compatibility rules
  const rules = compatibilityRules.filter(rule => rule.option_id === option.id)
  
  if (rules.length === 0) {
    // No specific rules, check general compatibility from option data
    if (option.compatible_series && option.compatible_series.length > 0) {
      return option.compatible_series.includes(selectedVehicle.series_code)
    }
    return true // No restrictions
  }
  
  // Apply compatibility rules
  for (const rule of rules) {
    if (rule.compatible_series_codes && rule.compatible_series_codes.length > 0) {
      if (!rule.compatible_series_codes.includes(selectedVehicle.series_code)) {
        return false
      }
    }
    
    if (rule.compatible_wheelbases && rule.compatible_wheelbases.length > 0) {
      if (!rule.compatible_wheelbases.includes(selectedVehicle.wheelbase_inches)) {
        return false
      }
    }
    
    if (rule.compatible_drivetrains && rule.compatible_drivetrains.length > 0) {
      if (!rule.compatible_drivetrains.includes(selectedVehicle.drivetrain_type)) {
        return false
      }
    }
  }
  
  return true
}

