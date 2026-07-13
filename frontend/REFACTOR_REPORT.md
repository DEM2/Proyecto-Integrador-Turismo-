# Refactor Report - Frontend

## Resumen

Se reorganizo el frontend de Vite sin cambiar rutas publicas, endpoints de API ni flujo funcional de la aplicacion. La estructura ahora separa entrada de aplicacion, router, paginas, componentes, servicios, estilos, utilidades y assets por responsabilidad.

## Archivos renombrados

- `src/app.js` -> `src/app/initializeApplication.js`
- `src/style.css` -> `src/styles/global.css`
- `src/router/router.js` -> `src/router/AppRouter.js`
- `src/router/routes.js` -> `src/router/AppRoutes.js`
- `src/middleware/middleware.js` -> `src/middleware/routeGuards.js`
- `src/utils/icons.js` -> `src/utils/renderIcon.js`
- `src/components/nav_bar.component.js` -> `src/components/layout/MainNavigation.js`
- `src/components/home.component.js` -> `src/components/sections/HomeSections.js`
- `src/components/placeCard.component.js` -> `src/components/cards/TouristPlaceCard.js`
- `src/components/filterCard.component.js` -> `src/components/cards/CategoryFilterCard.js`
- `src/components/calendar.component.js` -> `src/components/common/EventCalendar.js`
- `src/components/btn_seguir.component.js` -> `src/components/buttons/FollowButton.js`
- `src/components/card_itinerario.component.js` -> `src/components/cards/PublicItineraryCard.js`
- `src/components/card_reseña.component.js` -> `src/components/cards/ReviewCard.js`
- `src/pages/home.js` -> `src/pages/Home/HomePage.js`
- `src/pages/event.js` -> `src/pages/Events/EventsPage.js`
- `src/pages/detailViewEvent.js` -> `src/pages/Events/EventDetailPage.js`
- `src/pages/destination_view.js` -> `src/pages/TouristPlaces/TouristPlacesPage.js`
- `src/pages/login.js` -> `src/pages/Authentication/LoginPage.js`
- `src/pages/register.js` -> `src/pages/Authentication/RegisterPage.js`
- `src/pages/perfil_explorador.js` -> `src/pages/Profile/ExplorerProfilePage.js`
- `src/pages/perfil_organizador.js` -> `src/pages/Profile/OrganizerProfilePage.js`
- `src/pages/not-found.js` -> `src/pages/NotFound/NotFoundPage.js`
- `src/services/auth.service.js` -> `src/services/authService.js`
- `src/services/destacados.service.js` -> `src/services/featuredContentService.js`
- `src/services/destination.service.js` -> `src/services/destinationService.js`
- `src/services/event.service.js` -> `src/services/eventService.js`
- `src/services/register.service.js` -> `src/services/registrationService.js`

## Carpetas reorganizadas

- `src/app/`: inicializacion de la aplicacion.
- `src/styles/`: estilos globales.
- `src/components/layout/`: navegacion principal.
- `src/components/sections/`: secciones reutilizables de Home.
- `src/components/cards/`: tarjetas reutilizables.
- `src/components/buttons/`: botones con comportamiento propio.
- `src/components/common/`: componentes generales.
- `src/pages/Authentication/`, `Events/`, `Home/`, `NotFound/`, `Profile/`, `TouristPlaces/`: paginas agrupadas por dominio.
- `src/assets/icons/`, `images/`, `logos/`, `videos/`: assets separados por tipo.

## Codigo eliminado

- Se elimino `src/components/event_filter.component.js` porque era un duplicado no importado.
- Se elimino `src/vite.config.js` porque duplicaba el `vite.config.js` raiz que usa Vite.
- Se eliminaron `console.log` innecesarios en Home y detalle de evento.
- Se limpiaron imports no usados en servicios y paginas.
- Se eliminaron comentarios obsoletos de bloques de codigo desactivados en perfiles.

## Imports corregidos

- Se actualizaron todos los imports tras mover paginas, componentes, servicios, router, middleware y utilidades.
- Se corrigieron imports sin extension o apuntando a rutas antiguas.
- Se actualizaron referencias de assets de `/src/assets/img/...` a:
  - `/src/assets/icons/...`
  - `/src/assets/images/...`
  - `/src/assets/logos/...`
  - `/src/assets/videos/...`

## Mejoras realizadas

- Componentes renombrados a nombres descriptivos como `renderMainNavigation`, `renderTouristPlaceCard`, `renderCategoryFilterCard`, `renderEventCalendar` y `createFollowButton`.
- Paginas renombradas con convencion `Page`, por ejemplo `HomePage`, `EventsPage`, `LoginPage` y `RegisterPage`.
- Router centralizado con `AppRouter.js` y `AppRoutes.js`.
- Middleware renombrado como `routeGuards.js` para expresar su responsabilidad.
- Servicios renombrados en camelCase para mantener consistencia.
- Se conservaron rutas existentes, llamadas `fetch` y nombres de endpoints.

## Validacion

- Comando ejecutado: `npm.cmd run build`
- Resultado: compilacion exitosa con Vite.
- Tambien se verifico que no quedaran referencias a nombres antiguos ni a `/src/assets/img`.
