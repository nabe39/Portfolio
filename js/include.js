document.addEventListener("DOMContentLoaded", () => {
  includeHTML();
});

function includeHTML() {
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(async (el) => {
    const file = el.getAttribute("data-include");
    if (file) {
      try {
        const res = await fetch(file);
        if (res.ok) {
          const html = await res.text();
          el.innerHTML = html;
          el.removeAttribute("data-include"); // tránh lặp vô hạn
          includeHTML(); // gọi lại để xử lý các include bên trong
        } else {
          el.innerHTML = `<p>Include error: ${file}</p>`;
        }
      } catch (err) {
        el.innerHTML = `<p>Include failed: ${file}</p>`;
      }
    }
  });
}
