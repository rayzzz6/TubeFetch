export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-base" aria-hidden="true">
      {/* Base animated mesh */}
      <div
        className="absolute inset-0 opacity-70 animate-gradient-shift"
        style={{
          backgroundImage:
            "radial-gradient(1000px 500px at 15% 10%, rgba(47,111,237,0.25), transparent 60%), radial-gradient(900px 500px at 85% 25%, rgba(94,225,255,0.15), transparent 60%), radial-gradient(1200px 700px at 50% 100%, rgba(27,79,196,0.20), transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />
      {/* Fine grid for texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      {/* Bottom vignette so content stays readable */}
      <div className="absolute inset-0 bg-grid-fade" />
    </div>
  );
}
