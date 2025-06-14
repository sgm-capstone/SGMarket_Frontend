import { useNavigate } from "react-router-dom";

export default function RegisterComplete() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[760px] min-h-screen bg-[#101010] text-white mx-auto flex flex-col">
      {/* 상단 헤더 */}

      {/* 본문 */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 text-center">
        <div className="text-[150px] mb-4">😍</div>
        <h1 className="text-3xl font-extrabold mb-2">환영해요!</h1>
        <p className="text-lg font-semibold">
          당장
          <br />
          로그인해봐요!
        </p>
      </div>

      {/* 하단 버튼 */}
      <div className="px-6 pb-6">
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-[#1744d8] text-white font-bold py-4 rounded-md"
        >
          로그인 하기
        </button>
      </div>
    </div>
  );
}
