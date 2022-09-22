
export const getToken = () => {
    const token = localStorage.getItem('token');
    console.log('GETTOKEN', token);
    return token
}


export const removeToken = () => {
    localStorage.removeItem('token');
}

export const setToken = (val) => {
    localStorage.setItem('token', val);
}