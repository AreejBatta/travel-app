export function updateImgUI(imgSRC, city){
    const imgElement= document.getElementById('imgC');
    if( imgElement){
        imgElement.innerHTML=    `<img src="${imgSRC}" alt="Image of ${city}" style="max-width:100%; height:auto;">`

    }
}