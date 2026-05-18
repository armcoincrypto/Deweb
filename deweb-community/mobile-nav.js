(function () {
  function closeNav(nav) {
    nav.classList.remove("nav-open");
    document.body.classList.remove("nav-menu-open");
    const btn = nav.querySelector(".nav-toggle");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function openNav(nav) {
    nav.classList.add("nav-open");
    document.body.classList.add("nav-menu-open");
    const btn = nav.querySelector(".nav-toggle");
    if (btn) btn.setAttribute("aria-expanded", "true");
  }

  document.querySelectorAll(".navbar").forEach((nav) => {
    const links = nav.querySelector(".nav-links");
    if (!links || nav.querySelector(".nav-toggle")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "nav-toggle";
    btn.setAttribute("aria-label", "Open menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "<span></span><span></span><span></span>";
    nav.insertBefore(btn, links);

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (nav.classList.contains("nav-open")) closeNav(nav);
      else openNav(nav);
    });

    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeNav(nav));
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".navbar.nav-open") || e.target.closest(".nav-toggle")) return;
    document.querySelectorAll(".navbar.nav-open").forEach(closeNav);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".navbar.nav-open").forEach(closeNav);
    }
  });
})();
