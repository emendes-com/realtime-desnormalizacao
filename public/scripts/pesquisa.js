let db = null;
let cidade = "";
let cidadeEnd = "";
let tipoPesquisa = "equal";
let estado = "";
let total = 20;
let lista = "";
const root = "desnormalizacao/";
const pathCidades = root + "cidades";
const pathCidadeEstado = root + "cidade_estado";
const pathEstadoCidade = root + "estado_cidade";
const pathChaveEstadoCidade = root + "chave_estado_cidade";
const orderChild = "cidade";
const seletorCidade = `input[name="cidade"]`;
const seletorCidadeEnd = "input[name='cidade-end']";
const seletorEstado = "app-select-estados select";
const seletorTipoPesquisa = "input[name=tipo-pesquisa]";
const seletorPesquisar = "button[name='pesquisar']";
const seletorTotal = "input[name=total]";
const seletorNavTabA = "#nav-tab a";
 
$(document).ready(() => {
  firebaseInit();
  inicializarNavTabClickEvents();
});

function firebaseInit() {
  db = firebase.database();
  pesquisarListasExistentes();
}

function inicializarNavTabClickEvents() {
  $(seletorNavTabA).click(e => {
    e.preventDefault();
    const form = e.target.dataset.form;
    cidade = recuperarValorElemento(form, seletorCidade);
    cidadeEnd = recuperarValorElemento(form, seletorCidadeEnd);
    estado = recuperarValorElemento(form, seletorEstado);
    definirTotal(recuperarValorElemento(form, seletorTotal));
    definirTipoPesquisa(recuperarValorElemento(form, seletorTipoPesquisa + ":checked"));
  });
}

function recuperarValorElemento(form, seletor) {
  return $(`form[name="${form}"] ${seletor}`).val();
}

function pesquisarListasExistentes() {
  db.ref(pathCidades).on("value", snap => verficarTab(pathCidades, snap.numChildren()));
  db.ref(pathEstadoCidade).on("value", snap => verficarTab(pathEstadoCidade, snap.numChildren()));
  db.ref(pathCidadeEstado).on("value", snap => verficarTab(pathCidadeEstado, snap.numChildren()));
  db.ref(pathChaveEstadoCidade).on("value", snap =>
    verficarTab(pathChaveEstadoCidade, snap.numChildren())
  );
}

$(seletorCidade).change(event => {
  cidade = event.target.value;
  cidadeEnd = "";
});

$(seletorCidadeEnd).change(event => (cidadeEnd = event.target.value));
$(seletorTipoPesquisa).change(event => definirTipoPesquisa(event.target.value));
$(seletorTotal).change(event => definirTotal(event.target.value));
$(seletorPesquisar).click(event => {
  lista = event.target.dataset.lista;
  limparLista(lista);
  selecionarPesquisa(event.target.dataset.pesquisa);
});

function definirTipoPesquisa(value) {
  tipoPesquisa = value;
  if (tipoPesquisa == "equal" || tipoPesquisa == "start")
    $("#text-cidade-end").prop("disabled", true);
  else $("#text-cidade-end").prop("disabled", false);
}

function definirTotal(value) {
  total = parseInt(value.trim().length === 0 ? 20 : value);
}

function verficarTab(path, total) {
  if (total > 0) {
    const tabId = path.split(root)[1];
    $(`#nav-${tabId}-tab`).show();
  }
}

function selecionarPesquisa(pesquisa) {
  if (pesquisa === "cidade") pesquisarCidade();
  else if (pesquisa === "cidade-estado") pesquisarPorCidadeEstado();
  else if (pesquisa === "estado-cidade") pesquisarPorEstadoCidade();
  else if (pesquisa === "chave-estado-cidade") pesquisarPorChaveEstadoCidade();
}

