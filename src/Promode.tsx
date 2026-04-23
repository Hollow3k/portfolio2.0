import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import emailjs from "@emailjs/browser"

function Promode() {
  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const skillTags = [
    "ReactJS",
    "TypeScript",
    "TailwindCSS",
    "NodeJS",
    "MongoDB",
    "ExpressJS",
    "Git",
    "Figma",
    "Java",
    "Python",
    "PostgreSQL",
    "Supabase",
  ]

  const projectCards = [
    {
      title: "SHAY",
      image: "/shay.jpeg",
      alt: "SHAY project preview",
      link: "https://shay-five.vercel.app",
      description:
        "A platform for developers to design and generate database schemas, get AI suggestions and export SQL queries.",
    },
    {
      title: "Pitch Perfect",
      image: "/pitchperfect.jpeg",
      alt: "Pitch Perfect project preview",
      link: "https://pitchperfect.angad.social",
      description:
        "A platform for founders to practice their pitches against AI investors with different personas.",
    },
    {
      title: "Gemini Clone",
      image: "/gemini.png",
      alt: "Gemini clone project preview",
      link: "https://geminiclone-beryl.vercel.app/",
      description:
        "A working clone of Gemini.com with GEMINI API integration focused at frontend development with ReactJS.",
    },
    {
      title: "Pokedex",
      image: "/pokedex.jpeg",
      alt: "Pokedex project preview",
      link: "https://hollow3k.github.io/Pokedex/",
      description:
        "A comprehensive Pokedex application built with HTML, CSS, and JavaScript, providing detailed information about various Pokemon.",
    },
    {
      title: "Porsche Visualizer",
      image: "/porsche visualizer.png",
      alt: "Porsche visualizer project preview",
      link: "https://gt3rshex.vercel.app/",
      description:
        "An interactive 3D viewer for a Porsche model, built with ReactJS and Three.js, allowing users to explore car details in a virtual environment.",
    },
  ]

  const visibleProjects = projectCards.slice(0, 3)
  const hiddenProjects = projectCards.slice(3)

  return (
    <>
      <div className="w-full min-h-screen px-5 pt-16 pb-14 flex flex-col items-center">
        <section className="w-full min-h-0 lg:min-h-screen max-w-8xl flex flex-col items-center">
          <div className="w-fit flex flex-col items-start text-left gap-3 relative z-10">
            <p className="text-3xl sm:text-4xl">Hello! I am,</p>
            <img src="/ab.png" alt="Angad Bajaj" className="w-[320px] sm:w-105 h-auto self-center"></img>
            <p className="text-3xl sm:text-4xl">A software engineer based in India.</p>
          </div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-auto w-[80%] mt-0 md:-mt-20 lg:-mt-40 cursor-pointer relative z-0"
            onClick={() => navigate("/chill")}
          >
            <source src="/typing.mp4" type="video/mp4"></source>
          </video>
        </section>

        <section className="w-full max-w-5xl mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="blank-script-heading text-8xl text-center mb-10">
              Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First 3 projects — always visible */}
              {visibleProjects.map((project) => (
                <a key={project.title} href={project.link} target="_blank" rel="noreferrer" className="flex">
                  <article
                    className="border border-[#000000] min-h-85 sm:min-h-90 p-4 flex flex-col gap-4 cursor-pointer hover:border-[#FAAB02] transition duration-300 w-full"
                  >
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-40 object-contain"
                    />
                    <p className="text-xl text-center leading-snug">{project.description}</p>
                  </article>
                </a>
              ))}

              {/* 4th tile: Show All / Show Less toggle */}
              {!showAll ? (
                <button
                  onClick={() => setShowAll(true)}
                  className="border border-[#000000] min-h-85 sm:min-h-90 p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#FAAB02] hover:bg-[#FAAB02]/5 transition duration-300 w-full"
                >
                  <span className="text-5xl">+</span>
                  <span className="text-xl font-medium">Show All Projects</span>
                  <span className="text-sm text-[#6e6e6e]">{hiddenProjects.length} more projects</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAll(false)}
                  className="border border-[#000000] min-h-85 sm:min-h-90 p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#FAAB02] hover:bg-[#FAAB02]/5 transition duration-300 w-full"
                >
                  <span className="text-5xl">−</span>
                  <span className="text-xl font-medium">Show Less</span>
                </button>
              )}

              {/* Hidden projects — revealed in-place */}
              {showAll &&
                hiddenProjects.map((project) => (
                  <a key={project.title} href={project.link} target="_blank" rel="noreferrer" className="flex">
                    <article
                      className="border border-[#000000] min-h-85 sm:min-h-90 p-4 flex flex-col gap-4 cursor-pointer hover:border-[#FAAB02] transition duration-300 w-full"
                    >
                      <img
                        src={project.image}
                        alt={project.alt}
                        className="w-full h-40 object-contain"
                      />
                      <p className="text-xl text-center leading-snug">{project.description}</p>
                    </article>
                  </a>
                ))}
            </div>
          </div>

          <aside className="flex flex-col">
            <h2 className="blank-script-heading text-8xl text-center mb-10">
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {skillTags.map((skill) => (
                <span key={skill} className=" border border-[#000000] px-2 py-1 text-lg text-center">
                  {skill}
                </span>
              ))}
            </div>
            <button
              onClick={() => window.open("/resume_april.pdf", "_blank")}
              className="blank-script-heading mt-2 bg-[#000000] text-white h-10 text-3xl cursor-pointer hover:text-[#FAAB02] transition duration-300"
            >
              View Resume
            </button>
          </aside>
        </section>

        <section className="w-full max-w-3xl mt-16">
          <h2 className="blank-script-heading text-8xl text-center mb-10">
            Connect
          </h2>
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault()
              if (!formRef.current) return
              setEmailStatus("sending")
              emailjs
                .sendForm(
                  "service_adqnuoo",        // your service ID
                  "template_gt09lbf",        // ← replace with your template ID
                  formRef.current,
                  "xkTLgTdwAn9wl-RQg"           // ← replace with your public key
                )
                .then(() => {
                  setEmailStatus("sent")
                  formRef.current?.reset()
                  setTimeout(() => setEmailStatus("idle"), 4000)
                })
                .catch((err) => {
                  console.error("EmailJS error:", err)
                  setEmailStatus("error")
                  setTimeout(() => setEmailStatus("idle"), 4000)
                })
            }}
            className="w-full flex flex-col gap-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
                className="bg-[#efefef] px-3 py-2 text-base outline-none border border-transparent focus:border-[#b8b8b8]"
              />
              <input
                type="email"
                name="from_email"
                placeholder="Email"
                required
                className="bg-[#efefef] px-3 py-2 text-base outline-none border border-transparent focus:border-[#b8b8b8]"
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              required
              className="bg-[#efefef] px-3 py-2 h-36 resize-none text-base outline-none border border-transparent focus:border-[#b8b8b8]"
            ></textarea>
            <button
              type="submit"
              disabled={emailStatus === "sending"}
              className="self-center bg-[#6e6e6e] text-white px-8 py-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {emailStatus === "sending" ? "Sending..." : "Send"}
            </button>
            {emailStatus === "sent" && (
              <p className="text-center text-green-600 text-sm">Message sent successfully!</p>
            )}
            {emailStatus === "error" && (
              <p className="text-center text-red-500 text-sm">Something went wrong. Please try again.</p>
            )}
          </form>
        </section>
      </div>
    </>
  )
}

export default Promode
