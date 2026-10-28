import { Check, Footprints, Pill, SprayCan, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

// Righe di esempio: riprendono i casi reali di Arca (checklist per animale,
// presa in carico, task intestata, chiusura con nome e ora).
const tasks = [
  {
    icon: Utensils,
    title: "Colazione settore A",
    category: "Cibo",
    detail: "11 animali su 12",
    progress: 11 / 12,
  },
  {
    icon: Footprints,
    title: "Passeggiata con Luna",
    category: "Passeggiata",
    detail: "Presa in carico da Marco",
  },
  {
    icon: Pill,
    title: "Terapia di Briciola",
    category: "Cure",
    detail: "Assegnata a Giulia",
  },
  {
    icon: SprayCan,
    title: "Pulizia box 3",
    category: "Pulizie",
    detail: "Fatto alle 07:15 da Maria",
    done: true,
  },
];

type AppPreviewProps = {
  className?: string;
};

export function AppPreview({ className }: AppPreviewProps) {
  return (
    <div
      role="img"
      aria-label="Anteprima di Arca: la giornata del rifugio con le task da fare, chi le ha prese in carico e chi le ha chiuse"
      className={cn("relative w-full max-w-md text-black", className)}
    >
      <div className="bg-white rounded-[32px] p-5 sm:p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        {/* Testata */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-green">
              Il tuo rifugio
            </p>
            <p className="text-2xl font-heading font-semibold text-black">
              Oggi
            </p>
          </div>
          <span className="bg-azure text-deep-teal text-sm font-bold rounded-full px-3 py-1">
            3 da fare
          </span>
        </div>

        {/* Task */}
        <ul className="flex flex-col gap-3">
          {tasks.map((task) => (
            <li
              key={task.title}
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-fog p-3",
                task.done && "bg-gray"
              )}
            >
              <span
                className={cn(
                  "w-10 h-10 shrink-0 rounded-full flex items-center justify-center",
                  task.done
                    ? "bg-primary text-white"
                    : "bg-azure text-deep-teal"
                )}
              >
                {task.done ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <task.icon className="w-5 h-5" />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={cn(
                      "font-bold text-sm truncate text-black",
                      task.done && "text-silver line-through"
                    )}
                  >
                    {task.title}
                  </p>
                  <span className="text-[11px] uppercase text-green shrink-0">
                    {task.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {task.detail}
                </p>
                {task.progress !== undefined && (
                  <div className="h-1.5 rounded-full bg-fog mt-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${task.progress * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Notifica: la giornata si aggiorna da sola */}
      <div className="absolute -bottom-5 -left-4 sm:-left-8 bg-white rounded-full shadow-xl pl-3 pr-4 py-2 flex items-center gap-2 text-xs -rotate-2">
        <span className="relative flex w-2.5 h-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-primary" />
        </span>
        <span>
          <span className="font-bold">Maria</span> ha chiuso «Pulizia box 3»
        </span>
      </div>
    </div>
  );
}
