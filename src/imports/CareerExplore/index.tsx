import { motion } from "motion/react";
import svgPaths from "./svg-rtkfmeu8z6";
import imgScreenshot25690625At095845RemovebgPreview1 from "./20bc659d0efe9b2f53c94ae71cb8a3c6cfea8f1f.png";
import imgAdsBackground from "./12be04912d27d801c5eed4d993dfd2bc03db445d.png";

function TextLink() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Text link">
      <p className="[word-break:break-word] font-['noto_sans_thai:semiBold','Noto_Sans:SemiBold',sans-serif] leading-[21px] relative shrink-0 text-[#05101f] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 600' }}>
        Digital Credentials
      </p>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0 w-full" data-name="Logo">
      <div className="[word-break:break-word] flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0e2440] text-[24px] text-center whitespace-nowrap">
        <p className="leading-[normal]">BootcamP</p>
      </div>
      <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['noto_sans_thai:regular','Noto_Sans:Regular',sans-serif] h-[62px] justify-center leading-[0] min-w-px relative text-[#05101f] text-[16px] whitespace-pre-wrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        <p className="leading-[24px] mb-0">{`A personalized system to track and manage academic skills `}</p>
        <p className="leading-[24px]">and credits for lifelong learning.</p>
      </div>
      <TextLink />
    </div>
  );
}

function FooterSection() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pt-[56px] relative shrink-0 w-full" data-name="Footer Section">
      <Logo />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col gap-[56px] items-start left-0 pb-[56px] px-[80px] w-[1180px]" data-name="Footer">
      <div aria-hidden className="absolute border-[#dbe6f0] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
      <FooterSection />
    </div>
  );
}

function NavbarMenuItems() {
  return (
    <div className="content-stretch flex gap-[11.995px] items-center relative shrink-0" data-name="Navbar Menu Items">
      <div className="content-stretch flex items-center px-[11.995px] py-[7.997px] relative shrink-0" data-name="Nav-menu">
        <p className="[word-break:break-word] font-['noto_sans_thai:regular','Noto_Sans:Regular',sans-serif] leading-[23.991px] relative shrink-0 text-[#1b3a5c] text-[15.99px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          Skill Dashboard
        </p>
      </div>
      <div className="content-stretch flex items-center px-[11.995px] py-[7.997px] relative shrink-0" data-name="Nav-menu">
        <p className="[word-break:break-word] font-['Noto_Sans_Thai:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[23.981px] relative shrink-0 text-[#1b3a5c] text-[15.99px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Skill Trends
        </p>
      </div>
      <div className="content-stretch flex items-center px-[11.995px] py-[7.997px] relative shrink-0" data-name="Nav-menu">
        <p className="[word-break:break-word] font-['noto_sans_thai:regular','Noto_Sans:Regular',sans-serif] leading-[23.991px] relative shrink-0 text-[#1b3a5c] text-[15.99px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          Skill Builder
        </p>
      </div>
      <div className="content-stretch flex items-center px-[11.995px] py-[7.997px] relative shrink-0" data-name="Nav-menu">
        <p className="[word-break:break-word] font-['noto_sans_thai:regular','Noto_Sans:Regular',sans-serif] leading-[23.991px] relative shrink-0 text-[#1b3a5c] text-[15.99px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
          Skill Opportunities
        </p>
      </div>
    </div>
  );
}

function Group40() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="col-1 ml-0 mt-0 relative row-1 size-[36px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="var(--fill-0, #2CCB6F)" id="Ellipse 2207" r="18" />
        </svg>
      </div>
      <div className="col-1 h-[13.537px] ml-[9.69px] mt-[7.62px] relative row-1 w-[17.271px]" data-name="Screenshot_2569-06-25_at_09.58.45-removebg-preview 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot25690625At095845RemovebgPreview1} />
      </div>
    </div>
  );
}

function NavbarMenu() {
  return (
    <div className="content-stretch flex gap-[39.984px] items-center relative shrink-0" data-name="Navbar Menu">
      <NavbarMenuItems />
      <Group40 />
    </div>
  );
}

function NavbarContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between max-w-[1327.4796142578125px] min-w-px relative" data-name="Navbar Content">
      <div className="[word-break:break-word] flex flex-col font-['ABeeZee:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0e2440] text-[24px] text-center whitespace-nowrap">
        <p className="leading-[normal]">Skillogy</p>
      </div>
      <NavbarMenu />
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute flex h-[89.518px] items-center justify-center left-[calc(87.5%-8.5px)] top-[798px] w-[89px]">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="h-[89.518px] relative w-[89px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.9995 89.5185">
            <g id="Group 1000002753">
              <path d={svgPaths.p1a696400} fill="var(--fill-0, #90CCEA)" id="Vector" />
              <ellipse cx="48.5431" cy="43.5136" fill="var(--fill-0, #E8F6FF)" id="Ellipse 2206" rx="16.5036" ry="14.6353" />
              <path d={svgPaths.p43bf900} fill="var(--fill-0, #1B3A5C)" id="Vector_2" />
              <path d={svgPaths.p315ec500} fill="var(--fill-0, #1B3A5C)" id="Vector_3" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute h-[85px] left-[calc(75%+78.82px)] top-[701px] w-[89.841px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89.8406 85">
        <g id="Group">
          <path d={svgPaths.p2cbd0af0} fill="var(--fill-0, #2B7DB8)" id="Vector" />
          <path d={svgPaths.p1f798580} id="Vector_2" stroke="var(--stroke-0, #1B3A5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.09972" />
          <path d={svgPaths.p1b5a0a80} id="Vector_3" stroke="var(--stroke-0, #1B3A5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.09972" />
          <path d={svgPaths.p1742c280} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p256ff600} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p1c6b780} id="Vector_6" stroke="var(--stroke-0, #1B3A5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.09972" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[calc(75%+78.82px)] top-[701px]" data-name="Group">
      <Group5 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[calc(75%+78.82px)] top-[701px]" data-name="Group">
      <Group4 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[calc(75%+78.82px)] top-[701px]" data-name="Group">
      <Group3 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[calc(75%+78.82px)] top-[701px]" data-name="Group">
      <Group2 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[calc(75%+78.82px)] top-[701px]" data-name="Group">
      <Group1 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute h-[11.802px] left-[calc(75%+1.52px)] top-[855.66px] w-[29.991px]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9913 11.8028">
        <g id="Group">
          <path d={svgPaths.p16899080} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p22208000} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute contents left-[calc(75%-12px)] top-[824px]" data-name="Group">
      <div className="absolute flex h-[75.592px] items-center justify-center left-[calc(75%-12px)] top-[824px] w-[75.501px]">
        <div className="flex-none rotate-[163.1deg]">
          <div className="h-[60.628px] relative w-[60.492px]" data-name="clipart">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60.4917 60.6278">
              <path d={svgPaths.p3993a280} fill="var(--fill-0, #2CCB6F)" id="clipart" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[19.553px] items-center justify-center left-[calc(75%+5.31px)] top-[846.25px] w-[24.947px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[19.553px] relative w-[24.947px]" data-name="Screenshot_2569-06-25_at_09.58.45-removebg-preview 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot25690625At095845RemovebgPreview1} />
          </div>
        </div>
      </div>
      <Group13 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[calc(75%-12px)] top-[824px]" data-name="Group">
      <Group12 />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[calc(75%-12px)] top-[824px]" data-name="Group">
      <Group11 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[calc(75%-12px)] top-[824px]" data-name="Group">
      <Group10 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[calc(75%-12px)] top-[824px]" data-name="Group">
      <Group9 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[calc(75%-12px)] top-[824px]" data-name="Group">
      <Group8 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[calc(75%-12px)] top-[824px]" data-name="Group">
      <Group7 />
    </div>
  );
}

function Group38() {
  return (
    <div className="absolute contents left-[calc(75%-12px)] top-[701px]">
      <Group36 />
      <Group />
      <Group6 />
    </div>
  );
}

