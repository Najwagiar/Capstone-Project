
import { apiFetch } from './api'

export interface Hotspot {
  latitude: number
  longitude: number
  brightness: number
  confidence: string
  satellite: string
  acquisitionDate: string
  acquisitionTime: string
  fireRadiativePower: number
  daynight: string
}

export interface HotspotResponse {
  source: string
  satellite?: string
  total: number
  data: Hotspot[]
}

export function getHotspots() {
  return apiFetch<HotspotResponse>('/hotspots')
}
