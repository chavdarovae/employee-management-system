const baseUrl = "https://yukauijdnpyyejbrqlfh.supabase.co/rest/v1/users";
const apiKey = "sb_publishable_wALp7ccw7naKjMiuuoooUw_dje6rr5m";

export async function fetchUsers() {
    const response = await fetch(baseUrl, {
        headers: {
            apiKey,
        },
    }).catch((err) => console.error("Error fetching users: " + err));

    // @ts-ignore
    const userList = await response.json();
    return userList;
}

export async function saveUser(user) {
    return await fetch(baseUrl, {
        method: "POST",
        headers: {
            apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).catch((err) => console.error("Error saving user: " + user.lastName));
}

export async function deleteUser(userId) {
    return await fetch(`${baseUrl}?id=eq.${userId}`, {
        method: "DELETE",
        headers: {
            apiKey,
        },
    }).catch((err) => console.error("Error deleting user with id: " + userId));
}
