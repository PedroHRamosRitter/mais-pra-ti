class NewsCard extends HTMLElement {
  connectedCallback() {
    const categoria = this.getAttribute('categoria') || '';
    const titulo    = this.getAttribute('titulo')    || '';
    const resumo    = this.getAttribute('resumo')    || '';

    this.innerHTML = `
      <article class="cartao">
        <span class="categoria">${categoria}</span>
        <h3 class="cartao__titulo">${titulo}</h3>
        ${resumo ? `<p class="cartao__resumo">${resumo}</p>` : ''}
      </article>
    `;
  }
}
customElements.define('news-card', NewsCard);