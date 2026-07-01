# Skillogy — Handoff (งานต่อ)

โปรเจค React 18 + Vite 6 + Tailwind 4 + Framer Motion (`motion/react`) — เดิมเป็น **Figma Make export**.
dev server: `http://127.0.0.1:5173/` (รันด้วย `npm run dev` / `vite`).

## กฎเหล็ก (ห้ามพลาด)
- **ห้ามแตะ `src/imports/**`** — เป็น Figma auto-generated (absolute positioning, `inset-[%]`, `hypot(cqw,cqh)`, hashed png/svg). แก้เฉพาะ `src/app/`.
- **ห้ามเปลี่ยน `data-name` หรือ CSS selector** ที่ animation layer อ้าง — animation ทั้งหมดผูก DOM ผ่าน `[data-name="..."]`. เปลี่ยน = animation พังเงียบ.
- **ห้ามเปลี่ยน `DESIGN_WIDTH` (1180) หรือ scale logic** ใน App.tsx — เป็น responsive baseline **ของ approach hybrid ปัจจุบัน**. ยกเว้นเมื่อทำ **งาน E (Tier 3 — เลิก fix-width)** ด้านล่าง ซึ่งจงใจรื้อ scale ทิ้ง (ต้อง decouple Figma ก่อน).
- ไม่มี `tsc`/eslint toolchain (Figma Make ไม่ตั้ง) → verify ด้วย `vite build` (ต้องผ่าน 0 error) + runtime บน browser.
- ห้าม commit (เจ้าของยังไม่สั่ง). งานอยู่ใน working tree.

## Stack / animation ปัจจุบัน
- **Framer Motion ติดตั้งแล้ว** ใช้ได้เลย 0 bundle cost. `imports/CareerExplore` ใช้ motion 54 จุด, `imports/SkillTrends` 2 จุด. Homepage ไม่ใช้.
- Animation layer ที่คนเขียน (`src/app/App.tsx`, `SkillTrendsPage.tsx`, `CareerExplorePage.tsx`) = **vanilla ล้วน** (rAF, CSS `@keyframes`, IntersectionObserver, DOM-inject).
- **GSAP ไม่ใช้ และไม่ต้องเพิ่ม** — Framer Motion มีแล้วพอ. animation ใหม่ให้ใช้ Framer Motion (ได้ auto lifecycle cleanup, ตัด bug กลุ่ม rAF).

---

## ✅ เสร็จแล้ว (อย่าทำซ้ำ)
1. **Fix animation bug 6 ตัว** (App.tsx, SkillTrendsPage.tsx): navbar listener leak, rAF idle-pause, dangling setTimeout, parallax race, stale-closure active nav, hero-char re-inject guard. build + Playwright ผ่าน.
2. **Responsive shell** (ใหม่: `ResponsiveNavbar.tsx`, `ResponsiveFooter.tsx`; แก้ App.tsx): navbar/footer responsive จริง นอก scale container. hamburger < 1024px, menu เต็ม ≥ 1024. routing ผ่าน React props `onNav={setPage}` (ไม่ DOM-inject แล้ว). navbar/footer เดิมใน Figma markup ถูก `display:none`. verify ทุก breakpoint 390/768/1024/1440 ผ่าน 0 error.

ไฟล์ที่แก้/สร้างแล้ว: `src/app/App.tsx` (M), `src/app/SkillTrendsPage.tsx` (M), `src/app/ResponsiveNavbar.tsx` (new), `src/app/ResponsiveFooter.tsx` (new).

---

## 🔴 งานค้าง — ยังไม่แตะโค้ดเลย (ทำต่อจากนี้)

### งาน A: ปรับ star auto-spin (App.tsx)
ปัจจุบัน `triggerSpin` + `spinInterval` (ราว App.tsx บริเวณ 242-294): auto-spin **ทุก 10s** และหมุน **ทุก star พร้อมกัน** (stagger แค่ `phase = Math.random()*250`ms).
ต้องการ:
- interval `10000` → **`20000`** (20s).
- **ไม่หมุนทุกตัวพร้อมกัน** — แต่ละรอบ **สุ่มเลือก subset ~15-25%** ของ stars มาหมุน (ใช้ `Math.random()` — React runtime ใช้ได้ปกติ).
- ผลลัพธ์: "นานๆ มี star บางตัวหมุนที" กระจายเนียน. อาจสุ่ม delay เพิ่มต่อตัว.
- คง `easeOut3` spin physics เดิม + scroll-driven rotation เดิม (อย่าแตะ scroll rotation).

