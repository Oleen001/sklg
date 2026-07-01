import { Bookmark, Search, SlidersHorizontal } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function LearningSearchBar({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:h-12 sm:flex-row sm:items-center sm:gap-4">
      <label className="flex h-12 flex-1 items-center rounded-full bg-white px-5 text-[#507da4] shadow-sm ring-1 ring-[#dbe6f0]">
        <Search className="mr-3 size-4" aria-hidden />
        <span className="sr-only">ค้นหาคอร์ส</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="ค้นหาคอร์ส / รายละเอียดคอร์ส / ทักษะ / หมวดหมู่ / ผู้สอน"
          className="h-full flex-1 bg-transparent text-[14px] text-[#05101f] outline-none placeholder:text-[#9cb3c6]"
        />
      </label>
      <button type="button" className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-[14px] font-semibold text-[#1e78d4] hover:bg-white sm:h-9">
        <Bookmark className="size-4" aria-hidden />
        คอร์สที่บันทึกไว้
      </button>
      <button type="button" className="hidden size-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#1e78d4] shadow-sm ring-1 ring-[#dbe6f0] sm:flex" aria-label="ตัวกรอง">
        <SlidersHorizontal className="size-4" aria-hidden />
      </button>
    </div>
  );
}
