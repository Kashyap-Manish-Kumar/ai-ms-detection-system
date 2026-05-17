function StatsCard({ title, value, color }) {
  return (
    <div
      className="
        bg-gradient-to-br
        from-[#0f172a]
        via-[#111827]
        to-[#172554]

        border border-cyan-400/20

        rounded-2xl

        shadow-xl

        p-4 sm:p-5 lg:p-6

        transition-all duration-300
        hover:shadow-2xl
        hover:-translate-y-1
        hover:scale-[1.02]

        cursor-pointer

        min-h-[140px]

        flex flex-col justify-center
      "
    >

      {/* TITLE */}
      <h3
        className="
          text-slate-300

          text-sm sm:text-base lg:text-lg

          break-words
        "
      >
        {title}
      </h3>

      {/* VALUE */}
      <p
        className={`
          mt-3

          text-2xl sm:text-3xl lg:text-4xl
          font-bold

          break-words

          ${color}
        `}
      >
        {value}
      </p>

    </div>
  );
}

export default StatsCard;