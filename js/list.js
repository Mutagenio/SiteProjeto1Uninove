const coreContainer = document.getElementById("core-main");

for(const estacionamento of estacionamentos)
{
  const estacionamentoElem = createItemContainer(estacionamento);
  coreContainer.appendChild(estacionamentoElem);
}

function createItemContainer(estacionamento)
{
  const flexContainer1 = document.createElement("div");
  const imgElem = document.createElement("img");
  const flexContainer2 = document.createElement("div");

  flexContainer1.classList.add("flex-container-1");
  flexContainer1.appendChild(imgElem);
  flexContainer1.appendChild(flexContainer2);

  imgElem.src = estacionamento.imgPath;
  flexContainer2.classList.add("flex-container-2");

  const addressElem = document.createElement("p");
  const flexContainer21 = document.createElement("div");

  flexContainer2.appendChild(addressElem);
  flexContainer2.appendChild(flexContainer21);

  addressElem.innerHTML = estacionamento.address;
  flexContainer21.classList.add("flex-container-2-1");

  const flexContainer211 = document.createElement("div");
  const flexContainer212 = document.createElement("div");

  flexContainer21.appendChild(flexContainer211);
  flexContainer21.appendChild(flexContainer212);

  flexContainer211.classList.add("flex-container-2-1-1");
  flexContainer212.classList.add("flex-container-2-1-2");

  const oneHourElem = document.createElement("p");
  const twoHourElem = document.createElement("p");
  const additionalHourElem = document.createElement("p");
  const alugarBtnElem = document.createElement("a");

  flexContainer211.appendChild(oneHourElem);
  flexContainer211.appendChild(twoHourElem);
  flexContainer211.appendChild(additionalHourElem);
  flexContainer211.appendChild(alugarBtnElem);

  oneHourElem.innerHTML = `1 Hora - R$${estacionamento.preco[0]}`;
  twoHourElem.innerHTML = `2 Hora - R$${estacionamento.preco[1]}`;
  additionalHourElem.innerHTML = `Por Hora Adicional - R$${estacionamento.preco[2]}`;
  alugarBtnElem.innerHTML = "Alugar";
  alugarBtnElem.classList.add("btn-alugar");
  alugarBtnElem.href = `page.html?data=${encodeURIComponent(JSON.stringify(estacionamento))}`; 

  const servicesTextElem = document.createElement("p");
  
  flexContainer212.appendChild(servicesTextElem);

  servicesTextElem.innerHTML = "Serviços fornecidos";

  for(const service of estacionamento.servicos)
  {
    const servicesContainer = document.createElement("div");
    const serviceType = document.createElement("p");
    serviceType.innerHTML = service;

    flexContainer212.appendChild(serviceType);
  }

  return flexContainer1;
}