import imgRobot from "@/imports/SkillTrends/907f08bc2c702d5f801377e19940eb40ee167998.png";
import imgAutomotive from "@/imports/SkillTrends/883bccb732bd9b4abdc8397117992748ba033852.png";
import imgTourism from "@/imports/SkillTrends/8d1c3fdc28c237fd15aab8864865105f69d756eb.png";
import imgDigital from "@/imports/SkillTrends/6f5888c3b4888ee07e9981159b5a64c44be18384.png";
import imgElectronics from "@/imports/SkillTrends/c15478237d902e0ad585d86da4c18b709b5811fa.png";
import imgBiofuels from "@/imports/SkillTrends/fc52424414f3996ffcd56c0a3ecd8a1f57542147.png";
import imgAviation from "@/imports/SkillTrends/7ed7b4e9900c44b660a81aa4e778b2100031e606.png";
import imgHealthcare from "@/imports/SkillTrends/8dedd4c97edb2b4d7f64860d079108bb37367142.png";
import imgAgriculture from "@/imports/SkillTrends/82d56586589a933490fb04cf30534f0497bfa8c3.png";
import imgFood from "@/imports/SkillTrends/c524a3775be8a3a6655692dfcb062cfe58647796.png";

const industries = [
  { th: "หุ่นยนต์", en: "Robotics", image: imgRobot, color: "#FFD108" },
  { th: "ยานยนต์และยานยนต์สมัยใหม่", en: "Automotive and Next-Generation Automotive", image: imgAutomotive, color: "#2CCB6F" },
  { th: "การท่องเที่ยวกลุ่มรายได้ดีและการท่องเที่ยวเชิงสุขภาพ", en: "Affluent, Medical and Wellness Tourism", image: imgTourism, color: "#0D6EC8" },
  { th: "ดิจิทัล", en: "Digital Industry", image: imgDigital, color: "#2B7DB8" },
  { th: "อิเล็กทรอนิกส์และอิเล็กทรอนิกส์อัจฉริยะ", en: "Electronics and Smart Electronics", image: imgElectronics, color: "#FFD108" },
  { th: "เชื้อเพลิงชีวภาพและเคมีชีวภาพ", en: "Biofuels and Biochemicals", image: imgBiofuels, color: "#0D6EC8" },
  { th: "การบินกับโลจิสติกส์", en: "Aviation and Logistics", image: imgAviation, color: "#2CCB6F" },
  { th: "บริการสุขภาพและการแพทย์ครบวงจร", en: "Medical and Healthcare", image: imgHealthcare, color: "#FFD108" },
  { th: "เกษตรกับเทคโนโลยีชีวภาพ", en: "Agriculture and Biotechnology", image: imgAgriculture, color: "#C5312F" },
  { th: "การแปรรูปอาหาร", en: "Food Manufacturing", image: imgFood, color: "#C5312F" },
];

function CloudMascot() {
  return (
    <div className="relative h-[210px] w-[280px] sm:h-[300px] sm:w-[400px]" aria-hidden>
      <div className="absolute bottom-0 left-0 h-[142px] w-[210px] rounded-[48%_52%_42%_58%] bg-[#b9dbff] sm:h-[206px] sm:w-[310px]" />
      <div className="absolute bottom-[40px] left-[90px] h-[128px] w-[146px] rounded-full bg-[#b9dbff] sm:bottom-[58px] sm:left-[130px] sm:h-[184px] sm:w-[210px]" />
      <div className="absolute bottom-[22px] right-0 h-[142px] w-[170px] rounded-[50%] bg-[#b9dbff] sm:bottom-[34px] sm:h-[210px] sm:w-[250px]" />
      <span className="absolute left-[116px] top-[96px] size-7 rounded-full bg-white sm:left-[164px] sm:top-[134px] sm:size-10" />
      <span className="absolute left-[126px] top-[106px] size-4 rounded-full bg-black sm:left-[178px] sm:top-[148px] sm:size-6" />
      <span className="absolute left-[170px] top-[96px] size-7 rounded-full bg-white sm:left-[240px] sm:top-[134px] sm:size-10" />
      <span className="absolute left-[180px] top-[106px] size-4 rounded-full bg-[#516c8a] sm:left-[254px] sm:top-[148px] sm:size-6" />
      <span className="absolute left-[154px] top-[86px] size-[74px] rounded-full border-[8px] border-[#ef5f5e] sm:left-[218px] sm:top-[120px] sm:size-[104px] sm:border-[10px]" />
      <span className="absolute left-[208px] top-[148px] h-[92px] w-[14px] -rotate-45 rounded-full bg-[#ef5f5e] sm:left-[294px] sm:top-[208px] sm:h-[130px] sm:w-[18px]" />
    </div>
  );
}

export default function SkillTrendsMobilePage() {
  return (
    <main className="w-full overflow-hidden bg-[#dceeff] text-[#05101f]">
      <section className="relative overflow-hidden bg-[#1f66b3] px-5 pb-8 pt-[116px] text-white sm:px-8 sm:pb-12 sm:pt-[136px]">
        <div className="mx-auto grid max-w-[1180px] gap-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(280px,1fr)] sm:items-end">
          <div className="relative z-10">
            <h1 className="text-[38px] font-bold leading-tight sm:text-[56px]">สำรวจอาชีพและทักษะ</h1>
            <p className="mt-4 max-w-[620px] text-[18px] leading-8 sm:text-[22px] sm:leading-9">
              เรียนรู้เกี่ยวกับอุตสาหกรรมและอาชีพต่างๆ พร้อมทั้งข้อมูลทักษะ ที่ตลาดแรงงานต้องการ เพื่อช่วยให้คุณวางแผนอนาคตอย่างมั่นใจ
            </p>
            <a href="#industries" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-[16px] font-semibold text-[#1b3476]">
              ดูอาชีพทั้งหมด
            </a>
          </div>
          <div className="ml-auto">
            <CloudMascot />
          </div>
        </div>
      </section>

      <section id="industries" className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-6">
          <h2 className="text-[30px] font-bold leading-tight sm:text-[40px]">อุตสาหกรรมเป้าหมายของประเทศ</h2>
          <p className="mt-2 text-[17px] leading-7 text-[#0e2440] sm:text-[19px]">
            สำรวจ 10 อุตสาหกรรมยุทธศาสตร์ของไทยที่จะขับเคลื่อนเศรษฐกิจประเทศ
          </p>
          <button className="mt-4 rounded-full bg-[#1e78d4] px-5 py-2.5 text-[16px] font-semibold text-white">
            ดูอุตสาหกรรมทั้งหมด
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <article
              key={industry.th}
              className={`relative min-h-[210px] overflow-hidden rounded-[16px] bg-white p-5 shadow-[var(--sk-shadow-sm)] ${index === 1 || index === 2 || index === 7 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="relative z-10 max-w-[70%]">
                <h3 className="text-[22px] font-bold leading-8 text-black">{industry.th}</h3>
                <p className="mt-1 text-[16px] leading-6 text-[#767279]">{industry.en}</p>
              </div>
              <span
                className="absolute bottom-[-64px] right-[-50px] size-[190px] rounded-full sm:size-[220px]"
                style={{ backgroundColor: industry.color }}
                aria-hidden
              />
              <img
                src={industry.image}
                alt=""
                className="absolute bottom-[-10px] right-[-8px] h-[150px] w-[170px] object-cover sm:h-[170px] sm:w-[210px]"
              />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
