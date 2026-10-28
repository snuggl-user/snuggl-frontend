import type { Metadata } from "next";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  ClipboardList,
  Gift,
  HeartHandshake,
  LayoutDashboard,
  ListChecks,
  MapIcon,
  PawPrint,
  RefreshCw,
  Repeat,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppPreview, ContactForm } from "@/components/arca";
import { DangerIcon } from "@/app/icons";

export const metadata: Metadata = {
  title: "Arca · Il gestionale gratuito per rifugi e canili | Snuggl",
  description:
    "Arca è il gestionale gratuito di Snuggl per rifugi e canili: task del giorno, schede degli animali, volontari e gestori in un unico posto.",
  openGraph: {
    title: "Arca · Il gestionale gratuito per rifugi e canili",
    description:
      "Task del giorno, schede degli animali, volontari e gestori in un unico posto. Gratis, per sempre.",
  },
};

const features = [
  {
    icon: ListChecks,
    title: "La giornata del rifugio",
    description:
      "Ogni mattina le task del giorno sono pronte, divise in cibo, passeggiate, pulizie e cure. Si vede subito cosa manca, cosa è in ritardo e chi se ne sta occupando.",
  },
  {
    icon: HeartHandshake,
    title: "I volontari si organizzano",
    description:
      "Ognuno prende in carico una task, la lascia se cambia programma e la chiude con una nota. Il gestore può assegnarne una a una persona, senza fermare il rifugio se quel giorno non c'è.",
  },
  {
    icon: Repeat,
    title: "Attività ricorrenti",
    description:
      "La pappa delle otto, la terapia due volte al giorno, la pulizia del lunedì: crei il modello una volta e Arca la mette nella giornata giusta, ogni volta.",
  },
  {
    icon: ClipboardList,
    title: "Una voce per ogni animale",
    description:
      "«Dar da mangiare al settore A» diventa una lista da spuntare con il nome di ogni ospite dell'area: a fine giornata sai chi è stato servito e chi no.",
  },
  {
    icon: PawPrint,
    title: "La scheda di ogni animale",
    description:
      "Foto, stato (in struttura, dal veterinario, in prova, adottato), controlli sanitari, compatibilità, microchip e documenti. E lo storico di tutte le cure ricevute.",
  },
  {
    icon: RefreshCw,
    title: "Sempre aggiornata",
    description:
      "Quando qualcuno prende o chiude una task, chi ha aperto la stessa giornata lo vede in un paio di secondi, senza ricaricare. Niente più lavoro fatto due volte.",
  },
  {
    icon: LayoutDashboard,
    title: "La dashboard del gestore",
    description:
      "Task in ritardo, inviti in sospeso, animali senza settore, posti occupati rispetto alla capienza: quello che richiede attenzione viene per primo.",
  },
  {
    icon: MapIcon,
    title: "Settori e scheda del rifugio",
    description:
      "Dividi il rifugio in aree come nella realtà (box, recinti, gattile) e tieni in ordine contatti, orari di apertura, capienza e documenti interni.",
  },
  {
    icon: Users,
    title: "Una squadra su invito",
    description:
      "Gestori e volontari entrano con un invito via email, con la loro password o con Google. Ognuno vede quello che serve al suo ruolo.",
  },
];

const steps = [
  {
    title: "Ci scrivi",
    description:
      "Compila il form in fondo alla pagina. Ti ricontattiamo per conoscere il rifugio e capire come vi organizzate oggi.",
  },
  {
    title: "Attiviamo il rifugio",
    description:
      "Creiamo lo spazio del tuo rifugio su Arca e mandiamo l'invito a chi lo gestisce. Senza nessun costo.",
  },
  {
    title: "Lo prepari",
    description:
      "Completi la scheda del rifugio, disegni i settori, inserisci gli animali e le attività che si ripetono ogni giorno.",
  },
  {
    title: "Inviti la squadra",
    description:
      "Volontari e gestori ricevono l'invito via email: entrano, aprono la giornata e iniziano a prendere in carico le task.",
  },
];

const roles = [
  {
    icon: LayoutDashboard,
    label: "Per chi gestisce",
    title: "Gestori",
    points: [
      "Organizzi la giornata e le attività ricorrenti, per settore o per animale",
      "Vedi cosa è in ritardo e cosa richiede attenzione appena entri",
      "Tieni aggiornate le schede degli animali e lo stato di ognuno",
      "Inviti volontari e altri gestori, e sospendi un accesso quando serve",
    ],
  },
  {
    icon: HeartHandshake,
    label: "Per chi dà una mano",
    title: "Volontari",
    points: [
      "Apri la giornata dal telefono e scegli cosa fare",
      "Prendi in carico una task, la lasci se cambi programma, la chiudi con una nota",
      "Consulti la scheda di ogni animale prima di occupartene",
      "Ritrovi le attività che hai svolto negli ultimi trenta giorni",
    ],
  },
];

