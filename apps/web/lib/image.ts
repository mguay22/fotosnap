export const getImageUrl = (image: string | null) => {
  if (!image) {
    return "";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const storageUrl =
    process.env.NEXT_PUBLIC_STORAGE_URL ||
    `${process.env.NEXT_PUBLIC_API_URL}/uploads/images`;

  return `${storageUrl}/${image}`;
};
