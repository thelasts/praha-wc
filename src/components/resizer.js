export async function initResizer() {
    const resizer = document.getElementById("resizer");
    const tableDiv = document.getElementById("tableDiv");
    const appLayout = document.querySelector(".app-layout");

    if (!resizer || !tableDiv || !appLayout) return;
    // @media mobile
    const mobileMq = window.matchMedia("(hover: none) and (pointer: coarse)");
    let isResizing = false;

    function isMobileMode() {
        return mobileMq.matches;
    }

    function setMobileState() {
        isResizing = false;
        document.body.style.cursor = "";
        tableDiv.style.pointerEvents = "auto";

        if (isMobileMode()) {
            resizer.setAttribute("role", "button");
            resizer.setAttribute("tabindex", "0");
            resizer.setAttribute("aria-expanded", !tableDiv.classList.contains("is-collapsed"));
            resizer.title = "Show or hide table";

        } else {
            resizer.removeAttribute("role");
            resizer.removeAttribute("tabindex");
            resizer.removeAttribute("aria-expanded");
            resizer.title = "Resize table";
            tableDiv.classList.remove("is-collapsed");
            tableDiv.style.height = "";
        }
    }

    function toggleTable() {
        tableDiv.classList.toggle("is-collapsed");
        resizer.setAttribute(
            "aria-expanded",
            String(!tableDiv.classList.contains("is-collapsed"))
        );
    }

    resizer.addEventListener("click", (e) => {
        if (!isMobileMode()) return;
        e.preventDefault();
        toggleTable();
    });

    resizer.addEventListener("keydown", (e) => {
        if (!isMobileMode()) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleTable();
        }
    });

    resizer.addEventListener("mousedown", (e) => {
        if (isMobileMode()) return;

        isResizing = true;
        document.body.style.cursor = "ns-resize";
        tableDiv.style.pointerEvents = "none";
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if (!isResizing || isMobileMode()) return;

        const containerRect = appLayout.getBoundingClientRect();
        const pointerRelativeY = e.clientY - containerRect.top;

        let newTableHeight =
            containerRect.height - pointerRelativeY - resizer.offsetHeight;

        const maxTableHeight = containerRect.height - 150;

        if (newTableHeight < 0) newTableHeight = 0;
        if (newTableHeight > maxTableHeight) newTableHeight = maxTableHeight;

        tableDiv.style.height = `${newTableHeight}px`;
    });

    document.addEventListener("mouseup", () => {
        if (!isResizing) return;

        isResizing = false;
        document.body.style.cursor = "";
        tableDiv.style.pointerEvents = "auto";
    });

    if (mobileMq.addEventListener) {
        mobileMq.addEventListener("change", setMobileState);
    }

    setMobileState();
}