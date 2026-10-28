import { FC } from "react";
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
      className="px-6 py-12 lg:px-40 lg:py-24"
      id="#issue"
    >
      <div className="flex flex-col lg:flex-row container max-w-6xl mx-auto p-8 lg:p-24 bg-azure rounded-4xl gap-6">
        <div className="flex flex-col gap-2">
          <p className="items-center text-sm flex gap-2 uppercase text-primary">
            <DangerIcon />
            {slice.primary.label}
          </p>

          <h1 className="text-4xl">{slice.primary.title}</h1>
          <div className="text-lg text-green">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
        <div className="flex bg-white py-5 px-10 gap-2 justify-center items-center rounded-3xl flex-col shadow-xl w-full lg:w-auto">
          <h1 className="text-6xl text-primary">{slice.primary.stat_number}</h1>
          <div className="text-lg">{slice.primary.stat_label}</div>
          <div className="text-sm text-green">
            {slice.primary.stat_sublabel}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IssueHighlight;
