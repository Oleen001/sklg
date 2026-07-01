const FONT_BODY = "'Noto Sans Thai', 'Noto Sans', sans-serif";

export default function ResponsiveFooter() {
  return (
    <footer className="w-full border-t border-[#dbe6f0] bg-[#eff4f9]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-12 md:flex-row md:items-start md:gap-10 md:px-20">
        <p
          className="sk-brand-logo shrink-0 text-[24px] leading-none text-[#0e2440]"
        >
          Skillogy
        </p>
        <p
          className="max-w-[520px] flex-1 text-[16px] leading-6 text-[#05101f]"
          style={{ fontFamily: FONT_BODY }}
        >
          A personalized system to track and manage academic skills and credits
          for lifelong learning.
        </p>
        <a
          href="#"
          className="shrink-0 cursor-pointer text-[14px] font-semibold text-[#05101f] transition-colors duration-200 hover:text-[#0d6ec8]"
          style={{ fontFamily: FONT_BODY }}
        >
          Digital Credentials
        </a>
      </div>
    </footer>
  );
}
