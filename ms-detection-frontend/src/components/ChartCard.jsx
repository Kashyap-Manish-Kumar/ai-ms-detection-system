function ChartCard({ title, children }) {
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

        overflow-hidden
      "
    >

      {/* TITLE */}
      <h2
        className="
          text-lg sm:text-xl lg:text-2xl

          font-semibold

          text-white

          mb-4 sm:mb-5

          break-words
        "
      >
        {title}
      </h2>

      {/* CONTENT */}
      <div className="w-full overflow-x-auto">
        {children}
      </div>

    </div>
  );
}

export default ChartCard;