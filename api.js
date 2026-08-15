const USE_LOCAL_BACKEND = false; // true = localhost, false = Render

const API = USE_LOCAL_BACKEND
    ? "http://localhost:3000"
    : "https://api.veyora.in";

const SOCKET_URL = API;

console.log(
    `Using ${USE_LOCAL_BACKEND ? "Local" : "Production"} Backend`
);

async function apiFetch(path, options = {}) {
    const response = await fetch(`${API}${path}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });
    if (response.status === 401 && !options.skipAuthRedirect) {
        window.location.replace("../index.html");
        return null;
    }
    return response;
}