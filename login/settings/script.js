let devices = [];
let socket = null;
let lastPacketTime = 0;

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
    if (!result.success) {
        alert("Failed to load devices.");
        return;
    }
    devices = result.devices;
    document.getElementById("username").textContent = result.username;
    document.getElementById("profileAvatar").textContent = result.username.trim().charAt(0).toUpperCase();
    const deviceSelect = document.getElementById("deviceSelect");
    deviceSelect.innerHTML = "";
    if (!devices.length) {
        deviceSelect.innerHTML = `<option value="">No devices found</option>`;
        return;
    }
    devices.forEach(device => {
        deviceSelect.innerHTML += `
            <option value="${device.deviceId}">
                ${device.deviceId}
            </option>
        `;
    });
    const selectedDevice = devices[0];
    deviceSelect.value = selectedDevice.deviceId;
    await loadDeviceChannels(selectedDevice.deviceId);
    await loadDeviceWiFi(selectedDevice.deviceId);
}

async function loadDeviceChannels(deviceId) {
    const container = document.getElementById("channelContainer");
    container.innerHTML = `
        <div class="settings-loading">
            Loading channels...
        </div>
    `;
    const response = await apiFetch(`/devices/${deviceId}/channels`);
    if (!response) return;
    if (!response.ok) {
        container.innerHTML = `
            <div class="settings-error">
                Failed to load channels.
            </div>
        `;
        return;
    }
    const result = await response.json();
    if (!result.success) {
        container.innerHTML = `
            <div class="settings-error">
                ${result.message || "Failed to load channels."}
            </div>
        `;
        return;
    }
    createChannelSettings(result.channels);
}

async function loadDeviceWiFi(deviceId) {
    const container = document.getElementById("wifiHotspotContainer");
    const count = document.getElementById("wifiCount");
    container.innerHTML = `
        <div class="settings-loading">
            Loading Wi-Fi hotspots...
        </div>
    `;
    count.textContent = "0 / 5";
    const response = await apiFetch(
        `/devices/${deviceId}/wifi`
    );
    if (!response) return;
    if (!response.ok) {
        container.innerHTML = `
            <div class="settings-error">
                Failed to load Wi-Fi hotspots.
            </div>
        `;
        return;
    }
    const result = await response.json();
    if (!result.success) {
        container.innerHTML = `
            <div class="settings-error">
                ${escapeHtml(
                    result.message ||
                    "Failed to load Wi-Fi hotspots."
                )}
            </div>
        `;
        return;
    }
    createWiFiSettings(
        result.hotspots,
        result.activeWifiId
    );
}

function createWiFiSettings(hotspots, activeWifiId) {
    const container = document.getElementById("wifiHotspotContainer");
    const count = document.getElementById("wifiCount");
    container.innerHTML = "";
    const networks = hotspots || [];
    count.textContent = `${networks.length} / 5`;
    if (networks.length === 0) {
        container.innerHTML = `
            <div class="settings-loading">
                No Wi-Fi hotspots configured.
            </div>
        `;
    } else {
        networks.forEach(wifi => {
            const isActive = Number(wifi.id) === Number(activeWifiId);
            container.innerHTML += `
                <div
                    class="wifi-hotspot-card"
                    data-wifi-id="${wifi.id}"
                >
                    <div class="wifi-hotspot-info">
                        <div class="wifi-hotspot-name">
                            <i class="fa-solid fa-wifi"></i>
                            <span>
                                ${escapeHtml(wifi.ssid)}
                            </span>
                        </div>
                        ${
                            isActive
                            ? `
                                <span class="wifi-connected">
                                    <i class="fa-solid fa-circle"></i>
                                    Connected
                                </span>
                            `
                            : ""
                        }
                    </div>
                    <button
                        class="wifi-delete-btn"
                        type="button"
                        ${
                            isActive
                            ? "disabled"
                            : ""
                        }
                        onclick="deleteWiFi(${wifi.id})"
                    >
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </div>
            `;
        });
    }
    const addButton = document.getElementById("addWifiBtn");
    if (networks.length >= 5) {
        addButton.disabled = true;
        addButton.title =
            "Maximum of 5 Wi-Fi hotspots reached.";
    } else {
        addButton.disabled = false;
        addButton.title = "";
    }
}

