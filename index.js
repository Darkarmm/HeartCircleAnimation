document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    const heartImg = new Image();
    heartImg.src = "https://i.imgur.com/RAA7VLR.png";

    const hearts = [];
    const maxHearts = 100;
    const heartSpeed = 1;

    function update() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < hearts.length; i++) {
            const heart = hearts[i];
            heart.y += heart.speed;
            heart.rotation += heart.rotationSpeed;

            if (heart.y > height) {
                hearts.splice(i, 1);
                i--;
                continue;
            }

            ctx.save();
            ctx.translate(heart.x + heart.size / 2, heart.y + heart.size / 2);
            ctx.rotate(heart.rotation);
            ctx.drawImage(heartImg, -heart.size / 2, -heart.size / 2, heart.size, heart.size);
            ctx.restore();
        }

        requestAnimationFrame(update);
    }

    function createHeart(x, y) {
        if (hearts.length < maxHearts) {
            hearts.push({
                x: x,
                y: y,
                size: Math.random() * 20 + 10,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: Math.random() * 0.03 - 0.015,
                speed: heartSpeed + Math.random() * 0.5
            });
        }
    }

    canvas.addEventListener("mousemove", function (e) {
        createHeart(e.clientX, e.clientY);
    });

    update();
});
