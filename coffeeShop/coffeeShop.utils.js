export const processCategories = (category) => {
  const categories = category.match(/[^,]+/g) || [];
  return categories.map((category) => {
    let slug = category.trim().replace(/\,+/g, "-").toLowerCase();
    return {
      where: { name: category },
      create: { name: category, slug },
    };
  });
};
