"use client";

import { useState } from "react";
import HeroMascot from "../components/HeroMascot";
import { BlurText } from "../components/ui/blur-text";
import challengerIdleSvg from "@/assets/characters/new-3/the-challenger-idle.svg?raw";
import championIdleSvg from "@/assets/characters/new-3/the-champion-idle.svg?raw";
import explorerIdleSvg from "@/assets/characters/new-3/the-explorer-idle.svg?raw";
import riasecASvg from "@/assets/riasec/a-lottie-v2.svg?raw";
import riasecCSvg from "@/assets/riasec/c-lottie-v2.svg?raw";
import riasecESvg from "@/assets/riasec/e-lottie-v2.svg?raw";
import riasecISvg from "@/assets/riasec/i-lottie-v2.svg?raw";
import riasecRSvg from "@/assets/riasec/r-lottie-v2.svg?raw";
import riasecSSvg from "@/assets/riasec/s-lottie-v2.svg?raw";
import discoverCardCharacter from "@/assets/home-cards/the-explorer-card.svg";
import discoverCardIcon from "@/assets/home-cards/compass-1.svg";
import planCardIcon from "@/assets/home-cards/map-1.svg";
import planCardCharacter from "@/assets/home-cards/the-challenger-card.svg";
import upskillCardCharacter from "@/assets/home-cards/the-champion-card.svg";
import upskillCardIcon from "@/assets/home-cards/rocket-1.svg";
import imgBusinessBootcamp from "@/assets/home-banners/business-101-bootcamp.png";
import imgCulinaryBootcamp from "@/assets/home-banners/culinary-101-bootcamp.png";
import imgCareer from "@/imports/Homepage/fb00664fb29d5df01ed6086676d13d0df96965c5.png";
import imgCertificate from "@/imports/Homepage/33fbdc33ffd551e1b3c4d0b4c11618dad9f622fe.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  {
    title: "Discover",
    body: "ค้นหาตัวเองว่า\nเหมาะกับอาชีพไหน",
    helper: "รู้จักตัวเองให้ชัดขึ้น\nกับ Explorer",
    color: "#2B7DB8",
    backColor: "#247DB4",
    text: "text-white",
    icon: discoverCardIcon,
    character: discoverCardCharacter,
    characterClassName: "left-[-75px] top-[136px] size-[445px]",
  },
  {
    title: "Plan",
    body: "วิเคราะห์ Skill gap\nวางแผน learning path",
    helper: "วางแผนเส้นทาง\nกับ Challenger",
    color: "#FFE040",
    backColor: "#DCC72B",
    text: "text-[#1b3a5c]",
    icon: planCardIcon,
    character: planCardCharacter,
    characterClassName: "left-[24px] top-[140px] size-[445px]",
  },
  {
    title: "Upskill",
    body: "เรียน course + Bootcamp\nปิด gap ทีละ skill",
    helper: "เติมสกิลให้พร้อม\nไปต่อกับ Champion",
    color: "#DB475F",
    backColor: "#B73A50",
    text: "text-white",
    icon: upskillCardIcon,
    character: upskillCardCharacter,
    characterClassName: "left-[-48px] top-[120px] size-[445px]",
  },
];

const careerChips = [
  { label: "วิศวกรพรอมต์ AI", color: "#2ccb6f", className: "left-[42%] top-[13%] lg:left-[344px] lg:top-[218px]" },
  { label: "นักวิทยาศาสตร์ข้อมูล", color: "#2b7db8", className: "left-[2%] top-[50%] lg:left-[78px] lg:top-[462px]" },
  { label: "นักเทคโนโลยีอาหาร", color: "#ffbf00", className: "right-[3%] top-[42%] lg:left-[462px] lg:right-auto lg:top-[392px]" },
  { label: "นักพัฒนาธุรกิจ", color: "#2ccb6f", className: "left-[28%] bottom-[8%] lg:left-[286px] lg:bottom-auto lg:top-[592px]" },
];

const bootcampBanners = [
  {
    id: "business-101",
    image: imgBusinessBootcamp,
    alt: "Business 101 Bootcamp banner",
  },
  {
    id: "culinary-101",
    image: imgCulinaryBootcamp,
    alt: "Culinary 101 Bootcamp banner",
  },
];

