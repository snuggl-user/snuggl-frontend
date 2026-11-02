import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { cn } from "@/lib/utils";

export type TeamProps = SliceComponentProps<Content.TeamSlice>;

// Gli avatar hanno lo sfondo trasparente: ognuno su un colore del design system.
const tones = ["bg-azure", "bg-lavender", "bg-mint-green"];

const Team: FC<TeamProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="px-4 py-12 lg:py-20"
      id="team"
    >
      <div className="reveal max-w-6xl mx-auto">
        {/* Titolo */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight mb-10 lg:mb-14">
          {slice.primary.title}
        </h2>

        {/* Grid membri team */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
          {slice.items.map((member, index) => (
            <div key={index} className="group flex flex-col gap-4">
              <div
                className={cn(
                  "relative aspect-[3/4] overflow-hidden rounded-[1.75rem]",
                  tones[index % tones.length]
                )}
              >
                {member.avatar.url ? (
                  <PrismicNextImage
                    field={member.avatar}
                    alt=""
                    sizes="(min-width: 1024px) 12rem, (min-width: 768px) 33vw, 50vw"
                    className="absolute inset-x-0 bottom-0 w-full h-[94%] object-cover object-top origin-bottom transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-heading text-7xl text-deep-teal/30">
                    {member.name?.charAt(0)?.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="px-1">
                <h3 className="text-lg md:text-xl leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-green mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
