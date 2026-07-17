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
            (destination.place || "" || destination.name)
                .toLowerCase()
                .includes(searchText.toLowerCase());

        return matchesCategory && matchesSearch;
    });
}