function Group37() {
  return (
    <div className="absolute h-[89.518px] left-[50px] top-[798px] w-[89px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.9995 89.5185">
        <g id="Group 1000002753">
          <path d={svgPaths.p1a696400} fill="var(--fill-0, #90CCEA)" id="Vector" />
          <ellipse cx="48.5431" cy="43.5136" fill="var(--fill-0, #E8F6FF)" id="Ellipse 2206" rx="16.5036" ry="14.6353" />
          <path d={svgPaths.p43bf900} fill="var(--fill-0, #1B3A5C)" id="Vector_2" />
          <path d={svgPaths.p315ec500} fill="var(--fill-0, #1B3A5C)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute flex h-[85px] items-center justify-center left-[109.34px] top-[701px] w-[89.841px]">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="h-[85px] relative w-[89.841px]" data-name="Group">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89.8406 85">
            <g id="Group">
              <path d={svgPaths.p2cbd0af0} fill="var(--fill-0, #2B7DB8)" id="Vector" />
              <path d={svgPaths.p1f798580} id="Vector_2" stroke="var(--stroke-0, #1B3A5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.09972" />
              <path d={svgPaths.p1b5a0a80} id="Vector_3" stroke="var(--stroke-0, #1B3A5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.09972" />
              <path d={svgPaths.p1742c280} fill="var(--fill-0, white)" id="Vector_4" />
              <path d={svgPaths.p256ff600} fill="var(--fill-0, white)" id="Vector_5" />
              <path d={svgPaths.p1c6b780} id="Vector_6" stroke="var(--stroke-0, #1B3A5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.09972" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents left-[109.34px] top-[701px]" data-name="Group">
      <Group19 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents left-[109.34px] top-[701px]" data-name="Group">
      <Group18 />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents left-[109.34px] top-[701px]" data-name="Group">
      <Group17 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents left-[109.34px] top-[701px]" data-name="Group">
      <Group16 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents left-[109.34px] top-[701px]" data-name="Group">
      <Group15 />
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute flex h-[11.802px] items-center justify-center left-[calc(12.5%+98.99px)] top-[855.66px] w-[29.991px]">
      <div className="-scale-y-100 flex-none rotate-180">
        <div className="h-[11.802px] relative w-[29.991px]" data-name="Group">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.9913 11.8028">
            <g id="Group">
              <path d={svgPaths.p3070c6f0} fill="var(--fill-0, white)" id="Vector" />
              <path d={svgPaths.p2d279700} fill="var(--fill-0, white)" id="Vector_2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents left-[calc(12.5%+67px)] top-[824px]" data-name="Group">
      <div className="absolute flex h-[75.592px] items-center justify-center left-[calc(12.5%+67px)] top-[824px] w-[75.501px]">
        <div className="-scale-y-100 flex-none rotate-[16.9deg]">
          <div className="h-[60.628px] relative w-[60.492px]" data-name="clipart">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60.4917 60.6278">
              <path d={svgPaths.p3993a280} fill="var(--fill-0, #2CCB6F)" id="clipart" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute h-[19.553px] left-[calc(12.5%+100.24px)] top-[846.25px] w-[24.947px]" data-name="Screenshot_2569-06-25_at_09.58.45-removebg-preview 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot25690625At095845RemovebgPreview1} />
      </div>
      <Group27 />
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents left-[calc(12.5%+67px)] top-[824px]" data-name="Group">
      <Group26 />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents left-[calc(12.5%+67px)] top-[824px]" data-name="Group">
      <Group25 />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents left-[calc(12.5%+67px)] top-[824px]" data-name="Group">
      <Group24 />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents left-[calc(12.5%+67px)] top-[824px]" data-name="Group">
      <Group23 />
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents left-[calc(12.5%+67px)] top-[824px]" data-name="Group">
      <Group22 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents left-[calc(12.5%+67px)] top-[824px]" data-name="Group">
      <Group21 />
    </div>
  );
}

function Group39() {
  return (
    <div className="absolute contents left-[50px] top-[701px]">
      <Group37 />
      <Group14 />
      <Group20 />
    </div>
  );
}

function AdsContainer() {
  return (
    <div className="-translate-x-1/2 absolute contents left-1/2 top-[21px]" data-name="Ads Container">
      <div className="-translate-x-1/2 absolute h-[292px] left-1/2 rounded-[24px] top-[21px] w-[638px]" data-name="Ads Background">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgAdsBackground} />
      </div>
      <div className="absolute bg-white content-stretch flex items-center justify-center left-[-176px] overflow-clip py-[5px] rounded-[50px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] size-[48px] top-[143px]" data-name="Left Arrow Button">
        <div className="relative shrink-0 size-[32px]" data-name="Basic icon/Chevron">
          <div className="absolute inset-[20.84%_32.98%_20.82%_33.68%]" data-name="vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 18.6667">
              <path d={svgPaths.p1fd3400} fill="var(--fill-0, #0E2440)" id="vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-[846px] size-[48px] top-[143px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="bg-white content-stretch flex items-center justify-center overflow-clip py-[5px] relative rounded-[50px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] size-[48px]" data-name="Right Arrow Button">
            <div className="relative shrink-0 size-[32px]" data-name="Basic icon/Chevron">
              <div className="absolute inset-[20.84%_32.98%_20.82%_33.68%]" data-name="vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 18.6667">
                  <path d={svgPaths.p1fd3400} fill="var(--fill-0, #0E2440)" id="vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndicatorsContainer() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[3.998px] items-start left-[calc(50%-0.02px)] top-[327px]" data-name="Indicators Container">
      <div className="bg-[#0d6ec8] h-[7.997px] relative rounded-[99.961px] shrink-0 w-[39.984px]" data-name="Shape" />
      <div className="bg-white h-[7.997px] relative rounded-[99.961px] shrink-0 w-[23.991px]" data-name="Shape" />
      <div className="bg-white h-[7.997px] relative rounded-[99.961px] shrink-0 w-[23.991px]" data-name="Shape" />
      <div className="bg-white h-[7.997px] relative rounded-[99.961px] shrink-0 w-[23.991px]" data-name="Shape" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[#e0f0ff] h-[353px] left-[56px] overflow-clip rounded-[24px] top-[224px] w-[718px]">
      <AdsContainer />
      <IndicatorsContainer />
    </div>
  );
}

