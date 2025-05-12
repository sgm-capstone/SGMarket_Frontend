import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function RegisterUser() {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [regionDetail, setRegionDetail] = useState("");
  const [showPostcode, setShowPostcode] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setRegion(fullAddress);
    setShowPostcode(false);
  };

  return (
    <div className="relative bg-[#101010] text-white w-full max-w-[760px] mx-auto min-h-screen px-5 pt-6 pb-32">
      <div className="mb-8">
        <FaChevronLeft className="text-white text-xl" />
      </div>

      <div className="text-white text-lg font-bold leading-snug mb-10">
        환영해요 <br />
        이름을 알려주세요
      </div>

      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setFocusedInput("name")}
        onBlur={() => setFocusedInput(null)}
        className={`w-full bg-transparent border-b py-3 text-xl font-bold outline-none mb-8 transition-colors duration-200 ${
          focusedInput === "name" ? "border-blue-600" : "border-gray-600"
        }`}
      />

      <input
        type="text"
        readOnly
        placeholder="주소를 검색해주세요"
        value={region}
        onClick={() => setShowPostcode(true)}
        onFocus={() => setFocusedInput("region")}
        onBlur={() => setFocusedInput(null)}
        className={`w-full bg-transparent border-b py-3 text-xl font-bold outline-none cursor-pointer mb-8 transition-colors duration-200 ${
          focusedInput === "region" ? "border-blue-600" : "border-gray-600"
        }`}
      />

      <input
        type="text"
        placeholder="자세한 주소를 입력해주세요"
        value={regionDetail}
        onChange={(e) => setRegionDetail(e.target.value)}
        onFocus={() => setFocusedInput("detail")}
        onBlur={() => setFocusedInput(null)}
        className={`w-full bg-transparent border-b py-3 text-xl font-bold outline-none transition-colors duration-200 ${
          focusedInput === "detail" ? "border-blue-600" : "border-gray-600"
        }`}
      />

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 px-5 w-full max-w-[760px]">
        <button className="w-full mx-auto block bg-[#1744d8] text-white font-semibold py-4 rounded-md">
          확인
        </button>
      </div>

      {showPostcode && (
        <div className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-80">
          <div className="relative w-full max-w-[760px] h-full bg-[#101010] text-black">
            <div className="flex items-center px-4 py-4 border-b border-gray-300 bg-black text-white">
              <button
                onClick={() => setShowPostcode(false)}
                className="mr-3 text-xl"
              >
                <FaChevronLeft />
              </button>
              <span className="font-bold text-lg">주소 검색</span>
            </div>
            <DaumPostcodeEmbed
              onComplete={handleComplete}
              style={{ width: "100%", height: "100%" }}
              theme={{
                bgColor: "#101010", // 바탕 배경색
                searchBgColor: "#1a1a1a", // 검색창 배경색
                contentBgColor: "#181818", // 본문 배경색 (검색 결과 등)
                pageBgColor: "#101010", // 페이지 전체 배경
                textColor: "#ffffff", // 기본 글자색
                queryTextColor: "#ffffff", // 검색창 입력 텍스트
                postcodeTextColor: "#0d6efd", // 우편번호 색상 (로고색이나 강조 색)
                emphTextColor: "#0d6efd", // 강조 글자색
                outlineColor: "#333333", // 테두리 색
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
