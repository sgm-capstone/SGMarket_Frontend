export type CategoryLabel =
  | "전체"
  | "디지털기기"
  | "생활가전"
  | "가구/인테리어"
  | "생활/주방"
  | "유아동"
  | "유아도서"
  | "여성의류"
  | "여성잡화"
  | "남성패션/잡화"
  | "뷰티/미용"
  | "스포츠/레저"
  | "취미";

export const categoryToCodeMap: Record<string, string> = {
  디지털기기: "DIGITAL",
  생활가전: "APPLIANCE",
  "가구/인테리어": "FURNITURE",
  "생활/주방": "KITCHEN",
  유아동: "KIDS",
  유아도서: "KIDS_BOOK",
  여성의류: "WOMEN_CLOTHES",
  여성잡화: "WOMEN_ITEMS",
  "남성패션/잡화": "MEN_ITEMS",
  "뷰티/미용": "BEAUTY",
  "스포츠/레저": "SPORTS",
  취미: "HOBBY",
};