function SolidButton() {
  return (
    <div className="absolute bg-[#2b7db8] content-stretch flex gap-[3.998px] h-[47.981px] items-center justify-center left-[20px] min-w-[79.96864318847656px] px-[15.994px] rounded-[99.961px] top-[121px] w-[165.987px]" data-name="Solid button">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Noto_Sans_Thai:SemiBold',sans-serif] font-semibold leading-[26.989px] min-w-px relative text-[17.993px] text-center text-white" style={{ fontVariationSettings: '"wdth" 100' }}>
        เริ่มทำแบบทดสอบ
      </p>
    </div>
  );
}

function JobCardDescription() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 text-[#05101f] w-full" data-name="Job Card Description">
      <p className="font-['Noto_Sans_Thai:SemiBold',sans-serif] font-semibold relative shrink-0 text-[24px] w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
        ค้นหาอาชีพที่เหมาะกับคุณ
      </p>
      <p className="font-['Noto_Sans_Thai:Regular','Noto_Sans:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
        แบบทดสอบ RIASECเครื่องมือแนะนำอาชีพ ที่ช่วยให้วางแผนอนาคตได้ง่ายขึ้น
      </p>
    </div>
  );
}

function JobCardContent() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[27px] top-[25px] w-[287px]" data-name="Job Card Content">
      <JobCardDescription />
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute flex inset-[56.9%_29.91%_-16.57%_-10.57%] items-center justify-center" style={{ containerType: "size" }}>
      <div className="-rotate-90 flex-none h-[100cqw] w-[100cqh]">
        <div className="relative size-full">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 211.832 267">
            <g id="Group 3">
              <path d={svgPaths.p33f6aaf0} fill="var(--fill-0, #80C0F8)" id="Vector" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group41() {
  return (
    <div className="absolute contents left-[-35px] top-[202px]">
      <Group28 />
      <div className="absolute h-[58.697px] left-[24.98px] top-[226.18px] w-[74.889px]" data-name="Screenshot_2569-06-25_at_09.58.45-removebg-preview 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScreenshot25690625At095845RemovebgPreview1} />
      </div>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute inset-[65.07%_-21.45%_-9.28%_59.82%]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 204 156.954">
        <g id="Group 1">
          <path d={svgPaths.pf460780} fill="var(--fill-0, #0D6EC8)" id="Vector" />
          <path d={svgPaths.p18b8980} fill="var(--fill-0, #80C0F8)" id="Vector_2" />
          <path d={svgPaths.p188d2200} fill="var(--fill-0, #80C0F8)" id="Vector_3" />
          <path d={svgPaths.p3d2dbb00} fill="var(--fill-0, #80C0F8)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute flex h-[92.272px] items-center justify-center left-[201.55px] top-[138.48px] w-[95.146px]">
      <div className="flex-none rotate-[16.02deg]">
        <div className="h-[73.648px] relative w-[77.843px]" data-name="Group">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.8426 73.6485">
            <g id="Group">
              <path d={svgPaths.p1ae34d70} fill="var(--fill-0, #2CCB6F)" id="Vector" />
              <path d={svgPaths.p170d4900} id="Vector_2" stroke="var(--stroke-0, #1B3A5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p38e6d700} id="Vector_3" stroke="var(--stroke-0, #1B3A5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p1d907b00} fill="var(--fill-0, white)" id="Vector_4" />
              <path d={svgPaths.p3d67be00} fill="var(--fill-0, white)" id="Vector_5" />
              <path d={svgPaths.p6cb5d00} id="Vector_6" stroke="var(--stroke-0, #1B3A5C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents h-[92.272px] left-[201.55px] top-[138.48px] w-[95.146px]" data-name="Group">
      <Group35 />
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents h-[92.272px] left-[201.55px] top-[138.48px] w-[95.146px]" data-name="Group">
      <Group34 />
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute contents h-[92.272px] left-[201.55px] top-[138.48px] w-[95.146px]" data-name="Group">
      <Group33 />
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents h-[92.272px] left-[201.55px] top-[138.48px] w-[95.146px]" data-name="Group">
      <Group32 />
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents h-[92.272px] left-[201.55px] top-[138.48px] w-[95.146px]" data-name="Group">
      <Group31 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#ffd020] h-[355px] left-[calc(62.5%+55.5px)] overflow-clip rounded-[24px] top-[224px] w-[331px]">
      <SolidButton />
      <JobCardContent />
      <Group41 />
      <Group29 />
      <Group30 />
    </div>
  );
}

function AiUpscaleSparkMagnifierZoomViewFindSearchAi() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="ai-upscale-spark--magnifier-zoom-view-find-search-ai">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="ai-upscale-spark--magnifier-zoom-view-find-search-ai">
          <path d={svgPaths.p282580} fill="var(--fill-0, white)" id="Union" />
          <path clipRule="evenodd" d={svgPaths.p13d10f70} fill="var(--fill-0, #2B7DB8)" fillRule="evenodd" id="Union_2" />
          <path clipRule="evenodd" d={svgPaths.p23611680} fill="var(--fill-0, #2B7DB8)" fillRule="evenodd" id="Union_3" />
        </g>
      </svg>
    </div>
  );
}

