export const matchesRoute = (route, location) => {
    if (route instanceof RegExp) {
        return route.test(location.pathname);
    } else {
        return location.pathname === route;
    }
};

export const checkToDisplayHeaderFooter = (routes, location) => {
    return routes.some((route) => matchesRoute(route, location));
};
