export function applyFilters(
    destinations,
    selectedCategory,
    searchText
) {
    return destinations.filter((destination) => {

        const matchesCategory =
            selectedCategory === "Todos" ||
            destination.category === selectedCategory;

        const searchableName = destination.place || destination.name || "";
        const matchesSearch = searchableName
            .toLowerCase()
            .includes(searchText.toLowerCase());

        return matchesCategory && matchesSearch;
    });
}