### งาน B: ตัด element ที่ "ไม่ใช่ star" ออกจากการหมุน (App.tsx) — เจ้าของยืนยันว่ามีจริง
star collector `collect()` (ราว App.tsx 221-239) heuristic เปราะ: `.absolute` + มี `svg` + ไม่มี `img/p/span/button/input/a` + ไม่อยู่ใน `STAR_SKIP` + size 5-110px. มัน **จับ element ที่ไม่ใช่ดาวไปหมุนด้วย**.
ต้อง:
- เปิด browser inspect ว่า element ตัวไหนโดนหมุนผิด (data-name/ตำแหน่ง).
- refine filter ให้จับ**เฉพาะดาวจริง**: เพิ่มเข้า `STAR_SKIP`, หรือ tighten (aspect ratio ~1:1 เพราะดาว square-ish, ปรับ size range, เช็ค `viewBox`/path). เลือกวิธีแม่น ไม่เปราะเกิน.
- ยืนยันด้วยตา (screenshot) ว่าเหลือหมุนแต่ดาว.
- อ้างอิง: code review issue #6 (heuristic เปราะ).

### งาน C: Page transition (#1) — App.tsx
สลับหน้า (`home`/`skill-trends`/`skill-dashboard`) ตอนนี้ **hard cut**. เพิ่ม:
- ห่อ page ที่ render (บริเวณ `return` App.tsx ~428-434) ด้วย **`AnimatePresence mode="wait"`** + `motion.div key={page}`, fade + slide เบา (opacity + y ~12px, ~0.35s).
- **ระวัง**: page switch ทำ animation `useEffect` (deps `[page]`) re-run — `AnimatePresence` delay unmount อาจกระทบ timing. ทดสอบว่า animation แต่ละหน้า re-init ครบหลัง transition (star, scroll-reveal, hero, flip, parallax, mascot).
- respect `prefers-reduced-motion` (Framer `useReducedMotion`).

### งาน D: Navbar micro-interaction (#2) — ResponsiveNavbar.tsx
ต่อยอด ResponsiveNavbar:
- **active underline slide ด้วย `layoutId`** (shared layout) — เส้น active เลื่อนลื่นระหว่าง menu แทน snap.
- **hamburger → X morph** (motion, ไม่สลับ icon แข็งๆ).
- drawer mobile: max-height transition → **spring**.
- `whileHover` (scale/lift เบา) + `whileTap` (press) บน menu items + ปุ่ม CTA.
- respect `prefers-reduced-motion`.
- คงพฤติกรรมเดิม: hamburger <1024, menu ≥1024, routing props, touch target ≥44px, `aria-current`, Escape ปิด drawer, focus.

---

### 🎯 งาน E: เลิก fix-width canvas → true responsive เต็มรูป (Tier 3) — เจ้าของ **ต้องการ** ทำ
เป้าหมาย: เลิก `DESIGN_WIDTH=1180` + scale-canvas pattern → หน้า flow แบบ responsive จริง (ไม่ใช่ scale ทั้งก้อน).
**นี่คือ rebuild ไม่ใช่ tweak** — ต้องแปลง absolute-positioned Figma markup → semantic responsive layout.

**⚠️ Prerequisite — ตัดสินใจก่อนเริ่ม:**
- ต้องยืนยัน **fork ถาวร = เลิก re-import จาก Figma Make**. ถ้ายัง export ทับ งาน E จะถูกลบทุกครั้ง (Figma gen ออกมาเป็น absolute เสมอ). ตอบ fork ก่อน ไม่งั้นอย่าเริ่ม E.

