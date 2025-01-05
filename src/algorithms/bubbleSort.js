const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const bubbleSort = async (array, onCompare, delayMs, getIsPaused, getIsReset) => {
    const arrayToSort = [...array];
    let swapped = false;

    do {
        swapped = false;
        for (let i = 1; i < arrayToSort.length; i++) {
            // Check for reset first
            if (getIsReset()) {
                return arrayToSort;
            }

            if (getIsPaused()) {
                onCompare(arrayToSort, []);
                return arrayToSort;
            }

            if (arrayToSort[i - 1] > arrayToSort[i]) {
                swapped = true;
                [arrayToSort[i - 1], arrayToSort[i]] = [arrayToSort[i], arrayToSort[i - 1]];
                
                if (onCompare) {
                    onCompare(arrayToSort, [i - 1, i]);
                    await sleep(delayMs);
                }
            }
        }
    } while (swapped);

    // Clear comparing indexes when done
    if (onCompare) {
        onCompare(arrayToSort, []);
    }

    return arrayToSort;
};