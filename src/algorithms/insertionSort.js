const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const insertionSort = async (array, onCompare, delayMs, getIsPaused, getIsReset) => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        // Check reset first
        if (getIsReset()) return arr;
        
        let current = arr[i];
        let j = i - 1;
        
        // Highlight current element being inserted
        onCompare(arr, [i]);
        await sleep(delayMs);

        while (j >= 0 && arr[j] > current) {
            // Check for reset
            if (getIsReset()) return arr;
            
            // Handle pause
            while (getIsPaused()) {
                if (getIsReset()) return arr;
                await sleep(100);
            }

            // Move elements forward
            arr[j + 1] = arr[j];
            onCompare(arr, [j, j + 1]);
            await sleep(delayMs);
            j--;
        }

        arr[j + 1] = current;
        onCompare(arr, [j + 1]);
        await sleep(delayMs);
    }

    // Clear comparing indexes if not reset
    if (!getIsReset()) {
        onCompare(arr, []);
    }

    return arr;
};