export default function authHeader() {
    const accessToken = sessionStorage.getItem('access_token');

    if (accessToken) {
        // For Spring Boot back-end
        return { Authorization: 'Bearer ' + accessToken };

        // for Node.js Express back-end
        // return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}
