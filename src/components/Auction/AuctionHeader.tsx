import { FaChevronLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  isMyAuction: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export default function AuctionHeader({
  isMyAuction,
  onEdit,
  onDelete,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center relative h-[50px] border-b border-gray-700">
      <button
        className="absolute left-4 text-xl text-white"
        onClick={() => navigate(-1)}
      >
        <FaChevronLeft />
      </button>
      <h1 className="text-lg font-bold">경매</h1>
      {isMyAuction && (
        <div className="absolute right-4 flex gap-3 text-white text-lg">
          <FaEdit onClick={onEdit} className="cursor-pointer" />
          <FaTrash onClick={onDelete} className="cursor-pointer text-red-500" />
        </div>
      )}
    </div>
  );
}
