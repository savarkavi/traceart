import { FileImage, Plus, Upload } from "lucide-react";

export default function ProjectEmptyUpload() {
  return (
    <section className="border-border bg-card relative overflow-hidden rounded-2xl border shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.11),transparent_34%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.015))]" />
      <div className="relative flex min-h-97.5 flex-col items-center justify-center px-6 py-14 text-center sm:min-h-107.5">
        <div className="border-primary/20 bg-primary/10 text-primary relative mb-7 flex size-24 items-center justify-center rounded-[28px] border shadow-[0_0_0_12px_rgba(234,179,8,0.04)]">
          <div className="border-border bg-card text-muted-foreground absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full border shadow-sm">
            <Plus className="size-3.5" />
          </div>
          <FileImage className="size-10 stroke-[1.25]" />
        </div>

        <p className="text-primary mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
          The beginning
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          Add your first version
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
          Upload a sketch, reference, or finished piece. Every version stays
          here, so the story of the artwork never gets lost.
        </p>

        <button
          type="button"
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-7 inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold shadow-sm transition-all active:translate-y-px"
        >
          <Upload className="size-4" />
          Upload first version
        </button>

        <p className="text-muted-foreground/75 mt-4 text-xs">
          PNG, JPG, WEBP, or GIF · up to 20 MB
        </p>
      </div>
    </section>
  );
}
