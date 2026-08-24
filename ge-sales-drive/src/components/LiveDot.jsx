import { memo } from "react";
import { motion } from "framer-motion";

export const LiveDot = memo(function LiveDot() {
  return (
    <span className="relative inline-flex h-2 w-2" aria-hidden="true">
      <motion.span
        className="absolute inset-0 rounded-full bg-accent"
        animate={{ scale: [1, 1.85, 1], opacity: [0.65, 0, 0.65] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative block h-2 w-2 rounded-full bg-accent" />
    </span>
  );
});