**Best practice / วิธีทำ:**
1. **Strangler pattern — ห้าม rewrite ทีเดียวทั้งไฟล์** (Homepage 1699 บรรทัด). ทำทีละ section: wrap section เดิมด้วย React component ใหม่ → reflow → ลบ absolute markup ของ section นั้น → ไป section ถัดไป. แต่ละ step build + verify.
2. **แปลง layout**: `absolute` + `inset-[%]` + `hypot(cqw,cqh)` → **flexbox/grid + container queries**. fixed px → `clamp()` (fluid type/spacing), `aspect-ratio`, `min()/max()`, `%`.
3. **mobile-first breakpoints** — Tailwind `sm/md/lg/xl` (min-width). ออกแบบ mobile ก่อน แล้ว scale ขึ้น.
4. **design tokens** — ดึง color/spacing/typography/radius/shadow จาก Figma (หรือจาก markup เดิม) → CSS variables / Tailwind `theme` แทน hardcoded hex/px กระจาย. (ดู `design-extractor` agent ช่วย extract ได้)
5. **แยก content จาก decoration**:
   - content-stack (navbar/hero text/cards/footer) → **normal flow** (flex/grid), stack บน mobile.
   - hero graphic ที่ overlap กันหนัก (Sunny-A, animated curves, mascot, ellipse) → คง `absolute` **ภายใน section container ที่ `position:relative`** + fluid (`%`/`clamp`/`aspect-ratio`) ไม่ใช่ fixed px อิง canvas 1180.
6. **animation → Framer Motion** viewport-based: `useInView` (scroll-reveal), `useScroll`+`useTransform` (star/parallax) — เลิกผูก `window.scrollY`/`VH`/fixed px. ตัด vanilla rAF layer ทิ้งทีละส่วนตาม section ที่ reflow เสร็จ.
7. **asset**: `<img srcset>` responsive + `sizes`; SVG inline scale ตาม container. optimize PNG (มีไฟล์ 8.8MB).
8. **ลบ scale wrapper ทีละหน้า**: เมื่อทุก section ในหน้านั้น reflow หมด → ลบ outer scale `<div>` + `DESIGN_*_HEIGHT`/`scale` ของหน้านั้น. เมื่อครบ 3 หน้า → ลบ `DESIGN_WIDTH` + scale logic ทั้งหมดจาก App.tsx.

**ลำดับแนะนำ (pilot ก่อน):**
1. เริ่ม **SkillTrends** เป็น pilot (สั้นสุด 693 บรรทัด, มี card grid ที่ reflow ง่าย) — พิสูจน์ pattern ก่อน.
2. navbar/footer มี React responsive แล้ว (`ResponsiveNavbar/Footer`) → reuse เป็นฐาน.
3. reflow section: hero → content sections → decoration (คง absolute-in-relative).
4. ต่อ **CareerExplore** (1380) แล้ว **Homepage** (1699) ท้ายสุด (ซับซ้อนสุด, animation หนา).
5. verify แต่ละ section: `vite build` 0 error + browser จริง **360/768/1024/1440** + ไม่มี horizontal scroll + animation ไม่ regression + `prefers-reduced-motion`.

**ข้อควรรู้:**
- งาน E **แทนที่** approach hybrid (Shell responsive + content fluid) ที่ทำอยู่ — navbar/footer responsive ยังใช้ต่อได้ แต่ scale-canvas body จะถูกรื้อ.
- ระหว่างทำ E ยัง**ห้ามแตะ `src/imports/`** จนกว่าจะ fork — ให้ wrap/แทนที่จาก `src/app/` ก่อน. เมื่อ fork แล้วค่อยพิจารณาย้าย markup ที่ reflow แล้วมา own ใน `src/app/`.
- estimate: ใหญ่ (หลายวัน). แบ่งเป็น PR/phase ต่อหน้า.

---

