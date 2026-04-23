import { Link } from "react-router-dom"
import Masonry, { type Item } from "./Masonry"

const imageFileNames = [
  "IMG_20260117_190413218.jpg.jpeg",
  "IMG_5552.png",
  "IMG_5673.png",
  "IMG_9672.png",
  "IMG_9697.png",
  "IMG_9720.png",
  "IMG_9768.png",
  "IMG_9788.png",
  "IMG_9791.png",
  "WhatsApp Image 2026-03-26 at 18.39.12.jpeg",
  "WhatsApp Image 2026-03-26 at 18.40.22.jpeg",
  "WhatsApp Image 2026-03-26 at 18.45.26.jpeg",
  "WhatsApp Image 2026-03-26 at 18.47.00.jpeg",
  "WhatsApp Image 2026-03-26 at 18.58.04.jpeg",
  "WhatsApp Image 2026-03-26 at 18.59.19.jpeg",
  "WhatsApp Image 2026-03-26 at 19.41.27.jpeg",
  "WhatsApp Image 2026-03-26 at 19.41.48.jpeg",
  "WhatsApp Image 2026-03-26 at 19.41.49.jpeg",
]

const heights = [420, 560, 380, 520, 460, 360, 500, 420, 620, 340, 760, 540, 390, 680, 510, 450, 590, 430]

const galleryItems: Item[] = imageFileNames.map((fileName, index) => ({
  id: `${index + 1}`,
  img: `/images/${encodeURIComponent(fileName)}`,
  url: `/images/${encodeURIComponent(fileName)}`,
  height: heights[index] ?? 480,
}))

function Gallery() {
  return (
    <div className="min-h-screen bg-[#ededed] px-2 py-3 sm:px-6 sm:py-5">
      <main className="mx-auto w-full max-w-6xl">
        <header className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center px-2 sm:mb-6">
          <Link
            to="/chill"
            className="justify-self-start text-2xl leading-none text-black/80 transition-transform duration-150 hover:-translate-x-0.5"
            aria-label="Back"
          >
            &lt;
          </Link>
          <h1 className="blank-script-heading text-6xl leading-none text-black sm:text-8xl lg:text-9xl">Gallery</h1>
          <div aria-hidden className="justify-self-end" />
        </header>

        <section className="overflow-hidden">
          <Masonry
            items={galleryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={true}
          />
        </section>

        <footer className="text-center">
          <p className="blank-script-heading text-2xl text-black/80 ">I capture whatever I like</p>
        </footer>
      </main>
    </div>
  )
}

export default Gallery
