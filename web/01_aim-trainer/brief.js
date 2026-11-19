// 1. Persistent Requirements Checklist (localStorage)
const STORAGE_KEY = "minigames_001_aim_trainer_reqs";
const checkboxes = document.querySelectorAll('#req-list input[type="checkbox"]');
const progressText = document.getElementById("req-progress");

function loadChecklistState() {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    checkboxes.forEach((box) => {
        const key = box.dataset.req;
        if (saved[key]) {
            box.checked = true;
            box.closest("li").classList.add("done");
        }
    });
    updateProgressCount();
}

function saveChecklistState() {
    const state = {};
    checkboxes.forEach((box) => {
        state[box.dataset.req] = box.checked;
        box.closest("li").classList.toggle("done", box.checked);
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateProgressCount();
}

function updateProgressCount() {
    const completed = document.querySelectorAll('#req-list input[type="checkbox"]:checked').length;
    progressText.textContent = `${completed} / ${checkboxes.length} completed`;
}

checkboxes.forEach((box) => {
    box.addEventListener("change", saveChecklistState);
});

loadChecklistState();

// 2. One-Click Copy for Google Search Queries
const chips = document.querySelectorAll("#search-chips .chip");

chips.forEach((chip) => {
    chip.addEventListener("click", () => {
        const query = chip.dataset.query;
        navigator.clipboard.writeText(query).then(() => {
            chip.classList.add("copied");

            setTimeout(() => {
                chip.classList.remove("copied");
            }, 1400);
        });
    });
});

// 3. Solution Gate Reminder
const solutionBtn = document.getElementById("solution-btn");

solutionBtn.addEventListener("click", (event) => {
    const confirmed = confirm(
        "Have you tried building this yourself using Google Search and documentation (without AI/LLMs) before viewing the solution?"
    );
    if (!confirmed) {
        event.preventDefault();
    }
});