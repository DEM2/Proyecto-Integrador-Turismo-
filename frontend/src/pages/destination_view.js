import { NAV_BAR } from "../components/nav_bar.component";
export function destination(params) {
    return `
     ${NAV_BAR()}
     <main>
    <div class="bg-white rounded-2xl overflow-hidden border border-[#E7E1D6] hover:shadow-md transition-shadow">
  <div class="h-[130px] bg-[#FCE7EF] relative flex items-start justify-between p-2.5 bg-cover bg-center"
       style="background-image: url('/images/museo-carnaval.jpg')">
    <span class="text-[11px] font-semibold bg-white text-[#DD4E86] px-2.5 py-1 rounded-full">
      Cultura
    </span>
    <button aria-label="Guardar" class="w-[26px] h-[26px] rounded-full bg-white/85 flex items-center justify-center hover:bg-white transition-colors">
      <svg class="w-4 h-4 text-[#12293F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/>
      </svg>
    </button>
  </div>
  <div class="px-3.5 pt-3 pb-4">
    <h3 class="text-[14.5px] font-semibold text-[#12293F] mb-1">Museo del Carnaval</h3>
    <div class="text-xs text-[#4A5C70] flex items-center gap-1">
      <b class="text-[#12293F] font-semibold">★ 4.8</b>
      <span>(1,256) · Centro Histórico</span>
    </div>
  </div>
</div>
     </main>
    `
}