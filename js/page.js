const coreContainerElem = document.getElementById("core-main");
const imgElem = document.getElementById("img");
const addressElem = document.getElementById("address");
const servicosElem = document.getElementById("servicos");
const oneHourElem = document.getElementById("one-hour");
const twoHourElem = document.getElementById("two-hour");
const addHourElem = document.getElementById("add-hour");
const vagasElem = document.getElementById("vagas");
const descriptionTextElem = document.getElementById("description-text");
const mapAnchorElem = document.getElementById("map-a");

const params = new URLSearchParams(window.location.search);
const estacionamento = JSON.parse(params.get("data"));

const nomeElem = document.getElementById("name");
const placaElem = document.getElementById("placa-carro");
const modelElem = document.getElementById("car-model");
const documentElem = document.getElementById("document");
const valorElem = document.getElementById("valor");
const aluguelDateElem = document.getElementById("data");

initLayout();

document.getElementById("print").addEventListener("click", ()=>
{

  if (!valorElem.innerHTML)
  {
    return;
  }
  printPage("http://127.0.0.1:5500/comprovante.html");
});

document.getElementById("horas").addEventListener("input", (event)=>
{
  const target = event.target;
  const horas = Number(target.value);

  if (horas === 1)
  {
    valorElem.innerHTML = `R$ ${estacionamento.preco[0]}`;
  }
  else if (horas === 2)
  {
    valorElem.innerHTML = `R$ ${estacionamento.preco[1]}`;
  }
  else
  {
    valorElem.innerHTML = `R$ ${estacionamento.preco[1] + (horas - 2) * estacionamento.preco[2]}`;
  }
});

function initLayout()
{
  imgElem.src = estacionamento.imgPath;
  addressElem.innerHTML = estacionamento.address;
  servicosElem.innerHTML = `Serviços Oferecidos: ${estacionamento.servicos.toString()}`;
  oneHourElem.innerHTML = `1 Hora - R$${estacionamento.preco[0]}`;
  twoHourElem.innerHTML = `2 Hora - R$${estacionamento.preco[1]}`;
  addHourElem.innerHTML = `Por Hora Adicional - R$${estacionamento.preco[2]}`;
  vagasElem.innerHTML = `${estacionamento.vagasOcupadas}/${estacionamento.vagasMax} Ocupadas`;
  descriptionTextElem.innerHTML = estacionamento.descricao;
  mapAnchorElem.href = `https://maps.google.com/?q=${encodeURIComponent(estacionamento.address)}`;
}

//< snipppet from <<https://developer.mozilla.org/en-US/docs/Web/Guide/Printing>> (2023)
function closePrint() {
  document.body.removeChild(this.__container__);
}

//< snipppet from <<https://developer.mozilla.org/en-US/docs/Web/Guide/Printing>> (2023)
function setPrint() {
  this.contentWindow.__container__ = this;
  this.contentWindow.onbeforeunload = closePrint;
  this.contentWindow.onafterprint = closePrint;

  const frameDocument = this.contentWindow.document;

  const frameEnderecoElem = frameDocument.querySelector(".endereco");
  const framePlacaElem = frameDocument.querySelector(".placa");
  const frameModeloElem = frameDocument.querySelector(".modelo");
  const frameCodBarrasElem = frameDocument.querySelector(".codigo-barras");
  const frameAluguelDateElem = frameDocument.querySelector(".aluguel-date");
  const frameDateElem = frameDocument.querySelector(".date");
  const frameValorElem = frameDocument.querySelector(".valor");
  const frameDocumentElem = frameDocument.querySelector("#bot");

  frameEnderecoElem.innerHTML = `Estacionamento: ${estacionamento.address}`;
  framePlacaElem.innerHTML = `Placa do carro: ${placaElem.value}`;
  frameModeloElem.innerHTML = `Modelo do carro: ${modelElem.value}`;
  frameAluguelDateElem.innerHTML = aluguelDateElem.value;
  frameDateElem.innerHTML = Date();
  frameValorElem.innerHTML = valorElem.innerHTML;
  frameDocumentElem.innerHTML = `Documento: ${documentElem.value}`;

  this.contentWindow.focus(); // Required for IE
  this.contentWindow.print();
}

//< snipppet from <<https://developer.mozilla.org/en-US/docs/Web/Guide/Printing>> (2023)
function printPage(sURL) {
  const hideFrame = document.createElement("iframe");
  hideFrame.onload = setPrint;
  hideFrame.style.position = "fixed";
  hideFrame.style.right = "0";
  hideFrame.style.bottom = "0";
  hideFrame.style.width = "0";
  hideFrame.style.height = "0";
  hideFrame.style.border = "0";
  hideFrame.src = sURL;
  document.body.appendChild(hideFrame);
}