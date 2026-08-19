let users = [];
let devices = [];
let userSortAsc = true;
let deviceSortAsc = true;

async function loadStats() {
    try {
        const response = await fetch(API + "/admin/stats", {
            credentials: "include"
        });
        const data = await response.json();
        document.getElementById("totalUsers").textContent = data.totalUsers;
        document.getElementById("totalDevices").textContent = data.totalDevices;
    } catch (err) {
        console.error(err);
    }
}

async function loadUsers() {
    try {
        const response = await fetch(API + "/admin/users", {
            credentials: "include"
        });
        const data = await response.json();
        users = data.users;
        renderUsers(users);
    } catch (err) {
        console.error(err);
    }
}

async function deleteUser(userid) {
    if (!confirm(`Delete ${userid}?`)) {
        return;
    }
    try {
        const response = await fetch(API + `/admin/user/${userid}`, {
            method: "DELETE",
            credentials: "include"
        });
        const data = await response.json();
        if (response.ok) {
            alert("User deleted successfully.");
            loadUsers();
            loadStats();
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Server error.");
    }
}



async function loadDevices() {
    try {
        const response = await fetch(API + "/admin/devices", {
            credentials: "include"
        });
        const data = await response.json();
        devices = data.devices;
        renderDevices(devices);
    } catch (err) {
        console.error(err);
    }
}

async function deleteDevice(deviceId) {
    if (!confirm(`Delete ${deviceId}?`)) {
        return;
    }
    try {
        const response = await fetch(API + `/admin/device/${deviceId}`, {
            method: "DELETE",
            credentials: "include"
        });
        const data = await response.json();
        if (response.ok) {
            alert("Device deleted successfully.");
            loadDevices();
            loadStats();
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Server error.");
    }
}

document.getElementById("assignDeviceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const deviceId = document.getElementById("deviceId").value
        .trim()
        .toUpperCase();
    const userid = document.getElementById("assignUserid").value.trim();
    const productCode = document.getElementById("productCode").value;
    const channelCount = document.getElementById("channelCount").value;
    const editMode = document.getElementById("deviceEditMode").value;
    if(userid == "" || deviceId == "" || productCode == "" || channelCount == "") {
        alert("Credentials cant be kept empty.");
        return;
    }
    let url;
    let method;
    let body;
    if (editMode === "") {
        url = API + "/admin/assign-device";
        method = "POST";
        body = {
            deviceId,
            userid,
            productCode,
            channelCount
        };
    } else {
        url = API + `/admin/device/${editMode}`;
        method = "PUT";
        body = {
            userid,
            productCode,
            channelCount
        };
    }
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (response.ok) {
            if (editMode === "") {
                alert("Device assigned successfully.");
                document.getElementById("assignDeviceForm").reset();
            } else {
                alert("Device updated successfully.");
                cancelDeviceEdit();
            }
            loadDevices();
            loadStats();
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Server error.");
    }
});

document.getElementById("createUserForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const userid = document.getElementById("userid").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;
    const editMode = document.getElementById("editMode").value;
    if(userid == "" || username == "" || password == "") {
        alert("Credentials cant be kept empty.");
        return;
    }
    let url;
    let method;
    let body;
    if (editMode === "") {
        url = API + "/admin/create-user";
        method = "POST";
        body = {
            userid,
            username,
            password,
            role
        };
    } else {
        url = API + `/admin/user/${editMode}`;
        method = "PUT";
        body = {
            username,
            password,
            role
        };
    }
    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (response.ok) {
            if (editMode === "") {
                alert("User created successfully.");
                document.getElementById("createUserForm").reset();
            } else {
                alert("User updated successfully.");
                cancelEdit();
            }
            loadUsers();
            loadStats();
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Server error.");
    }
});

document.getElementById("searchUser").addEventListener("input", function () {
    const search = this.value.trim().toLowerCase();
    const filtered = users.filter(user => {
        return (
            user.userid.toLowerCase().includes(search) ||
            user.username.toLowerCase().includes(search) ||
            user.role.toLowerCase().includes(search)
        );
    });
    renderUsers(filtered);
});

