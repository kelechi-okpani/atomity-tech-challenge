export const tokens = {
  colors: {
    bgPrimary: "var(--color-bg-primary)",
    textPrimary: "var(--color-text-primary)",
    accentSuccess: "var(--color-accent-success)",
    successGlow: "rgba(34, 197, 94, 0.05)",
    borderSubtle: "var(--border-subtle)",
  },
  animation: {
    spring: {
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
} as const;