async function deleteWiFi(wifiId) {
    const deviceId = document.getElementById("deviceSelect").value;
    if (!deviceId) {
        return;
    }
    const confirmed = confirm(
        "Are you sure you want to delete this Wi-Fi network?"
    );
    if (!confirmed) {
        return;
    }
    try {
        const response = await apiFetch(
            `/devices/${deviceId}/wifi/${wifiId}`,
            {
                method: "DELETE"
            }
        );
        if (!response) return;
        const result = await response.json();
        if (!response.ok || !result.success) {
            showSettingsAlert(
                result.message ||
                "Failed to delete Wi-Fi network.",
                "error"
            );
            return;
        }
        showSettingsAlert(
            "Wi-Fi network deleted successfully.",
            "success"
        );
        await loadDeviceWiFi(deviceId);
    } catch (error) {
        console.error(
            "Delete Wi-Fi error:",
            error
        );
        showSettingsAlert(
            "Failed to delete Wi-Fi network.",
            "error"
        );
    }
}

function showAddWiFiForm() {
    const container = document.getElementById("wifiHotspotContainer");
    if (document.getElementById("wifiAddForm")) {
        return;
    }
    const form = document.createElement("div");
    form.id = "wifiAddForm";
    form.className = "wifi-add-form";
    form.innerHTML = `
        <div class="wifi-form-title">
            Add Wi-Fi Hotspot
        </div>
        <input
            type="text"
            id="wifiSsidInput"
            placeholder="Wi-Fi name"
            maxlength="32"
            autocomplete="off"
        >
        <input
            type="password"
            id="wifiPasswordInput"
            placeholder="Wi-Fi password"
            autocomplete="new-password"
        >
        <div class="wifi-form-actions">
            <button
                type="button"
                class="wifi-save-btn"
                id="wifiSaveBtn">
                <i class="fa-solid fa-plus"></i>
                Add Hotspot
            </button>
            <button
                type="button"
                class="wifi-cancel-btn"
                id="wifiCancelBtn">
                Cancel
            </button>
        </div>
    `;
    container.appendChild(form);
    document.getElementById("wifiSaveBtn").addEventListener("click", addWiFi);
    document.getElementById("wifiCancelBtn")
        .addEventListener("click", () => {
            form.remove();
        });
    document.getElementById("wifiSsidInput").focus();
}

