import { FC } from "react";
import Image from "next/image";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { DangerIcon } from "@/app/icons";

/**
 * Props for `IssueHighlight`.
 */
export type IssueHighlightProps =
  SliceComponentProps<Content.IssueHighlightSlice>;

/**
 * Component for "IssueHighlight" Slices.
 */
const IssueHighlight: FC<IssueHighlightProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 py-8 lg:py-12"
      id="issue"
    >
      {/* Pannello colorato largo quanto le card dell'hero: segna la fine
          dell'hero, che sta sul bianco, senza uscire dalla colonna */}
      <div className="reveal mx-auto max-w-6xl rounded-[2.5rem] bg-mint-green px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-center gap-10 lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <p className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-deep-teal">
              <DangerIcon />
              {slice.primary.label}
            </p>

            <h2 className="text-3xl lg:text-4xl font-semibold leading-[1.1] tracking-tight text-balance">
              {slice.primary.title}
            </h2>

            <div className="text-lg text-deep-teal max-w-md">
              <PrismicRichText field={slice.primary.description} />
            </div>
          </div>

          <div className="relative w-full max-w-sm justify-self-center lg:justify-self-end flex flex-col gap-1 rounded-[2rem] bg-white p-8 shadow-[0_24px_48px_-24px_rgba(31,95,92,0.35)]">
            <Image
              src="/arca/doggo-curious.png"
              alt=""
              width={720}
              height={720}
              className="absolute -top-8 right-5 w-20 h-20 object-contain"
            />

            <p className="font-heading font-semibold text-6xl leading-none tracking-tight text-deep-teal">
              {slice.primary.stat_number}
            </p>
            <p className="mt-3 font-heading text-xl text-black">
              {slice.primary.stat_label}
            </p>
            <p className="text-sm text-green">{slice.primary.stat_sublabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IssueHighlight;
