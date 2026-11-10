
import { apiFetch } from './api'

// Struktur respons dari backend NestJS
export interface DisasterRiskResponse {
  type: 'flood' | 'landslide'
  layerId: number
  imageUrl: string
  width: number
  height: number
  extent: {
    xmin: number
    ymin: number
    xmax: number
    ymax: number
    spatialReference?: {
      wkid?: number
      latestWkid?: number
    }
  }
}

// Mengambil peta risiko banjir
export function getFloodRisk(bbox: string) {
  return apiFetch<DisasterRiskResponse>(
    `/disaster-risk/flood?bbox=${encodeURIComponent(bbox)}`
  )
}

// Mengambil peta risiko longsor
export function getLandslideRisk(bbox: string) {
  return apiFetch<DisasterRiskResponse>(
    `/disaster-risk/landslide?bbox=${encodeURIComponent(bbox)}`
  )
}
