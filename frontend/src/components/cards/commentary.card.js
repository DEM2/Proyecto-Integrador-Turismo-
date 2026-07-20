export function RenderCommentary(commentary) {
    return `
        <article class="rounded-2xl border border-slate-200 p-5">

            <header class="mb-3 flex items-center gap-3">

                <img
                    src="/images/default-user.png"
                    alt="${commentary.name}"
                    class="h-11 w-11 rounded-full object-cover"
                />

                <div>

                    <strong class="block text-blue-950">
                        ${commentary.name} ${commentary.last_name}
                    </strong>

                    <div class="text-yellow-400 text-sm">
                        ${"★".repeat(commentary.score)}
                        ${"☆".repeat(5 - commentary.score)}
                    </div>

                </div>

            </header>

            <p class="text-sm text-slate-600">
                ${commentary.comments}
            </p>

        </article>
    `;

}