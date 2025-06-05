export const categoryMapping = {
  전체: undefined,
  디지털기기: "DIGITAL_DEVICES",
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
  취미: "HOBBIES",
} as const;

export type CategoryLabel = keyof typeof categoryMapping;
export type CategoryCode = NonNullable<(typeof categoryMapping)[CategoryLabel]>;

export const categoryCodeToLabel: Record<CategoryCode, CategoryLabel> =
  Object.fromEntries(
    Object.entries(categoryMapping).map(([ko, en]) => [en, ko])
  ) as Record<CategoryCode, CategoryLabel>;

export const categoryLabelMapping: Record<string, string> = {
  DIGITAL_DEVICES: "디지털기기",
  HOME_APPLIANCES: "생활가전",
  FURNITURE_INTERIOR: "가구/인테리어",
  HOME_KITCHEN: "생활/주방",
  KIDS: "유아동",
  KIDS_BOOKS: "유아도서",
  WOMENS_CLOTHING: "여성의류",
  WOMENS_ACCESSORIES: "여성잡화",
  MENS_FASHION_ACCESSORIES: "남성패션/잡화",
  BEAUTY_COSMETICS: "뷰티/미용",
  SPORTS_RECREATION: "스포츠/레저",
  HOBBIES: "취미",
};
