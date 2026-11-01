export default function switchButton() {
    const checkbox = document.getElementById("CheckBoxInput")

    checkbox.addEventListener("change", () => {
            if (checkbox.checked === false) {
                // هر موقع که لازم بود، بدنه را پر میکنیم
            } else {

            }
        }
    )

    return (
    <label class="switch">
        <input type="checkbox" id="checkBoxInput" />
        <span class="slider"></span>
    </label>
    );
}