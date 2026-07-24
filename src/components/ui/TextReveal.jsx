import { useEffect, useRef } from "react"

/**
 * TextReveal — splits text into words, each word clips upward
 * when the element scrolls into view. Plays exactly once.
 *
 * Usage:
 *   <TextReveal as="h2" className="font-serif text-4xl text-white">
 *     Your Headline Here
 *   </TextReveal>
 *
 * Props:
 *   as        — HTML tag to render (default "h2")
 *   children  — plain string text
 *   delay     — base delay in ms before first word (default 0)
 *   stagger   — ms between each word (default 55)
 *   className — passed to the wrapper element
 */
export default function TextReveal({
  as: Tag = "h2",
  children,
  delay   = 0,
  stagger = 55,
  className = "",
  style = {},
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("words-visible")
          observer.disconnect()
        }
      },
      { rootMargin: "-50px 0px", threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Split children string into word spans
  const text   = typeof children === "string" ? children : String(children ?? "")
  const words  = text.split(" ")

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="word-reveal-word" aria-hidden="true">
          <span
            className="word-reveal-inner"
            style={{ animationDelay: `${delay + i * stagger}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  )
}
