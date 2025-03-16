const useDebounce = (func: Function, delay: number) => {    
    return function(this: any, ...args: any[]) {
        clearTimeout(this.timerId);

        this.timerId = setTimeout(() => {
            func(...args);
        }, delay)
    }
}

export default useDebounce;