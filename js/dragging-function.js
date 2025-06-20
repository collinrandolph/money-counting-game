let newX = 0, newY = 0, startX = 0, startY = 0;
const card = document.getElementsByClassName('money');
let zIndexCounter = 100;
card[0].addEventListener('mousedown', mouseDown);


function mouseDown(e){
    startX = e.clientX;
    startY = e. clientY;
    card[0].style.position = 'fixed';
    zIndexCounter += 100;
    card[0].style.zIndex = zIndexCounter;
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

function mouseMove(e){
    newX = startX - e.clientX;
    newY - startY - e.clientY;

    startX =e.clientX;
    startY = e.clientY;

    
    card[0].style.top = startY +'px';
    card[0].style.left = startX +'px';
    
    console.log({newX, newY});
    console.log({startX, startY});

}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}