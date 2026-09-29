const baseUrl = "https://yukauijdnpyyejbrqlfh.supabase.co/rest/v1/users";
const apiKey = "sb_publishable_wALp7ccw7naKjMiuuoooUw_dje6rr5m";

const getHeaders = (isJson = false) => {
    const headers = {
        apiKey,
        Authorization: `Bearer ${apiKey}`,
    };
    if (isJson) {
        headers["Content-Type"] = "application/json";
        headers["Prefer"] = "return=representation";
    }
    return headers;
};

export async function fetchUsers(page = 1, pageSize = 10) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    try {
        const response = await fetch(baseUrl, {
            headers: {
                ...getHeaders(),
                Range: `${start}-${end}`,
                Prefer: "count=exact",
            },
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Supabase sends a 'Content-Range' header back containing total rows
        // Example header value: "0-9/45" (means items 0 to 9 out of 45 total)
        const contentRange = response.headers.get("Content-Range");
        let totalCount = 0;
        if (contentRange) {
            const parts = contentRange.split("/");
            if (parts.length > 1) {
                totalCount = parseInt(parts[1], 10);
            }
        }

        return {
            data,
            totalCount,
        };
    } catch (err) {
        console.error("Error fetching user list! ", err);
        return [];
    }
}

export async function fetchUserById(userId) {
    try {
        const response = await fetch(`${baseUrl}?id=eq.${userId}`, {
            headers: getHeaders(),
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (err) {
        console.error(`Error fetching user with id: ${userId}`, err);
        return [];
    }
}

export async function createUser(user) {
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: getHeaders(true),
            body: JSON.stringify(user),
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        alert(
            `User ${user.firstName} ${user.lastName} has been successfully saved!`,
        );
        return await response.json();
    } catch (err) {
        console.error(
            `Error saving user ${user.firstName} ${user.lastName}`,
            err,
        );
    }
}

export async function updateUser(userId, user) {
    try {
        const response = await fetch(`${baseUrl}?id=eq.${userId}`, {
            method: "PATCH",
            headers: getHeaders(true), // Added Content-Type and Prefer headers here
            body: JSON.stringify(user),
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        alert(`User with id: ${userId} has been successfully updated!`);
        return await response.json();
    } catch (err) {
        console.error(
            `Error updating user ${user.firstName} ${user.lastName}`,
            err,
        );
    }
}

export async function deleteUser(userId) {
    try {
        const response = await fetch(`${baseUrl}?id=eq.${userId}`, {
            method: "DELETE",
            headers: getHeaders(),
        });

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        alert(`User with id: ${userId} has been successfully deleted!`);
    } catch (err) {
        console.error(`Error deleting user with id: ${userId}`, err);
    }
}
