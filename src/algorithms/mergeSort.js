// Helper function to create a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function merge(array, start, mid, end, onCompare, delayMs, isPaused, isReset) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
    
    let i = 0;
    let j = 0;
    let k = start;
    
    while (i < leftArray.length && j < rightArray.length) {
        // Check for pause and reset
        while (isPaused()) {
            await delay(100);
            if (isReset()) return;
        }
        if (isReset()) return;
        
        // Visualize comparison
        onCompare([...array], [start + i, mid + 1 + j]);
        await delay(delayMs);
        
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        k++;
        onCompare([...array], [k]);
    }
    
    // Copy remaining elements of leftArray if any
    while (i < leftArray.length) {
        if (isReset()) return;
        while (isPaused()) {
            await delay(100);
            if (isReset()) return;
        }
        
        array[k] = leftArray[i];
        onCompare([...array], [k]);
        await delay(delayMs);
        i++;
        k++;
    }
    
    // Copy remaining elements of rightArray if any
    while (j < rightArray.length) {
        if (isReset()) return;
        while (isPaused()) {
            await delay(100);
            if (isReset()) return;
        }
        
        array[k] = rightArray[j];
        onCompare([...array], [k]);
        await delay(delayMs);
        j++;
        k++;
    }
}

async function mergeSortHelper(array, start, end, onCompare, delayMs, isPaused, isReset) {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    
    await mergeSortHelper(array, start, mid, onCompare, delayMs, isPaused, isReset);
    if (isReset()) return;
    
    await mergeSortHelper(array, mid + 1, end, onCompare, delayMs, isPaused, isReset);
    if (isReset()) return;
    
    await merge(array, start, mid, end, onCompare, delayMs, isPaused, isReset);
}

export async function mergeSort(array, onCompare, delayMs, isPaused, isReset) {
    const arrayCopy = [...array];
    await mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1, onCompare, delayMs, isPaused, isReset);
    return arrayCopy;
}