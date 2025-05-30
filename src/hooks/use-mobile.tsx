
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => window.innerWidth < MOBILE_BREAKPOINT
    setIsMobile(checkMobile())
    
    // Handler for window resize
    const handleResize = () => {
      setIsMobile(checkMobile())
    }

    // Add event listener with debounce
    let resizeTimer: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 100)
    }

    window.addEventListener("resize", debouncedResize)
    
    // Clean up
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener("resize", debouncedResize)
    }
  }, [])

  return !!isMobile
}
