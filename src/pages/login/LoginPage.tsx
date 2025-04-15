const LoginPage = () => {
  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoAuthURL;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleKakaoLogin}
        className="bg-yellow-400 px-4 py-2 rounded text-black font-bold"
      >
        카카오 로그인
      </button>
    </div>
  );
};

export default LoginPage;