function pesquisarCidade() {
  if (cidade.trim().length > 0) {
    let refQuery = null;
    if (tipoPesquisa === "equal") {
      refQuery = db
        .ref(pathCidades)
        .orderByChild(orderChild)
        .equalTo(cidade);
    } else if (tipoPesquisa === "start") {
      refQuery = db
        .ref(pathCidades)
        .orderByChild(orderChild)
        .startAt(cidade)
        .limitToFirst(total);
    } else if (tipoPesquisa === "end" && cidadeEnd.trim().length > 0) {
      refQuery = db
        .ref(pathCidades)
        .orderByChild(orderChild)
        .startAt(cidade)
        .endAt(cidadeEnd)
        .limitToFirst(total);
    }
    if (refQuery) {
      let i = 1;
      refQuery.on("value", snap =>
        snap.forEach(child => {
          adicionarNaLista(`${i} - ${child.val().cidade} - ${child.val().sigla}`);
          i++;
        })
      );
    }
  }
}

function pesquisarPorCidadeEstado() {
  if (cidade.trim().length > 0) {
    const query = cidade + "_" + estado;
    let ref;
    if (cidadeEnd.trim().length > 0) {
      const queryEnd = cidadeEnd + "_" + estado;
      ref = db
        .ref(pathCidadeEstado)
        .orderByChild(orderChild)
        .startAt(query)
        .endAt(queryEnd)
        .limitToFirst(total);
      adicionarNaLista("Pesquisa: " + query + " endAt " + queryEnd);
    } else {
      ref = db
        .ref(pathCidadeEstado)
        .orderByChild(orderChild)
        .startAt(query)
        .limitToFirst(total);
      adicionarNaLista("Pesquisa: " + query);
    }
    let i = 1;
    ref.on("value", snap =>
      snap.forEach(child => {
        adicionarNaLista(i + " - " + child.val().cidade);
        i++;
      })
    );
  }
}

function pesquisarPorEstadoCidade() {
  if (cidade.trim().length > 0) {
    const query = estado + "_" + cidade;
    let ref;
    if (cidadeEnd.trim().length > 0) {
      const queryEnd = estado + "_" + cidadeEnd;
      ref = db
        .ref(pathEstadoCidade)
        .orderByChild(orderChild)
        .startAt(query)
        .endAt(queryEnd)
        .limitToFirst(total);
      adicionarNaLista("Pesquisa: " + query + " endAt " + queryEnd);
    } else {
      ref = db
        .ref(pathEstadoCidade)
        .orderByChild(orderChild)
        .startAt(query)
        .limitToFirst(total);
      adicionarNaLista("Pesquisa: " + query);
    }
    let i = 1;
    ref.on("value", snap =>
      snap.forEach(child => {
        adicionarNaLista(i + " - " + child.val().cidade);
        i++;
      })
    );
  }
}

function pesquisarPorChaveEstadoCidade() {
  if (cidade.trim().length > 0) {
    let ref;
    if (cidadeEnd.trim().length > 0) {
      ref = db
        .ref(pathChaveEstadoCidade)
        .child(estado)
        .orderByChild(orderChild)
        .startAt(cidade)
        .endAt(cidadeEnd)
        .limitToFirst(total);
      adicionarNaLista("Pesquisa: " + estado + " " + cidade + " andAt " + estado + " " + cidadeEnd);
    } else {
      ref = db
        .ref(pathChaveEstadoCidade)
        .child(estado)
        .orderByChild(orderChild)
        .startAt(cidade)
        .limitToFirst(total);
      adicionarNaLista("Pesquisa: " + estado + " " + cidade);
    }
    let i = 1;
    ref.on("value", snap =>
      snap.forEach(child => {
        adicionarNaLista(i + " - " + child.val().cidade, child.key);
        i++;
      })
    );
  }
}
function adicionarNaLista(text, title = "") {
  $(lista).append(`<li class="list-group-item" title="${title}">${text}</li>`);
}

function limparLista(lista) {
  $(lista).empty();
}
