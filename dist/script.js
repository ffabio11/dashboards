/*function allowDrop(ev) {
	ev.preventDefault(); 
  }
  function dragStart(ev) {
	ev.dataTransfer.setData("text/plain", ev.target.id);
  }
  function dropIt(ev) {
	ev.preventDefault(); 
	let sourceId = ev.dataTransfer.getData("text/plain");
	let sourceIdEl=document.getElementById(sourceId);
	let sourceIdParentEl=sourceIdEl.parentElement;
	let targetEl=document.getElementById(ev.target.id)
	let targetParentEl=targetEl.parentElement;
  
	if (targetParentEl.id!==sourceIdParentEl.id){
		if (targetEl.className === sourceIdEl.className ){
		   targetParentEl.appendChild(sourceIdEl);
		 
		}else{
			 targetEl.appendChild(sourceIdEl);
		   
		}
	   
	}else{
		let holder=targetEl;
		let holderText=holder.textContent;
		targetEl.textContent=sourceIdEl.textContent;
		sourceIdEl.textContent=holderText;
		holderText='';
}
	
  };
  const dbTasks = XMLHttpRequest();

  req.open('GET', 'prisma/database.db');

*/

"use strict";

var srcElem

async function getDashboard() {
	const response = await fetch("http://localhost:8000/app/dashboards");
	const dashboards = await response.json();
	console.log(dashboards);
	const bucketContainer = document.getElementById("dashboard-container");

	dashboards.forEach(({ id, name, contents }) => {
		const onClickHandler = function (event) {
			console.log("Paolo");
		};
		const newBucket = createBucket(name);
		
		//cardsContainer.ondrop = handleDropEvent
			const cardsContainer = newBucket.querySelector(".cards");
			cardsContainer.addEventListener('drop', (e) => {
				console.log(e.target)
				console.log('src', srcElem)
			});
			cardsContainer.addEventListener("dragover", event => {
				// prevent default to allow drop
			event.preventDefault();
		  });

			contents.forEach((card) => {
			const newCard = createCard(card.text);
		
			
			cardsContainer.appendChild(newCard);

			//carta deve conoscere id univoco
			//captare evento di drag
			//captare drop
			//usare id negli eventi

		});
		bucketContainer.append(newBucket);
	});
}

window.addEventListener("load", getDashboard);

function createCard(cardTitle, isDraggable = true, htmlTag = "div", onDragStart = handleDragStart, onDragEnd = handleDragEnd) {

	//creo un nodo che ospiterà la mia carta
	const newCard = document.createElement(htmlTag);
	//creo il titolo della carta in un nodo di testo e lo aggiungo alla carta
	const title = document.createTextNode(cardTitle)
	newCard.appendChild(title)
	//Attachment degli handler per supporto drag and drop
	newCard.ondragstart = function(e){
		srcElem = this
		
	}
	newCard.ondragend = onDragEnd;
	newCard.setAttribute('draggable', isDraggable)
	//aggiungo la clase di stile alla card
	newCard.classList.add("card");

	return newCard;
}

function createBucket(name, htmlTag = 'div', titleClassName = 'title', bucketClassName = 'bucket', bucketCardsClassName = 'cards') {
	const newBucket = document.createElement(htmlTag);
	newBucket.classList.add(bucketClassName);

	const title = document.createTextNode(name);
	const titleContainer = document.createElement(htmlTag);
	titleContainer.appendChild(title);
	//agiungo classe all'elemento titolo del container e ad al bucket creato
	titleContainer.classList.add(titleClassName);

	
	
//creo un elemento 'div' all'interno del container e vi aggiungo una classe
	const newCardsContainer = document.createElement(htmlTag);
	newCardsContainer.classList.add(bucketCardsClassName);

//creo un bottone e vi aggiungo una classe
	const addButton = document.createElement('button');
	addButton.classList.add('add-button');
//di seguito la funzione per il click del bottone appena creato
	addButton.onclick = async () => {
		const title = "";
		//salvo i dati della mia card appena creata nel DB
		const response = await axios.post(`/app/${id}`, { text: title })
		//aggiungo la carta al container delle carte (che è nel bucket)
		newCardsContainer.appendChild(createCard(title));
	}

	//aggiungo il testo al bottone e lo appendo al bottone creato precedentemente
	const buttonText = document.createTextNode("Add card");
	addButton.appendChild(buttonText);

//appendo il bottone al bucket
	newBucket.appendChild(titleContainer);
	newBucket.appendChild(newCardsContainer);
	newBucket.appendChild(addButton);

	return newBucket;

}

//const parentElement = document.querySelector('.bucket');
  
  //allChildren.forEach(item => item.classList.add("red"));

//PROBLEMA: LE CARD DEVONO ESSERE NEL DIV .CARDS
//individuare div .cards V
//prendere div.cards del nostro bucket PROBLEM KING
//posizionamento cards V
//

//PRENDERE DIV.CARDS del nostro bucket
//1- div.cards?
	//child di buckets, è un div, è un container, è un elemento di un htmlCollection (nodo), ha la classe 'cards'
//2- Buckets?
	//parent di div.cards, container, div, nodo html, ha classe 'bucket'
//3- nostro bucket V perché è nel nostro ciclo forEach

