// var secretKey = "123456789";

function logar() {
    var celular = document.querySelector("#celular").value
    var pass = document.querySelector("#senha").value
    // var encrypted = CryptoJS.AES.encrypt(pass, secretKey);
    // var decrypted = CryptoJS.AES.decrypt(encrypted, secretKey);

    // document.querySelector("#testando").innerHTML = decrypted

    var user = {
        "celular": celular,
        "senha": pass
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    fetch('http://localhost:3000/cookies/usuario/login', options)
        .then(response => response.json())
        .then(response => {
            console.log(response.tipo)
            if (response.tipo !== undefined) {
                localStorage.setItem('ifuser', JSON.stringify(response))
                if (response.tipo == true) {
                    window.location.href = "../home/index.html"
                } else {
                    window.location.href = "../portfolio/index.html"
                }
            }
        })
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerHeight + 100;
canvas.height = 200;
ctx.lineWidth = 90;
ctx.strokeStyle = "#dbdbdb";

const step = 20;
const amplitude = 40;
const wavelength = 200;
const start = 100;
const end = canvas.height - 100;
for (let y = start; y <= end; y += step) {
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += 10) {

        const angle = x * Math.PI / wavelength;
        const yPos = y + amplitude * Math.sin(angle);
        if (x === 0) {
            ctx.moveTo(x, yPos);
        } else {
            ctx.lineTo(x, yPos);
        }
    }
    ctx.stroke();
}

const canvas2 = document.getElementById("myCanvas2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = window.innerHeight + 350;
canvas2.height = 400;
ctx2.lineWidth = 50;
ctx2.strokeStyle = "#ffffff";

const step2 = 20;
const amplitude2 = 40;
const wavelength2 = 200;
const start2 = 100;
const end2 = canvas2.height - 100;
for (let y = start2; y <= end2; y += step2) {
    ctx2.beginPath();
    for (let x = 0; x <= canvas2.width; x += 10) {

        const angle = x * Math.PI / wavelength2;
        const yPos = y + amplitude2 * Math.sin(angle);
        if (x === 0) {
            ctx2.moveTo(x, yPos);
        } else {
            ctx2.lineTo(x, yPos);
        }
    }
    ctx2.stroke();
}