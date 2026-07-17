import {
  countAdminDashboardEvents,
  countAdminDashboardPendingOrganizers,
  countAdminDashboardPlaces,
  countAdminDashboardReviews,
  countAdminDashboardUsers,
  getAdminDashboardPendingOrganizers,
  getAdminDashboardRecentReviews,
  hideAdminDashboardEventReview,
  hideAdminDashboardPlaceReview,
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
