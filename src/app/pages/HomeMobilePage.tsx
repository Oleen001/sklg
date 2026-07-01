import HeroMascot from "../components/HeroMascot";
import cloudy2IdleSvg from "@/assets/characters/cloudy/cloudy2-idle.svg?raw";
import sunny2IdleSvg from "@/assets/characters/sunny/sunny2-idle.svg?raw";
import windy3IdleSvg from "@/assets/characters/windy/windy3-idle.svg?raw";
import imgTestPreview from "@/imports/Homepage/a3c88a55fc72924c2d523c14a1d955ffd93d87e0.png";
import imgCareerPreview from "@/imports/Homepage/fbc8677ca9dc2198c7e3452c8145ab7de9dc1fd0.png";
import imgCourseBanner from "@/imports/Homepage/12be04912d27d801c5eed4d993dfd2bc03db445d.png";

const steps = [
  { title: "Discover", body: "รู้จักตัวเองก่อน เลือกทางได้ถูก", color: "bg-[#2b7db8]", text: "text-white" },
  { title: "Plan", body: "วิเคราะห์ skill gap วางแผน learning path", color: "bg-[#ffe040]", text: "text-[#1b3a5c]" },
  { title: "Upskill", body: "เรียน course + Bootcamp ปิด gap ทีละ skill", color: "bg-[#db475f]", text: "text-white" },
];

const careerChips = [
  ["วิศวกรพรอมต์ AI", "#2ccb6f"],
  ["นักวิทยาศาสตร์ข้อมูล", "#2b7db8"],
  ["นักพัฒนาธุรกิจ", "#2ccb6f"],
];

export default function HomeMobilePage() {
  return (
    <main className="w-full overflow-hidden bg-white text-[var(--sk-color-ink)]">
      <section className="relative min-h-[90svh] bg-[#eff4f9] px-5 pb-8 pt-[116px] sm:px-8 sm:pt-[136px]">
        <div className="relative z-10 mx-auto max-w-[720px] text-center">
          <h1 className="text-[42px] font-bold leading-[1.18] tracking-normal text-[#424045] sm:text-[56px]">
            ค้นพบเส้นทางสู่
            <span className="block text-[#0d6ec8]">ความสำเร็จในอาชีพ</span>
            <span className="block text-[26px] leading-[1.35] sm:text-[34px]">ไปด้วยกัน</span>
          </h1>
          <a
            href="/skill-dashboard"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#0d6ec8] px-6 text-[18px] font-semibold text-white shadow-[var(--sk-shadow-sm)]"
          >
            เข้าสู่ระบบ แล้วไปเริ่มกันเลย!
          </a>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[320px] max-w-[760px] sm:h-[380px]">
          <HeroMascot svg={windy3IdleSvg} label="Windy" className="bottom-[-26px] left-[-22px] h-[220px] w-[220px] sm:h-[300px] sm:w-[300px]" />
          <HeroMascot svg={cloudy2IdleSvg} label="Cloudy" className="bottom-[-18px] left-1/2 h-[210px] w-[250px] -translate-x-1/2 sm:h-[300px] sm:w-[360px]" />
          <HeroMascot svg={sunny2IdleSvg} label="Sunny" className="bottom-[-54px] right-[-52px] h-[230px] w-[230px] sm:h-[320px] sm:w-[320px]" />
        </div>
      </section>

      <section className="flex min-h-[90svh] w-full items-center bg-white">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-14 sm:px-8 sm:py-18 lg:px-14">
          <h2 className="text-center text-[34px] font-bold leading-tight text-[#05101f] sm:text-[44px]">How Skillogy works</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <article key={step.title} className={`${step.color} ${step.text} min-h-[190px] rounded-[12px] p-6 shadow-[var(--sk-shadow-sm)]`}>
                <p className="text-[24px] font-bold leading-tight">{step.title}</p>
                <p className="mt-8 text-[24px] font-semibold leading-snug">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-[90svh] w-full items-center bg-[#c6ebfe]">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 py-14 sm:px-8 sm:py-18 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:px-14">
          <div>
            <p className="text-[22px] text-[#1b3a5c]">เริ่มจาก...</p>
            <h2 className="mt-2 text-[36px] font-bold leading-tight text-[#05101f] sm:text-[48px]">รู้จักตัวเองให้ลึกขึ้น</h2>
            <p className="mt-4 text-[20px] leading-8 text-[#0e2440]">
              ด้วยแบบทดสอบ RIASEC
              <br />
              ตัวช่วยแนะนำอาชีพที่เหมาะกับคุณ
            </p>
            <a href="/skill-dashboard" className="mt-6 inline-flex rounded-full bg-[#0d6ec8] px-6 py-3 text-[18px] font-semibold text-white">
              เริ่มทำแบบทดสอบ
            </a>
          </div>
          <div className="overflow-hidden rounded-[24px] bg-white shadow-[var(--sk-shadow-md)]">
            <img src={imgTestPreview} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[90svh] w-full items-center overflow-hidden bg-[#1b3476] text-white">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 py-14 sm:px-8 sm:py-18 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:px-14">
          <div className="relative min-h-[260px] overflow-hidden rounded-[24px] bg-[#2b7db8] shadow-[var(--sk-shadow-md)]">
            <img src={imgCareerPreview} alt="" className="h-full min-h-[260px] w-full object-cover opacity-85" />
          </div>
          <div>
            <p className="text-[20px] text-white/80">เริ่มจากตรงไหนก็ได้ จะมีฉันคอยไกด์ตลอด</p>
            <h2 className="mt-3 text-[36px] font-bold leading-tight sm:text-[48px]">สำรวจอาชีพและเป็นตั้งเป้าหมาย</h2>
            <p className="mt-4 text-[20px] leading-8 text-white/90">เช็คความพร้อม ดูทักษะที่ยังขาด</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {careerChips.map(([label, color]) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full bg-[#eff4f9] px-4 py-2 text-[15px] text-[#05101f]">
                  <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
                  {label}
                </span>
              ))}
            </div>
            <a href="/skill-trends" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-[18px] font-semibold text-[#053b80]">
              สำรวจอาชีพทั้งหมด
            </a>
          </div>
        </div>
      </section>

      <section className="flex min-h-[90svh] w-full items-center bg-white">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-14 sm:px-8 sm:py-18 lg:px-14">
          <div className="overflow-hidden rounded-[24px] bg-[#eff4f9] shadow-[var(--sk-shadow-sm)]">
            <img src={imgCourseBanner} alt="" className="h-[180px] w-full object-cover sm:h-[260px]" />
          </div>
          <div className="mt-8">
            <p className="text-[22px] text-[#05101f]">อัปสกิลต่อด้วย...</p>
            <h2 className="mt-1 text-[42px] font-bold leading-tight text-[#05101f] sm:text-[56px]">คอร์สออนไลน์</h2>
            <div className="mt-4 inline-flex rounded-full bg-[#2ccb6f] px-4 py-2 text-white">มีใบรับรองจากมหาวิทยาลัย และบริษัทชั้นนำ</div>
            <br />
            <a href="/skill-builder" className="mt-6 inline-flex rounded-full bg-[#0d6ec8] px-6 py-3 text-[18px] font-semibold text-white">
              ดูทั้งหมด
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
