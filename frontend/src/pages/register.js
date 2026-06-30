export function Register() {
  return `

        <main class="relative w-screen h-screen overflow-hidden">

            <!-- HERO — Full-bleed background image -->
            <img
                src="/images/register-hero.png"
                alt="Barranquilla al atardecer"
                class="absolute inset-0 w-full h-full object-cover object-center"
            />

            <!-- Hero overlay gradient — left side legibility -->
            <div class="absolute inset-0 bg-gradient bg-white/6 "></div>

            <!-- ============================================================
                 HERO CONTENT — Logo + headline + tagline + footer badge
            ============================================================ -->

            <section class="absolute inset-0 flex flex-col p-10 pointer-events-none lg:w-[58%]">

                <!-- HEADER — Logo -->
                <header class="flex items-center gap-3 p">
                 <p class="text-blue-950 font-bold text-3xl tracking-wide drop-shadow-md">Barranquilla</p>
                    <img src="/images/Logo.png" alt="Barranquilla Explora" class="h-12 w-auto drop-shadow-lg" />
                </header>

                <!-- HEADLINE — Pegado al logo -->
                <article class="space-y-3 max-w-md mt-6">
                    <p class="text-sm font-semibold tracking-[0.25em] uppercase text-[#E8961E]">
                        Turismo · Cultura · Experiencias
                    </p>

                    <h1 class="text-6xl font-black leading-tight text-white drop-shadow-md">
                        Descubre la magia de la
                        <span class="block text-6xl italic text-blue-950 ">
                            Costa Caribe
                        </span>
                    </h1>
                </article>

                <!-- Spacer — empuja el badge al fondo -->
                <div class="flex-1"></div>

                <!-- FOOTER BADGE -->
                <footer class="hidden md:flex items-center gap-4 bg-[#1B2E6B]/70 backdrop-blur-sm rounded-2xl px-5 py-4 max-w-sm border border-white/10">
                    <img src="/Logo.png" alt="" class="h-10 w-auto opacity-90" aria-hidden="true" />
                    <div>
                        <p class="text-white font-bold text-sm">Tu aventura comienza aquí</p>
                        <p class="text-white/70 text-xs leading-snug mt-0.5">
                            Crea una cuenta y empieza a organizar<br />
                            tus recorridos turísticos de una forma fácil.
                        </p>
                    </div>
                </footer>

            </section>


            <!-- ============================================================
                 REGISTER CARD — Floating over the hero
            ============================================================ -->

            <aside class="
                absolute inset-y-0 right-0
                w-full xl:w-[46%]
                flex items-center justify-center
                px-5 py-6 lg:px-10
                overflow-y-auto
            ">

                <article class="
                    w-full max-w-xl
                    bg-white rounded-3xl
                    shadow-[0_32px_80px_-8px_rgba(27,46,107,0.28)]
                    px-8 py-8
                    space-y-6
                ">

                    <!-- CARD HEADER -->
                    <header class="space-y-1">
                        <h2 class="text-3xl font-black text-[#1B2E6B] leading-tight">Crea tu cuenta</h2>
                        <p class="text-sm text-gray-500">Únete a Barranquilla Explora</p>
                    </header>


                    <!-- FORM -->
                    <form class="space-y-4" novalidate>

                        <!-- Nombre + Apellido -->
                        <fieldset class="grid grid-cols-2 gap-3">
                            <legend class="sr-only">Nombre completo</legend>

                            <div class="space-y-1">
                                <label for="firstName" class="block text-xs font-semibold text-gray-700 tracking-wide">
                                    Nombre
                                </label>
                                <div class="relative">
                                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                    </svg>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        autocomplete="given-name"
                                        placeholder="Tu nombre"
                                        class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2E6B]/30 focus:border-[#1B2E6B] transition"
                                    />
                                </div>
                            </div>

                            <div class="space-y-1">
                                <label for="lastName" class="block text-xs font-semibold text-gray-700 tracking-wide">
                                    Apellido
                                </label>
                                <div class="relative">
                                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                    </svg>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        autocomplete="family-name"
                                        placeholder="Tu apellido"
                                        class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2E6B]/30 focus:border-[#1B2E6B] transition"
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <!-- Correo electrónico -->
                        <div class="space-y-1">
                            <label for="email" class="block text-xs font-semibold text-gray-700 tracking-wide">
                                Correo electrónico
                            </label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                                </svg>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autocomplete="email"
                                    placeholder="ejemplo@correo.com"
                                    class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2E6B]/30 focus:border-[#1B2E6B] transition"
                                />
                            </div>
                        </div>

                        <!-- Teléfono -->
                        <div class="space-y-1">
                            <label for="phone" class="block text-xs font-semibold text-gray-700 tracking-wide">
                                Teléfono
                            </label>
                            <div class="relative">
                                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                                </svg>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    autocomplete="tel"
                                    placeholder="300 123 4567"
                                    class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2E6B]/30 focus:border-[#1B2E6B] transition"
                                />
                            </div>
                        </div>

                        <!-- Contraseña + Confirmar -->
                        <fieldset class="grid grid-cols-2 gap-3">
                            <legend class="sr-only">Contraseña</legend>

                            <div class="space-y-1">
                                <label for="password" class="block text-xs font-semibold text-gray-700 tracking-wide">
                                    Contraseña
                                </label>
                                <div class="relative">
                                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                    </svg>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        autocomplete="new-password"
                                        placeholder="Crea una contraseña"
                                        class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2E6B]/30 focus:border-[#1B2E6B] transition"
                                    />
                                </div>
                            </div>

                            <div class="space-y-1">
                                <label for="confirmPassword" class="block text-xs font-semibold text-gray-700 tracking-wide">
                                    Confirmar
                                </label>
                                <div class="relative">
                                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                    </svg>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        autocomplete="new-password"
                                        placeholder="Repite tu contraseña"
                                        class="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1B2E6B]/30 focus:border-[#1B2E6B] transition"
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <!-- CHECKBOX — Términos -->
                        <label for="terms" class="flex items-start gap-2.5 cursor-pointer group">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                class="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1B2E6B] accent-[#1B2E6B] shrink-0"
                            />
                            <span class="text-xs text-gray-500 leading-snug">
                                Acepto los
                                <a href="#" class="text-[#E8961E] font-semibold hover:underline">Términos y Condiciones</a>
                                y la
                                <a href="#" class="text-[#E8961E] font-semibold hover:underline">Política de Privacidad</a>
                            </span>
                        </label>

                        <!-- SUBMIT BUTTON -->
                        <button
                            type="submit"
                            class="w-full py-3 rounded-xl bg-[#1B2E6B] text-white font-bold text-sm tracking-wide hover:bg-[#162459] active:scale-[0.98] transition-all duration-150 shadow-md shadow-[#1B2E6B]/30"
                        >
                            Crear cuenta
                        </button>

                    </form>


                    <!-- SOCIAL LOGIN -->
                    <section aria-label="Acceso con redes sociales" class="space-y-3">

                        <div class="flex items-center gap-3">
                            <span class="flex-1 h-px bg-gray-200"></span>
                            <span class="text-xs text-gray-400 font-medium">o continúa con</span>
                            <span class="flex-1 h-px bg-gray-200"></span>
                        </div>

                        <div class="grid grid-cols-3 gap-2">

                            <button type="button" class="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 transition text-xs font-medium text-gray-700">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google
                            </button>

                            <button type="button" class="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 transition text-xs font-medium text-gray-700">
                                <svg class="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Facebook
                            </button>

                            <button type="button" class="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 transition text-xs font-medium text-gray-700">
                                <svg class="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                                </svg>
                                Apple
                            </button>

                        </div>

                    </section>


                    <!-- FOOTER -->
                    <footer class="text-center">
                        <p class="text-xs text-gray-500">
                            ¿Ya tienes una cuenta?
                            <a href="#" class="text-[#1B2E6B] font-bold hover:text-[#E8961E] transition-colors">
                                Inicia sesión
                            </a>
                        </p>
                    </footer>

                </article>

            </aside>

        </main>

    `;
}