const riasecMesses = [
  { id: "small-red", src: "/images/riasec-hero/mess/small-red.svg", className: "home-riasec-mess-small-red", fromX: -190, fromY: -90, rotate: 33.5 },
  { id: "big-red", src: "/images/riasec-hero/mess/big-red-blink.svg", className: "home-riasec-mess-big-red", fromX: 250, fromY: -120, rotate: -130 },
  { id: "orange", src: "/images/riasec-hero/mess/orange.svg", className: "home-riasec-mess-orange", fromX: -260, fromY: 190, rotate: 0 },
  { id: "blue", src: "/images/riasec-hero/mess/blue.svg", className: "home-riasec-mess-blue", fromX: 240, fromY: 180, rotate: -13 },
] as const;

const starIllustrations = {
  sparkle: {
    viewBox: "0 0 40.7623 41.0807",
    path: "M23.7599 2.16286C22.4165 -0.720954 18.3459 -0.720954 17.0025 2.16286L14.0833 8.41432C12.2752 13.1163 6.255 15.1395 2.14392 17.1304C-0.714641 18.49 -0.714641 22.591 2.14392 23.9505L8.34591 26.8899C10.8711 28.0828 12.9015 30.1303 14.0833 32.6666L17.0025 38.9171C18.3459 41.8019 22.4165 41.8019 23.7599 38.9171L26.6791 32.6666C28.4872 27.9647 34.5073 25.9414 38.6184 23.9505C41.4769 22.591 41.4769 18.49 38.6184 17.1304L32.4165 14.191C27.7499 12.3729 25.7397 6.30424 23.7599 2.16286Z",
  },
  star: {
    viewBox: "0 0 49.9878 49.1428",
    path: "M30.5233 2.74564C29.0789 -0.565441 24.5536 -0.974526 22.5435 2.02545L16.4528 11.1294C16.1396 11.6112 15.6144 11.9274 15.0285 11.9769L4.12956 13.0203C0.543734 13.3658 -1.25422 17.5476 0.98819 20.39L7.75589 28.9899C8.11952 29.4505 8.25082 30.0384 8.11951 30.6131L5.74569 41.307C4.95782 44.8352 8.39223 47.8322 11.776 46.5756L22.0587 42.7878C22.6042 42.5867 23.2102 42.6413 23.7052 42.9372L33.1394 48.5028C36.2404 50.3362 40.1596 48.0018 40.0182 44.3999L39.5939 33.4525C39.5636 32.8737 39.8061 32.3101 40.2404 31.9212L48.4423 24.6727C51.1494 22.2859 50.1393 17.8425 46.6646 16.8587L36.1294 13.8809C35.5637 13.7183 35.1092 13.3233 34.8769 12.791L30.5233 2.74564Z",
  },
  asterisk: {
    viewBox: "0 0 72 72",
    path: "M35.9141 0C38.6755 0 40.9141 2.23858 40.9141 5V23.9492L54.3623 10.502C56.3149 8.54933 59.48 8.54933 61.4326 10.502C63.3852 12.4546 63.3852 15.6196 61.4326 17.5723L48.0908 30.9141H67C69.7614 30.9141 72 33.1526 72 35.9141C72 38.6755 69.7614 40.9141 67 40.9141H47.8789L61.3066 54.3418C63.2593 56.2944 63.2593 59.4605 61.3066 61.4131C59.354 63.3657 56.188 63.3657 54.2354 61.4131L40.9141 48.0908V67C40.9141 69.7614 38.6755 72 35.9141 72C33.1526 72 30.9141 69.7614 30.9141 67V48.0908L17.5928 61.4131C15.6402 63.3657 12.4741 63.3657 10.5215 61.4131C8.56886 59.4605 8.56886 56.2944 10.5215 54.3418L23.9492 40.9141H5C2.23858 40.9141 0 38.6755 0 35.9141C0 33.1526 2.23858 30.9141 5 30.9141H23.7373L10.3955 17.5723C8.44289 15.6196 8.44289 12.4546 10.3955 10.502C12.3481 8.54933 15.5132 8.54933 17.4658 10.502L30.9141 23.9492V5C30.9141 2.23858 33.1526 0 35.9141 0Z",
  },
} as const;

function DecorativeStar({
  className,
  color = "#5aaed8",
  variant = "star",
}: {
  className: string;
  color?: string;
  variant?: keyof typeof starIllustrations;
}) {
  const illustration = starIllustrations[variant];

  return (
    <span
      aria-hidden
      data-spin-decoration="true"
      className={`absolute block ${className}`}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={illustration.viewBox}>
        <path d={illustration.path} fill={color} />
      </svg>
    </span>
  );
}

