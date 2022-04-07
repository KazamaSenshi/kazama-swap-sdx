import { useEffect } from 'react'
import { useKazamaBusdPrice } from 'hooks/useBUSDPrice'

const useGetDocumentTitlePrice = () => {
  const kazamaPriceBusd = useKazamaBusdPrice()
  useEffect(() => {
    const kazamaPriceBusdString = kazamaPriceBusd ? kazamaPriceBusd.toFixed(5) : ''
    document.title = `Kazama Swap - ${kazamaPriceBusdString}`
  }, [kazamaPriceBusd])
}
export default useGetDocumentTitlePrice
