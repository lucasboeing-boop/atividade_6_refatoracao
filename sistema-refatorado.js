// Gerenciador de playlist de músicas

var playlist = [];
var duracaoTotalCache = 0;
var controleAuxiliar = false;
var relatorioTexto = "";

// Converte minutos e segundos em total de segundos.
function converterParaSegundos(minutos, segundos) {
  var totalSegundos = minutos * 60 + segundos;
  return totalSegundos;
}

// Converte segundos para formato mm:ss.
function formatarDuracao(segundosTotais) {
  var minutos = Math.floor(segundosTotais / 60);
  var segundos = segundosTotais % 60;

  if (segundos < 10) {
    return minutos + ":0" + segundos;
  }

  return minutos + ":" + segundos;
}

// Busca uma música pelo nome.
function buscarMusicaPorNome(lista, nomeBuscado) {
  var resultado = null;

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].nome == nomeBuscado) {
      resultado = lista[i];
    }
  }

  return resultado;
}

// Valida se o volume está dentro do intervalo permitido.
function validarVolume(volume) {
  if (volume == null) return false;
  if (typeof volume !== "number") return false;
  if (volume < 0) return false;
  if (volume > 100) return false;

  return true;
}

// Calcula a duração total da playlist.
function calcularDuracaoTotal(lista) {
  var total = 0;

  for (var i = 0; i < lista.length; i++) {
    total = total + lista[i].duracao;
  }

  duracaoTotalCache = total;
  return total;
}

// Alterna o status de favorita de uma música.
function alternarFavorita(indice) {
  if (indice >= 0 && indice < playlist.length) {
    if (playlist[indice].fav == false) {
      playlist[indice].fav = true;
    } else {
      playlist[indice].fav = false;
    }
  }
}

// Filtra músicas por propriedade (artista ou gênero).
function filtrarPorPropriedade(lista, valor, propriedade) {
  var resultado = [];

  for (var i = 0; i < lista.length; i++) {
    if (lista[i][propriedade] == valor) {
      resultado.push(lista[i]);
    }
  }

  return resultado;
}

// Conta quantas músicas são favoritas.
function contarFavoritas(lista) {
  var contador = 0;

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].fav == true) {
      contador = contador + 1;
    }
  }

  return contador;
}

// Retorna uma cópia ordenada da playlist por nome.
function ordenarPorNome(lista) {
  var copia = lista.slice();

  copia.sort(function (a, b) {
    if (a.nome < b.nome) return -1;
    if (a.nome > b.nome) return 1;
    return 0;
  });

  return copia;
}

// Troca a posição de duas músicas na lista.
function trocarPosicoes(lista, pos1, pos2) {
  if (pos1 < 0 || pos1 >= lista.length) return;
  if (pos2 < 0 || pos2 >= lista.length) return;

  var temp = lista[pos1];
  lista[pos1] = lista[pos2];
  lista[pos2] = temp;
}

// Filtra músicas com duração menor ou igual ao limite.
function filtrarPorDuracaoMaxima(lista, duracaoMaxima) {
  var resultado = [];

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].duracao <= duracaoMaxima) {
      resultado.push(lista[i]);
    }
  }

  return resultado;
}

// Adiciona uma nova música à playlist.
function add(nome, artista, genero, minutos, segundos) {
  var musica = {};

  musica.nome = nome;
  musica.artista = artista;
  musica.genero = genero;
  musica.duracao = converterParaSegundos(minutos, segundos);
  musica.fav = false;

  playlist.push(musica);
}

// Exibe todas as músicas na interface.
function mostra() {
  for (var i = 0; i < playlist.length; i++) {
    var elemento = document.getElementById("musica" + i);

    if (elemento) {
      elemento.innerHTML =
        playlist[i].nome +
        " - " +
        playlist[i].artista +
        " (" +
        formatarDuracao(playlist[i].duracao) +
        ")";
    }
  }
}

// Gera um relatório completo da playlist.
function rel() {
  var texto = "";

  texto = texto + "=== RELATORIO DA PLAYLIST ===\n";
  texto = texto + "Total de musicas: " + playlist.length + "\n";
  texto = texto + "Favoritas: " + contarFavoritas(playlist) + "\n";
  texto =
    texto +
    "Duracao total: " +
    formatarDuracao(calcularDuracaoTotal(playlist)) +
    "\n";
  texto = texto + "\n";

  for (var i = 0; i < playlist.length; i++) {
    var favorito = "";

    if (playlist[i].fav == true) {
      favorito = " [FAVORITA]";
    }

    texto =
      texto +
      (i + 1) +
      ". " +
      playlist[i].nome +
      " - " +
      playlist[i].artista +
      " (" +
      formatarDuracao(playlist[i].duracao) +
      ")" +
      favorito +
      "\n";
  }

  relatorioTexto = texto;
  console.log(texto);
  return texto;
}
