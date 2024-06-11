const Form = document.querySelector("form");


Form.addEventListener("submit", (e) => {
  e.preventDefault();

  const comment = new FormData(Form);
  const reqBody = Object.fromEntries(comment);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  }).then(() => {
    window.location.href = "/";
  });
});