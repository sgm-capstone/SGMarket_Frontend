import { useAuthStore } from "../../stores/authStore";
import { FaGoogle, FaComment } from "react-icons/fa";
import Logo from "../../assets/images/Logo.svg";

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);

  const handleKakaoLogin = () => {
    login();

    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoAuthURL;
  };

  const handleGoogleLogin = () => {
    console.log("Google login ");
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-black text-white px-6">
      <img src={Logo} alt="로고" className="w-20 h-20 mb-8" />

      <h1 className="text-2xl font-bold mb-2">환영해요</h1>
      <p className="text-xs text-gray-400 mb-10">
        로그인할 플랫폼을 입력해주세요
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center bg-white text-black font-semibold py-3 px-4 rounded-lg shadow w-full"
        >
          <FaGoogle className="mr-2" />
          Google로 시작하기
        </button>

        <button
          onClick={handleKakaoLogin}
          className="flex items-center justify-center bg-yellow-400 text-black font-semibold py-3 px-4 rounded-lg shadow w-full"
        >
          <FaComment className="mr-2" />
          Kakao로 시작하기
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
