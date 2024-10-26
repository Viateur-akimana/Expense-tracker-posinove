export const signup = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
};


export const login = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((user: any) => user.username === username && user.password === password);
    if (userExists) {
        localStorage.setItem("authToken", JSON.stringify({ username }));
        return true; 
    }
    return false; 
};


export const logout = () => {
    localStorage.removeItem("authToken");
};

export const isAuthenticated = () => {
    return Boolean(localStorage.getItem("authToken"));
};
