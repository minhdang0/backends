const sidebarItems = [
  {
    title: "User",
    icon: "fa-user",
    path: "/users",
  },
  {
    title: "Analytics",
    icon: "fa-chart-bar",
    path: "/analytics",
  },
  {
    title: "Categories",
    icon: "fa-cog",
    path: "/categories",
  },
  {
    title: "Products",
    icon: "fa-cog",
    path: "/products",
  },
  {
    title: "Posts",
    icon: "fa-file-alt",
    path: "/posts",
  },
  {
    title: "Comments",
    icon: "fa-comments",
    path: "/comments",
  },
  {
    title: "Topics",
    icon: "fa-bookmark",
    path: "/topics",
  },
  {
    title: "Settings",
    icon: "fa-cog",
    path: "/settings",
  },
];

function handleSidebar(req, res, next) {
  res.locals.path = req.path;
  res.locals.sidebarItems = sidebarItems;
  next();
}

module.exports = handleSidebar;
