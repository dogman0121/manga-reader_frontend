const useDebounce = (func: Function, delay: number) => {
    let timerId: number;
    
    return function(this: any, ...args: any[]) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            func(...args);
        }, delay)
    }
}

export default useDebounce;