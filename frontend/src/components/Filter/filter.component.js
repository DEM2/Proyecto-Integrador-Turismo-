export function applyFilters(
    destinations,
    selectedCategory,
    searchText
) {
    return destinations.filter((destination) => {

        const matchesCategory =
            selectedCategory === "Todos" ||
            destination.category === selectedCategory;

        const matchesSearch =
            (destination.place || "")
                .toLowerCase()
                .includes(searchText.toLowerCase());

        return matchesCategory && matchesSearch;
    });
}