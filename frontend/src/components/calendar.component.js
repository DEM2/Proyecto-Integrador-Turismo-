export function CALENDAR() {
  return `
    <!-- Encabezado -->
    <header class="mb-6">
      <h2 class="text-2xl font-bold text-slate-900">Calendario</h2>
    </header>

    <!-- Navegación -->
    <nav class="flex items-center justify-between mb-6">
      <button class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 transition">←</button>
      <h3 class="text-xl font-bold text-slate-800">Junio 2026</h3>
      <button class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 transition">→</button>
    </nav>

    <!-- Días -->
    <ul class="grid grid-cols-7 mb-4 text-center text-xs font-semibold uppercase text-slate-400">
      <li>Lun</li><li>Mar</li><li>Mié</li><li>Jue</li><li>Vie</li><li>Sáb</li><li>Dom</li>
    </ul>

    <!-- Calendario -->
    <section class="grid grid-cols-7 gap-y-3 text-center">
      <span></span><span></span><span></span><span></span><span></span>
      <button><span>1</span></button>
      <button><span>2</span></button>
      <button><span>3</span></button>
      <button><span>4</span></button>
      <button><span>5</span></button>
      <button><span>6</span></button>
      <button><span>7</span></button>
      <button><span>8</span></button>
      <button><span>9</span></button>
      <button><span>10</span></button>
      <button><span>11</span></button>
      <button><span>12</span></button>
      <button><span>13</span></button>
      <button>
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">14</span>
      </button>
      <button><span>15</span><span class="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span></button>
      <button><span>16</span></button>
      <button><span>17</span></button>
      <button><span>18</span></button>
      <button><span>19</span><span class="mt-1 h-1.5 w-1.5 rounded-full bg-green-500"></span></button>
      <button><span>20</span></button>
      <button><span>21</span></button>
      <button><span>22</span></button>
      <button><span>23</span></button>
      <button><span>24</span></button>
      <button><span>25</span></button>
      <button><span>26</span></button>
      <button><span>27</span></button>
      <button><span>28</span><span class="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500"></span></button>
      <button><span>29</span></button>
      <button><span>30</span></button>
    </section>

    <!-- Próximos eventos -->
    <section class="mt-8">
      <hgroup class="mb-4 flex items-center justify-between">
        <h3 class="text-lg font-bold text-slate-900">Próximos eventos</h3>
        <button class="text-sm font-medium text-blue-600 hover:underline">Ver todos</button>
      </hgroup>

      <ul class="space-y-3">
        <li>
          <article class="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 hover:border-blue-500 transition">
            <aside class="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-blue-100">
              <span class="text-xs font-bold text-blue-700">JUN</span>
              <span class="text-lg font-bold text-blue-700">14</span>
            </aside>
            <div class="flex-1">
              <h4 class="font-semibold text-slate-900">Festival de Orquestas</h4>
              <p class="text-sm text-slate-500">Plaza de la Paz</p>
            </div>
          </article>
        </li>

        <li>
          <article class="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 hover:border-blue-500 transition">
            <aside class="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-green-100">
              <span class="text-xs font-bold text-green-700">JUN</span>
              <span class="text-lg font-bold text-green-700">21</span>
            </aside>
            <div class="flex-1">
              <h4 class="font-semibold text-slate-900">Noche de Baile</h4>
              <p class="text-sm text-slate-500">Malecón del Río</p>
            </div>
          </article>
        </li>

        <li>
          <article class="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 hover:border-blue-500 transition">
            <aside class="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-orange-100">
              <span class="text-xs font-bold text-orange-700">JUN</span>
              <span class="text-lg font-bold text-orange-700">28</span>
            </aside>
            <div class="flex-1">
              <h4 class="font-semibold text-slate-900">Mercado Cultural</h4>
              <p class="text-sm text-slate-500">Barrio Abajo</p>
            </div>
          </article>
        </li>
      </ul>
    </section>

    <!-- Botón -->
    <button class="mt-8 w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
      + Publica tu evento
    </button>
   `;
}