function SegmentButton() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[79.18240356445312px] p-[12px] relative shrink-0" data-name="Segment button">
      <div aria-hidden className="absolute border-[#2b7db8] border-b-5 border-solid inset-0 pointer-events-none" />
      <AiUpscaleSparkMagnifierZoomViewFindSearchAi />
      <p className="[word-break:break-word] font-['Noto_Sans_Thai:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[20.985px] relative shrink-0 text-[#05101f] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Skill Scan
      </p>
    </div>
  );
}

function TargetShopBullseyeArrowTarget() {
  return (
    <div className="absolute inset-[-0.02%_-0.01%_-0.01%_0]" data-name="target--shop-bullseye-arrow-target">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.0029 28.0095">
        <g id="target--shop-bullseye-arrow-target">
          <g id="Ellipse 171" />
          <path clipRule="evenodd" d={svgPaths.p114dfa00} fill="var(--fill-0, #0E2440)" fillRule="evenodd" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function TargetStreamlineCore() {
  return (
    <div className="overflow-clip relative shrink-0 size-[28px]" data-name="Target--Streamline-Core">
      <TargetShopBullseyeArrowTarget />
    </div>
  );
}

function SegmentButton1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[79.18240356445312px] p-[12px] relative rounded-[7.994px] shrink-0" data-name="Segment button">
      <TargetStreamlineCore />
      <p className="[word-break:break-word] font-['Noto_Sans_Thai:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[20.985px] relative shrink-0 text-[#0e2440] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Skill-to-Career Match
      </p>
    </div>
  );
}

function CriticalThinking2CriticalThinkingNutBoltCogBrainPlanHead() {
  return (
    <div className="h-[28px] relative shrink-0 w-[25.846px]" data-name="critical-thinking-2--critical-thinking-nut-bolt-cog-brain-plan-head">
      <div className="absolute inset-[-3.57%_-3.87%_-0.27%_-3.87%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.8447 29.0755">
          <g id="critical-thinking-2--critical-thinking-nut-bolt-cog-brain-plan-head">
            <g id="Union" />
            <path d={svgPaths.p2e60ed00} id="Union_2" stroke="var(--stroke-0, #0E2440)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99855" />
            <path d={svgPaths.p2e10a170} fill="var(--fill-0, white)" id="Union_3" stroke="var(--stroke-0, #4747E0)" strokeWidth="0.618598" />
            <path d={svgPaths.p1360e780} id="Union_4" stroke="var(--stroke-0, #0E2440)" strokeLinejoin="round" strokeWidth="1.8558" />
            <path d={svgPaths.pe3f7a00} id="Ellipse 541" stroke="var(--stroke-0, #0E2440)" strokeLinejoin="round" strokeWidth="1.8558" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SegmentButton2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center min-w-[79.18240356445312px] p-[12px] relative rounded-[7.994px] shrink-0" data-name="Segment button">
      <CriticalThinking2CriticalThinkingNutBoltCogBrainPlanHead />
      <p className="[word-break:break-word] font-['Noto_Sans_Thai:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[20.985px] relative shrink-0 text-[#0e2440] text-[16px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        My Skill Collection
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex gap-[3.997px] items-center left-1/2 top-[142px] w-[1068px]">
      <div aria-hidden className="absolute border-[#dbe6f0] border-b-[0.999px] border-solid inset-0 pointer-events-none" />
      <SegmentButton />
      <SegmentButton1 />
      <SegmentButton2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[15.988px] items-center relative shrink-0 text-[#0e2440] text-center w-[799.419px] z-[3]">
      <p className="font-['Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[26.98px] relative shrink-0 text-[17.987px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        อนาคตที่อยากเป็น เริ่มต้นได้จากที่นี่
      </p>
      <p className="font-['Noto_Sans_Thai:SemiBold',sans-serif] font-semibold leading-[59.956px] min-w-full overflow-hidden relative shrink-0 text-[39.971px] text-ellipsis w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        เลือกอาชีพที่ใช่ แล้วให้เราช่วยวางเส้นทาง สู่เป้าหมายของคุณ
      </p>
    </div>
  );
}

function CategoriesCategoriesInterfaceSortingMenuGridApp() {
  return (
    <div className="absolute inset-[13.79%_13.78%_13.78%_13.79%]" data-name="categories--categories-interface-sorting-menu-grid-app">
      <div className="absolute inset-[-4.31%_-4.32%_-4.31%_-4.31%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.8832 18.8831">
          <g id="categories--categories-interface-sorting-menu-grid-app">
            <path d={svgPaths.p2cf8d700} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p28f5ad00} id="Intersect" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p17994a00} id="Vector 2483" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1d3f2380} id="Subtract" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0 z-[2]">
      <div className="bg-[#1e78d4] content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[8px] relative rounded-[999px] shrink-0" data-name="Job">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon/Category">
          <CategoriesCategoriesInterfaceSortingMenuGridApp />
        </div>
        <p className="[word-break:break-word] font-['Noto_Sans_Thai:Medium','Noto_Sans:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[18px] text-center text-white tracking-[-0.1503px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          General
        </p>
        <div className="relative shrink-0 size-[24px]" data-name="Basic icon/Chevron">
          <div className="absolute inset-[33.3%_20.8%_33.37%_20.87%]" data-name="vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
              <path d={svgPaths.p66d1d00} fill="var(--fill-0, white)" id="vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightEye() {
  return (
    <motion.div className="absolute inset-[43.13%_57.2%_48.23%_34.15%]" data-name="Right Eye">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6683 27.6683">
        <g id="Right Eye">
          <circle cx="13.8342" cy="13.8342" fill="var(--fill-0, white)" id="Ellipse 2309" r="13.8342" transform="matrix(-1 0 0 1 27.6683 0)" />
          <circle cx="8.33194" cy="8.33194" fill="var(--fill-0, black)" id="Ellipse 2311" r="8.33194" transform="matrix(-1 0 0 1 22.3175 5.42547)" />
        </g>
      </svg>
    </motion.div>
  );
}