async function addWiFi() {
    const deviceId = document.getElementById("deviceSelect").value;
    const ssidInput = document.getElementById("wifiSsidInput");
    const passwordInput = document.getElementById("wifiPasswordInput");
    const saveButton = document.getElementById("wifiSaveBtn");
    if (!deviceId || !ssidInput || !passwordInput) {
        return;
    }
    const ssid = ssidInput.value.trim();
    const password = passwordInput.value;
    if (!ssid) {
        showSettingsAlert(
            "Wi-Fi name cannot be empty.",
            "error"
        );
        ssidInput.focus();
        return;
    }
    if (!password) {
        showSettingsAlert(
            "Wi-Fi password cannot be empty.",
            "error"
        );
        passwordInput.focus();
        return;
    }

    if (ssid.length > 32) {
        showSettingsAlert(
            "Wi-Fi name must be 32 characters or less.",
            "error"
        );
        ssidInput.focus();
        return;
    }
    saveButton.disabled = true;
    saveButton.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        Adding...
    `;
    try {
        const response = await apiFetch(
            `/devices/${deviceId}/wifi`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ssid,
                    password
                })
            }
        );
        if (!response) return;
        const result = await response.json();
        if (!response.ok || !result.success) {
            showSettingsAlert(
                result.message ||
                "Failed to add Wi-Fi hotspot.",
                "error"
            );
            saveButton.disabled = false;
            saveButton.innerHTML = `
                <i class="fa-solid fa-plus"></i>
                Add Hotspot
            `;
            return;
        }
        showSettingsAlert(
            "Wi-Fi hotspot added successfully.",
            "success"
        );
        await loadDeviceWiFi(deviceId);
    } catch (error) {
        console.error(
            "Add Wi-Fi error:",
            error
        );
        showSettingsAlert(
            "Failed to add Wi-Fi hotspot.",
            "error"
        );
        saveButton.disabled = false;
        saveButton.innerHTML = `
            <i class="fa-solid fa-plus"></i>
            Add Hotspot
        `;
    }
}

function createChannelSettings(channels) {
    const container = document.getElementById("channelContainer");
    container.innerHTML = "";
    if (!channels || channels.length === 0) {
        container.innerHTML = `
            <div class="settings-loading">
                No channels found for this device.
            </div>
        `;
        return;
    }
    channels.forEach(channel => {
        container.innerHTML += `
            <div class="channel-setting-card"
                 data-channel-id="${channel.channel_id}">
                <div class="channel-info">
                    <span class="channel-label">
                        Channel ${channel.channel_id}
                    </span>
                    <span class="channel-name"
                          id="channel-name-${channel.channel_id}">
                        ${escapeHtml(channel.channel_name)}
                    </span>
                </div>
                <div class="channel-edit"
                     id="channel-edit-${channel.channel_id}">
                    <button
                        class="rename-btn"
                        onclick="startRename(${channel.channel_id})">
                        <i class="fa-solid fa-pen"></i>
                        Rename
                    </button>
                </div>
            </div>
        `;
    });
}

function startRename(channelId) {
    const nameElement = document.getElementById(`channel-name-${channelId}`);
    const editContainer = document.getElementById(`channel-edit-${channelId}`);
    const currentName = nameElement.textContent.trim();
    editContainer.innerHTML = `
        <input
            type="text"
            id="channel-input-${channelId}"
            value="${escapeHtml(currentName)}"
            maxlength="30"
            autocomplete="off"
        >
        <button
            class="save-btn"
            onclick="saveChannelName(${channelId})">
            <i class="fa-solid fa-check"></i>
            Save
        </button>
        <button
            class="cancel-btn"
            onclick="cancelRename(${channelId}, '${escapeJs(currentName)}')">
            Cancel
        </button>
    `;
    const input = document.getElementById(`channel-input-${channelId}`);
    input.focus();
    input.select();
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            saveChannelName(channelId);
        }
        if (event.key === "Escape") {
            cancelRename(channelId, currentName);
        }
    });
}

function cancelRename(channelId, currentName) {
    const editContainer = document.getElementById(`channel-edit-${channelId}`);
    editContainer.innerHTML = `
        <button
            class="rename-btn"
            onclick="startRename(${channelId})">
            <i class="fa-solid fa-pen"></i>
            Rename
        </button>
    `;
}

async function saveChannelName(channelId) {
    const deviceId = document.getElementById("deviceSelect").value;
    const input = document.getElementById(`channel-input-${channelId}`);
    if (!input) return;
    const channelName = input.value.trim();
    if (!channelName) {
        showSettingsAlert("Channel name cannot be empty.","error");
        input.focus();
        return;
    }
    if (channelName.length > 30) {
        showSettingsAlert("Channel name must be 30 characters or less.","error");
        input.focus();
        return;
    }
    const saveButton = document.querySelector(`#channel-edit-${channelId} .save-btn`);
    saveButton.disabled = true;
    saveButton.textContent = "Saving...";
    try {
        const response = await apiFetch(
            `/devices/${deviceId}/channels/${channelId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    channelName: channelName
                })
            }
        );
        if (!response) return;
        const result = await response.json();
        if (!response.ok || !result.success) {
            showSettingsAlert(result.message || "Failed to change channel name.","error");
            saveButton.disabled = false;
            saveButton.innerHTML =
                `<i class="fa-solid fa-check"></i> Save`;
            return;
        }
        document.getElementById(`channel-name-${channelId}`).textContent = channelName;
        showSettingsAlert(`Channel ${channelId} name changed successfully.`,"success");
        const editContainer = document.getElementById(`channel-edit-${channelId}`);
        editContainer.innerHTML = `
            <button
                class="rename-btn"
                onclick="startRename(${channelId})">
                <i class="fa-solid fa-pen"></i>
                Rename
            </button>
        `;
    } catch (error) {
        console.error("Rename channel error:", error);
        showSettingsAlert("Failed to change channel name.","error");
        saveButton.disabled = false;
        saveButton.innerHTML = `<i class="fa-solid fa-check"></i> Save`;
    }
}

function connectSocket() {
    socket = io(socketUrl, {
        withCredentials: true
    });

    socket.on("connect", () => {
        const deviceId = document.getElementById("deviceSelect").value;
        if (deviceId) {
            socket.emit("selectDevice", deviceId);
        }
    });

    socket.on("connect_error", err => {
        console.error(
            "Socket Error:",
            err.message
        );
    });

    socket.on("disconnect", () => {
        console.log("Socket Disconnected");
        setDeviceOffline();
    });

    socket.on("update", data => {
        lastPacketTime = Date.now();
        updateDeviceStatus(data);
    });
}

function updateDeviceStatus(data) {
    const status = document.getElementById("deviceStatus");
    if (data.connected) {
        status.className = "status-indicator online";
        status.querySelector(".status-text").textContent = "Online";
    } else {
        setDeviceOffline();
    }
    if (
        data.activeWifiId !== undefined &&
        data.activeWifiId !== null &&
        Number(data.activeWifiId) >= 0
    ) {
        updateActiveWiFi(Number(data.activeWifiId));
    }
}

function updateActiveWiFi(activeWifiId) {
    const cards =document.querySelectorAll(".wifi-hotspot-card");
    cards.forEach(card => {
        const wifiId = Number(card.dataset.wifiId);
        const isActive = wifiId === activeWifiId;
        const deleteButton = card.querySelector(".wifi-delete-btn");
        let statusElement = card.querySelector(".wifi-connected");
        if (isActive) {
            card.classList.add(
                "active"
            );
            if (!statusElement) {
                const info =card.querySelector(".wifi-hotspot-info");
                statusElement = document.createElement("span");
                statusElement.className = "wifi-connected";
                info.appendChild(statusElement);
            }
            statusElement.innerHTML = `
                <i class="fa-solid fa-circle"></i>
                Connected
            `;
            if (deleteButton) {
                deleteButton.disabled = true;
            }
        }
        else {
            card.classList.remove(
                "active"
            );
            if (statusElement) {
                statusElement.remove();
            }
            if (deleteButton) {
                deleteButton.disabled = false;
            }
        }
    });
}

function setDeviceOffline() {
    const status = document.getElementById("deviceStatus");
    status.className = "status-indicator offline";
    status.querySelector(".status-text").textContent = "Offline";
    const cards =document.querySelectorAll(".wifi-hotspot-card");
    cards.forEach(card => {
        card.classList.remove("active");
        const connected =
            card.querySelector(
                ".wifi-connected"
            );
        if (connected) {
            connected.remove();
        }
        const deleteButton =
            card.querySelector(
                ".wifi-delete-btn"
            );
        if (deleteButton) {
            deleteButton.disabled = false;
        }
    });
}

document.getElementById("deviceSelect").addEventListener("change", async function () {
        const deviceId = this.value;
        if (!deviceId) return;
        lastPacketTime = 0;
        setDeviceOffline();
        await loadDeviceChannels(deviceId);
        await loadDeviceWiFi(deviceId);
        if (socket) {
            socket.emit("selectDevice", deviceId);
        }
});

setInterval(() => {
    if (
        lastPacketTime === 0 ||
        Date.now() - lastPacketTime > 5000
    ) {
        setDeviceOffline();
    }
}, 2000);

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeJs(value) {
    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");
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

async function init() {
    const auth = await checkAuth();
    if (!auth) return;
    document.getElementById("userid").textContent = auth.user.userid;
    await loadDevices();
    connectSocket();
}

function showSettingsAlert(message, type = "success") {
    const alertBox = document.getElementById("settingsAlert");
    const alertIcon = document.getElementById("settingsAlertIcon");
    const alertMessage = document.getElementById("settingsAlertMessage");
    alertMessage.textContent = message;
    alertBox.className = `settings-alert ${type}`;
    if (type === "success") {
        alertIcon.innerHTML =`<i class="fa-solid fa-circle-check"></i>`;
    }
    else {
        alertIcon.innerHTML =`<i class="fa-solid fa-circle-xmark"></i>`;
    }
    alertBox.classList.add("show");
    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 3000);
}

document
    .getElementById("addWifiBtn")
    .addEventListener("click", function () {
        showAddWiFiForm();
    });

init();