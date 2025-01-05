const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const heapify = async (arr, n, i, onCompare, delayMs, getIsPaused, getIsReset) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (getIsReset()) return;
    
    while (getIsPaused()) {
        if (getIsReset()) return;
        await sleep(100);
    }

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        onCompare(arr, [i, largest]);
        await sleep(delayMs);
        await heapify(arr, n, largest, onCompare, delayMs, getIsPaused, getIsReset);
    }
};

export const heapSort = async (array, onCompare, delayMs, getIsPaused, getIsReset) => {
    const arr = [...array];
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (getIsReset()) return arr;
        await heapify(arr, n, i, onCompare, delayMs, getIsPaused, getIsReset);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        if (getIsReset()) return arr;
        
        while (getIsPaused()) {
            if (getIsReset()) return arr;
            await sleep(100);
        }

        [arr[0], arr[i]] = [arr[i], arr[0]];
        onCompare(arr, [0, i]);
        await sleep(delayMs);

        await heapify(arr, i, 0, onCompare, delayMs, getIsPaused, getIsReset);
    }

    if (!getIsReset()) {
        onCompare(arr, []);
    }

    return arr;
};