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

imgElem.src = estacionamento.imgPath;
addressElem.innerHTML = estacionamento.address;
servicosElem.innerHTML = `Serviços Oferecidos: ${estacionamento.servicos.toString()}`;
oneHourElem.innerHTML = `1 Hora - R$${estacionamento.preco[0]}`;
twoHourElem.innerHTML = `2 Hora - R$${estacionamento.preco[1]}`;
addHourElem.innerHTML = `Por Hora Adicional - R$${estacionamento.preco[2]}`;
vagasElem.innerHTML = `${estacionamento.vagasOcupadas}/${estacionamento.vagasMax} Ocupadas`;
descriptionTextElem.innerHTML = estacionamento.descricao;
mapAnchorElem.href = `https://maps.google.com/?q=${encodeURIComponent(estacionamento.address)}`;


document.getElementById("print").addEventListener("click", ()=>
{
  printPage("http://127.0.0.1:5500/comprovante.html");
});

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

  const enderecoElem = frameDocument.querySelector(".endereco");
  const placaElem = frameDocument.querySelector(".placa");
  const modeloElem = frameDocument.querySelector(".modelo");
  const codBarrasElem = frameDocument.querySelector(".codigo-barras");
  const dateElem = frameDocument.querySelector(".date");
  const valorElem = frameDocument.querySelector(".valor");

  enderecoElem.innerHTML = estacionamento.address;
  dateElem.innerHTML = Date();

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