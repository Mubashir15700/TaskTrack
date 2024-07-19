// List of user routes where Header and Footer should be displayed
export const userRoutesToCheck = [
    "/",
    "/about",
    "/contact",
    "/jobs",
    /^\/jobs\/[\w-]+?$/,
    "/jobs/listed-jobs",
    /^\/jobs\/listed-jobs\/[\w-]+?$/,
    "/jobs/works-history",
    "/laborers",
    /^\/laborers\/[\w-]+?$/,
    "/laborer-profile",
    "/become-laborer-form",
    "/account",
    "/profile",
    "/manage-subscription",
    "/notifications",
    /^\/notifications\/[\w-]+?$/,
    "/chats",
    /^\/chat\/[\w-]+\/[\w-]+$/
];

// List of admin routes where Header and Footer should be displayed
export const adminRoutesToCheck = [
    "/admin",
    "/admin/",
    "/admin/users",
    /^\/admin\/users\/[\w-]+\/?$/,
    "/admin/laborer-requests",
    /^\/admin\/laborer-requests\/view-request-details\/[\w-]+\/?$/,
    "/admin/subscription-plans",
    "/admin/subscription-plans/add-plan",
    /^\/admin\/subscription-plans\/edit-plan\/([\w-]+)\/?$/,
    "/admin/subscriptions",
    "/admin/banners",
    "/admin/banners/add-banner",
    /^\/admin\/banners\/edit-banner\/[\w-]+?$/,
    "/admin/notifications",
    /^\/admin\/notifications\/[\w-]+?$/,
];

export const matchesRoute = (route, location) => {
    if (route instanceof RegExp) {
        return route.test(location.pathname);
    } else {
        return location.pathname === route;
    }
};

export const checkToDisplayHeaderFooter = (userRole, location) => {
    if (userRole === "admin") {
        return adminRoutesToCheck.some((route) => matchesRoute(route, location));
    }
    return userRoutesToCheck.some((route) => matchesRoute(route, location));
};
