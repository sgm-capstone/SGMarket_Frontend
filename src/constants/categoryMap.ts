import type { CategoryLabel } from "../types/category";

export const categoryMapping: Record<CategoryLabel, string> = {
  전체: "",
  디지털기기: "DIGITAL_DEVICES  ",
  생활가전: "HOME_APPLIANCES",
  "가구/인테리어": "FURNITURE_INTERIOR",
  "생활/주방": "HOME_KITCHEN",
  유아동: "KIDS",
  유아도서: "KIDS_BOOKS",
  여성의류: "WOMENS_CLOTHING",
  여성잡화: "WOMENS_ACCESSORIES",
  "남성패션/잡화": "MENS_FASHION_ACCESSORIES",
  "뷰티/미용": "BEAUTY_COSMETICS",
  "스포츠/레저": "SPORTS_RECREATION",
  "취미/게임/음반": "HOBBIES",
};

export const categoryReverseMapping: Record<string, string> = {
  "DIGITAL-DEVICES": "디지털기기",
  "HOME-APPLIANCES": "생활가전",
  "FURNITURE-INTERIOR": "가구/인테리어",
  "HOME-KITCHEN": "생활/주방",
  KIDS: "유아동",
  "KIDS-BOOKS": "유아도서",
  "WOMENS-CLOTHING": "여성의류",
  "WOMENS-ACCESSORIES": "여성잡화",
  "MENS-FASHION-ACCESSORIES": "남성패션/잡화",
  "BEAUTY-COSMETICS": "뷰티/미용",
  "SPORTS-RECREATION": "스포츠/레저",
  HOBBIES: "취미/게임/음반",
};
