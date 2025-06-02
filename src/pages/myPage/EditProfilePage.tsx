import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getMyInfo, updateMyInfo } from "../../api/member";
import DaumPostcodeEmbed from "react-daum-postcode";
import axios from "axios";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [email, setEmail] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [showPostcode, setShowPostcode] = useState(false);
  const [showAddressDetail, setShowAddressDetail] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const data = await getMyInfo();
        setName(data.nickname);
        setAddress(data.address);
        setEmail(data.email);
        setProfileImageUrl(data.profileImageUrl);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      } catch (err) {
        console.error("회원 정보 불러오기 실패", err);
      }
    }

    fetchUserInfo();
  }, []);

  const fetchCoordinates = async (addr: string) => {
    try {
      const res = await axios.get(
        "https://dapi.kakao.com/v2/local/search/address.json",
        {
          params: { query: addr },
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        }
      );
      const result = res.data.documents[0];
      if (result) {
        setLongitude(parseFloat(result.x));
        setLatitude(parseFloat(result.y));
        console.log("📍 좌표 조회 성공:", result.x, result.y);
      }
    } catch (err) {
      console.error("좌표 조회 실패:", err);
    }
  };

  const handleComplete = async (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setShowPostcode(false);
    setShowAddressDetail(true);
    await fetchCoordinates(fullAddress);
  };

  const handleUpdate = async () => {
    try {
      const fullAddress = `${address} ${addressDetail}`.trim();

      const payload = {
        nickname: name,
        address: fullAddress,
        latitude: Math.floor(latitude),
        longitude: Math.floor(longitude),
      };

      await updateMyInfo(payload);
      alert("프로필이 수정되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error("❌ 프로필 수정 실패:", err);
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="relative bg-[#101010] text-white min-h-screen pb-28 w-full mx-auto">
      {/* 헤더 */}
      <div className="relative h-[50px] flex items-center justify-center border-b border-gray-700">
        <button
          className="absolute left-4 text-lg"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
        </button>
        <h1 className="text-lg font-bold">{name}님의 정보</h1>
      </div>

      {/* 프로필 이미지 */}
      <div className="flex justify-center mt-10 mb-6 relative">
        <img
          src={profileImageUrl || "/default-profile.png"}
          alt="profile"
          className="w-36 h-36 rounded-full bg-white"
        />
      </div>

      {/* 정보 입력 폼 */}
      <div className="bg-[#1b1b1b] rounded-xl mx-4 p-4 text-sm space-y-6 border border-gray-700">
        {/* 닉네임 */}
        <div>
          <div className="flex items-center">
            <span className="text-gray-200 w-16 font-extrabold text-[16px]">
              닉네임
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-transparent py-2 text-gray-400 outline-none"
            />
          </div>
        </div>

        {/* 주소 */}
        <div>
          <div className="flex items-center">
            <span className="text-gray-200 w-16 font-extrabold text-[16px]">
              주소
            </span>
            <input
              value={address}
              readOnly
              onClick={() => setShowPostcode(true)}
              className="flex-1 bg-transparent py-2 text-gray-400 outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* 상세 주소 (주소 선택 후에만 보임) */}
        {showAddressDetail && (
          <div>
            <div className="flex items-center">
              <span className="text-gray-200 w-16 font-extrabold text-[16px]">
                상세
              </span>
              <input
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                placeholder="상세 주소 입력"
                className="flex-1 bg-transparent py-2 text-gray-400 outline-none"
              />
            </div>
          </div>
        )}

        {/* 이메일 */}
        <div>
          <div className="flex items-center">
            <span className="text-gray-200 w-16 font-extrabold text-[16px]">
              이메일
            </span>
            <input
              value={email}
              readOnly
              className="flex-1 bg-transparent py-2 text-gray-400 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 수정 버튼 */}
      <div className="px-4 mt-8">
        <button
          onClick={handleUpdate}
          className="w-full py-3 rounded bg-[#0d47a1] font-bold text-white"
        >
          수정하기
        </button>
      </div>

      {/* 주소 검색 모달 */}
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
                bgColor: "#101010",
                searchBgColor: "#1a1a1a",
                contentBgColor: "#181818",
                pageBgColor: "#101010",
                textColor: "#ffffff",
                queryTextColor: "#ffffff",
                postcodeTextColor: "#0d6efd",
                emphTextColor: "#0d6efd",
                outlineColor: "#333333",
              }}
            />
          </div>
        </div>
      )}

      {/* 탈퇴하기 */}
      <div className="absolute bottom-5 left-0 w-full px-4">
        <div className="flex justify-between items-center bg-[#1b1b1b] rounded-xl border-gray-700 text-lg text-gray-400 cursor-pointer px-4 py-3">
          탈퇴하기 <FaChevronLeft className="rotate-180" />
        </div>
      </div>
    </div>
  );
}
