class AppSelectEstados extends HTMLElement {
  connectedCallback() {
    this.className = `w-33-100`;
    this.innerHTML = ` <select name="estados" "${this.definirSelectId()}" class="form-control">
        <option value="" selected disabled>Selecione...</option>
        <option value="AC">Acre</option>
        <option value="AL">Alagoas</option>
        <option value="AP">Amapá</option>
        <option value="AM">Amazonas</option>
        <option value="BA">Bahia</option>
        <option value="CE">Ceará</option>
        <option value="DF">Distrito Federal</option>
        <option value="ES">Espírito Santo</option>
        <option value="GO">Goiás</option>
        <option value="MA">Maranhão</option>
        <option value="MT">Mato Grosso</option>
        <option value="MS">Mato Grosso do Sul</option>
        <option value="MG">Minas Gerais</option>
        <option value="PA">Pará</option>
        <option value="PB">Paraíba</option>
        <option value="PR">Paraná</option>
        <option value="PE">Pernambuco</option>
        <option value="PI">Piauí</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="RN">Rio Grande do Norte</option>
        <option value="RS">Rio Grande do Sul</option>
        <option value="RO">Rondônia</option>
        <option value="RR">Roraima</option>
        <option value="SC">Santa Catarina</option>
        <option value="SP">São Paulo</option>
        <option value="SE">Sergipe</option>
        <option value="TO">Tocantins</option>
    </select>`;
    this.addEventListener("change", this.onChange);
  }

  constructor() {
    super();
  }

  definirSelectId() {
    return this.idSelect ? `id="${this.idSelect}` : `id=select-"${this.id}`;
  }

  onChange(e) {
    estado = e.target.value;
  }

  get id() {
    return this.getAttribute("id");
  }

  get idSelect() {
    return this.getAttribute("id-select");
  }
}
customElements.define("app-select-estados", AppSelectEstados);