function LeftEye() {
  return (
    <motion.div className="absolute inset-[43.13%_48.65%_48.23%_42.7%]" data-name="Left Eye">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.6683 27.6683">
        <g id="Left Eye">
          <circle cx="13.8342" cy="13.8342" fill="var(--fill-0, white)" id="Ellipse 2309" r="13.8342" transform="matrix(-1 0 0 1 27.6683 0)" />
          <circle cx="8.33194" cy="8.33194" fill="var(--fill-0, black)" id="Ellipse 2311" r="8.33194" transform="matrix(-1 0 0 1 22.3175 5.42547)" />
        </g>
      </svg>
    </motion.div>
  );
}

function Face() {
  return (
    <div className="absolute contents inset-[43.13%_48.65%_43.51%_34.15%]" data-name="Face">
      <motion.div className="absolute flex inset-[53.3%_54.66%_43.51%_40.5%] items-center justify-center" style={{ containerType: "size" }} data-motion-keys="scaleY" data-motion-wrapper-for="8:3383">
        <div className="flex-none h-[hypot(-89.4411cqw,32.0753cqh)] rotate-[76.72deg] w-[hypot(10.5589cqw,67.9247cqh)]">
          <div className="relative size-full" data-name="Mouth">
            <div className="absolute inset-[-10.53%_-21.05%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1253 17.2505">
                <path d={svgPaths.p9abe200} id="Mouth" stroke="var(--stroke-0, #1B3476)" strokeLinecap="round" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
      <RightEye />
      <LeftEye />
    </div>
  );
}

function Cloudy() {
  return (
    <motion.div className="absolute contents inset-[30.31%_17.81%_20.55%_17.81%]" data-name="Cloudy">
      <div className="absolute inset-[30.31%_17.81%_20.55%_17.81%]" data-name="Body">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 206 157.25">
          <path d={svgPaths.p94ba00} fill="var(--fill-0, #B8DCFF)" id="Body" />
        </svg>
      </div>
      <Face />
    </motion.div>
  );
}

function MagnifyingGlass() {
  return (
    <motion.div className="absolute flex inset-[35.54%_32.36%_33.71%_36.88%] items-center justify-center" style={{ containerType: "size" }} data-motion-keys="scaleX,scaleY,y" data-motion-wrapper-for="8:3390">
      <div className="flex-none h-[hypot(-7.27678cqw,92.7232cqh)] rotate-[4.49deg] w-[hypot(92.7232cqw,7.27678cqh)]">
        <div className="relative size-full" data-name="magnifying glass">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 91.5445 91.5445">
            <g id="magnifying glass">
              <circle cx="32.4465" cy="32.446" fill="var(--fill-0, #A8CEFC)" fillOpacity="0.5" id="Ellipse 13" r="30.1287" />
              <path clipRule="evenodd" d={svgPaths.p368ae900} fill="var(--fill-0, #FFBF00)" fillRule="evenodd" id="Union" />
            </g>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function General() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.1px)] size-[320px] top-[calc(50%-39.99px)]" data-name="General">
      <Cloudy />
      <MagnifyingGlass />
    </div>
  );
}

