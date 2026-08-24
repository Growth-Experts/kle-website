import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const spring = { stiffness: 100, damping: 20 };

export default function MagneticPill({ active, children, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onMove(e) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-pressed={active}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
        active
          ? "border-ink text-surface"
          : "border-line bg-transparent text-ink/80 hover:border-ink"
      }`}
    >
      {active ? (
        <motion.span
          layoutId="channel-pill"
          className="absolute inset-0 rounded-full bg-ink"
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      ) : null}
      <span className="relative">{children}</span>
    </motion.button>
  );
}