document.getElementById("searchDevice").addEventListener("input", function () {
    const search = this.value.trim().toLowerCase();
    const filtered = devices.filter(device => {
        return (
            device.deviceId.toLowerCase().includes(search) ||
            device.userid.toLowerCase().includes(search) ||
            device.productCode.toLowerCase().includes(search) ||
            String(device.channelCount).includes(search)
        );
    });
    renderDevices(filtered);
});

function editUser(userid) {
    const user = users.find(u => u.userid === userid);
    document.getElementById("editMode").value = userid;
    document.getElementById("userFormTitle").textContent = "Edit User";
    document.getElementById("userid").value = user.userid;
    document.getElementById("userid").disabled = true;
    document.getElementById("username").value = user.username;
    document.getElementById("password").value = "";
    document.getElementById("role").value = user.role;
    document.getElementById("userSubmitBtn").textContent = "Update User";
    document.getElementById("cancelUserBtn").style.display = "inline-block";
}

function cancelEdit() {
    document.getElementById("createUserForm").reset();
    document.getElementById("editMode").value = "";
    document.getElementById("userid").disabled = false;
    document.getElementById("userFormTitle").textContent = "Create User";
    document.getElementById("userSubmitBtn").textContent = "Create User";
    document.getElementById("cancelUserBtn").style.display = "none";
}

function editDevice(deviceId) {
    const device = devices.find(d => d.deviceId === deviceId);
    document.getElementById("deviceEditMode").value = device.deviceId;
    document.getElementById("deviceFormTitle").textContent = "Edit Device";
    document.getElementById("deviceId").value = device.deviceId;
    document.getElementById("deviceId").disabled = true;
    document.getElementById("assignUserid").value = device.userid;
    document.getElementById("productCode").value = device.productCode;
    document.getElementById("channelCount").value = device.channelCount;
    document.getElementById("deviceSubmitBtn").textContent = "Update Device";
    document.getElementById("cancelDeviceBtn").style.display = "inline-block";
}

function cancelDeviceEdit() {
    document.getElementById("assignDeviceForm").reset();
    document.getElementById("deviceEditMode").value = "";
    document.getElementById("deviceId").disabled = false;
    document.getElementById("deviceFormTitle").textContent = "Assign Device";
    document.getElementById("deviceSubmitBtn").textContent = "Assign Device";
    document.getElementById("cancelDeviceBtn").style.display = "none";
}

function renderUsers(userList) {
    const tbody = document.getElementById("usersTableBody");
    tbody.innerHTML = "";
    userList.forEach(user => {
        tbody.innerHTML += `
        <tr>
            <td>${user.userid}</td>
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="editUser('${user.userid}')">Edit</button>
                <button onclick="deleteUser('${user.userid}')">Delete</button>
            </td>
        </tr>
        `;
    });
}

function renderDevices(deviceList) {
    const tbody = document.getElementById("devicesTableBody");
    tbody.innerHTML = "";
    deviceList.forEach(device => {
        tbody.innerHTML += `
        <tr>
            <td>${device.deviceId}</td>
            <td>${device.userid}</td>
            <td>${device.productCode}</td>
            <td>${device.channelCount}</td>
            <td>
                <button onclick="editDevice('${device.deviceId}')">Edit</button>
                <button onclick="deleteDevice('${device.deviceId}')">Delete</button>
            </td>
        </tr>
        `;
    });
}

function sortUsers() {
    users.sort((a, b) => {
        if (userSortAsc) {
            return a.userid.localeCompare(b.userid);
        }
        return b.userid.localeCompare(a.userid);
    });
    userSortAsc = !userSortAsc;
    document.getElementById("userSortHeader").textContent = userSortAsc ? "User ID (Z - A)" : "User ID (A - Z)";
    renderUsers(users);
}

function sortDevices() {
    devices.sort((a, b) => {
        if (deviceSortAsc) {
            return a.deviceId.localeCompare(b.deviceId);
        }
        return b.deviceId.localeCompare(a.deviceId);
    });
    deviceSortAsc = !deviceSortAsc;
    document.getElementById("deviceSortHeader").textContent = deviceSortAsc ? "Device ID (Z - A)" : "Device ID (A - Z)";
    renderDevices(devices);
}

loadUsers();
loadDevices();
loadStats();