import logoImg from "../../assets/novalogo.png"

export default function Logo() {
  return (
    <a href="#" className="flex items-center group" aria-label="Novaderm home">
      <img
        src={logoImg}
        alt="Novaderm"
        draggable={false}
        className="select-none transition-transform duration-300 group-hover:scale-105"
        style={{
          /* Mobile: bigger minimum so logo is clearly readable */
          height: "clamp(72px, 11vw, 108px)",
          width: "auto",
          maxWidth: 220,
          objectFit: "contain",
          filter: "brightness(0) invert(1) drop-shadow(0 2px 12px rgba(193,154,107,0.55))",
        }}
      />
    </a>
  )
}
