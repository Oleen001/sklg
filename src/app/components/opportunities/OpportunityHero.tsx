type Props = {
  imageUrl: string;
  alt: string;
  targetUrl: string;
};

export default function OpportunityHero({ imageUrl, alt, targetUrl }: Props) {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-5 pt-[104px] sm:px-8 sm:pt-[112px] lg:px-14">
      <a
        href={targetUrl}
        className="group block overflow-hidden rounded-[24px] bg-[var(--sk-color-blue-100)] shadow-[var(--sk-shadow-sm)] ring-1 ring-white/80 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[var(--sk-color-blue-500)]"
        aria-label={alt}
      >
        <div className="aspect-[1180/237] overflow-hidden">
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.015]"
            loading="eager"
          />
        </div>
      </a>
    </section>
  );
}
