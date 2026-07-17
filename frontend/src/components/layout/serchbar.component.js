export function serchBar(placeholder = "Buscar lugares turísticos...") {
    return `<div class="relative mt-8 w-full max-w-2xl">
    <input
        id="destination_search"
        type="text"
        placeholder="${placeholder}"
        class="h-14 w-full rounded-2xl border border-gray-200 bg-white px-6 pr-14 shadow-xl outline-none transition-all duration-300 focus:ring-4 focus:ring-blue-100"
    />

    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">

        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m1.35-5.15a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"/>

    </svg>

</div>`
    
}
