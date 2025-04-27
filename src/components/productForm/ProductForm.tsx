// ProductForm.tsx
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

const categoryList = [
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
  const [category, setCategory] = useState("");
  // const [deadline, setDeadline] = useState("");
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [showProductNameInput, setShowProductNameInput] = useState(false);
  const [productName, setProductName] = useState("");

  const handleSubmit = () => {
    if (!category) return alert("카테고리를 선택해주세요");
    setShowProductNameInput(true);
  };

  return (
    <div className="relative bg-[#101010] text-white w-full mx-auto max-w-[760px] min-h-screen overflow-hidden">
      {!showProductNameInput && !showCategorySelect && (
        <div className="px-5 pt-5 pb-20">
          <h1 className="text-center text-xl font-bold mb-6">물건 팔기</h1>

          <div className="mb-5">
            <div className="w-[70px] h-[70px] border border-gray-600 rounded-md flex items-center justify-center mb-4">
              📷 +
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

          <div className="mb-5">
            <label className="text-sm font-semibold">설명</label>
            <textarea
              rows={5}
              placeholder="상품에 대한 내용을 작성해주세요. 다른 사용자에게 불쾌감을 주는 내용은 자제 부탁드려요."
              className="w-full bg-transparent border border-gray-600 rounded-md p-3 focus:border-blue-500 text-sm outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label className="text-sm font-semibold">마감일</label>
            <div className="mt-2">
              <button className="text-sm bg-gray-700 px-3 py-1 rounded">
                📅 마감일 설정
              </button>
            </div>
          </div>

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

      {showCategorySelect && (
        <div className="fixed inset-0 bg-[#101010]  pt-3 pb-20 z-50 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4 ">
            <button
              onClick={() => setShowCategorySelect(false)}
              className="text-white"
            >
              <FaChevronLeft className="pl-2" />
            </button>
            <h1 className="text-xl font-bold text-center flex-1">
              카테고리 선택
            </h1>
          </div>
          <ul>
            {categoryList.map((cat, idx) => (
              <li
                key={idx}
                className="py-4 bg-[#16171B] border-b border-gray-700 text-sm cursor-pointer hover:bg-gray-800 px-2"
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
      )}

      {showProductNameInput && (
        <div className="px-5 pt-5 pb-20">
          <h1 className="text-lg font-bold mb-6">제품명을 적어주세요!</h1>
          <input
            type="text"
            placeholder="공통적으로 쓰이는 제품명을 적어주세요!"
            className="w-full focus:border-blue-500 bg-transparent border-b border-gray-600 py-2 text-2xl font-semibold outline-none mb-2 transition-colors duration-200"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <p className="text-gray-400 text-sm">
            공통적으로 쓰이는 제품명을 적어주세요!
          </p>
          <button className="mt-10 w-full bg-blue-700 py-3 rounded text-white font-semibold">
            확인
          </button>
        </div>
      )}
    </div>
  );
}
