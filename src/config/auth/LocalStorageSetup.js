
// set user to local storage
export const SetWithExpiry = (key, value, ttl) => {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire (ttl in ms)
    const item = {
        user: value,
        expires: now.getTime() + ttl,
    };
    console.log(value);
    localStorage.setItem(key, JSON.stringify(item));
};

export const GetWithExpiry = (key) => {
    
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
        console.log(('not'));
        return null;
    } else {
        const item = JSON.parse(itemStr);
        const now = new Date();
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expires) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key);
            return null
        }
        console.log(item)
        return item
    }   
};

export const removeItem = (key) => {
    localStorage.removeItem(key)
}

