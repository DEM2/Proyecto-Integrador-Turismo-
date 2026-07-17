import {
  countAdminDashboardEvents,
  countAdminDashboardPendingOrganizers,
  countAdminDashboardPlaces,
  countAdminDashboardReviews,
  countAdminDashboardUsers,
  getAdminDashboardAllEvents,
  getAdminDashboardAllPlaces,
  getAdminDashboardAllReviews,
  getAdminDashboardAllUsers,
  getAdminDashboardPendingOrganizers,
  getAdminDashboardRecentReviews,
  hideAdminDashboardEventReview,
  hideAdminDashboardPlaceReview,
  showAdminDashboardEventReview,
  showAdminDashboardPlaceReview,
  updateAdminDashboardEvent,
  updateAdminDashboardPlace,
  updateAdminDashboardUser,
} from "../querys/adminDashboard.query.js";

export async function getAdminDashboardController(req, res) {
  try {
    const [
      usersCount,
      eventsCount,
      placesCount,
      reviewsCount,
      pendingOrganizersCount,
      pendingOrganizers,
      recentReviews,
    ] = await Promise.all([
      countAdminDashboardUsers(),
      countAdminDashboardEvents(),
      countAdminDashboardPlaces(),
      countAdminDashboardReviews(),
      countAdminDashboardPendingOrganizers(),
      getAdminDashboardPendingOrganizers(),
      getAdminDashboardRecentReviews(),
    ]);

    res.status(200).json({
      ok: true,
      message: "Dashboard de administrador consultado exitosamente",
      data: {
        counts: {
          users: Number(usersCount?.total_users ?? 0),
          events: Number(eventsCount?.total_events ?? 0),
          places: Number(placesCount?.total_places ?? 0),
          reviews: Number(reviewsCount?.total_reviews ?? 0),
          pendingOrganizers: Number(pendingOrganizersCount?.total_pending_organizers ?? 0),
        },
        pendingOrganizers,
        recentReviews,
      },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}

export async function hideAdminDashboardReviewController(req, res) {
  try {
    const { reviewType, id } = req.params;

    if (reviewType !== "event" && reviewType !== "place") {
      return res.status(400).json({
        ok: false,
        message: "Tipo de resena invalido",
      });
    }

    const hiddenReview = reviewType === "event"
      ? await hideAdminDashboardEventReview(id)
      : await hideAdminDashboardPlaceReview(id);

    if (!hiddenReview) {
      return res.status(404).json({
        ok: false,
        message: "Resena no encontrada",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Resena ocultada exitosamente",
      data: hiddenReview,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}

export async function getAdminDashboardAllReviewsController(req, res) {
  try {
    const reviews = await getAdminDashboardAllReviews();

    return res.status(200).json({
      ok: true,
      message: "Resenas consultadas exitosamente",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}

export async function getAdminDashboardAllEventsController(req, res) {
  try {
    const events = await getAdminDashboardAllEvents();

    return res.status(200).json({
      ok: true,
      message: "Eventos consultados exitosamente",
      data: events,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}

export async function getAdminDashboardAllPlacesController(req, res) {
  try {
    const places = await getAdminDashboardAllPlaces();

    return res.status(200).json({
      ok: true,
      message: "Sitios consultados exitosamente",
      data: places,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}

export async function getAdminDashboardAllUsersController(req, res) {
  try {
    const users = await getAdminDashboardAllUsers();

    return res.status(200).json({
      ok: true,
      message: "Usuarios consultados exitosamente",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}

export async function updateAdminDashboardEventController(req, res) {
  try {
    const { id } = req.params;
    const eventUpdated = await updateAdminDashboardEvent(id, req.body);

    if (!eventUpdated) {
      return res.status(404).json({
        ok: false,
        message: "Evento no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Evento actualizado exitosamente",
      data: eventUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}

export async function updateAdminDashboardPlaceController(req, res) {
  try {
    const { id } = req.params;
    const placeUpdated = await updateAdminDashboardPlace(id, req.body);

    if (!placeUpdated) {
      return res.status(404).json({
        ok: false,
        message: "Sitio no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Sitio actualizado exitosamente",
      data: placeUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}

export async function updateAdminDashboardUserController(req, res) {
  try {
    const { id } = req.params;
    const userUpdated = await updateAdminDashboardUser(id, req.body);

    if (!userUpdated) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Usuario actualizado exitosamente",
      data: userUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}

export async function showAdminDashboardReviewController(req, res) {
  try {
    const { reviewType, id } = req.params;

    if (reviewType !== "event" && reviewType !== "place") {
      return res.status(400).json({
        ok: false,
        message: "Tipo de resena invalido",
      });
    }

    const visibleReview = reviewType === "event"
      ? await showAdminDashboardEventReview(id)
      : await showAdminDashboardPlaceReview(id);

    if (!visibleReview) {
      return res.status(404).json({
        ok: false,
        message: "Resena no encontrada",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Resena mostrada exitosamente",
      data: visibleReview,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}
