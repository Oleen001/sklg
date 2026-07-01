import type { LearningBanner } from "../../mock-api/learning";

type Props = {
  banners: LearningBanner[];
};

export default function LearningHeroCarousel({ banners }: Props) {
  const banner = banners[0];
  if (!banner) return null;

  return (
    <section className="relative h-[420px] overflow-hidden bg-[#f3e6d7] sm:h-[380px] lg:h-[356px]">
      <img src={banner.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f6e8d6] via-[#f7e4ca]/80 to-[#f2c37d]/70" />
      <div className="relative mx-auto flex h-full max-w-[1180px] flex-col justify-center gap-8 px-5 pb-8 pt-[104px] sm:px-8 sm:pt-[112px] lg:flex-row lg:items-center lg:px-14">
        <div className="max-w-[540px]">
          <p className="inline-flex bg-black px-4 py-2 text-[34px] font-bold leading-tight text-white sm:text-[42px]">{banner.title}</p>
          <p className="mt-3 inline-flex bg-black px-4 py-2 text-[26px] font-bold leading-tight text-white sm:text-[34px]">{banner.subtitle}</p>
          <p className="mt-5 text-[18px] font-bold text-[#05101f] sm:mt-6 sm:text-[20px]">{banner.eyebrow}</p>
        </div>
        <div className="hidden h-[250px] w-full max-w-[430px] rounded-[20px] bg-[#111827] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.32)] lg:ml-auto lg:mr-10 lg:block">
          <div className="mb-4 h-3 w-24 rounded-full bg-white/20" />
          <div className="grid grid-cols-[1fr_120px] gap-4">
            <div className="space-y-3">
              <div className="h-7 rounded bg-white/15" />
              <div className="h-7 w-4/5 rounded bg-white/10" />
              <div className="mt-8 h-20 rounded bg-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <span key={index} className="rounded bg-[#1e78d4]/70" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
        {banners.slice(0, 4).map((item, index) => (
          <span key={item.id} className={`h-1 rounded-full ${index === 0 ? "w-6 bg-[#1e78d4]" : "w-4 bg-[#d9d5d0]"}`} />
        ))}
      </div>
    </section>
  );
}
