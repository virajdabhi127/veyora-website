let splashVisible = true;
let devices = [];
let latestData = null;
let loadCurveChart = null;
let selectedLoadInterval = 240;
let monthlyEnergyChart = null;
let lastPacketTime = 0;
let dailyLoadDate = new Date().toDateString();

const socketUrl = API;

async function checkAuth() {
    const response = await apiFetch("/auth/me");
     if (!response || response.status === 401) {
        window.location.replace("/login/");
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
    const channels = await loadDeviceChannels(selectedDevice.deviceId);
    if (channels) {
        createChannelCards(channels);
    }
    await loadDailyEnergy(selectedDevice.deviceId);
    await loadMonthlyEnergy(selectedDevice.deviceId);
    await loadLoadHistory(selectedDevice.deviceId);
    await loadDailyLoad(selectedDevice.deviceId);
    await loadMonthlyLoad(selectedDevice.deviceId);
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
        document.getElementById("lastMonth").textContent = "";
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

async function loadLoadHistory(deviceId) {
    try {
        const response = await apiFetch(`/devices/${deviceId}/load-history`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error("Failed to load load history");
        }
        const chartData = [];
        let previousTime = null;
        data.history.forEach(item => {
            const time = new Date(item.recorded_at);
            const minutes =
                time.getHours() * 60 +
                time.getMinutes() +
                time.getSeconds() / 60;
            if (previousTime !== null && (minutes - previousTime) > 0.5) {
                chartData.push({
                    time: previousTime + 0.01,
                    power: null
                });
            }
            chartData.push({
                time: minutes,
                power: Number(item.real_power) / 1000
            });
            previousTime = minutes;
        });
        const ctx = document.getElementById("loadCurveChart");
        if (loadCurveChart) {
            loadCurveChart.destroy();
        }
        loadCurveChart = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [{
                    label: "Power (kW)",
                    data: chartData,
                    tension: 0.3,
                    pointRadius: 0,
                    borderWidth: 2,
                    fill: false,
                    spanGaps: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: "nearest",
                    intersect: false,
                    includeInvisible: false
                },
                onClick: function(event) {
                    const chart = this;
                    const elements = chart.getElementsAtEventForMode(
                        event,
                        "nearest",
                        {
                            intersect: false
                        },
                        true
                    );
                    if (!elements.length) return;
                    const element = elements[0];
                    chart.setActiveElements([{
                        datasetIndex: element.datasetIndex,
                        index: element.index
                    }]);
                    chart.tooltip.setActiveElements(
                        [{
                            datasetIndex: element.datasetIndex,
                            index: element.index
                        }],
                        {
                            x: element.element.x,
                            y: element.element.y
                        }
                    );
                    chart.update();
                },
                parsing: {
                    xAxisKey: "time",
                    yAxisKey: "power"
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                const minutes = context[0].parsed.x;
                                const hours = Math.floor(minutes / 60);
                                const mins = Math.floor(minutes % 60);
                                return `Time: ${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
                            },
                            label: function(context) {
                                return `Power (kW): ${Number(context.parsed.y).toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: "linear",
                        min: 0,
                        max: 1439.833,
                        title: {
                            display: true,
                            text: "Time"
                        },
                        ticks: {
                            stepSize: selectedLoadInterval,
                            autoSkip: false,
                            callback: function(value) {
                                const totalMinutes = Math.floor(value);
                                const hours = Math.floor(totalMinutes / 60);
                                const minutes = totalMinutes % 60;
                                return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
                            }
                        },
                        grid : {
                            display: false
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Power (kW)"
                        },
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
        } catch (error) {
        console.error("Load history error:", error);
    }
}

async function loadDailyLoad(deviceId) {
    const response = await apiFetch(`/devices/${deviceId}/daily-load`);
    if (!response) return;
    if (!response.ok) {
        console.error("Failed to load daily load");
        return;
    }
    const result = await response.json();
    if (!result.success) {
        console.error("Daily load error:", result.message);
        return;
    }
    const peakLoad = Number(result.load?.peak_load);
    const baseLoad = Number(result.load?.base_load);
    document.getElementById("peakLoad").textContent = `${(peakLoad / 1000).toFixed(2)} KW`;
    document.getElementById("baseLoad").textContent = `${(baseLoad / 1000).toFixed(2)} KW`;
}

document.getElementById("loadInterval").addEventListener("change", function () {
    if (!loadCurveChart) return;
    const interval = Number(this.value);
    selectedLoadInterval = interval;
    const baseWidth = 559.17;
    const intervalHours = interval / 60;
    const chartWidth = baseWidth * (4 / intervalHours);
    const chartContainer = document.querySelector(".load-curve-chart");
    chartContainer.style.width = `${chartWidth}px`;
    loadCurveChart.options.scales.x.max = 1439.833;
    loadCurveChart.options.scales.x.ticks.stepSize = interval;
    loadCurveChart.resize();
    loadCurveChart.update();
});

async function loadMonthlyLoad(deviceId) {
    const response = await apiFetch(`/devices/${deviceId}/monthly-load`);
    if (!response) return;
    if (!response.ok) {
        console.error("Failed to load monthly load");
        return;
    }
    const result = await response.json();
    if (!result.success) {
        console.error("Monthly load error:", result.message);
        return;
    }
    const monthName = new Date().toLocaleString("en-IN", {
        month: "long",
        year: "numeric"
    });
    const monthlyChartData = result.load.map(item => ({
        day: Number(String(item.history_date).substring(8, 10)),
        energy: Number(item.energy_kwh)
    }));
    const ctx = document.getElementById("monthlyEnergyChart");
    if (monthlyEnergyChart) {
        monthlyEnergyChart.destroy();
    }
    monthlyEnergyChart = new Chart(ctx, {
        type: "bar",
        data: {
            datasets: [{
                label: "Daily Energy (kWh)",
                data: monthlyChartData,
                tension: 0.3,
                pointRadius: 3,
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            parsing: {
                xAxisKey: "day",
                yAxisKey: "energy"
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return `Day: ${context[0].parsed.x}`;
                        },

                        label: function(context) {
                            return `Energy: ${Number(context.parsed.y).toFixed(2)} kWh`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: "linear",
                    min: 1,
                    max: new Date(
                        new Date().getFullYear(),
                        new Date().getMonth() + 1,
                        0
                    ).getDate(),
                    ticks: {
                        stepSize: 1,
                        autoSkip: false,
                        callback: function(value) {
                            return value;
                        }
                    },
                    title: {
                        display: true,
                        text: "Day"
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Energy (kWh)"
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
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
    (data.channels || []).forEach(channel => {
        document.getElementById(`current-${channel.channelId}`).textContent = channel.current.toFixed(2);
        document.getElementById(`pf-${channel.channelId}`).textContent = channel.pf.toFixed(2);
        document.getElementById(`power-${channel.channelId}`).textContent = channel.realPower.toFixed(0);
        document.getElementById(`apparent-${channel.channelId}`).textContent = channel.apparentPower.toFixed(0);
        document.getElementById(`energy-${channel.channelId}`).textContent = Number(channel.energyKWh).toFixed(2);
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
                <p>
                    Energy :
                    <span id="energy-${channel.channel_id}">0</span>
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
        window.location.replace("/login/");
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
    if (!deviceId) return;
    const today = new Date().toDateString();
    if (today !== dailyLoadDate) {
        dailyLoadDate = today;
        document.getElementById("peakLoad").textContent = "-- kW";
        document.getElementById("baseLoad").textContent = "-- kW";
        loadLoadHistory(deviceId);
    }
    loadDailyEnergy(deviceId);
    loadMonthlyEnergy(deviceId);
    loadDailyLoad(deviceId);
}, 10000);

init();