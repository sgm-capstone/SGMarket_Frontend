import { FaBell, FaChevronLeft } from "react-icons/fa";

interface HeaderProps {
  currentRegion: string;
}
export default function TopHeader({ currentRegion }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#101012] px-4 py-3  border-gray-700 max-w-[760px] w-full mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaChevronLeft className="text-white" />
          <h1 className="text-lg font-semibold text-white">{currentRegion}</h1>
        </div>
        <FaBell className="text-white" />
      </div>
    </div>
  );
}
