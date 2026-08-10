let splashVisible = true;
let devices = [];
let latestData = null;
let lastPacketTime = 0;

const socketUrl = API;

async function checkAuth() {
    const response = await apiFetch("/auth/me");
     if (!response || response.status === 401) {
        window.location.replace("../index.html");
        return null;
    }
    return await response.json();
}

async function loadDevices() {
    const response = await apiFetch("/devices");
    if (!response) return;
    const result = await response.json();
    devices = result.devices;
    if (!result.success) {
        alert("Failed to load devices.");
        return;
    }
    document.getElementById("username").textContent = result.username;
    document.getElementById("profileAvatar").textContent = result.username.trim().charAt(0).toUpperCase();
    const greeting = setGreeting(result.username);
    updateAITicker(greeting, result.username);
    const deviceSelect = document.getElementById("deviceSelect");
    deviceSelect.innerHTML = "";
    devices.forEach(device => {
        deviceSelect.innerHTML += `
            <option value="${device.deviceId}">
                ${device.deviceId}
            </option>
        `;
    });
    const selectedDevice = devices[0];
    deviceSelect.value = selectedDevice.deviceId;
    const channels = await loadDeviceChannels(
        selectedDevice.deviceId
    );
    if (channels) {
        createChannelCards(channels);
    }
    await loadDailyEnergy(selectedDevice.deviceId);
    await loadMonthlyEnergy(selectedDevice.deviceId);
}

async function loadDailyEnergy(deviceId) {
    const response = await apiFetch(`/devices/${deviceId}/daily-energy`);
    if (!response) return;
    if (!response.ok) {
        console.error("Failed to load daily energy");
        return;
    }
    const result = await response.json();
    if (!result.success) {
        console.error("Daily energy error:", result.message);
        return;
    }
    const today = Number(result.today);
    const yesterday = Number(result.yesterday);
    document.getElementById("daily-energy").textContent = today.toFixed(2);
    const changeElement = document.getElementById("energyChange");
    if (yesterday === 0) {
        changeElement.textContent = "NA";
        changeElement.className = "energy-change neutral";
        return;
    }
    const percentageChange = ((today - yesterday) / yesterday) * 100;
    const percentage = Math.abs(percentageChange).toFixed(1);
    if (percentageChange > 0) {
        changeElement.textContent = `↑ ${percentage} %`;
        changeElement.className = "energy-change increase";
    }
    else if (percentageChange < 0) {
        changeElement.textContent = `↓ ${percentage} %`;
        changeElement.className = "energy-change decrease";
    }
    else {
        changeElement.textContent = "0.0%";
        changeElement.className = "energy-change neutral";
    }
}

async function loadMonthlyEnergy(deviceId) {
    const response = await apiFetch(
        `/devices/${deviceId}/monthly-energy`
    );
    if (!response) return;
    if (!response.ok) {
        console.error("Failed to load monthly energy");
        return;
    }
    const result = await response.json();
    if (!result.success) {
        console.error("Monthly energy error:", result.message);
        return;
    }
    const currentMonth = Number(result.currentMonth);
    const previousMonth = Number(result.previousMonth);
    document.getElementById("monthly-energy").textContent = currentMonth.toFixed(2);
    document.getElementById("todayEnergyCost").textContent = `₹ ${Number(result.todayCost).toFixed(2)}`;
    document.getElementById("monthlyEnergyCost").textContent =`₹ ${Number(result.monthlyCost).toFixed(2)}`;
    const changeElement = document.getElementById("monthlyEnergyChange");

    if (previousMonth === 0) {
        changeElement.textContent = "NA";
        changeElement.className = "energy-change neutral";
        return;
    }
    const percentageChange = ((currentMonth - previousMonth) / previousMonth) * 100;
    const percentage = Math.abs(percentageChange).toFixed(1);
    if (percentageChange > 0) {
        changeElement.textContent = `↑ ${percentage} %`;
        changeElement.className = "energy-change increase";
    } else if (percentageChange < 0) {
        changeElement.textContent = `↓ ${percentage} %`;
        changeElement.className = "energy-change decrease";
    } else {
        changeElement.textContent = "0.0 %";
        changeElement.className = "energy-change neutral";
    }
}

async function loadDeviceChannels(deviceId) {
    const response = await apiFetch(`/devices/${deviceId}/channels`);
    if (!response) return null;
    if (!response.ok) {
        console.error("Failed to load channel names");
        return null;
    }
    const result = await response.json();
    if (!result.success) {
        console.error("Channel error:", result.message);
        return null;
    }
    return result.channels;
}

async function init() {
    const auth = await checkAuth();
    if (!auth) {
        return;
    }
    document.getElementById("userid").textContent = auth.user.userid;
    await loadDevices();
    connectSocket();
}

function connectSocket() {
    socket = io(socketUrl, {
        withCredentials: true,
    });

    socket.on("connect", () => {
        const deviceId = document.getElementById("deviceSelect").value;
        socket.emit("selectDevice", deviceId);
        hideSplash();
    });

    socket.on("connect_error", (err) => {
        console.error("Socket Error:", err.message);
    });

    socket.on("disconnect", () => {
        console.log("Socket Disconnected");
    });

    socket.on("update", (data) => {
        latestData = data;
        lastPacketTime = Date.now();
    });
}