## 🟡 Bug/debt ที่ code review เจอแต่ยังไม่แก้ (optional, จัดลำดับเอง)
- **#6** star heuristic เปราะ (= งาน B ข้างบน).
- **#7** App.tsx flip-card `back.innerHTML` inject `color`/`text` ไม่ escape — ตอนนี้ data hardcoded (`FLIP_CARD_DATA` `as const`) ยังปลอดภัย, แต่ pattern เสี่ยงถ้าเปลี่ยน data source.
- **reduced-motion**: CSS animation มี guard แล้ว แต่ **JS rAF (star rotation, parallax) ยังไม่ guard** `prefers-reduced-motion` → a11y ควรเพิ่ม.
- **#9** CareerExplorePage `removeTabListener` null pattern — non-issue จริง แต่สับสน.
- **#10** `react`/`react-dom` เป็น `peerDependencies optional` — ควรเป็น `dependencies` ปกติ.
- **#11** bundle bloat: `@mui/material`, `@mui/icons-material`, Radix เกือบทั้งชุด, `react-dnd`, `react-slick`, `recharts`, `embla-carousel-react`, `react-day-picker`, `vaul` — **App ไม่ import ใช้เลย** → ตัดออกได้.
- `fonts.css` ว่าง 0B → ABeeZee/Noto Sans Thai fallback เป็น system font. ควรเติม @font-face/Google Fonts.
- PNG asset ใหญ่มาก (มีไฟล์ 8.8MB) — compress/webp + lazy-load.

---

## 🧭 Roadmap "clean structure" + DECISION ที่ค้างอยู่

**ต้องตอบก่อนเดินหน้า refactor ใหญ่:**
> 📌 **เจ้าของแจ้งว่าต้องการเลิก fix-width (ไป Tier 3 / งาน E)** — implies fork = "ไม่ re-import Figma". ยืนยัน fork ให้ชัดก่อนลงมือ.
>
> **โปรเจคนี้จะ re-import จาก Figma Make อีกไหม?**
> - ใช่ → **ห้าม refactor markup** ทำได้แค่ Tier 1 + Tier 2 (config layer).
> - ไม่ (fork ถาวร) → เดินหน้า Tier 3 แปลงเป็น React app จริง + full content reflow (true responsive เต็มรูป).

### Tier 1 — Toolchain (เร็ว, 0 เสี่ยง, ทำได้ทันทีไม่ว่าตอบ fork ยังไง)
- เพิ่ม TypeScript `tsc --noEmit` + ESLint (ตอนนี้ไม่มี typecheck เลย).
- ตัด unused deps (ดู #11) → bundle เล็กลงมาก.
- react/react-dom → `dependencies` ปกติ (#10).
- เติม fonts (`fonts.css`).
- optimize PNG assets.

### Tier 2 — Animation architecture (คุ้มสุด, ทำได้แม้ยัง re-import Figma)
- **`animConfig.ts` = source-of-truth เดียว** สำหรับ selector/keyframe/reveal (ตอนนี้กระจายฝังใน useEffect body ของ App.tsx). Figma re-export แล้วแก้จุดเดียว.
- ย้าย vanilla rAF/DOM-inject → **Framer Motion** (`useScroll`/`useTransform` สำหรับ star, `AnimatePresence`) → ตัด lifecycle bug ทั้งชนชั้น.
- แปลง imperative DOM → React: flip cards (App.tsx สร้างด้วย DOM API ~377-414), hero-char (innerHTML ~342-367) → component/state.
- แตก App.tsx (ตอนนี้ ~450 บรรทัดรวมทุกอย่าง) เป็น custom hooks: `useStarRotation`, `useScrollReveal`, `usePageRouting`.

### Tier 3 — Decouple จาก Figma (หนัก, เฉพาะถ้า fork = "ไม่ re-import")
- แยก section absolute markup → React component semantic + design tokens (color/spacing/typography).
- ทำ **full content reflow** (แทน hybrid ปัจจุบัน) → true responsive เต็มรูป.
- ตัด `data-name` selector coupling ทิ้ง.

**คำแนะนำ:** ตอบ fork ก่อน. ยัง re-import Figma → Tier 1 + Tier 2 คือ sweet spot. fork ถาวร → เพิ่ม Tier 3 เป็นเฟส.

---

## ลำดับแนะนำสำหรับ codex
1. งาน A + B (star: 20s + random subset + ตัด non-star) — เจ้าของขอชัด, แตะ App.tsx.
2. งาน C (page transition) — App.tsx.
3. งาน D (navbar micro) — ResponsiveNavbar.tsx.
4. verify: `vite build` 0 error + browser 390/1440 + prefers-reduced-motion + animation เดิมไม่ regression.
5. (ถ้ามีเวลา) Tier 1 toolchain.

> งาน A–C แตะ `App.tsx` ทั้งหมด → ทำ serial ในไฟล์เดียว. งาน D แยกไฟล์.
