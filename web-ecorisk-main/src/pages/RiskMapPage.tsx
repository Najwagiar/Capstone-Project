
import { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import {
  getHotspots,
  type Hotspot,
} from '../services/hotspotService.ts'

import {
  getFloodRisk,
  getLandslideRisk,
  type DisasterRiskResponse,
} from '../services/disasterRiskService.ts'

import { Flame, Waves, Mountain, RefreshCw } from 'lucide-react'

// Memperbaiki ikon marker bawaan Leaflet
const hotspotIcon = new L.DivIcon({
  className: 'hotspot-marker',
  html: '<div style="background:#ef4444;width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 0 8px #ef4444"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

// Konversi koordinat longitude/latitude ke EPSG:3857
function project(lng: number, lat: number) {
  const x = (lng * 20037508.34) / 180
  const limitedLat = Math.max(-85.05112878, Math.min(85.05112878, lat))
  const y =
    Math.log(Math.tan(((90 + limitedLat) * Math.PI) / 360)) *
    (20037508.34 / Math.PI)

  return { x, y }
}

// Konversi EPSG:3857 ke latitude/longitude
function unproject(x: number, y: number): [number, number] {
  const lng = (x / 20037508.34) * 180
  const lat =
    (Math.atan(Math.exp(y / 20037508.34 * Math.PI)) * 360) / Math.PI - 90

  return [lat, lng]
}

function getImageBounds(result: DisasterRiskResponse): L.LatLngBoundsExpression {
  const extent = result.extent

  const southwest = unproject(extent.xmin, extent.ymin)
  const northeast = unproject(extent.xmax, extent.ymax)

  return [southwest, northeast]
}

// Mengambil batas peta setiap kali pengguna menggeser atau memperbesar peta
function MapBoundsListener({
  onBoundsChange,
}: {
  onBoundsChange: (bbox: string) => void
}) {
  const map = useMap()

  useEffect(() => {
    const updateBounds = () => {
      const bounds = map.getBounds()
      const southwest = project(
        bounds.getWest(),
        bounds.getSouth(),
      )
      const northeast = project(
        bounds.getEast(),
        bounds.getNorth(),
      )

      onBoundsChange(
        `${southwest.x},${southwest.y},${northeast.x},${northeast.y}`,
      )
    }

    updateBounds()
    map.on('moveend', updateBounds)

    return () => {
      map.off('moveend', updateBounds)
    }
  }, [map, onBoundsChange])

  return null
}

export default function RiskMapPage() {
  const [showHotspots, setShowHotspots] = useState(true)
  const [showFlood, setShowFlood] = useState(false)
  const [showLandslide, setShowLandslide] = useState(false)

  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [flood, setFlood] = useState<DisasterRiskResponse | null>(null)
  const [landslide, setLandslide] =
    useState<DisasterRiskResponse | null>(null)

  const [bbox, setBbox] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Mengambil data hotspot dari backend
  useEffect(() => {
    getHotspots()
      .then((result) => setHotspots(result.data))
      .catch((err) => {
        console.error('Gagal mengambil hotspot:', err)
        setError('Data hotspot belum dapat dimuat. Periksa API NASA FIRMS.')
      })
  }, [])

  // Mengambil overlay risiko sesuai batas peta
  useEffect(() => {
    if (!bbox || (!showFlood && !showLandslide)) return

    let active = true

    async function loadRisk() {
      setLoading(true)
      setError('')

      try {
        const results = await Promise.all([
          showFlood ? getFloodRisk(bbox) : Promise.resolve(null),
          showLandslide ? getLandslideRisk(bbox) : Promise.resolve(null),
        ])

        if (active) {
          setFlood(results[0])
          setLandslide(results[1])
        }
      } catch (err) {
        console.error('Gagal mengambil peta risiko:', err)
        if (active) {
          setError('Gagal mengambil overlay risiko dari backend.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadRisk()

    return () => {
      active = false
    }
  }, [bbox, showFlood, showLandslide])

  return (
    <div className="dashboard-page">
      <div className="dash-page-heading">
        <div>
          <div className="dash-eyebrow">WORKSPACE / PETA RISIKO</div>
          <h1>Peta Risiko Lingkungan</h1>
          <p>Pantau titik panas dan wilayah berisiko bencana.</p>
        </div>
      </div>

      <div className="panel" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <label>
            <input
              type="checkbox"
              checked={showHotspots}
              onChange={(e) => setShowHotspots(e.target.checked)}
            />{' '}
            <Flame size={16} color="#ef4444" /> Hotspot NASA
          </label>

          <label>
            <input
              type="checkbox"
              checked={showFlood}
              onChange={(e) => setShowFlood(e.target.checked)}
            />{' '}
            <Waves size={16} color="#3b82f6" /> Risiko Banjir
          </label>

          <label>
            <input
              type="checkbox"
              checked={showLandslide}
              onChange={(e) => setShowLandslide(e.target.checked)}
            />{' '}
            <Mountain size={16} color="#d97706" /> Risiko Longsor
          </label>

          {loading && (
            <span>
              <RefreshCw size={15} /> Memuat peta risiko...
            </span>
          )}
        </div>
      </div>

      {error && (
        <div style={{ padding: 12, marginBottom: 12, color: '#b91c1c' }}>
          {error}
        </div>
      )}

      <section className="panel" style={{ padding: 12 }}>
        <div style={{ height: 550, width: '100%' }}>
          <MapContainer
            center={[-7.25, 109.9]}
            zoom={8}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapBoundsListener onBoundsChange={setBbox} />

            {showHotspots &&
              hotspots.map((point, index) => (
                <Marker
                  key={`${point.latitude}-${point.longitude}-${index}`}
                  position={[point.latitude, point.longitude]}
                  icon={hotspotIcon}
                >
                  <Popup>
                    <b>Hotspot NASA FIRMS</b>
                    <br />
                    Brightness: {point.brightness}
                    <br />
                    Confidence: {point.confidence}
                    <br />
                    Tanggal: {point.acquisitionDate}
                    <br />
                    FRP: {point.fireRadiativePower}
                  </Popup>
                </Marker>
              ))}

            {showFlood && flood && (
              <ImageOverlay
                url={flood.imageUrl}
                bounds={getImageBounds(flood)}
                opacity={0.6}
              />
            )}

            {showLandslide && landslide && (
              <ImageOverlay
                url={landslide.imageUrl}
                bounds={getImageBounds(landslide)}
                opacity={0.6}
              />
            )}
          </MapContainer>
        </div>
      </section>

      <p style={{ marginTop: 12, color: '#64748b', fontSize: 13 }}>
        Sumber data: NASA FIRMS, InaRISK BNPB, dan OpenStreetMap.
      </p>
    </div>
  )
}
