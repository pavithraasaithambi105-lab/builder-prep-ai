import type { ReactNode } from "react";

export function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 pt-14">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs tracking-widest text-primary">{number}</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <h2 className="mt-4 text-3xl leading-tight text-ink sm:text-[2.35rem]">{title}</h2>
      <div className="mt-5 space-y-5 text-[1.03rem] leading-relaxed text-foreground/90">
        {children}
      </div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-3 text-xl text-ink sm:text-2xl">{children}</h3>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Visual({ label, caption }: { label: string; caption?: string }) {
  return (
    <figure className="my-8 rounded-lg border border-dashed border-primary/35 bg-accent/40 px-5 py-6 text-center">
      <span className="font-mono text-[0.78rem] uppercase tracking-wider text-accent-foreground">
        [INSERT {label}]
      </span>
      {caption ? (
        <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Flow({ steps, title }: { steps: string[]; title?: string }) {
  return (
    <div className="my-7 rounded-lg border border-border bg-card p-5 shadow-soft">
      {title ? (
        <p className="mb-4 font-mono text-[0.72rem] uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      ) : null}
      <ol className="space-y-1.5">
        {steps.map((step, i) => (
          <li key={step} className="font-mono text-sm text-ink">
            <span className="mr-2 text-primary/60">{i === 0 ? "\u2022" : "\u2193"}</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border-l-2 border-highlight bg-secondary/70 px-4 py-3 text-[0.97rem] text-secondary-foreground">
      {children}
    </p>
  );
}

export function Pull({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-8 border-l-2 border-primary pl-5 font-display text-2xl italic leading-snug text-ink sm:text-[1.75rem]">
      {children}
    </blockquote>
  );
}

export function StackItem({
  name,
  role,
  children,
}: {
  name: string;
  role: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="font-mono text-[0.72rem] uppercase tracking-widest text-primary">{role}</p>
      <p className="mt-1.5 font-display text-xl text-ink">{name}</p>
      <p className="mt-2 text-[0.97rem] leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