function Dot({ className, color }: { className: string; color: string }) {
  return <span aria-hidden className={`absolute block rounded-full ${className}`} style={{ backgroundColor: color }} />;
}

function ButtonLink({
  href,
  children,
  inverse = false,
  className = "",
}: {
  href: string;
  children: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[18px] font-semibold shadow-[var(--sk-shadow-sm)] transition-transform hover:-translate-y-0.5 ${
        inverse ? "bg-white text-[#053b80]" : "bg-[#0d6ec8] text-white"
      } ${className}`}
    >
      {children}
    </a>
  );
}

function GuideBubble({ className, children }: { className: string; children: string }) {
  return (
    <div data-guide-bubble-trigger data-guide-message={children} className={`pointer-events-none absolute hidden size-1 opacity-0 lg:block ${className}`} aria-hidden />
  );
}

function FloatingExplorerGuide() {
  return (
    <div data-floating-explorer className="pointer-events-none fixed bottom-5 right-5 z-[80] hidden h-[168px] w-[630px] opacity-0 will-change-[opacity,transform,filter] lg:block">
      <div data-floating-guide-bubble className="absolute bottom-[34px] right-[128px] min-w-[440px] max-w-[520px] rounded-full bg-[#18bd83] px-8 py-4 pr-12 text-[22px] leading-normal text-white opacity-0 shadow-[0_12px_24px_rgba(7,38,86,0.08)]">
        <span data-floating-guide-message className="whitespace-pre-line" />
        <span className="absolute bottom-[-17px] right-[70px] h-9 w-8 rotate-[35deg] bg-[#18bd83] [clip-path:polygon(0_0,100%_0,100%_100%)]" aria-hidden />
      </div>
      <HeroMascot svg={explorerIdleSvg} label="The Explorer guide" className="bottom-0 right-0 h-[150px] w-[188px]" maxLook={5} fitScale={1} />
    </div>
  );
}

function SectionMotifs({ tone = "light" }: { tone?: "light" | "blue" | "dark" }) {
  const blue = tone === "dark" ? "#5aaed8" : "#5aaed8";
  const yellow = tone === "dark" ? "#ffe040" : "#ffd108";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <DecorativeStar className="left-[38px] top-[72px] size-10 max-lg:left-[5%] max-lg:top-[42px] max-lg:size-8" color={blue} variant="sparkle" />
      <DecorativeStar className="right-[142px] bottom-[72px] size-8 max-lg:right-[12%] max-lg:bottom-[42px] max-lg:size-6" color={yellow} variant="sparkle" />
    </div>
  );
}

function WorkCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <label
      aria-label={`${step.title}: ${step.helper}`}
      className={`${step.text} group relative mx-auto block h-[342px] w-full max-w-[294px] cursor-pointer overflow-hidden rounded-[16px] text-center shadow-[var(--sk-shadow-sm)] outline-none transition-transform hover:-translate-y-1 focus-within:ring-4 focus-within:ring-[#0d6ec8]/25`}
      style={{ backgroundColor: step.color }}
    >
      <input className="peer sr-only" type="checkbox" />
      <div className="absolute inset-0 flex translate-y-0 scale-100 flex-col items-center gap-4 pt-10 opacity-100 transition duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 group-hover:-translate-y-4 group-hover:scale-[0.96] peer-checked:opacity-0 peer-checked:-translate-y-4 peer-checked:scale-[0.96]">
        <img src={step.icon} alt="" className="h-[150px] w-[150px] object-contain" />
        <div className="flex w-full flex-col items-center gap-1">
          <h3 className="text-[32px] font-semibold leading-9">{step.title}</h3>
          <p className="whitespace-pre-line text-[20px] leading-normal">{step.body}</p>
        </div>
        <span aria-hidden className="absolute bottom-[-8px] left-1/2 size-2 -translate-x-1/2 rounded-full opacity-35" style={{ backgroundColor: step.backColor }} />
      </div>
      <div className="pointer-events-none absolute inset-0 translate-y-6 opacity-0 transition duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 peer-checked:translate-y-0 peer-checked:opacity-100">
        <p className="absolute left-0 right-0 top-[72px] z-[3] whitespace-pre-line px-6 text-center text-[30px] font-normal leading-[1.35] tracking-normal">{step.helper}</p>
        <span
          aria-hidden
          className="absolute bottom-[-375px] left-1/2 z-[1] size-[740px] -translate-x-1/2 translate-y-24 scale-[0.04] rounded-full transition-transform duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:scale-100 peer-checked:translate-y-0 peer-checked:scale-100"
          style={{ backgroundColor: step.backColor }}
        />
        <img
          src={step.character}
          alt=""
          className={`absolute z-[2] max-w-none ${step.characterClassName}`}
        />
      </div>
    </label>
  );
}

function BootcampCloudCluster() {
  return (
    <div
      aria-hidden
      data-bootcamp-cloud-cluster="true"
      data-spin-decoration="false"
      className="absolute left-[718px] top-[80px] h-[392px] w-[392px] [animation:sk-bootcamp-cloud-idle_5.8s_ease-in-out_infinite]"
    >
      <span className="absolute inset-0 rounded-full bg-white/20" style={{ animation: "sk-bootcamp-cloud-breathe 4.8s ease-in-out infinite" }} />
      <span className="absolute inset-[38px] rounded-full bg-white/30" style={{ animation: "sk-bootcamp-cloud-breathe 4.4s ease-in-out 120ms infinite" }} />
      <span className="absolute inset-[86px] rounded-full bg-white/95" style={{ animation: "sk-bootcamp-cloud-breathe 4s ease-in-out 240ms infinite" }} />
    </div>
  );
}

function RiasecGraphic() {
  const letters = [
    { svg: riasecRSvg, label: "R", className: "h-[clamp(86px,11.3vw,166px)] w-[clamp(78px,10.2vw,149px)]" },
    { svg: riasecISvg, label: "I", className: "h-[clamp(102px,13.1vw,194px)] w-[clamp(56px,6.9vw,102px)] -mx-[clamp(5px,0.45vw,8px)]" },
    { svg: riasecASvg, label: "A", className: "h-[clamp(92px,12vw,177px)] w-[clamp(82px,11vw,162px)]" },
    { svg: riasecSSvg, label: "S", className: "h-[clamp(88px,11.7vw,173px)] w-[clamp(80px,10.7vw,157px)]" },
    { svg: riasecESvg, label: "E", className: "h-[clamp(96px,12.7vw,187px)] w-[clamp(90px,11.8vw,173px)]" },
    { svg: riasecCSvg, label: "C", className: "h-[clamp(96px,12.8vw,188px)] w-[clamp(88px,11.8vw,174px)]" },
  ];

  return (
    <div data-riasec-word className="relative z-10 flex items-end justify-center gap-[clamp(0px,0.45vw,7px)] overflow-visible" aria-label="RIASEC">
      {letters.map((letter, index) => (
        <div
          key={letter.label}
          data-riasec-letter
          data-riasec-letter-index={index}
          className={`home-riasec-letter shrink-0 ${letter.className} [&_svg]:block [&_svg]:h-full [&_svg]:w-full`}
          dangerouslySetInnerHTML={{ __html: letter.svg }}
        />
      ))}
      <DecorativeStar className="left-[64%] top-[72%] size-9 max-sm:size-7" color="#2ccb6f" variant="sparkle" />
    </div>
  );
}

function RiasecMessLayer({ className = "" }: { className?: string }) {
  return (
    <div className={`home-riasec-mess-layer ${className}`} aria-hidden>
      {riasecMesses.map((mess) => (
        <div
          key={mess.id}
          data-riasec-orb
          data-riasec-orb-id={mess.id}
          data-riasec-from-x={mess.fromX}
          data-riasec-from-y={mess.fromY}
          data-riasec-rotate={mess.rotate}
          className={`home-riasec-mess ${mess.className}`}
        >
          <img className="home-riasec-mess-float" src={mess.src} alt="" draggable={false} />
        </div>
      ))}
    </div>
  );
}

function HeroSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <section className="sticky top-0 z-[1] flex h-[100svh] w-full items-center overflow-hidden bg-[#eff4f9] px-5 sm:px-8 lg:px-0">
      <div data-sticky-parallax data-parallax-speed="0.23" data-parallax-max="190" className="relative mx-auto h-full w-full max-w-[1180px] will-change-transform">
        <div className="relative z-10 mx-auto pt-[104px] text-center md:pt-[116px]">
          <h1 className="text-[32px] font-bold leading-[1.18] tracking-normal text-[#424045] sm:text-[58px] lg:text-[64px]">
            <BlurText text="เปลี่ยนศักยภาพให้เป็นทักษะจริง" />
            <span className="block text-[#0d6ec8]">
              <BlurText text="สู่เส้นทางความสำเร็จในอาชีพ" delay={0.12} />
            </span>
          </h1>
          {!isLoggedIn ? (
            <div className="mt-7">
              <ButtonLink href="/login" className="min-h-[52px] px-6 text-[18px] sm:min-h-[58px] sm:px-7 sm:text-[22px]">
                Become a Skillogist
              </ButtonLink>
            </div>
          ) : null}
        </div>

        <DecorativeStar className="left-[-64px] top-[123px] size-[72px] max-sm:left-0 max-sm:top-[214px] max-sm:size-11" color="#ffe040" variant="asterisk" />
        <DecorativeStar className="right-[26px] top-[174px] size-14 max-sm:right-[2%] max-sm:top-[210px] max-sm:size-10" color="#0fbf8a" />
        <Dot className="left-[25px] top-[310px] size-5 max-sm:left-[11%] max-sm:top-[355px]" color="#2ccb6f" />

        <HeroMascot svg={championIdleSvg} label="The Champion" maxLook={8} fitScale={1} className="z-[4] bottom-[-34px] left-[-82px] h-[228px] w-[286px] md:bottom-[-86px] md:left-[-20px] md:h-[360px] md:w-[440px] lg:bottom-auto lg:left-[-84px] lg:top-[382px] lg:h-[430px] lg:w-[500px]" />
        <HeroMascot svg={challengerIdleSvg} label="The Challenger" maxLook={9} fitScale={1} className="z-[4] bottom-[-38px] right-[-90px] h-[230px] w-[230px] rotate-[10deg] md:bottom-[-90px] md:right-[-24px] md:h-[360px] md:w-[360px] lg:bottom-auto lg:left-[760px] lg:right-auto lg:top-[426px] lg:h-[430px] lg:w-[430px]" />
        <HeroMascot svg={explorerIdleSvg} label="The Explorer" maxLook={7} fitScale={1} className="z-[6] bottom-[-48px] left-[18%] h-[246px] w-[310px] md:bottom-[-112px] md:left-[30%] md:h-[380px] md:w-[460px] lg:bottom-auto lg:left-[234px] lg:top-[388px] lg:h-[520px] lg:w-[650px]" />
      </div>
    </section>
  );
}