function Container1() {
  return <div className="bg-[#ffe040] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame5() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">วิศวกรโปรแกรม AI</p>
    </div>
  );
}

function HighestSalary() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[278.9px] top-[0.01px] w-[144px]" data-name="Highest salary">
      <Container1 />
      <Frame5 />
    </motion.div>
  );
}

function Container2() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame6() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักพัฒนาส่วนหน้า</p>
    </div>
  );
}

function HighestSalary1() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[570.9px] top-[201.01px] w-[144px]" data-name="Highest salary">
      <Container2 />
      <Frame6 />
    </motion.div>
  );
}

function Container3() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame7() {
  return (
    <div className="bg-white drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] relative rounded-[100px] shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักพัฒนาส่วนหลัง</p>
        </div>
      </div>
    </div>
  );
}

function HighestSalary2() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[654.9px] top-[698.01px] w-[144px]" data-name="Highest salary">
      <Container3 />
      <Frame7 />
    </motion.div>
  );
}

function Container4() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame8() {
  return (
    <div className="bg-white drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] relative rounded-[100px] shrink-0 w-full z-[1]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[12px] py-[4px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">วิศวกร QA</p>
        </div>
      </div>
    </div>
  );
}

function HighestSalary3() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[928.9px] top-[625.01px] w-[144px]" data-name="Highest salary">
      <Container4 />
      <Frame8 />
    </motion.div>
  );
}

function Container5() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame9() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">วิศวกรการเรียนรู้ของเครื่อง</p>
    </div>
  );
}

function HighestSalary4() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[733px] top-[311.01px]" data-name="Highest salary">
      <Container5 />
      <Frame9 />
    </motion.div>
  );
}

function Container6() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame10() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">วิศวกร DevOps</p>
    </div>
  );
}

function HighestSalary5() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[614.03px] top-[56.24px]" data-name="Highest salary">
      <Container6 />
      <Frame10 />
    </motion.div>
  );
}

function Container7() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame11() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">วิศวกรซอฟต์แวร์</p>
    </div>
  );
}

function HighestSalary6() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[664px] top-[482.01px]" data-name="Highest salary">
      <Container7 />
      <Frame11 />
    </motion.div>
  );
}

function Container8() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame12() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">เจ้าของผลิตภัณฑ์</p>
    </div>
  );
}

function HighestSalary7() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[476px] top-[561.01px]" data-name="Highest salary">
      <Container8 />
      <Frame12 />
    </motion.div>
  );
}

function Container9() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame13() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักออกแบบผลิตภัณฑ์</p>
    </div>
  );
}

function HighestSalary8() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[243.03px] top-[389.24px]" data-name="Highest salary">
      <Container9 />
      <Frame13 />
    </motion.div>
  );
}

function Container10() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame14() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักวิเคราะห์ความปลอดภัยไซเบอร์</p>
    </div>
  );
}

function HighestSalary9() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[830.9px] top-[431.01px]" data-name="Highest salary">
      <Container10 />
      <Frame14 />
    </motion.div>
  );
}

function Container11() {
  return <div className="bg-[#ffe040] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame15() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักออกแบบ UI</p>
    </div>
  );
}

function HighestSalary10() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[920px] top-[224.24px]" data-name="Highest salary">
      <Container11 />
      <Frame15 />
    </motion.div>
  );
}

function Container12() {
  return <div className="bg-[#ffe040] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame16() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักออกแบบโมชั่น</p>
    </div>
  );
}

function HighestSalary11() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[831px] top-[94px]" data-name="Highest salary">
      <Container12 />
      <Frame16 />
    </motion.div>
  );
}

function Container13() {
  return <div className="bg-[#ffe040] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame17() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">ผู้เชี่ยวชาญด้านการตลาด</p>
    </div>
  );
}

function HighestSalary12() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[199.03px] top-[168.24px]" data-name="Highest salary">
      <Container13 />
      <Frame17 />
    </motion.div>
  );
}

function Container14() {
  return <div className="bg-[#ffe040] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame18() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักออกแบบกราฟิก</p>
    </div>
  );
}

function HighestSalary13() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[369.9px] top-[698.01px]" data-name="Highest salary">
      <Container14 />
      <Frame18 />
    </motion.div>
  );
}