const principles = [
  {
    icon: Gift,
    title: "Nessun costo",
    description:
      "Arca è gratuita per rifugi e canili, oggi e in futuro. Niente abbonamenti.",
  },
  {
    icon: Sparkles,
    title: "Costruita con i rifugi",
    description:
      "Ogni funzione nasce in co-progettazione con le strutture partner, a partire dai problemi di tutti i giorni.",
  },
  {
    icon: ShieldCheck,
    title: "Accesso solo su invito",
    description:
      "Nel tuo rifugio entra solo chi inviti tu, e ognuno vede ciò che serve al suo ruolo. Un accesso si sospende in un attimo.",
  },
];

const faqs = [
  {
    question: "Quanto costa Arca?",
    answer:
      "Niente. Arca è gratuita per rifugi e canili, oggi e in futuro: è il nostro modo di dare una mano a chi si prende cura degli animali ogni giorno.",
  },
  {
    question: "Che cosa c'entra Arca con Snuggl?",
    answer:
      "Snuggl è un progetto indipendente contro il randagismo e l'abbandono, che lavora su tre fronti: la divulgazione, Arca per i rifugi e, presto, un'applicazione per poter dare il proprio contributo sul territorio. Arca aiuta i rifugi a gestire meglio la giornata e a raccontare meglio i propri animali.",
  },
  {
    question: "Devo installare qualcosa?",
    answer:
      "No. Arca è una web app: si usa dal browser, sia dal computer sia dal telefono. Per entrare basta un indirizzo email.",
  },
  {
    question: "Come entrano i volontari?",
    answer:
      "Li inviti tu: ricevono un'email, scelgono la loro password oppure entrano con Google. Se qualcuno smette di venire, puoi sospenderne l'accesso in qualsiasi momento.",
  },
  {
    question: "Un rifugio può avere più gestori?",
    answer:
      "Sì. I gestori hanno gli stessi permessi e possono invitarsi a vicenda, così il rifugio non dipende da una persona sola.",
  },
  {
    question: "Funziona sia per i cani sia per i gatti?",
    answer:
      "Sì. Ogni scheda indica la specie, e l'elenco degli animali si filtra per cani o gatti, per settore e per stato.",
  },
  {
    question: "Cosa succede quando un animale viene adottato?",
    answer:
      "Si aggiorna il suo stato e la scheda viene archiviata, non cancellata: la sua storia resta consultabile.",
  },
  {
    question: "E se due volontari chiudono la stessa task?",
    answer:
      "Vale la prima chiusura: chi arriva dopo vede chi l'ha già fatta e a che ora. E siccome la giornata si aggiorna da sola, succede di rado.",
  },
  {
    question: "Cosa arriverà nei prossimi mesi?",
    answer:
      "Stiamo lavorando ai turni con la disponibilità settimanale dei volontari, a un modulo di candidatura pubblico per ogni rifugio e alle statistiche su ingressi e adozioni. Se vi manca qualcosa, scriveteci: Arca cresce insieme ai rifugi.",
  },
];

