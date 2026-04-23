import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

function Chillmode() {
  const navigate = useNavigate()
  const audioRef = useRef<HTMLAudioElement>(null)
  const driveAudioRef = useRef<HTMLAudioElement>(null)
  const discHoveredRef = useRef(false)

  useEffect(() => {
    const loopStart = 112
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.5

    const restartFromCue = () => {
      if (!discHoveredRef.current) {
        return
      }
      audio.currentTime = loopStart
      void audio.play().catch(() => {})
    }

    audio.addEventListener("ended", restartFromCue)

    return () => {
      audio.removeEventListener("ended", restartFromCue)
      audio.pause()
    }
  }, [])

  const handleDiscSectionEnter = () => {
    const loopStart = 115.5
    const audio = audioRef.current
    if (!audio) {
      return
    }

    discHoveredRef.current = true
    audio.currentTime = loopStart
    void audio.play().catch(() => {})
  }

  const handleDiscSectionLeave = () => {
    const audio = audioRef.current
    discHoveredRef.current = false
    if (!audio) {
      return
    }
    audio.pause()
  }

  const handleDriveClick = () => {
    const driveAudio = driveAudioRef.current
    if (!driveAudio) {
      return
    }

    driveAudio.currentTime = 0
    driveAudio.volume = 0.8
    void driveAudio.play().catch(() => {})
  }

  return (
    <>
  <div className="w-full min-h-screen px-5 pt-16 pb-14 flex flex-col items-center">
        <section className="w-full min-h-screen max-w-8xl flex flex-col items-center">
          <div className="w-fit flex flex-col items-start text-left gap-3 relative z-10">
            <p className="text-3xl sm:text-4xl">Hello! I am,</p>
            <img src="/ab.png" alt="Angad Bajaj" className="w-[320px] sm:w-[420px] h-auto self-center"></img>
            <p className="text-3xl sm:text-4xl">A software engineer based in India.</p>
          </div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-auto w-[80%] mt-0 md:-mt-20 lg:-mt-40 cursor-pointer relative z-0"
            onClick={() => navigate("/")}
          >
            <source src="/couch.mp4" type="video/mp4"></source>
          </video>
        </section>
        <section className="w-full max-w-6xl mt-8 px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-x-8 gap-y-8 items-start">
            <div
              className="group flex items-center gap-4 sm:gap-5 cursor-pointer"
              onMouseEnter={handleDiscSectionEnter}
              onMouseLeave={handleDiscSectionLeave}
              onClick={() => window.open("https://www.youtube.com/watch?v=unypqeWmyNI", "_blank")}
            >
              <img
                src="/disc.png"
                alt="Rotate Me"
                className="h-30 sm:h-40 w-auto animate-spin [animation-play-state:paused] group-hover:[animation-play-state:running] cursor-pointer"
              />
              <h1 className="text-4xl sm:text-5xl leading-[0.95]">
                Probably <br /> <span className="font-bold underline">listening</span> <span className="whitespace-nowrap">to ts</span>
              </h1>
            </div>

            <div className="w-full flex justify-center lg:justify-end">
              <img
                src="/thar.jpeg"
                alt="me"
                className="w-full max-w-90 sm:max-w-110 h-auto rounded-[90px]"
              />
            </div>

            <h1
              className="group text-4xl sm:text-6xl leading-[1.12] -mt-8 sm:-mt-10 lg:-mt-60 cursor-pointer"
              onClick={() => window.open("https://youtu.be/PvmLIsgxnwA", "_blank")}
            >
              I’m actually among
              <br />
              the top 4.3% <span className="whitespace-nowrap"><span className="font-bold group-hover:underline underline-offset-8">Valorant</span> players</span>
              <br />
              globally.
            </h1>

            <h1
              className="group text-4xl sm:text-6xl leading-[1.1] lg:text-right lg:self-center mt-2 cursor-pointer"
              onClick={() => navigate("/gallery")}
            >
              I like <span className="font-bold italic group-hover:underline underline-offset-6">Photography.</span>
            </h1>

            <div
              className="group flex items-end mt-4 sm:mt-6 w-full max-w-175 pr-8 sm:pr-14 gap-2 sm:gap-4 cursor-pointer"
              onClick={handleDriveClick}
            >
              <h1 className="text-5xl sm:text-7xl leading-[0.95]">
                I <span className="transition-colors duration-300 group-hover:text-red-600">love</span> to
                <br /> <span className="font-bold italic racing-sans-heading text-8xl sm:text-9xl">DRIVE</span>
              </h1>
              <div className="w-84 sm:w-115 shrink-0 -ml-50 mb-4.25">
                <img src="/car.png" alt="Car" className="w-full h-auto object-contain" />
              </div>
            </div>

            <h1 className="text-5xl sm:text-7xl redacted-script-heading font-bold text-[#FAAB02] lg:text-right lg:self-end">
              I love <br /> my <br /> girlfriend
            </h1>
          </div>
        </section>
        <footer className="w-full mt-12 mb-4 flex justify-center">
          <p className="mt-30 text-7xl blank-script-heading">
            Connect{" "}
            <a
              href="https://www.instagram.com/hollow_3k"
              target="_blank"
              rel="noopener noreferrer"
              className="blank-script-heading cursor-pointer transition-colors duration-300 hover:text-[#FAAB02]"
            >
              @hollow_3k
            </a>
          </p>
        </footer>
      </div>
      <audio
        ref={audioRef}
        src="/songs/FATHER%20(feat.%20Travis%20Scott).mp3"
        preload="auto"
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />
      <audio
        ref={driveAudioRef}
        src="/Car%20Accelerating%20-%20Sound%20Effect.mp3"
        preload="auto"
        style={{ display: "none" }}
      />
    </>
  )
}

export default Chillmode
