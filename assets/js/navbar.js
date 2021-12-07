document.addEventListener("click", function (e) {
  var classes = e.target.classList;
  if (
    classes.contains("menu-toggle") ||
    classes.contains("fa-bars") ||
    classes.contains("fa-times") ||
    classes.contains("navbar")
  )
    return;

  var menuToggle = document.querySelector(".menu-toggle");
  var sidebar = document.querySelector("#sidebar-wrapper");

  if (sidebar.classList.contains("active")) {
    sidebar.classList.toggle("active");
    menuToggle.classList.toggle("active");

    var icon = menuToggle.querySelector(".fa-bars, .fa-times");

    if (icon) {
      if (icon.classList.contains("fa-times")) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      } else if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      }
    }
  }
});
