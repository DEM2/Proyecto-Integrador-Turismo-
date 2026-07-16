import {
  countAdminDashboardEvents,
  countAdminDashboardPendingOrganizers,
  countAdminDashboardPlaces,
  countAdminDashboardReviews,
  countAdminDashboardUsers,
  getAdminDashboardPendingOrganizers,
  getAdminDashboardRecentReviews,
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
