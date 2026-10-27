import { tutelle } from "@/lib/content";

export default function TutelleBar() {
  return (
    <div className="relative z-[60] border-b border-line bg-bg-alt">
      <div className="mx-auto flex h-9 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-10">
        <ul className="flex min-w-0 items-center gap-2 text-[10.5px] font-medium leading-none text-muted">
          {tutelle.items.map((item, index) => (
            <li
              key={item}
              className={
                index < 2 ? "hidden items-center gap-2 md:flex" : "flex items-center gap-2"
              }
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="hidden text-orange/55 md:inline"
                >
                  ·
                </span>
              ) : null}
              <span
                className={
                  index === 2 ? "truncate text-ink/65" : "truncate"
                }
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        <div
          className="flex shrink-0 items-center gap-2 text-[10.5px] font-medium leading-none"
          role="group"
          aria-label={tutelle.languages.groupLabel}
        >
          <span
            className="relative px-0.5 py-1 text-orange-deep after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-orange"
            aria-current="true"
            lang="ar"
          >
            {tutelle.languages.arabic}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-line" />
          <a
            href="#"
            lang="fr"
            aria-label={tutelle.languages.frenchLabel}
            className="px-0.5 py-1 text-muted transition-colors hover:text-orange-deep"
          >
            {tutelle.languages.french}
          </a>
        </div>
      </div>
    </div>
  );
}
