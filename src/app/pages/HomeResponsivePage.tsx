"use client";

import { useState } from "react";
import HeroMascot from "../components/HeroMascot";
import cloudy2IdleSvg from "@/assets/characters/cloudy/cloudy2-idle.svg?raw";
import sunny2IdleSvg from "@/assets/characters/sunny/sunny2-idle.svg?raw";
import windy3IdleSvg from "@/assets/characters/windy/windy3-idle.svg?raw";
import riasecASvg from "@/assets/riasec/a-lottie-v2.svg?raw";
import riasecCSvg from "@/assets/riasec/c-lottie-v2.svg?raw";
import riasecESvg from "@/assets/riasec/e-lottie-v2.svg?raw";
import riasecISvg from "@/assets/riasec/i-lottie-v2.svg?raw";
import riasecRSvg from "@/assets/riasec/r-lottie-v2.svg?raw";
import riasecSSvg from "@/assets/riasec/s-lottie-v2.svg?raw";
import discoverCardCharacter from "@/assets/home-cards/cloudy-card.svg";
import discoverCardIcon from "@/assets/home-cards/compass-1.svg";
import planCardIcon from "@/assets/home-cards/map-1.svg";
import planCardCharacter from "@/assets/home-cards/starry-card.svg";
import upskillCardCharacter from "@/assets/home-cards/sunny-card.svg";
import upskillCardIcon from "@/assets/home-cards/rocket-1.svg";
import imgCareer from "@/imports/Homepage/fb00664fb29d5df01ed6086676d13d0df96965c5.png";
import imgBootcamp from "@/imports/Homepage/12be04912d27d801c5eed4d993dfd2bc03db445d.png";
import imgCertificate from "@/imports/Homepage/33fbdc33ffd551e1b3c4d0b4c11618dad9f622fe.png";
import imgEngineeringOpportunity from "@/assets/opportunities/engineering-101-hero.png";
import imgHackathonOpportunity from "@/assets/opportunities/hackathon-green.png";
import svgPaths from "@/imports/Homepage/svg-7g4ywnxoxa";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  {
    title: "Discover",
    body: "ค้นหาตัวเองว่า\nเหมาะกับอาชีพไหน",
    helper: "รู้จักตัวเองให้ชัดขึ้น\nกับน้อง Cloudy",
    color: "#2B7DB8",
    backColor: "#247DB4",
    text: "text-white",
    icon: discoverCardIcon,
    character: discoverCardCharacter,
    characterClassName: "left-[-9px] top-[206px] h-[292px] w-[312px]",
  },
  {
    title: "Plan",
    body: "วิเคราะห์ Skill gap\nวางแผน learning path",
    helper: "วางแผนเส้นทาง\nต่อไปกับ Starry",
    color: "#FFE040",
    backColor: "#DCC72B",
    text: "text-[#1b3a5c]",
    icon: planCardIcon,
    character: planCardCharacter,
    characterClassName: "left-[-106px] top-[98px] h-[455px] w-[455px]",
  },
  {
    title: "Upskill",
    body: "เรียน course + Bootcamp\nปิด gap ทีละ skill",
    helper: "เติมสกิลให้พร้อม\nไปต่อกับ Sunny",
    color: "#DB475F",
    backColor: "#B73A50",
    text: "text-white",
    icon: upskillCardIcon,
    character: upskillCardCharacter,
    characterClassName: "left-[-98px] top-[120px] h-[491px] w-[491px]",
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
    id: "engineering-101",
    image: imgBootcamp,
    alt: "Engineering 101 Bootcamp banner",
  },
  {
    id: "engineering-opportunity",
    image: imgEngineeringOpportunity,
    alt: "Engineering opportunity banner",
  },
  {
    id: "hackathon-green",
    image: imgHackathonOpportunity,
    alt: "Hackathon bootcamp banner",
  },
];

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

