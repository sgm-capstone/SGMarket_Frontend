import axiosInstance from "../api/axios";

const updateProfile = async () => {
  try {
    const response = await axiosInstance.post("/members/profile", {
      address: "서울시 성북구",
      nickname: "동짱",
    });

    console.log("프로필 등록 성공:", response.data);
  } catch (error) {
    console.error("프로필 등록 실패:", error);
  }
};

export default function Home() {
  const handleUpdateProfile = () => {
    updateProfile();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleUpdateProfile}
        className="bg-blue-500 px-4 py-2 rounded text-white font-bold"
      >
        프로필 등록하기
      </button>
    </div>
  );
}
