export function RenderCommentary(commentary) {
    return `
           <article class="rounded-2xl border border-slate-200 p-5">
              <header class="mb-3 flex items-center gap-3">
                <img
                  src="/src/assets/images/familias.webp"
                  alt="Foto de Organización Carnaval"
                  class="h-11 w-11 rounded-full object-cover"
                />

                <p>
                  <strong class="block text-blue-950">Organización Carnaval</strong>
                  <span class="text-xs text-slate-500">Hace 2 horas</span>
                </p>
              </header>

              <p class="text-sm text-slate-600">
                ¡Hola! Sí, tendremos varios parqueaderos habilitados. Te recomendamos llegar temprano.
              </p>

              
            </article> 

    `

    
}