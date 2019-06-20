class AppNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<nav class="navbar navbar-light bg-dark text-light mb-4">
        <a class="navbar-brand text-light" href="#">
          <img src="/assets/imagens/logoevelyn.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
${this.titulo}
        </a>
        <span class="my-2">
          <a class="btn btn-outline-light  btn-sm" href="/" role="button">Scripts</a>
          <a class="btn btn-outline-light  btn-sm" href="/pesquisa" role="button">Pesquisas</a>
          <a class="btn btn-outline-light  btn-sm" href="/sql" role="button">SQL</a>
          <a class="btn btn-outline-light  btn-sm" href="/json" role="button">JSON</a>
        </span>
      </nav>`;
  }

  get titulo() {
    return this.getAttribute("titulo");
  }
}
customElements.define("app-nav", AppNav);
