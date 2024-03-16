class MemoryGame {
  constructor(images, blank) {
    this.images = images;
    this.blank = blank;
    this.shuffleCards = shuffleCards(this.images.length);
  }
  build(div) {
    div.innerHTML = this.images.length;
    let CardReturned = [[],[]]
    for (let i = 0; i < this.shuffleCards.length; i++){
      let divIMG = document.createElement("div")
      let img = document.createElement("img")
      let imgIndex = this.images[this.shuffleCards[i]];
      let backIMG = this.blank
      img.src = backIMG
      divIMG.appendChild(img)
      divIMG.onclick = function(){
          if (clickonTheSame(img.src) != imgIndex){ // Si la source de l'image qu'on click n'est pas le dos de la carte, ça veut dire qu'elle est retourné
            // On vérifie si on a retourné 1 image 
            if (CardReturned[0].length == 0){
              img.src = imgIndex
              CardReturned[0] = [img, i, imgIndex]
            }
            // On vérifie si on a retourné la 2eme images
            else if (CardReturned[0][1] != i){
              img.src = imgIndex
              CardReturned[1] = [img, i, imgIndex]
            }
            // Si on a retourné les 2 images, alors on vérife si ce sont les mêmes
            if (CardReturned[0].length != 0 && CardReturned[1].length != 0){
              setTimeout(() => {
                if (checkSame(CardReturned) == false){
                    CardReturned[0][0].src = backIMG
                    CardReturned[1][0].src = backIMG
                }
                CardReturned = [[],[]]
              }, 500) 
            }
          }
        }
      div.appendChild(divIMG)
    }
  }
}

const shuffleCards = function(length) {
  let cards = [];
  for(let i = 0; i < length; i++) {
    cards.push(i);
    cards.push(i);
  }
  for(let i = 0; i < cards.length; i++){
    let random = Math.floor((cards.length-1) * Math.random())
    while (i == random){
      random = Math.floor((cards.length-1) * Math.random())
    }
    let firstValue = cards[i]
    cards[i] = cards[random]
    cards[random] = firstValue
  }
  return cards;
};

const checkSame = function(CardReturned){
  if(CardReturned[0][2] == CardReturned[1][2]){
    return true
  }
  return false
}

const clickonTheSame = function(img){
  const imgSRC = img.split('/')
  console.log(img, imgSRC)
  return imgSRC[imgSRC.length - 1]
}