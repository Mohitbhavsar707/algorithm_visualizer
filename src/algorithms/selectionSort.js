// Helper function to create a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to swap elements in array
async function swap(array, i, j, onCompare, delayMs, isPaused, isReset) {
    while (isPaused()) {
        await delay(100);
        if (isReset()) return false;
    }
    if (isReset()) return false;

    onCompare([...array], [i, j]);
    await delay(delayMs);

    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    onCompare([...array], [i, j]);
    await delay(delayMs);
    
    return true;
}

export async function selectionSort(array, onCompare, delayMs, isPaused, isReset) {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 0; i < n - 1; i++) {
        if (isReset()) return arrayCopy;
        
        let minIndex = i;
        
        // Find the minimum element in the unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (isReset()) return arrayCopy;
            
            while (isPaused()) {
                await delay(100);
                if (isReset()) return arrayCopy;
            }
            
            // Visualize comparison
            onCompare([...arrayCopy], [minIndex, j]);
            await delay(delayMs);
            
            if (arrayCopy[j] < arrayCopy[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element of the unsorted portion
        if (minIndex !== i) {
            const success = await swap(
                arrayCopy,
                i,
                minIndex,
                onCompare,
                delayMs,
                isPaused,
                isReset
            );
            if (!success) return arrayCopy;
        }
    }
    
    return arrayCopy;
}