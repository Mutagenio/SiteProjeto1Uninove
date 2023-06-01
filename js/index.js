const EOS = -1; //< End Of Slide
const MAX_SLIDE_SIZE = 4;

const slideContainerElem = document.getElementById("flex-slide");
const previousBtnElem = document.getElementById("btn-slide-left");
const nextBtnElem = document.getElementById("btn-slide-right");

const slideItems = [];

let index = EOS;
let size = 0;

updateSlideItems();
updateSlide();

previousBtnElem.addEventListener("click", ()=>
{
  if (index === 0)
  {
    return void(0);
  }

  --index;
  updateSlide();
});

nextBtnElem.addEventListener("click", ()=>
{
  if (index + size >= slideItems.length)
  {
    return void(0);
  }

  ++index;
  updateSlide();
});

function updateSlideItems()
{
  slideItems.splice(0);

  for(const estacionamento of estacionamentos)
  {
    const item = createSlideItem(estacionamento);
    slideItems.push(item);
  }
}

function updateSlide()
{
  slideContainerElem.innerHTML = "";

  if(slideItems.length === 0)
  {
    index = EOS;
    size = 0;
    return void(0);
  }

  if (index === EOS)
  {
    index = 0;
  }

  size = 0;
  for(let i = index; size < MAX_SLIDE_SIZE && i < slideItems.length; ++i, ++size)
  {
    slideContainerElem.appendChild(slideItems[i]);
  }
}

function createSlideItem(estacionamento)
{
  const anchorElem = document.createElement("a");
  const containerElem = document.createElement("div");
  const addressElem = document.createElement("p");
  const oneHourElem = document.createElement("p");
  const twoHourElem = document.createElement("p");
  const additionalHourElem = document.createElement("p");
  const imgElem = document.createElement("img");

  anchorElem.href = `page.html?data=${encodeURIComponent(JSON.stringify(estacionamento))}`; 

  containerElem.classList.add("space-preview-flex");

  addressElem.innerHTML = estacionamento.address;
  addressElem.classList.add("space-preview-title");

  oneHourElem.innerHTML = `1 Hora - R$${estacionamento.preco[0]}`;
  oneHourElem.classList.add("space-preview-price");

  twoHourElem.innerHTML = `2 Hora - R$${estacionamento.preco[1]}`;
  twoHourElem.classList.add("space-preview-price");

  additionalHourElem.innerHTML = `Por Hora Adicional - R$${estacionamento.preco[2]}`;
  additionalHourElem.classList.add("space-preview-price");

  imgElem.src = estacionamento.imgPath;
  imgElem.classList.add("space-preview-img");

  anchorElem.appendChild(containerElem);

  containerElem.appendChild(addressElem);
  containerElem.appendChild(oneHourElem);
  containerElem.appendChild(twoHourElem);
  containerElem.appendChild(additionalHourElem);
  containerElem.appendChild(imgElem);

  return anchorElem;
}