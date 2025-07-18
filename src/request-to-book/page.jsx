import { useLocation } from "react-router-dom"
import RequestToBook from "./components/RequestToBook"
import { dummyProperties } from "../utils/dummyData"

export default function RequestToBookPage() {
  const location = useLocation()
  const { propertyData, checkInDate, checkOutDate, pricePerNight } = location.state || {}

  // Use dummyProperties[0] as fallback if propertyData is not provided
  const effectivePropertyData = propertyData || dummyProperties[0]

  return (
    <RequestToBook
      propertyData={effectivePropertyData}
      checkInDate={checkInDate}
      checkOutDate={checkOutDate}
      pricePerNight={pricePerNight}
    />
  )
}
