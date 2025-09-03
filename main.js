// f(x) = x^2 + 10
function f(x) {
    return x * x + 10;
}

// f'(x) = 2x
function df(x) {
    return 2 * x;
}

const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('x0');
const x0Value = document.getElementById('x0-value');

const width = canvas.width;
const height = canvas.height;

// Graph settings
const xMin = -10;
const xMax = 10;
const yMin = -10;
const yMax = 110;

function xToCanvas(x) {
    return ((x - xMin) / (xMax - xMin)) * width;
}

function yToCanvas(y) {
    return height - ((y - yMin) / (yMax - yMin)) * height;
}

function drawAxes() {
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, yToCanvas(0));
    ctx.lineTo(width, yToCanvas(0));
    ctx.stroke();
    // y-axis
    ctx.beginPath();
    ctx.moveTo(xToCanvas(0), 0);
    ctx.lineTo(xToCanvas(0), height);
    ctx.stroke();
}

function drawFunction() {
    ctx.strokeStyle = '#0074D9';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px <= width; px++) {
        let x = xMin + (px / width) * (xMax - xMin);
        let y = f(x);
        let py = yToCanvas(y);
        if (px === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.stroke();
}

function drawTangent(x0) {
    const y0 = f(x0);
    const slope = df(x0);
    // Tangent line: y = slope * (x - x0) + y0
    ctx.strokeStyle = '#FF4136';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Draw tangent from xMin to xMax
    let tx1 = xMin;
    let ty1 = slope * (tx1 - x0) + y0;
    let tx2 = xMax;
    let ty2 = slope * (tx2 - x0) + y0;
    ctx.moveTo(xToCanvas(tx1), yToCanvas(ty1));
    ctx.lineTo(xToCanvas(tx2), yToCanvas(ty2));
    ctx.stroke();

    // Draw point (x0, f(x0))
    ctx.fillStyle = '#2ECC40';
    ctx.beginPath();
    ctx.arc(xToCanvas(x0), yToCanvas(y0), 6, 0, 2 * Math.PI);
    ctx.fill();

    // Draw label for the point
    ctx.font = '16px Arial';
    ctx.fillStyle = '#222';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    const labelX = xToCanvas(x0) + 10;
    const labelY = yToCanvas(y0) - 10;
    ctx.fillText(`(${x0.toFixed(2)}, ${y0.toFixed(2)})`, labelX, labelY);

    // Draw slope label
    ctx.font = '15px Arial';
    ctx.fillStyle = '#FF4136';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Slope: ${slope.toFixed(2)}`, labelX, labelY + 5);
}

function draw(x0) {
    ctx.clearRect(0, 0, width, height);
    drawAxes();
    drawFunction();
    drawTangent(x0);
}

slider.addEventListener('input', function() {
    const x0 = parseFloat(slider.value);
    x0Value.textContent = x0;
    draw(x0);
});

// Initial draw
x0Value.textContent = slider.value;
draw(parseFloat(slider.value));
