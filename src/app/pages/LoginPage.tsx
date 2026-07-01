"use client";

import { motion, useReducedMotion } from "motion/react";
import { EyeOff, UserRound } from "lucide-react";
import cloudyMascot from "@/assets/characters/cloudy/cloudy2-idle.svg";
import windyMascot from "@/assets/characters/windy/windy2-idle.svg";

type LoginPageProps = {
  onLogin: () => void;
  onNavigate: (path: string) => void;
};

function BrandMark({ type }: { type: "google" | "microsoft" }) {
  if (type === "google") {
    return (
      <span className="flex size-7 items-center justify-center rounded-full bg-white text-[20px] font-bold text-[#4285f4]">
        G
      </span>
    );
  }

  return (
    <span className="grid size-7 grid-cols-2 grid-rows-2 gap-0.5" aria-hidden>
      <span className="bg-[#f25022]" />
      <span className="bg-[#7fba00]" />
      <span className="bg-[#00a4ef]" />
      <span className="bg-[#ffb900]" />
    </span>
  );
}

function SocialButton({
  type,
  children,
  onClick,
}: {
  type: "google" | "microsoft";
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-[#deddde] bg-white px-3 text-[16px] font-semibold text-black transition-colors hover:border-[#0d6ec8]/50 hover:bg-[#f7fbff] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#0d6ec8]/30"
    >
      <BrandMark type={type} />
      <span className="flex-1 text-center">{children}</span>
    </button>
  );
}

function LoginField({
  label,
  type = "text",
  showIcon = false,
}: {
  label: string;
  type?: "email" | "password" | "text";
  showIcon?: boolean;
}) {
  return (
    <label className="flex w-full flex-col gap-1 text-[14px] font-semibold leading-[21px] text-[#101828]">
      {label}
      <span className="flex h-12 items-center gap-2 rounded-lg border border-[#deddde] bg-white px-3">
        <input
          type={type}
          placeholder="กรอกข้อมูล"
          className="min-w-0 flex-1 bg-transparent text-[16px] font-normal leading-6 text-[#313131] outline-none placeholder:text-[#a5a2a9]"
        />
        {showIcon ? <EyeOff className="size-5 text-[#313131]" strokeWidth={1.8} aria-hidden /> : null}
      </span>
    </label>
  );
}

function RotatingGlow({
  className,
  sizeClassName,
  innerSizeClassName,
  centerClassName,
}: {
  className: string;
  sizeClassName: string;
  innerSizeClassName: string;
  centerClassName: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${centerClassName}`}
    >
      <motion.div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[46%] ${sizeClassName} ${className}`}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 120, ease: "linear", repeat: Infinity }}
      />
      <motion.div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[46%] bg-[#418acc]/62 ${innerSizeClassName}`}
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={reduceMotion ? undefined : { duration: 150, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
}

export default function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const completeLogin = () => {
    onLogin();
    onNavigate("/skill-dashboard");
  };

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#1560b3] px-5 py-10 text-[#313131]">
      <RotatingGlow
        centerClassName="fixed left-[22vw] top-[-20vw] md:left-[18vw] md:top-[-152px]"
        sizeClassName="h-[100vw] w-[104vw] md:h-[760px] md:w-[794px]"
        innerSizeClassName="h-[62vw] w-[64vw] md:h-[471px] md:w-[492px]"
        className="bg-[#72aee4]/45"
      />
      <RotatingGlow
        centerClassName="fixed bottom-0 right-0"
        sizeClassName="h-[92vw] w-[96vw] md:h-[760px] md:w-[794px]"
        innerSizeClassName="h-[57vw] w-[60vw] md:h-[471px] md:w-[492px]"
        className="bg-[#72aee4]/45"
      />

      <button
        type="button"
        onClick={() => onNavigate("/")}
        className="absolute right-5 top-5 z-10 hidden h-12 cursor-pointer items-center gap-2 rounded-full border border-[#0d6ec8] bg-white px-4 text-[16px] font-semibold text-[#0d6ec8] shadow-sm transition hover:bg-[#f7fbff] sm:flex"
      >
        <UserRound className="size-5" strokeWidth={2} aria-hidden />
        เข้าแบบผู้เยี่ยมชม
      </button>

      <img
        src={windyMascot}
        alt=""
        className="absolute left-[11%] top-8 hidden w-[154px] -scale-y-100 rotate-180 md:block lg:w-[208px]"
      />

      <section className="relative z-10 w-full max-w-[554px] rounded-[24px] bg-white px-6 py-8 shadow-[0_28px_70px_rgba(7,38,86,0.24)] sm:px-[72px] sm:py-10">
        <h1 className="text-center text-[24px] font-bold leading-9 text-[#313131]">เข้าสู่ระบบ / สมัครสมาชิก</h1>

        <form
          className="mt-6 flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            completeLogin();
          }}
        >
          <div className="flex flex-col gap-2">
            <SocialButton type="google" onClick={completeLogin}>
              ดำเนินการต่อด้วย Google
            </SocialButton>
            <SocialButton type="microsoft" onClick={completeLogin}>
              ดำเนินการต่อด้วย Microsoft
            </SocialButton>
          </div>

          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-[#313131]/25" />
            <span className="text-[14px] leading-[21px] text-[#767279]/50">หรือดำเนินการต่อด้วย</span>
            <span className="h-px flex-1 bg-[#313131]/25" />
          </div>

          <div className="flex flex-col gap-3">
            <LoginField label="อีเมล" type="email" />
            <div className="flex flex-col gap-1">
              <LoginField label="รหัสผ่าน" type="password" showIcon />
              <button type="button" className="self-end text-[12px] font-semibold leading-[18px] text-[#0d6ec8]">
                ลืมรหัสผ่าน
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="h-12 cursor-pointer rounded-full bg-[#0d6ec8] px-4 text-[18px] font-semibold leading-[27px] text-white transition-colors hover:bg-[#0b5fb0] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#0d6ec8]/30"
          >
            ดำเนินการต่อ
          </button>

          <p className="text-center text-[14px] font-normal leading-[21px] text-[#767279]">
            การดำเนินการต่อถือว่าคุณยอมรับเงื่อนไขของ Credit Port{" "}
            <span className="font-semibold text-[#0d6ec8]">ข้อกำหนดและเงื่อนไข</span> และ{" "}
            <span className="font-semibold text-[#0d6ec8]">นโยบายความเป็นส่วนตัว</span>
          </p>

          <p className="text-center text-[16px] leading-6 text-[#767279]">
            ยังไม่มีบัญชี? <span className="font-semibold text-[#0d6ec8]">สมัครสมาชิก</span>
          </p>
        </form>
      </section>

      <img
        src={cloudyMascot}
        alt=""
        className="absolute bottom-6 right-[9%] z-20 hidden w-[170px] md:block lg:w-[210px]"
      />
    </main>
  );
}
