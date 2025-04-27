import { useState } from "react";
import Product from "../components/mainPage/Product";
import { FaBell, FaChevronLeft, FaPlus } from "react-icons/fa";
import TopHeader from "../components/TopHeader";

const categories = ["전체", "패션", "전자/IT", "책", "중고차"];

const sampleProducts = [
  {
    title: "맥북 프로 2021",
    location: "석수1동",
    dDay: "D -3",
    maxPrice: "10,000,000원",
    minPrice: "7,000,000원",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
  {
    title: "맥북 프로 2021",
    location: "석수1동",
    dDay: "D -3",
    maxPrice: "10,000,000원",
    minPrice: "7,000,000원",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
  {
    title: "맥북 프로 2021",
    location: "석수1동",
    dDay: "D -3",
    maxPrice: "10,000,000원",
    minPrice: "7,000,000원",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
  {
    title: "맥북 프로 2021",
    location: "석수1동",
    dDay: "D -3",
    maxPrice: "10,000,000원",
    minPrice: "7,000,000원",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
  {
    title: "맥북 프로 2021",
    location: "석수1동",
    dDay: "D -3",
    maxPrice: "10,000,000원",
    minPrice: "7,000,000원",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
  {
    title: "맥북 프로 2021",
    location: "석수1동",
    dDay: "D -3",
    maxPrice: "10,000,000원",
    minPrice: "7,000,000원",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
  {
    title: "맥북 프로 2021",
    location: "석수1동",
    dDay: "D -3",
    maxPrice: "10,000,000원",
    minPrice: "7,000,000원",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=892&hei=820&&qlt=80&.v=1632788574000",
  },
];

export default function MainPage() {
  const [currentRegion, setCurrentRegion] = useState("석수1동");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  return (
    <div className="w-full  mx-auto bg-[#101012] text-white px-4 py-3 pb-[100px]">
      <TopHeader currentRegion="석수1동" />

      <div className="flex mt-10 overflow-x-auto m gap-2 mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm  transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-white text-black font-bold"
                : "bg-[#1a1a1a] text-white  font-bold "
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col h-[20%] gap-2">
        {sampleProducts.map((p, idx) => (
          <Product key={idx} {...p} />
        ))}
      </div>

      <div className="fixed bottom-[90px] right-0 left-0 mx-auto max-w-[760px] w-full flex justify-end pr-6 pointer-events-none">
        <div className="pointer-events-auto bg-white text-black p-4 rounded-full shadow-lg">
          <FaPlus />
        </div>
      </div>
    </div>
  );
}