function WorksSection() {
  return (
    <div data-work-scroll-section className="relative z-[2] h-[320svh] min-h-[2240px] bg-white">
      <section className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-0 lg:py-0">
        <SectionMotifs />
        <div data-work-scroll-content className="relative mx-auto w-full max-w-[1180px] lg:h-[567px] lg:pl-[108px] lg:pt-[64px]">
          <h2 className="relative z-10 text-[36px] font-bold leading-tight text-[#1b3a5c] sm:text-[44px]">
            <BlurText text="How Skillogy works" />
          </h2>
          <GuideBubble
            className="right-[10px] top-[2px] z-20"
          >
            เริ่มจากตรงไหนก็ได้ จะมีฉันคอยไกด์ตลอด
          </GuideBubble>
          <HeroMascot svg={championIdleSvg} label="The Champion work peek" className="left-[-48px] top-[276px] hidden h-[176px] w-[176px] -rotate-12 opacity-95 lg:block" maxLook={4} fitScale={1} />
          <div data-work-card-stage className="relative z-10 mt-14 grid gap-8 lg:mt-[112px] lg:grid-cols-[294px_294px_294px] lg:gap-[34px]">
            {steps.map((step, index) => (
              <div key={step.title} data-work-motion-card data-work-card-index={index} className="will-change-[transform,opacity,filter]">
                <WorkCard step={step} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SelfKnowledgeSection() {
  return (
    <div data-riasec-scroll-section data-scroll-offset-vh="1" className="relative z-[3] -mt-[100svh] h-[440svh] min-h-[3400px] bg-[#c6ebfe]">
      <section className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden bg-[#c6ebfe] px-5 py-16 sm:px-8 lg:rounded-t-[44px] lg:px-0 lg:py-0">
        <SectionMotifs tone="blue" />
        <div data-riasec-scroll-content className="relative mx-auto h-full w-full max-w-[1180px]">
          <RiasecMessLayer />
          <DecorativeStar className="left-[2%] top-[63%] size-14 max-sm:left-[3%] max-sm:top-[70%] max-sm:size-10" color="#4da8ee" />
          <DecorativeStar className="right-[4%] top-[39%] size-11 max-sm:right-[1%] max-sm:top-[32%] max-sm:size-9" color="#2ccb6f" />
          <div className="absolute left-1/2 top-[22%] z-10 w-[min(760px,94vw)] -translate-x-1/2 max-sm:top-[18%]">
            <RiasecGraphic />
          </div>
          <div data-riasec-motion-copy className="absolute inset-x-0 top-[48%] z-20 mx-auto flex w-full max-w-[620px] flex-col items-center text-center max-sm:top-[43%]">
            <p className="text-[22px] leading-normal text-[#1b3a5c] max-sm:text-[18px]">เริ่มจาก...</p>
            <h2 className="mt-2 text-[42px] font-bold leading-tight tracking-normal text-[#05101f] sm:text-[48px]">
              <BlurText text="รู้จักตัวเองให้ลึกขึ้น" />
            </h2>
            <p className="mx-auto mt-4 max-w-[460px] text-[20px] leading-8 text-[#0e2440] max-sm:text-[17px] max-sm:leading-7">
              ด้วยแบบทดสอบ RIASEC
              <br />
              ตัวช่วยแนะนำอาชีพที่เหมาะกับคุณ
            </p>
            <div className="mt-6">
              <ButtonLink href="/RIASEC">เริ่มทำแบบทดสอบ</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CareerSection() {
  return (
    <section className="sticky top-0 z-[4] -mt-[100svh] flex h-[100svh] w-full items-center overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-0 lg:py-0">
      <SectionMotifs />
      <div data-sticky-parallax data-parallax-speed="0.2" data-parallax-max="160" className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 will-change-transform lg:block lg:h-full">
        <div className="relative min-h-[560px] max-lg:min-h-[520px] max-sm:min-h-[500px] lg:absolute lg:inset-0 lg:min-h-0">
          <img src={imgCareer} alt="" className="absolute bottom-0 left-[8%] h-[540px] w-auto max-w-none object-contain lg:bottom-0 lg:left-[42px] lg:top-auto lg:h-[650px] max-lg:left-1/2 max-lg:h-[500px] max-lg:-translate-x-1/2 max-sm:h-[470px]" />
          {careerChips.map((chip) => (
            <span key={chip.label} className={`absolute inline-flex items-center gap-2 rounded-full bg-[#eff4f9] px-5 py-3 text-[16px] text-[#05101f] shadow-[var(--sk-shadow-sm)] ${chip.className}`}>
              <span className="size-3 rounded-full" style={{ backgroundColor: chip.color }} />
              {chip.label}
            </span>
          ))}
        </div>
        <div className="relative lg:absolute lg:left-[658px] lg:top-[300px]">
          <GuideBubble
            className="left-[-94px] top-[-154px] z-20"
          >
            จากตรงนี้ ฉันจะช่วยวางแผนเส้นทางสู่จุดหมายให้!
          </GuideBubble>
          <h2 className="text-[42px] font-bold leading-tight text-[#05101f] sm:text-[48px]">
            <BlurText text="สำรวจอาชีพ" />
            <br />
            <BlurText text="และตั้งเป้าหมาย" delay={0.08} />
          </h2>
          <p className="mt-4 text-[20px] text-[#0e2440]">เช็คความพร้อม ดูทักษะที่ยังขาด</p>
          <div className="mt-6">
            <ButtonLink href="/skill-trends">สำรวจอาชีพทั้งหมด</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function BootcampSection() {
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const activeBanner = bootcampBanners[activeBannerIndex];

  const goToBanner = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + bootcampBanners.length) % bootcampBanners.length;
    setActiveBannerIndex(normalizedIndex);
  };

  return (
    <section className="sticky top-0 z-[5] flex h-[100svh] w-full items-center overflow-hidden bg-[#1b3476] px-5 py-20 text-white sm:px-8 lg:px-0 lg:py-0">
      <SectionMotifs tone="dark" />
      <div data-sticky-parallax data-parallax-speed="0.18" data-parallax-max="145" className="relative mx-auto h-full w-full max-w-[1180px] will-change-transform">
        <div className="relative min-h-[560px] overflow-hidden max-sm:min-h-[620px] lg:h-full lg:min-h-0">
          <div className="relative z-10 lg:absolute lg:left-[80px] lg:top-[92px]">
            <h2 className="max-w-[760px] text-[42px] font-bold leading-tight max-sm:text-[38px] sm:text-[48px]">
              <BlurText text="เปลี่ยนเป้าหมายให้เป็นความพร้อม" />
            </h2>
            <p className="mt-3 text-[20px]">ด้วย Bootcamp ที่เหมาะกับคุณ</p>
            <div className="mt-5">
            <ButtonLink href="/skill-builder" inverse>ดูทั้งหมด</ButtonLink>
            </div>
          </div>
          <BootcampCloudCluster />
          <HeroMascot svg={championIdleSvg} label="The Champion bootcamp" className="left-[682px] top-[104px] h-[400px] w-[480px] max-sm:right-[-70px] max-sm:top-[222px] max-sm:h-[210px] max-sm:w-[252px]" maxLook={6} fitScale={1} />
          <DecorativeStar className="right-[70px] top-[164px] size-7" color="#5aaed8" />
          <div className="absolute left-1/2 top-[320px] z-20 aspect-[238/70] w-[88%] -translate-x-1/2 overflow-hidden rounded-[24px] bg-[#490909] shadow-[0_22px_45px_rgba(0,0,0,0.22)] max-sm:bottom-8 max-sm:top-auto max-sm:w-full max-sm:rounded-[18px] lg:w-[1039px]">
            <img
              key={activeBanner.id}
              src={activeBanner.image}
              alt={activeBanner.alt}
              className="h-full w-full object-cover [animation:sk-bootcamp-banner-in_520ms_cubic-bezier(0.16,1,0.3,1)_both]"
            />
          </div>
          <button
            type="button"
            aria-label="Previous bootcamp banner"
            onClick={() => goToBanner(activeBannerIndex - 1)}
            className="absolute left-[55px] top-[450px] z-30 hidden size-12 cursor-pointer items-center justify-center rounded-full bg-white text-[#0e2440] shadow-[0_0_10px_rgba(0,0,0,0.1)] transition hover:scale-105 hover:bg-[#f5f8fc] lg:flex"
          >
            <ChevronLeft className="size-8" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            aria-label="Next bootcamp banner"
            onClick={() => goToBanner(activeBannerIndex + 1)}
            className="absolute right-[55px] top-[450px] z-30 hidden size-12 cursor-pointer items-center justify-center rounded-full bg-white text-[#0e2440] shadow-[0_0_10px_rgba(0,0,0,0.1)] transition hover:scale-105 hover:bg-[#f5f8fc] lg:flex"
          >
            <ChevronRight className="size-8" strokeWidth={2.4} />
          </button>
          <div className="absolute left-1/2 top-[653px] z-30 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {bootcampBanners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                aria-label={`Show bootcamp banner ${index + 1}`}
                aria-current={index === activeBannerIndex ? "true" : undefined}
                onClick={() => goToBanner(index)}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  index === activeBannerIndex ? "w-10 bg-[#0d6ec8]" : "w-6 bg-[#05101f]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseSection() {
  return (
    <section className="sticky top-0 z-[6] flex h-[100svh] w-full items-center overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-0 lg:py-0">
      <SectionMotifs />
      <div data-sticky-parallax data-parallax-speed="0.18" data-parallax-max="145" className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 will-change-transform lg:block lg:h-full">
        <div className="relative min-h-[540px] max-lg:min-h-[430px] max-sm:min-h-[390px] lg:absolute lg:inset-0 lg:min-h-0">
          <img src={imgCertificate} alt="" className="absolute bottom-0 left-[8%] h-[520px] w-auto max-w-none object-contain lg:bottom-0 lg:left-[80px] lg:top-auto lg:h-[520px] lg:w-auto max-lg:left-1/2 max-lg:h-[420px] max-lg:-translate-x-1/2 max-sm:h-[380px]" />
          <DecorativeStar className="left-[91px] top-[132px] size-10" color="#5aaed8" />
          <DecorativeStar className="left-[91px] top-[199px] size-8" color="#5aaed8" />
          <Dot className="left-[171px] top-[193px] size-3" color="#2b7db8" />
        </div>
        <div className="relative lg:absolute lg:left-[785px] lg:top-[287px]">
          <GuideBubble
            className="left-[-470px] top-[-104px] z-20"
          >
            มีใบรับรองจากมหาวิทยาลัย และบริษัทชั้นนำ
          </GuideBubble>
          <DecorativeStar className="left-[-131px] top-[81px] size-10" color="#5aaed8" />
          <DecorativeStar className="right-[-140px] top-[117px] size-7 max-sm:right-2 max-sm:top-[132px]" color="#2ccb6f" />
          <p className="text-[24px] text-[#05101f]">อัปสกิลต่อด้วย...</p>
          <h2 className="mt-1 text-[52px] font-bold leading-tight text-[#05101f] sm:text-[56px]">
            <BlurText text="คอร์สออนไลน์" />
          </h2>
          <div className="mt-6">
            <ButtonLink href="/skill-builder">ดูทั้งหมด</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeResponsivePage({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <main className="relative w-full overflow-x-clip bg-white text-[var(--sk-color-ink)]">
      <style>{`
        @keyframes sk-bootcamp-cloud-idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes sk-bootcamp-cloud-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        @keyframes sk-bootcamp-banner-in {
          0% {
            opacity: 0;
            filter: blur(18px);
            transform: scale(1.035);
          }
          55% {
            opacity: 1;
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }
        }
        @keyframes sk-home-riasec-mess-float {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(0, calc(var(--float-distance) * -1), 0) rotate(1.2deg);
          }
        }
        .home-riasec-mess-layer {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
        }
        [data-riasec-motion-copy] {
          opacity: 0;
          filter: blur(16px);
          transform: translate3d(0, 28px, 0) scale(0.96);
          will-change: opacity, transform, filter;
        }
        .home-riasec-letter {
          opacity: 0;
          filter: blur(16px);
          transform: translate3d(0, 28px, 0) scale(0.96);
          will-change: opacity, transform, filter;
        }
        .home-riasec-mess {
          position: absolute;
          left: var(--x);
          top: var(--y);
          width: var(--w);
          opacity: 0;
          transform-origin: 50% 50%;
          will-change: opacity, transform;
        }
        [data-floating-explorer] {
          filter: blur(12px);
          transform: translate3d(18px, 28px, 0) scale(0.94);
          transition:
            opacity 620ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 720ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 720ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        [data-floating-explorer][data-floating-guide-visible="true"] {
          opacity: 1;
          filter: blur(0);
          transform: translate3d(0, 0, 0) scale(1);
        }
        [data-floating-guide-bubble] {
          filter: blur(16px);
          transform: translate3d(0, 24px, 0) scale(0.98);
          transition:
            opacity 560ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 680ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 680ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform, filter;
        }
        [data-floating-guide-bubble][data-floating-bubble-visible="true"] {
          opacity: 1;
          filter: blur(0);
          transform: translate3d(0, 0, 0) scale(1);
        }
        .home-riasec-mess-float {
          display: block;
          width: 100%;
          height: auto;
          animation: sk-home-riasec-mess-float var(--float-duration) ease-in-out infinite;
          will-change: transform;
        }
        .home-riasec-mess-blue {
          --w: min(260px, 22vw);
          --x: 76%;
          --y: 76%;
          --float-distance: 9px;
          --float-duration: 3400ms;
        }
        .home-riasec-mess-orange {
          --w: min(292px, 24vw);
          --x: -1%;
          --y: 78%;
          --float-distance: 7px;
          --float-duration: 3800ms;
        }
        .home-riasec-mess-big-red {
          --w: min(320px, 27vw);
          --x: 82%;
          --y: -9%;
          --float-distance: 10px;
          --float-duration: 4200ms;
        }
        .home-riasec-mess-small-red {
          --w: min(78px, 9vw);
          --x: 8%;
          --y: 10%;
          --float-distance: 6px;
          --float-duration: 3200ms;
        }
        @media (max-width: 900px) {
          .home-riasec-mess-blue {
            --w: 34%;
            --x: 63%;
            --y: 78%;
          }
          .home-riasec-mess-orange {
            --w: 36%;
            --x: -12%;
            --y: 79%;
          }
          .home-riasec-mess-big-red {
            --w: 42%;
            --x: 72%;
            --y: -4%;
          }
          .home-riasec-mess-small-red {
            --w: 13%;
            --x: 4%;
            --y: 11%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-riasec-mess-float {
            animation: none;
          }
          [data-riasec-motion-copy],
          .home-riasec-letter,
          .home-riasec-mess,
          [data-floating-explorer],
          [data-floating-guide-bubble] {
            opacity: 1;
            filter: none;
            transform: none;
          }
          [data-riasec-motion-copy] {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
      <HeroSection isLoggedIn={isLoggedIn} />
      <WorksSection />
      <SelfKnowledgeSection />
      <CareerSection />
      <BootcampSection />
      <CourseSection />
      <FloatingExplorerGuide />
    </main>
  );
}