document.getElementById("deviceSelect").addEventListener("change", async function () {
    const deviceId = this.value;
    const selectedDevice = devices.find(
        device => device.deviceId === deviceId
    );
    if (!selectedDevice) {
        return;
    }
    const channels = await loadDeviceChannels(deviceId);
    if (channels) {
        createChannelCards(channels);
    }
    socket.emit("selectDevice", deviceId);
    loadDailyEnergy(deviceId);
    loadMonthlyEnergy(deviceId);
});

function updateDashboard(data) {
    const status = document.getElementById("deviceStatus");
    if (data.connected) {
        status.className = "status-indicator online";
        status.querySelector(".status-text").textContent = "Online";
    } else {
        status.className = "status-indicator offline";
        status.querySelector(".status-text").textContent = "Offline";
    }
    document.getElementById("lastUpdate").textContent =
        new Date(data.lastUpdate).toLocaleTimeString("en-IN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    document.getElementById("voltage").textContent = `${Number(data.voltage).toFixed(2)} V`;
    document.getElementById("totalCurrent").textContent = `${Number(data.totalCurrent).toFixed(2)} A`;
    document.getElementById("energyKWh").textContent = Number(data.energyKWh).toFixed(2);
    document.getElementById("energyWh").textContent = `${(data.energyKWh * 1000).toFixed(0)} Wh`;
    document.getElementById("totalRealPower").textContent = `${Number(data.totalRealPower).toFixed(0)} W`;
    document.getElementById("totalApparentPower").textContent = `${Number(data.totalApparentPower).toFixed(0)} VA`;
    data.channels.forEach(channel => {
        document.getElementById(`current-${channel.channelId}`).textContent = channel.current.toFixed(2);
        document.getElementById(`pf-${channel.channelId}`).textContent = channel.pf.toFixed(2);
        document.getElementById(`power-${channel.channelId}`).textContent = channel.realPower.toFixed(0);
        document.getElementById(`apparent-${channel.channelId}`).textContent = channel.apparentPower.toFixed(0);
    });
}

function createChannelCards(channels) {
    const container = document.getElementById("channelContainer");
    container.innerHTML = "";
    channels.forEach(channel => {
        container.innerHTML += `
            <div class="channel-card">
                <div class="channel-header">
                    <h3 id="channel-name-${channel.channel_id}">
                        ${channel.channel_name}
                    </h3>
                </div>
                <p>
                    Current :
                    <span id="current-${channel.channel_id}">0.00</span> A
                </p>
                <p>
                    PF :
                    <span id="pf-${channel.channel_id}">0.00</span>
                </p>
                <p>
                    Real power :
                    <span id="power-${channel.channel_id}">0</span> W
                </p>
                <p>
                    Apparent power :
                    <span id="apparent-${channel.channel_id}">0</span> VA
                </p>
            </div>
        `;
    });
}

function setGreeting(username) {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) {
        greeting = "Good Morning";
    }
    else if (hour < 17) {
        greeting = "Good Afternoon";
    }
    else {
        greeting = "Good Evening";
    }
    document.getElementById("greeting").textContent = greeting;
    document.getElementById("splashUsername").textContent = username;
    document.getElementById("splashPara").textContent = "";
    return greeting;
}

function hideSplash() {
    if (!splashVisible) return;
    splashVisible = false;
    const splash = document.getElementById("splashScreen");
    splash.classList.add("hide");
    setTimeout(() => {
        splash.remove();
    }, 500);
}

document.getElementById("logoutBtn").addEventListener("click", async function (e) {
    e.preventDefault();
    await fetch(`${API}/auth/logout`, {
        method: "POST",
        credentials: "include"
    });
    window.close();
    if (!window.closed) {
        window.location.replace("../index.html");
    }
});

let tickerIndex = 0;

function updateAITicker(greeting, username) {
    const ticker = document.getElementById("aiTicker");
    const messages = [
        `${greeting}, ${username}. Welcome to the Veyora Dashboard.`,
        "Your smart energy monitoring system is ready.",
        "Live AI insights and energy recommendations will appear here."
    ];

    function playTicker() {
        ticker.textContent = messages[tickerIndex];
        ticker.style.animation = "none";
        void ticker.offsetWidth;
        ticker.style.animation = "ticker 20s linear";
        tickerIndex++;
        if (tickerIndex >= messages.length) {
            tickerIndex = 0;
        }
    }
    playTicker();
    ticker.onanimationend = playTicker;
}

setInterval(() => {
    if (latestData) {
        updateDashboard(latestData);
    }
    const status = document.getElementById("deviceStatus");
    if (Date.now() - lastPacketTime > 5000) {
        status.className = "status-indicator offline";
        status.querySelector(".status-text").textContent = "Offline";
    }
}, 2000);

setInterval(() => {
    const deviceId = document.getElementById("deviceSelect").value;
    if (deviceId) {
        loadDailyEnergy(deviceId);
        loadMonthlyEnergy(deviceId);
    }
}, 10000);

init();