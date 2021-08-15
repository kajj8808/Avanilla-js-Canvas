const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsPaintRange');
const modeBtn = document.getElementById('jsPaintMode');
const saveBtn = document.getElementById('jsPaintSave');

const INTTIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INTTIAL_COLOR;
ctx.fillStyle = INTTIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const startPainting = () => {
    painting = true;
};

const stopPainting = () => {
    painting = false;
};

const onMouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

const handleColorClick = (event) => {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};

const handleRangeChange = (event) => {
    const lineSize = event.target.value;
    ctx.lineWidth = lineSize;
};

const handleModeClick = (event) => {
    if (filling === true) {
        filling = false;
        modeBtn.innerText = 'fill';
    } else {
        filling = true;
        modeBtn.innerText = 'paint';
    }
};

const handleCanvasClick = () => {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};

const handleCM = (event) => {
    event.preventDefault();
};

const handleSaveClick = () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image
  link.download = "CanvasJS[🎨]";
  link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    /* CM => contextmenu*/
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach((color) =>
    color.addEventListener('click', handleColorClick)
);

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (modeBtn) {
    modeBtn.addEventListener('click', handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click" , handleSaveClick);
}