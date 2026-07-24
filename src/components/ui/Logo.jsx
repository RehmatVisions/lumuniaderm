import { siteContent } from "../../data/siteContent"

export default function Logo() {
  const { name } = siteContent.brand

  return (
    <a href="#" className="flex items-center gap-2.5 group">
      {/* Leaf icon */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition-transform duration-300 group-hover:scale-110">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-white"
          aria-hidden="true"
        >
          <path
            d="M12 3C8 3 5 7 5 11c0 4 3 7 7 10 4-3 7-6 7-10 0-4-3-8-7-8z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M12 3v18M8 8c2 1 4 3 4 6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <span className="text-xl font-semibold tracking-tight text-white">
        {name}
        <span className="text-novaderm-gold">.</span>
      </span>
    </a>
  )
}
