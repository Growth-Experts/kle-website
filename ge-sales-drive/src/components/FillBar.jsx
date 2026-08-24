import { memo } from "react";
import { motion } from "framer-motion";
import { spring } from "../motion";

export const FillBar = memo(function FillBar({ label, value, max, tone = "ink" }) {
  const ratio = max ? Math.min(1, Math.max(value > 0 ? 0.03 : 0, value / max)) : 0;
  const fill = tone === "accent" ? "bg-accent" : tone === "good" ? "bg-good" : tone === "bad" ? "bg-bad" : "bg-ink";

  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)_3.5rem] items-center gap-4 py-2">
      <span className="text-sm text-ink/80">{label}</span>
      <div className="h-2.5 overflow-hidden rounded-full bg-line">
        <motion.div
          className={`h-full w-full origin-left rounded-full ${fill}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: ratio }}
          transition={spring}
        />
      </div>
      <span className="font-mono text-sm tabular text-right">{value}</span>
    </div>
  );
});
