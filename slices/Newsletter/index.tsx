"use client";

import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNewsletterSignup } from "@/components/site/useNewsletterSignup";
import { Mail } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>;

const Newsletter: FC<NewsletterProps> = ({ slice }) => {
  const { email, setEmail, status, message, isSubmitting, handleSubmit } =
    useNewsletterSignup();

  const isContained = slice.variation === "default";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={isContained ? "px-4 py-12 lg:py-20" : "bg-primary"}
      id="newsletter"
    >
      <div
        className={cn(
          "reveal relative overflow-hidden px-6 py-16 sm:px-12 lg:py-20",
          isContained ? "max-w-6xl mx-auto rounded-[2.5rem] bg-primary" : ""
        )}
      >
        {/* Cerchi decorativi e mascotte */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/15"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-mint-green/40"
        />
        <Image
          src="/arca/doggo-excited.png"
          alt=""
          width={720}
          height={720}
          className="hidden lg:block absolute bottom-6 right-10 w-40 h-40 object-contain"
        />

        <div className="relative max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Mail className="w-6 h-6 text-deep-teal" />
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight">
            {slice.primary.title}
          </h2>

          <p className="text-lg text-deep-teal">
            {asText(slice.primary.description)}
          </p>

          {/* Da sm in su campo e bottone stanno nella stessa pillola bianca */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full max-w-xl sm:rounded-full sm:bg-white sm:p-2 sm:shadow-xl"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={slice.primary.email_placeholder || "La tua email"}
              aria-label={slice.primary.email_placeholder || "La tua email"}
              className="flex-1 h-14 bg-white border-0 rounded-full px-6 text-base md:text-base shadow-xl sm:shadow-none focus-visible:ring-0"
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 bg-deep-teal hover:bg-deep-teal/90 text-white rounded-full px-8 text-base font-bold whitespace-nowrap w-full sm:w-auto"
            >
              {isSubmitting ? "Invio..." : slice.primary.button_text}
            </Button>
          </form>

          {status !== "idle" && (
            <p
              className={cn(
                "text-sm font-bold rounded-full px-4 py-2",
                status === "success"
                  ? "bg-white/70 text-deep-teal"
                  : "bg-white text-red-600"
              )}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
