export async function initResizer() {
    const resizer = document.getElementById("resizer");
    const tableDiv = document.getElementById("tableDiv");
    const appLayout = document.querySelector(".app-layout");

    let isResizing = false;

    // 1. User clicks the resizer
    resizer.addEventListener("mousedown", (e) => {
        isResizing = true;
        // Optional: Disable map interaction during drag for smoother experience
        document.body.style.cursor = "ns-resize";
        tableDiv.style.pointerEvents = "none";
    });

    // 2. User moves the mouse
    document.addEventListener("mousemove", (e) => {
        if (!isResizing) return;

        const containerRect = appLayout.getBoundingClientRect();
        const pointerRelativeY = e.clientY - containerRect.top;

        // The new height of the table is the total height minus the mouse Y position
        // minus the height of the resizer itself
        let newTableHeight = containerRect.height - pointerRelativeY - resizer.offsetHeight;

        // Prevent the table from overflowing the screen or getting too big
        const maxTableHeight = containerRect.height - 150; // Leave at least 150px for the map

        if (newTableHeight < 0) newTableHeight = 0; // Completely hidden
        if (newTableHeight > maxTableHeight) newTableHeight = maxTableHeight;

        // Apply the new height
        tableDiv.style.height = `${newTableHeight}px`;
    });

    // 3. User releases the mouse
    document.addEventListener("mouseup", () => {
        if (isResizing) {
            isResizing = false;
            // Restore normal behavior
            document.body.style.cursor = "default";
            tableDiv.style.pointerEvents = "auto";
        }
    });
}