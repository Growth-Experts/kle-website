import { memo } from "react";
import { motion } from "framer-motion";
import { spring } from "../motion";

export const MixBar = memo(function MixBar({ segments, total }) {
  return (
    <div>
      <div className="flex h-11 overflow-hidden rounded-md bg-line">
        {segments.map((seg) => (
          <motion.span
            key={seg.id}
            className={`h-full origin-left ${seg.className}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={spring}
            style={{ width: `${total ? (seg.value / total) * 100 : 0}%` }}
            title={`${seg.label} ${seg.value}`}
          />
        ))}
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
        {segments.map((seg) => (
          <li key={seg.id} className="flex items-center gap-2.5 text-sm">
            <span className={`h-2 w-2 shrink-0 rounded-full ${seg.className}`} />
            <span className="text-mute">{seg.label}</span>
            <span className="font-mono tabular">{seg.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});
