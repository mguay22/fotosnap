export const getImageUrl = (image: string | null) => {
  if (!image) {
    return "";
  }
  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${image}`;
};
