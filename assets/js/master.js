function showTip(text) {
    var tip = document.getElementById("tnxg_tip");
    if (tip) {
        tip.innerHTML = text;
        tip.style.display = "block";
    } else {
        tip = document.createElement("div");
        tip.id = "tnxg_tip";
        tip.innerHTML = text;
        document.body.appendChild(tip);
    }
    setTimeout(function () {
        tip.style.display = "none";
    }, 8000);
}