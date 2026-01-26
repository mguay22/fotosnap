export const getImageUrl = (image: string | null) => {
  // Test
  if (!image) {
    return "";
  }
  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${image}`;
};