function ButtonLink({ href, children, inverse = false }: { href: string; children: string; inverse?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[18px] font-semibold shadow-[var(--sk-shadow-sm)] transition-transform hover:-translate-y-0.5 ${
        inverse ? "bg-white text-[#053b80]" : "bg-[#0d6ec8] text-white"
      }`}
    >
      {children}
    </a>
  );
}

function SpeechBubble({ className, children }: { className: string; children: string }) {
  return (
    <div className={`absolute rounded-full bg-[#2ccb6f] px-5 py-2.5 text-[18px] text-white shadow-sm ${className}`}>
      {children}
      <span className="absolute bottom-[-10px] right-8 size-5 rotate-45 bg-[#2ccb6f]" aria-hidden />
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
          className={`absolute z-[2] max-w-none translate-y-32 scale-[0.82] origin-bottom opacity-0 transition duration-[680ms] ease-[cubic-bezier(0.2,1.35,0.28,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 peer-checked:translate-y-0 peer-checked:scale-100 peer-checked:opacity-100 ${step.characterClassName}`}
        />
      </div>
    </label>
  );
}

function BootcampCloudCluster() {
  const bubbles = [
    "left-[4px] top-[174px] h-[152px] w-[196px] bg-white/95",
    "left-[94px] top-[126px] h-[210px] w-[260px] bg-white/95",
    "left-[238px] top-[178px] h-[154px] w-[216px] bg-white/95",
    "left-[116px] top-[56px] h-[292px] w-[330px] bg-white/20",
    "left-[288px] top-[60px] h-[268px] w-[300px] bg-white/20",
    "left-[390px] top-[172px] h-[174px] w-[196px] bg-white/20",
  ];

  return (
    <div
      aria-hidden
      data-bootcamp-cloud-cluster="true"
      data-spin-decoration="false"
      className="absolute left-[642px] top-[56px] h-[390px] w-[548px] [animation:sk-bootcamp-cloud-idle_5.8s_ease-in-out_infinite]"
    >
      {bubbles.map((className, index) => (
        <span
          key={className}
          className={`absolute rounded-full ${className}`}
          style={{ animation: `sk-bootcamp-cloud-breathe ${4.6 + index * 0.25}s ease-in-out ${index * 0.18}s infinite` }}
        />
      ))}
    </div>
  );
}

function RiasecGraphic() {
  const letters = [
    { svg: riasecRSvg, className: "left-[71px] top-[33px] h-[166px] w-[149px] max-lg:left-[5%] max-lg:top-[12%] max-lg:h-[112px] max-lg:w-[102px]" },
    { svg: riasecISvg, className: "left-[183px] top-0 h-[177px] w-[162px] max-lg:left-[29%] max-lg:top-[4%] max-lg:h-[122px] max-lg:w-[72px]" },
    { svg: riasecASvg, className: "left-[282px] top-[49px] h-[177px] w-[162px] max-lg:left-[51%] max-lg:top-[13%] max-lg:h-[118px] max-lg:w-[100px]" },
    { svg: riasecSSvg, className: "left-[127px] top-[200px] h-[173px] w-[157px] max-lg:left-[21%] max-lg:top-[51%] max-lg:h-[122px] max-lg:w-[100px]" },
    { svg: riasecESvg, className: "left-[251px] top-[222px] h-[187px] w-[173px] max-lg:left-[45%] max-lg:top-[55%] max-lg:h-[124px] max-lg:w-[116px]" },
    { svg: riasecCSvg, className: "left-[376px] top-[188px] h-[188px] w-[174px] max-lg:left-[69%] max-lg:top-[45%] max-lg:h-[124px] max-lg:w-[118px]" },
  ];

  return (
    <div className="relative min-h-[390px] w-full overflow-visible lg:absolute lg:left-[527px] lg:top-[39px] lg:h-[410px] lg:min-h-0 lg:w-[620px] max-lg:mx-auto max-lg:min-h-[360px] max-lg:max-w-[390px] max-sm:min-h-[330px]">
      {letters.map((letter) => (
        <div key={letter.className} className={`absolute ${letter.className} [&_svg]:block [&_svg]:h-full [&_svg]:w-full`} dangerouslySetInnerHTML={{ __html: letter.svg }} />
      ))}
      <DecorativeStar className="left-[118px] top-[242px] size-12 max-lg:left-[2%] max-lg:top-[63%] max-lg:size-10" color="#5aaed8" />
      <DecorativeStar className="left-[221px] top-[193px] size-9 max-lg:left-[36%] max-lg:top-[46%] max-lg:size-8" color="#2ccb6f" variant="sparkle" />
      <DecorativeStar className="right-[10px] top-[119px] size-14 max-lg:right-[3%] max-lg:top-[26%] max-lg:size-10" color="#2ccb6f" />
      <DecorativeStar className="right-[118px] top-[35px] size-10 max-lg:right-[20%] max-lg:top-[5%] max-lg:size-8" color="#5aaed8" />
      <Dot className="right-[180px] top-[144px] size-3 max-lg:right-[31%] max-lg:top-[37%]" color="#2b7db8" />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="sticky top-0 z-[1] flex min-h-[620px] w-full items-center overflow-hidden bg-[#eff4f9] px-5 sm:px-8 lg:h-[90svh] lg:min-h-[760px] lg:px-0">
      <div className="relative mx-auto h-[620px] w-full max-w-[1180px] md:h-[660px] lg:h-[660px]">
        <div className="relative z-10 mx-auto pt-[108px] text-center md:pt-[120px]">
          <h1 className="text-[38px] font-bold leading-[1.18] tracking-normal text-[#424045] sm:text-[56px]">
            ค้นพบเส้นทางสู่
            <span className="block text-[#0d6ec8]">ความสำเร็จในอาชีพ</span>
            <span className="block text-[32px] leading-[1.35] text-[#424045]">ไปด้วยกัน</span>
          </h1>
          <div className="mt-7">
            <ButtonLink href="/skill-dashboard">เข้าสู่ระบบ แล้วไปเริ่มกันเลย!</ButtonLink>
          </div>
        </div>

        <DecorativeStar className="left-[76px] top-[173px] size-[72px] max-sm:left-0 max-sm:top-[214px] max-sm:size-11" color="#ffe040" variant="asterisk" />
        <DecorativeStar className="left-[255px] top-[224px] size-9 max-sm:left-[18%] max-sm:top-[308px]" color="#5aaed8" variant="sparkle" />
        <DecorativeStar className="right-[96px] top-[161px] size-14 max-sm:right-[2%] max-sm:top-[210px] max-sm:size-10" color="#5aaed8" />
        <DecorativeStar className="right-[170px] top-[274px] size-10 max-sm:right-[14%] max-sm:top-[352px] max-sm:size-8" color="#2ccb6f" variant="sparkle" />
        <Dot className="left-[201px] top-[310px] size-5 max-sm:left-[11%] max-sm:top-[355px]" color="#2ccb6f" />
        <Dot className="right-[88px] top-[259px] size-3.5 max-sm:right-[8%] max-sm:top-[320px]" color="#db475f" />

        <HeroMascot svg={windy3IdleSvg} label="Windy" maxLook={9} className="bottom-2 left-8 h-[300px] w-[354px] lg:bottom-auto lg:left-[52px] lg:top-[315px] max-md:bottom-8 max-md:left-[-62px] max-md:h-[190px] max-md:w-[224px]" />
        <HeroMascot svg={cloudy2IdleSvg} label="Cloudy" maxLook={7} className="bottom-[-34px] left-[34%] h-[238px] w-[398px] lg:bottom-auto lg:left-[396px] lg:top-[416px] max-md:bottom-[-18px] max-md:left-[22%] max-md:h-[156px] max-md:w-[262px]" />
        <HeroMascot svg={sunny2IdleSvg} label="Sunny" maxLook={8} className="bottom-8 right-11 h-[260px] w-[432px] lg:bottom-auto lg:left-[704px] lg:right-auto lg:top-[326px] max-md:bottom-5 max-md:right-[-145px] max-md:h-[186px] max-md:w-[310px]" />
      </div>
    </section>
  );
}

function WorksSection() {
  return (
    <section className="sticky top-0 z-[2] flex min-h-[620px] w-full items-center bg-white px-5 py-20 sm:px-8 lg:h-[90svh] lg:min-h-[760px] lg:px-0 lg:py-0">
      <div className="relative mx-auto w-full max-w-[1180px] lg:h-[567px] lg:pl-[108px] lg:pt-[64px]">
        <h2 className="text-[32px] font-bold leading-tight text-[#1b3a5c]">How Skilogy works</h2>
        <SpeechBubble className="left-[574px] top-[53px] hidden lg:block">เริ่มจากตรงไหนก็ได้ จะมีฉันคอยไกด์ตลอด</SpeechBubble>
        <HeroMascot svg={cloudy2IdleSvg} label="Cloudy guide" className="left-[901px] top-[63px] hidden h-[140px] w-[183px] lg:block" maxLook={5} />
        <div className="mt-10 grid gap-8 lg:grid-cols-[294px_294px_294px] lg:gap-[41px]">
          {steps.map((step) => (
            <WorkCard key={step.title} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SelfKnowledgeSection() {
  return (
    <section className="sticky top-0 z-[3] flex min-h-[620px] w-full items-center bg-[#c6ebfe] px-5 py-16 sm:px-8 lg:h-[90svh] lg:min-h-[760px] lg:rounded-t-[44px] lg:px-0 lg:py-0">
      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:block lg:h-[470px]">
        <div className="relative z-10 lg:absolute lg:left-[109px] lg:top-[120px]">
          <DecorativeStar className="left-[-79px] top-[-13px] size-[58px] max-sm:left-0 max-sm:top-[-62px] max-sm:size-11" color="#4da8ee" />
          <p className="text-[24px] text-[#1b3a5c]">เริ่มจาก...</p>
          <h2 className="mt-2 text-[42px] font-bold leading-tight text-[#05101f] sm:text-[48px]">รู้จักตัวเองให้ลึกขึ้น</h2>
          <p className="mt-4 text-[20px] leading-8 text-[#0e2440]">
            ด้วยแบบทดสอบ RIASEC
            <br />
            ตัวช่วยแนะนำอาชีพที่เหมาะกับคุณ
          </p>
          <div className="mt-6">
            <ButtonLink href="/skill-dashboard">เริ่มทำแบบทดสอบ</ButtonLink>
          </div>
        </div>
        <RiasecGraphic />
      </div>
    </section>
  );
}

function CareerSection() {
  return (
    <section className="sticky top-0 z-[4] flex min-h-[620px] w-full items-center bg-white px-5 py-20 sm:px-8 lg:h-[90svh] lg:min-h-[760px] lg:px-0 lg:py-0">
      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:block lg:h-full">
        <div className="relative min-h-[560px] max-lg:min-h-[520px] max-sm:min-h-[500px] lg:absolute lg:inset-0 lg:min-h-0">
          <img src={imgCareer} alt="" className="absolute bottom-0 left-[8%] h-[540px] w-auto max-w-none object-contain lg:bottom-0 lg:left-[42px] lg:top-auto lg:h-[650px] max-lg:left-1/2 max-lg:h-[500px] max-lg:-translate-x-1/2 max-sm:h-[470px]" />
          {careerChips.map((chip) => (
            <span key={chip.label} className={`absolute inline-flex items-center gap-2 rounded-full bg-[#eff4f9] px-5 py-3 text-[16px] text-[#05101f] shadow-[var(--sk-shadow-sm)] ${chip.className}`}>
              <span className="size-3 rounded-full" style={{ backgroundColor: chip.color }} />
              {chip.label}
            </span>
          ))}
          <DecorativeStar className="left-[93px] top-[120px] size-12" color="#2ccb6f" />
        </div>
        <div className="relative lg:absolute lg:left-[658px] lg:top-[300px]">
          <SpeechBubble className="left-[-34px] top-[-94px] hidden lg:block">จากตรงนี้ ฉันจะช่วยวางแผนเส้นทางสู่จุดหมายให้!</SpeechBubble>
          <HeroMascot svg={cloudy2IdleSvg} label="Cloudy career guide" className="left-[241px] top-[-59px] hidden h-[101px] w-[132px] lg:block" maxLook={5} />
          <h2 className="text-[42px] font-bold leading-tight text-[#05101f] sm:text-[48px]">
            สำรวจอาชีพ
            <br />
            และเป็นตั้งเป้าหมาย
          </h2>
          <p className="mt-4 text-[20px] text-[#0e2440]">เช็คความพร้อม ดูทักษะที่ยังขาด</p>
          <div className="mt-6">
            <ButtonLink href="/skill-trends">สำรวจอาชีพทั้งหมด</ButtonLink>
          </div>
          <DecorativeStar className="right-0 top-24 size-8" color="#ffbf00" />
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
    <section className="sticky top-0 z-[5] flex min-h-[620px] w-full items-center bg-[#1b3476] px-5 py-20 text-white sm:px-8 lg:h-[90svh] lg:min-h-[760px] lg:px-0 lg:py-0">
      <div className="relative mx-auto h-full w-full max-w-[1180px]">
        <div className="relative min-h-[560px] overflow-hidden max-sm:min-h-[620px] lg:h-full lg:min-h-0">
          <div className="relative z-10 lg:absolute lg:left-[80px] lg:top-[92px]">
            <h2 className="max-w-[760px] text-[42px] font-bold leading-tight max-sm:text-[38px] sm:text-[48px]">เปลี่ยนเป้าหมายให้เป็นความพร้อม</h2>
            <p className="mt-3 text-[20px]">ด้วย Bootcamp ที่เหมาะกับคุณ</p>
            <div className="mt-5">
            <ButtonLink href="/skill-builder" inverse>ดูทั้งหมด</ButtonLink>
            </div>
          </div>
          <BootcampCloudCluster />
          <HeroMascot svg={sunny2IdleSvg} label="Sunny bootcamp" className="left-[682px] top-[104px] h-[400px] w-[480px] max-sm:right-[-90px] max-sm:top-[210px] max-sm:h-[240px] max-sm:w-[288px]" maxLook={6} />
          <DecorativeStar className="left-[42px] top-[124px] size-12" color="#5aaed8" />
          <DecorativeStar className="right-[98px] top-[76px] size-10" color="#fff" />
          <DecorativeStar className="right-[70px] top-[164px] size-7" color="#5aaed8" />
          <div className="absolute left-1/2 top-[320px] z-20 w-[88%] -translate-x-1/2 overflow-hidden rounded-[24px] bg-[#490909] shadow-[0_22px_45px_rgba(0,0,0,0.22)] max-sm:bottom-8 max-sm:top-auto max-sm:w-full max-sm:rounded-[18px] lg:w-[1039px]">
            <img
              key={activeBanner.id}
              src={activeBanner.image}
              alt={activeBanner.alt}
              className="h-[308px] w-full object-cover [animation:sk-bootcamp-banner-in_520ms_cubic-bezier(0.16,1,0.3,1)_both] max-sm:h-auto max-sm:aspect-[1039/308]"
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
    <section className="sticky top-0 z-[6] flex min-h-[620px] w-full items-center bg-white px-5 py-20 sm:px-8 lg:h-[90svh] lg:min-h-[760px] lg:px-0 lg:py-0">
      <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 lg:block lg:h-full">
        <div className="relative min-h-[540px] max-lg:min-h-[430px] max-sm:min-h-[390px] lg:absolute lg:inset-0 lg:min-h-0">
          <img src={imgCertificate} alt="" className="absolute bottom-0 left-[8%] h-[520px] w-auto max-w-none object-contain lg:bottom-0 lg:left-[80px] lg:top-auto lg:h-[520px] lg:w-auto max-lg:left-1/2 max-lg:h-[420px] max-lg:-translate-x-1/2 max-sm:h-[380px]" />
          <DecorativeStar className="left-[91px] top-[132px] size-10" color="#5aaed8" />
          <DecorativeStar className="left-[91px] top-[199px] size-8" color="#5aaed8" />
          <Dot className="left-[171px] top-[193px] size-3" color="#2b7db8" />
        </div>
        <div className="relative lg:absolute lg:left-[785px] lg:top-[287px]">
          <SpeechBubble className="left-[-276px] top-[-67px] hidden lg:block">มีใบรับรองจากมหาวิทยาลัย และบริษัทชั้นนำ</SpeechBubble>
          <HeroMascot svg={cloudy2IdleSvg} label="Cloudy certificate" className="left-[-305px] top-[-33px] hidden h-[82px] w-[108px] lg:block" maxLook={5} />
          <DecorativeStar className="left-[-131px] top-[81px] size-10" color="#5aaed8" />
          <DecorativeStar className="right-[-140px] top-[117px] size-7 max-sm:right-2 max-sm:top-[132px]" color="#2ccb6f" />
          <p className="text-[24px] text-[#05101f]">อัปสกิลต่อด้วย...</p>
          <h2 className="mt-1 text-[52px] font-bold leading-tight text-[#05101f] sm:text-[56px]">คอร์สออนไลน์</h2>
          <div className="mt-6">
            <ButtonLink href="/skill-builder">ดูทั้งหมด</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeResponsivePage() {
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
      `}</style>
      <JourneyLine />
      <HeroSection />
      <WorksSection />
      <SelfKnowledgeSection />
      <CareerSection />
      <BootcampSection />
      <CourseSection />
    </main>
  );
}

function JourneyLine() {
  return (
    <div aria-hidden className="pointer-events-none absolute left-[-111px] top-[calc(180svh+161px)] z-20 hidden h-[1827px] w-[392px] items-center justify-center lg:flex">
      <div className="h-[200px] w-[1816px] flex-none rotate-[96.1deg]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1819.66 204.974">
          <path d={svgPaths.p304a5a00} stroke="url(#home-journey-line)" strokeWidth="5.99765" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="home-journey-line" x1="-262.436" x2="1974.23" y1="89.2626" y2="89.2626">
              <stop stopColor="#E8F6FF" />
              <stop offset="0.389423" stopColor="#DBE6F0" />
              <stop offset="0.616567" stopColor="#E0F0FF" />
              <stop offset="0.873952" stopColor="#4DA8EE" />
              <stop offset="0.980769" stopColor="#00D4DA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
