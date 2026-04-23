import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === "undefined") {
      return defaultValue
    }

    const index = queries.findIndex((query) => window.matchMedia(query).matches)
    return values[index] ?? defaultValue
  }

  const [value, setValue] = useState<number>(get)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const mediaQueryLists = queries.map((query) => window.matchMedia(query))
    const handler = () => setValue(get)

    mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler))
    return () => mediaQueryLists.forEach((mql) => mql.removeEventListener("change", handler))
  }, [queries, values, defaultValue])

  return value
}

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })

    resizeObserver.observe(ref.current)
    return () => resizeObserver.disconnect()
  }, [])

  return [ref, size] as const
}

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const image = new Image()
          image.src = src
          image.onload = image.onerror = () => resolve()
        }),
    ),
  )
}

export interface Item {
  id: string
  img: string
  url: string
  height: number
}

interface GridItem extends Item {
  x: number
  y: number
  w: number
  h: number
}

interface MasonryProps {
  items: Item[]
  ease?: string
  duration?: number
  stagger?: number
  animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random"
  scaleOnHover?: boolean
  hoverScale?: number
  blurToFocus?: boolean
  colorShiftOnHover?: boolean
}

function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}: MasonryProps) {
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:600px)", "(min-width:400px)"],
    [4, 4, 3, 2],
    1,
  )

  const [containerRef, { width }] = useMeasure<HTMLDivElement>()
  const [imagesReady, setImagesReady] = useState(false)

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return { x: item.x, y: item.y }

    let direction = animateFrom
    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"]
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -200 }
      case "bottom":
        return { x: item.x, y: window.innerHeight + 200 }
      case "left":
        return { x: -200, y: item.y }
      case "right":
        return { x: window.innerWidth + 200, y: item.y }
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        }
      default:
        return { x: item.x, y: item.y + 100 }
    }
  }

  useEffect(() => {
    setImagesReady(false)
    preloadImages(items.map((item) => item.img)).then(() => setImagesReady(true))
  }, [items])

  const { grid, containerHeight } = useMemo(() => {
    if (!width || items.length === 0) {
      return { grid: [] as GridItem[], containerHeight: 0 }
    }

    const columnHeights = new Array(columns).fill(0)
    const gap = 16
    const totalGaps = (columns - 1) * gap
    const columnWidth = (width - totalGaps) / columns

    const laidOut = items.map((item) => {
      const column = columnHeights.indexOf(Math.min(...columnHeights))
      const x = column * (columnWidth + gap)
      const scaledHeight = item.height / 2
      const y = columnHeights[column]

      columnHeights[column] += scaledHeight + gap
      return { ...item, x, y, w: columnWidth, h: scaledHeight }
    })

    const maxHeight = Math.max(0, ...columnHeights)
    return {
      grid: laidOut,
      containerHeight: Math.max(maxHeight - gap, 0),
    }
  }, [columns, items, width])

  const hasMounted = useRef(false)

  useLayoutEffect(() => {
    if (!imagesReady) return

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`
      const animationProps = { x: item.x, y: item.y, width: item.w, height: item.h }

      if (!hasMounted.current) {
        const start = getInitialPosition(item)
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: "blur(10px)" }),
          },
          {
            opacity: 1,
            ...animationProps,
            ...(blurToFocus && { filter: "blur(0px)" }),
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger,
          },
        )
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: "auto",
        })
      }
    })

    hasMounted.current = true
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease])

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    if (colorShiftOnHover) {
      const media = element.querySelector(".masonry-media") as HTMLElement | null
      if (media) {
        gsap.to(media, {
          filter: "grayscale(0)",
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }
  }

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    if (colorShiftOnHover) {
      const media = element.querySelector(".masonry-media") as HTMLElement | null
      if (media) {
        gsap.to(media, {
          filter: "grayscale(1)",
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${containerHeight}px` }}>
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content cursor-pointer"
          style={{ willChange: "transform, width, height, opacity" }}
          onClick={() => window.open(item.url, "_blank", "noopener")}
          onMouseEnter={(event) => handleMouseEnter(item.id, event.currentTarget)}
          onMouseLeave={(event) => handleMouseLeave(item.id, event.currentTarget)}
        >
          <div
            className="masonry-media relative h-full w-full overflow-hidden rounded-xs bg-cover bg-center shadow-[0px_10px_40px_-14px_rgba(0,0,0,0.35)]"
            style={{
              backgroundImage: `url(${item.img})`,
              filter: colorShiftOnHover ? "grayscale(1)" : "none",
              willChange: "filter",
            }}
          >
          </div>
        </div>
      ))}
    </div>
  )
}

export default Masonry
