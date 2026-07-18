const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

const socket = io(
    isLocal
        ? "http://localhost:3000"
        : "https://veyora-energy-backend-production.up.railway.app"
);

socket.on("connect", () => {
    console.log("Socket Connected");
});

socket.on("disconnect", () => {
    console.log("Socket Disconnected");
});

socket.on("update", (data) => {
    document.getElementById("lastUpdate").textContent = data.lastUpdate;
    document.getElementById("voltage").textContent = Number(data.voltage).toFixed(2);
    document.getElementById("current").textContent = Number(data.current).toFixed(2);
    document.getElementById("pf").textContent = Number(data.pf).toFixed(2);
    document.getElementById("realPower").textContent = Number(data.realPower).toFixed(2);
    document.getElementById("apparentPower").textContent = Number(data.apparentPower).toFixed(2);
    document.getElementById("energyWh").textContent = Number(data.energyWh).toFixed(2);
    document.getElementById("energyKWh").textContent = Number(data.energyKWh).toFixed(3);
});

setInterval(() => {
    document.getElementById("currentTime").textContent =
        new Date().toLocaleTimeString("en-IN", {
            hour12:false
        });
},1000);