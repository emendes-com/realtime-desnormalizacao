const nav = `
<nav class="navbar navbar-light bg-dark text-light mb-4">
  <a class="navbar-brand text-light" href="#">
    <img src="/assets/imagens/logoevelyn.svg" width="30" height="30" class="d-inline-block align-top" alt=""/>
    ${titulo}
  </a>
  <span class="my-2">
    <a class="btn btn-outline-light  btn-sm" href="/" role="button">Scripts</a>
    <a class="btn btn-outline-light  btn-sm" href="/pesquisa" role="button">Pesquisas</a >
    <a class="btn btn-outline-light  btn-sm" href="/sql" role="button">SQL</a>
    <a class="btn btn-outline-light  btn-sm" href="/json" role="button">JSON</a>

  </span>
  </nav>`;

 
$("body").prepend(nav);
const items = ` <option value="AC">Acre</option>
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
<option value="TO">Tocantins</option>`;

$("select[name=estados]").append(items);
