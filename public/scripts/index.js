let db = null;
let cidadesRef = null;
const root = "desnormalizacao";

$(document).ready(() => firebaseInit());
$("#button-estados").click(() => desnormalizarEstados());
$("#button-estados-cidades").click(() => desnormalizarEstadosCidades());
$("#button-cidades_estados").click(() => desnormalizarCidadesEstados());
$("#button-estados-cidades-chave").click(() => desnormalizarEstadosCidadesPorChave());

function firebaseInit() {
  db = firebase.database();
  cidadesRef = db.ref(root + "/cidades");
}

function desnormalizarEstados() {
  limparAdicionarMsg();
  cidadesRef.once("value", snapCidades => {
    if (snapCidades.numChildren() === 0) {
      const estadosRef = db.ref(root + "/estados");
      estadosRef.once("value", snapshot => {
        snapshot.forEach(child => {
          adicionarNaLista(child.val().nome);
          child.val().cidades.forEach(cidade => {
            cidadesRef.push({
              cidade: cidade,
              estado: child.val().nome,
              sigla: child.val().sigla
            });
          });
          adicionarNaLista("Finalizado");
        });
      });
    } else {
      limparAdicionarMsg("Lista já realizada");
    }
  });
}

function desnormalizarEstadosCidades() {
  limparAdicionarMsg();
  const estadoCidadeRef = db.ref(root + "/estado_cidade");
  estadoCidadeRef.once("value", snapEstadoCidade => {
    if (snapEstadoCidade.numChildren() === 0) {
      cidadesRef.once("value", snapshot => {
        snapshot.forEach(child => {
          estadoCidadeRef.child(child.key).set({
            cidade: `${child.val().sigla}_${child.val().cidade}`
          });
        });
        adicionarNaLista("Finalizado");
      });
    } else {
      limparAdicionarMsg("Lista já realizada");
    }
  });
}

function desnormalizarCidadesEstados() {
  limparAdicionarMsg();
  const cidadeEstadoRef = db.ref(root + "/cidade_estado");
  cidadeEstadoRef.once("value", snapCidadeEstado => {
    if (snapCidadeEstado.numChildren() === 0) {
      cidadesRef.once("value", snapshot => {
        snapshot.forEach(child => {
          cidadeEstadoRef.child(child.key).set({
            cidade: `${child.val().cidade}_${child.val().sigla}`
          });
        });
        adicionarNaLista("Finalizado");
      });
    } else {
      limparAdicionarMsg("Lista já realizada");
    }
  });
}

function desnormalizarEstadosCidadesPorChave() {
  limparAdicionarMsg();
  const ChaveEstadoCidadeRef = db.ref(root + "/chave_estado_cidade");
  ChaveEstadoCidadeRef.once("value", snapChaveEstadoCidade => {
    if (snapChaveEstadoCidade.numChildren() === 0) {
      cidadesRef.once("value", snapshot => {
        snapshot.forEach(child => {
          ChaveEstadoCidadeRef.child(child.val().sigla)
            .child(child.key)
            .set({
              cidade: child.val().cidade
            });
        });
        adicionarNaLista("Finalizado");
      });
    } else {
      limparAdicionarMsg("Lista já realizada");
    }
  });
}

function limparAdicionarMsg(msg = "Iniciando") {
  $("#lista").empty();
  adicionarNaLista(msg);
}

function adicionarNaLista(msg) {
  $("#lista").append(`<li class="list-group-item">${msg}</li>`);
}