export default function ArcaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gray px-6 py-12 lg:px-40 lg:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="flex items-center gap-2 text-sm uppercase text-primary">
                <PawPrint className="w-4 h-4" />
                Arca · Per rifugi e canili
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold leading-tight">
                <span className="text-foreground block">
                  La gestione del rifugio,
                </span>
                <span className="text-primary block">finalmente semplice.</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-lg">
                Arca è il gestionale gratuito di Snuggl per rifugi e canili:
                animali, volontari e attività di ogni giorno in un unico posto.
                L{"'"}abbiamo costruito insieme ai rifugi, per lasciarvi più
                tempo da dedicare agli animali.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="font-bold bg-primary text-white hover:bg-primary/90 rounded-full"
                >
                  <a href="#contatti">Porta Arca nel tuo rifugio</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="font-bold bg-white border text-black border-black/20 rounded-full"
                >
                  <a href="#come-funziona">Come funziona</a>
                </Button>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-green">
                {[
                  "Gratis, per sempre",
                  "Niente da installare",
                  "Da computer e telefono",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center pb-6">
              <AppPreview className="rotate-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Il problema */}
      <section className="px-6 py-12 lg:px-40 lg:py-24">
        <div className="flex flex-col lg:flex-row container max-w-6xl mx-auto p-8 lg:p-24 bg-azure rounded-4xl gap-6">
          <div className="flex flex-col gap-2">
            <p className="items-center text-sm flex gap-2 uppercase text-primary">
              <DangerIcon />
              Perché Arca
            </p>

            <h2 className="text-4xl font-bold">
              Un rifugio non si gestisce in una chat
            </h2>
            <div className="text-lg text-green space-y-4">
              <p>
                Fogli Excel, lavagne e messaggi che si perdono nel gruppo dei
                volontari. Chi ha dato da mangiare al settore A? Luna è già
                uscita stamattina? La terapia di Briciola è stata fatta?
              </p>
              <p>
                Quando le persone sono tante e cambiano ogni giorno, le
                informazioni si perdono e il lavoro si fa due volte, o non si
                fa. Arca mette tutto nello stesso posto e tiene traccia di chi
                ha fatto cosa.
              </p>
            </div>
          </div>
          <div className="flex bg-white py-5 px-10 gap-2 justify-center items-center rounded-3xl flex-col shadow-xl w-full lg:w-auto shrink-0">
            <p className="text-6xl text-primary font-heading font-semibold">
              0 €
            </p>
            <p className="text-lg">costo per il rifugio</p>
            <p className="text-sm text-green">gratis, per sempre</p>
          </div>
        </div>
      </section>

      {/* Funzionalità */}
      <section
        className="bg-gray px-6 py-12 lg:px-40 lg:py-24"
        id="funzionalita"
      >
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Cosa fa Arca
            </h2>
            <p className="text-lg text-green">
              Tutto quello che serve alla giornata del rifugio, in un unico
              posto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-3xl p-6 lg:p-8 flex flex-col gap-4 shadow-sm"
              >
                <span className="w-12 h-12 rounded-full bg-azure flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </span>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="px-6 py-12 lg:px-40 lg:py-24" id="come-funziona">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Come funziona
            </h2>
            <p className="text-lg text-green">
              Dal primo contatto alla prima giornata su Arca, in quattro passi.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="bg-azure rounded-3xl p-6 lg:p-8 flex flex-col gap-4"
              >
                <span className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center font-bold shadow-xl">
                  {index + 1}
                </span>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Per chi */}
      <section className="bg-gray px-6 py-12 lg:px-40 lg:py-24" id="per-chi">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pensata per tutta la squadra
            </h2>
            <p className="text-lg text-green">
              Ogni persona del rifugio trova quello che le serve, e niente di
              più.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-white rounded-4xl p-8 lg:p-12 flex flex-col gap-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <role.icon className="w-7 h-7 text-white" />
                  </span>
                  <div>
                    <p className="text-primary uppercase text-sm font-extrabold">
                      {role.label}
                    </p>
                    <h3 className="text-3xl font-bold">{role.title}</h3>
                  </div>
                </div>
                <ul className="flex flex-col gap-3">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-gray-600">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principi */}
      <section className="bg-deep-teal text-white px-6 py-12 lg:px-40 lg:py-24">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Gratis, per sempre. <span className="text-primary">Davvero.</span>
            </h2>
            <p className="text-lg text-mint-green max-w-3xl mx-auto">
              Arca fa parte di Snuggl, un progetto indipendente contro il
              randagismo e l{"'"}abbandono degli animali. Non vendiamo un
              gestionale: lo costruiamo insieme ai rifugi, perché il tempo
              risparmiato torni agli animali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-white/10 rounded-3xl p-6 lg:p-8 flex flex-col gap-4"
              >
                <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <principle.icon className="w-6 h-6 text-deep-teal" />
                </span>
                <h3 className="text-2xl font-bold">{principle.title}</h3>
                <p className="text-mint-green">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-12 lg:px-40 lg:py-24" id="faq">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Domande frequenti
          </h2>

          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-gray rounded-3xl">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-lg font-heading font-medium [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-6 pb-6 -mt-1 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contatti */}
      <section className="px-6 pb-12 lg:px-40 lg:pb-24" id="contatti">
        <div className="container mx-auto max-w-6xl bg-azure rounded-3xl py-16 px-6 lg:px-16">
          <div className="flex flex-col items-center text-center gap-6">
            <Image
              src="/arca/doggo-curious.png"
              alt=""
              width={720}
              height={720}
              className="w-28 h-28 object-contain"
            />

            <h2 className="text-4xl font-bold">Porta Arca nel tuo rifugio</h2>

            <p className="text-lg text-green max-w-2xl">
              Raccontaci chi siete e come vi organizzate: ti ricontattiamo noi
              per conoscerci e mostrarti Arca. Se fai volontariato e vorresti
              proporla al tuo rifugio, scrivici anche tu.
            </p>

            <div className="w-full max-w-3xl mt-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
