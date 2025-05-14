import { useState, FormEvent } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { AuctionRegisterRequest, postAuction } from "../../api/auction";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import "../../css/style/DatePickerDark.css";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router";
import type { CategoryLabel } from "../../types/category";

const categoryList: CategoryLabel[] = [
  "전체",
  "디지털기기",
  "생활가전",
  "가구/인테리어",
  "생활/주방",
  "유아동",
  "유아도서",
  "여성의류",
  "여성잡화",
  "남성패션/잡화",
  "뷰티/미용",
  "스포츠/레저",
  "취미/게임/음반",
];
export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<CategoryLabel>("디지털기기");
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showProductNameInput, setShowProductNameInput] = useState(false);
  const [productName, setProductName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !title || !price || !description || !file || !endDate) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    setShowProductNameInput(true);
  };

  const handleFinalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!productName) return alert("제품명을 입력해주세요");
    if (!file) return alert("상품 이미지를 첨부해주세요");
    if (!endDate) return alert("마감일을 설정해주세요");

    const payload: AuctionRegisterRequest = {
      itemRegisterRequest: { itemName: productName },
      title,
      description,
      endDate: dayjs(endDate).format("YYYY-MM-DD HH:mm:00"),
      startPrice: parseInt(price, 10),
      auctionCategory: category,
    };

    try {
      await postAuction(payload, file);
      alert("경매 등록 성공!");
      navigate("/home");
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.response);
        alert(err.response?.data?.message ?? "등록 중 오류가 발생했습니다.");
      } else {
        console.error(err);
        alert("예상치 못한 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="relative bg-[#101010] text-white w-full mx-auto max-w-[760px] min-h-screen overflow-hidden">
      {/* 1단계 입력 */}
      {!showProductNameInput && !showCategorySelect && (
        <div className="px-5 pt-5 pb-20">
          <h1 className="text-center text-xl font-bold mb-6">물건 팔기</h1>

          {/* 이미지 업로드 */}
          <div className="mb-5">
            <div className="w-[70px] h-[70px] border border-gray-600 rounded-md flex items-center justify-center mb-4 relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div>📷 +</div>
              )}
            </div>

            <label className="text-sm font-semibold">제목</label>
            <input
              type="text"
              placeholder="글 제목"
              className="w-full bg-transparent border-b border-gray-600 py-2 outline-none focus:border-blue-500 transition-colors duration-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 희망 가격 */}
          <div className="mb-5">
            <label className="text-sm font-semibold">희망 가격</label>
            <input
              type="text"
              placeholder="가격을 입력해주세요"
              className="w-full bg-transparent focus:border-blue-500 border-b border-gray-600 py-2 outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* 설명 */}
          <div className="mb-5">
            <label className="text-sm font-semibold">설명</label>
            <textarea
              rows={5}
              placeholder="상품에 대한 내용을 작성해주세요."
              className="w-full bg-transparent border border-gray-600 rounded-md p-3 focus:border-blue-500 text-sm outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* 마감일 */}
          <div className="mb-5">
            <label className="text-sm font-semibold block mb-2">마감일</label>
            <div className="relative w-full">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy년 M월 d일 HH시 mm분"
                className="bg-[#1e1e1e] text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
                wrapperClassName="w-full"
                popperPlacement="bottom-start"
                popperClassName="custom-datepicker-width"
              />
            </div>
          </div>

          {/* 카테고리 */}
          <div className="mb-5">
            <label className="text-sm font-semibold">카테고리</label>
            <input
              readOnly
              placeholder="카테고리를 선택하세요."
              className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 mt-1 text-sm"
              value={category}
              onClick={() => setShowCategorySelect(true)}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-blue-700 py-3 rounded text-white font-semibold"
          >
            확인
          </button>
        </div>
      )}

      {/* 카테고리 선택 */}
      {showCategorySelect && (
        <div className="fixed inset-0 pt-3 pb-20 z-50 overflow-y-auto">
          <div className="max-w-[760px] mx-auto px-5">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setShowCategorySelect(false)}
                className="text-white"
              >
                <FaChevronLeft />
              </button>
              <h1 className="text-xl font-bold text-center flex-1">
                카테고리 선택
              </h1>
            </div>
            <ul>
              {categoryList.map((cat, idx) => (
                <li
                  key={idx}
                  className="py-4 border-b border-gray-700 text-sm cursor-pointer hover:bg-gray-800 px-2"
                  onClick={() => {
                    setCategory(cat);
                    setShowCategorySelect(false);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 2단계 제품명 입력 */}
      {showProductNameInput && (
        <form className="px-5 pt-5 pb-20" onSubmit={handleFinalSubmit}>
          <h1 className="text-lg font-bold mb-6">제품명을 적어주세요!</h1>
          <input
            type="text"
            placeholder="공통적으로 쓰이는 제품명을 적어주세요!"
            className="w-full focus:border-blue-500 bg-transparent border-b border-gray-600 py-2 text-2xl font-semibold outline-none mb-2 transition-colors duration-200"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <p className="text-gray-400 text-sm mb-6">
            공통적으로 쓰이는 제품명을 적어주세요!
          </p>
          <button
            type="submit"
            className="mt-10 w-full bg-blue-700 py-3 rounded text-white font-semibold"
          >
            확인
          </button>
        </form>
      )}
    </div>
  );
}
