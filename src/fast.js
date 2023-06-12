export function initFast() {
    function getTimeMultiplier() {
        let multiplier = 0.25;

        try {
            multiplier = parseFloat(window.localStorage.getItem("time_multiplier")) || multiplier;
        } catch (e) { }

        return multiplier;
    }

    function setTimeMultiplier(value) {
        window.localStorage.setItem("time_multiplier", value);
    }

    const multiplierValues = [0.25, 0.5, 1, 2, 4, 8, 16, 32, 64, 128];
    const currentMultiplier = getTimeMultiplier();

    const sub = $(`<span role="button" class="sub">«</span>`);
    const current = $(`<span class="current">${currentMultiplier.toString()}</span>`);
    const add = $(`<span role="button" class="add">»</span>`);

    sub.click(() => {
        const currentMultiplier = getTimeMultiplier();

        const currentIndex = multiplierValues.indexOf(currentMultiplier);
        if (currentIndex !== -1 && currentIndex > 0) {
            const newMultiplier = multiplierValues[currentIndex - 1];
            current.text(newMultiplier.toString());
            setTimeMultiplier(newMultiplier);
        }
    });

    add.click(() => {
        const currentMultiplier = getTimeMultiplier();

        const currentIndex = multiplierValues.indexOf(currentMultiplier);
        if (currentIndex !== -1 && currentIndex < multiplierValues.length - 1) {
            const newMultiplier = multiplierValues[currentIndex + 1];
            current.text(newMultiplier.toString());
            setTimeMultiplier(newMultiplier);
        }
    });

    const container = $(`<div></div>`);
    container.append($(`<span>Time multiplier</span>`));
    container.append(sub);
    container.append(current);
    container.append(add);
    $("#settings").prepend(container);
}
