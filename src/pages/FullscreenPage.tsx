
function FullscreenLayout() {
  return (
    <div className="backgorund min-h-screen flex flex-col bg-gray-700">
      {/* 상단 바탕 영역 */}

      <main className="min-h-full flex-1 flex items-center justify-center">
        <div className=" main-content min-w-[320px] max-w-[640px] w-full p-6 rounded shadow">
          <p>메인 컨텐츠</p>
        </div>
      </main>


    </div>
  );
}

export default FullscreenLayout;
