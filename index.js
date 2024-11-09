const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const colors = ["#FFD966", "#2B78E4", "#CC0000", "#6AA84F"];

const circleRadius = 27;
const circleSpacing = 67;

const arrowSize = 20
const arrowSpeed = 2.5;
const arrowDistance = 450;

const arrowPositions = [];
const arrowTargets = [];

const touchedCircle = [false, false, false, false];


for (let i = 0; i < colors.length; i++) {
    const x = 50;
    const y = 50 + i * circleSpacing;
    const arrowX = x + arrowDistance;
    const arrowY = y;
    arrowPositions.push({ x: arrowX, y: arrowY });
    arrowTargets.push({ x: arrowX, y: arrowY });
}


canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    for (let i = 0; i < colors.length; i++) {
        const arrow = arrowPositions[i];
        if (
            mouseX >= arrow.x - arrowSize &&
            mouseX <= arrow.x + arrowSize &&
            mouseY >= arrow.y - arrowSize &&
            mouseY <= arrow.y + arrowSize
        ) {
            arrowTargets[i] = {
                x: 50,
                y: 50 + i * circleSpacing
            };
            break;
        }
    }
});
const updateArrows = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < colors.length; i++) {
        const arrow = arrowPositions[i];
        const target = arrowTargets[i];

        const dx = target.x - arrow.x;
        const dy = target.y - arrow.y;

        if (Math.abs(dx) > arrowSpeed) {
            arrow.x += Math.sign(dx) * arrowSpeed;
        } else {
            arrow.x = target.x;
        }

        if (Math.abs(dy) > arrowSpeed) {
            arrow.y += Math.sign(dy) * arrowSpeed;
        } else {
            arrow.y = target.y;
        }
        ctx.beginPath();
        ctx.moveTo(arrow.x, arrow.y);
        ctx.lineTo(arrow.x + arrowSize, arrow.y);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(arrow.x + arrowSize / 2, arrow.y + arrowSize / 2);
        ctx.lineTo(arrow.x + arrowSize / 2, arrow.y - arrowSize / 2);
        ctx.lineTo(arrow.x, arrow.y);
        ctx.fillStyle = "black";
        ctx.fill();
    }

    for (let i = 0; i < colors.length; i++) {
        const x = 50;
        const y = 50 + i * circleSpacing;

        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.stroke();

        if (touchedCircle[i]) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = colors[i];
        }

        ctx.fill();
    }


    for (let i = 0; i < colors.length; i++) {
        const arrow = arrowPositions[i];
        const circle = { x: 50, y: 50 + i * circleSpacing };

        const dx = arrow.x - circle.x;
        const dy = arrow.y - circle.y;

        const distance = dx + dy;

        if (distance <= arrowSize) {
            touchedCircle[i] = true;
        }
    }
    requestAnimationFrame(updateArrows);
}

const drawCircles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circleColors.length; i++) {
        const x = 50;
        const y = 50 + i * circleSpacing;

        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);

        if (circleTouched[i]) {
            ctx.fillStyle = "gray";
        } else {
            ctx.fillStyle = circleColors[i];
        }

        ctx.fill();
    }
}

updateArrows();
const reset = document.getElementById("resetBtn")

reset.addEventListener("click", (e) => {
    window.location.reload()
})