function Container15() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame19() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 w-[109px] z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">วิศวกรข้อมูล</p>
    </div>
  );
}

function HighestSalary14() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[419.9px] top-[93.01px]" data-name="Highest salary">
      <Container15 />
      <Frame19 />
    </motion.div>
  );
}

function Container16() {
  return <div className="bg-[#ffe040] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame20() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักกลยุทธ์เนื้อหา</p>
    </div>
  );
}

function HighestSalary15() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[29.9px] top-[477.01px]" data-name="Highest salary">
      <Container16 />
      <Frame20 />
    </motion.div>
  );
}

function Container17() {
  return <div className="bg-[#ffe040] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame21() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักวิเคราะห์การวิจัย</p>
    </div>
  );
}

function HighestSalary16() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[308px] top-[260px]" data-name="Highest salary">
      <Container17 />
      <Frame21 />
    </motion.div>
  );
}

function Container18() {
  return <div className="bg-[#ffe040] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame22() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักเขียน UX</p>
    </div>
  );
}

function HighestSalary17() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[58.9px] top-[257.01px]" data-name="Highest salary">
      <Container18 />
      <Frame22 />
    </motion.div>
  );
}

function Container19() {
  return <div className="bg-[#ffe040] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame23() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักตัดต่อ VDO</p>
    </div>
  );
}

function HighestSalary18() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[253.9px] top-[561.01px]" data-name="Highest salary">
      <Container19 />
      <Frame23 />
    </motion.div>
  );
}

function Container20() {
  return <div className="bg-[#2ccb6f] mb-[-2px] relative rounded-[16765023px] shrink-0 size-[19.985px] z-[3]" data-name="Container" />;
}

function Frame24() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex items-center px-[12px] py-[4px] relative rounded-[100px] shrink-0 z-[1]">
      <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[19.985px] not-italic relative shrink-0 text-[#1b3a5c] text-[13.99px] text-center tracking-[-0.1503px] whitespace-nowrap">นักวิทยาศาสตร์ข้อมูล</p>
    </div>
  );
}

function HighestSalary19() {
  return (
    <motion.div className="absolute content-stretch flex flex-col isolate items-center left-[738.03px] top-[579.24px]" data-name="Highest salary">
      <Container20 />
      <Frame24 />
    </motion.div>
  );
}

function Container() {
  return (
    <div className="h-[800px] relative shrink-0 w-[1100px] z-[1]" data-name="Container">
      <motion.div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[1093.726px] items-center justify-center left-[calc(50%-3.96px)] top-[calc(50%+23.87px)] w-[1087.787px]" data-motion-keys="rotate" data-motion-transform-template="translateX(-50%) translateY(-50%)" data-motion-wrapper-for="8:3372">
        <div className="flex-none rotate-[52.04deg]">
          <div className="h-[760px] relative w-[794.274px]">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 794.274 760">
              <path d={svgPaths.p11488d00} fill="var(--fill-0, #C5E8FF)" id="Ellipse 2207" />
            </svg>
          </div>
        </div>
      </motion.div>
      <motion.div className="absolute h-[500px] left-1/2 top-[calc(50%+0.05px)] w-[514px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 514 500">
          <path d={svgPaths.p7404e80} fill="var(--fill-0, #E8F6FF)" id="Ellipse 2208" />
        </svg>
      </motion.div>
      <General />
      <HighestSalary />
      <HighestSalary1 />
      <HighestSalary2 />
      <HighestSalary3 />
      <HighestSalary4 />
      <HighestSalary5 />
      <HighestSalary6 />
      <HighestSalary7 />
      <HighestSalary8 />
      <HighestSalary9 />
      <HighestSalary10 />
      <HighestSalary11 />
      <HighestSalary12 />
      <HighestSalary13 />
      <HighestSalary14 />
      <HighestSalary15 />
      <HighestSalary16 />
      <HighestSalary17 />
      <HighestSalary18 />
      <HighestSalary19 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[40px] isolate items-center left-[calc(50%+0.1px)] top-[684px] w-[1100.201px]">
      <Frame />
      <Frame25 />
      <Container />
    </div>
  );
}

export default function CareerExplore() {
  return (
    <div className="bg-white relative size-full" data-name="Career Explore">
      <Footer />
      <div className="absolute bg-[#eff4f9] h-[612px] left-0 top-0 w-[1180px]" />
      <div className="-translate-x-1/2 absolute bg-white content-stretch flex h-[64px] items-center justify-center left-1/2 px-[32px] py-[12px] rounded-[100px] top-[24px] w-[1068px]" data-name="Navbar">
        <NavbarContent />
      </div>
      <Group38 />
      <Group39 />
      <Frame3 />
      <Frame4 />
      <Frame2 />
      <Frame1 />
    </div>
  );
}