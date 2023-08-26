if (self !== top) {
    const html = document.getElementsByTagName("html")[0];
    html.style.overflowX = "clip";
    const box = document.getElementsByClassName("lf_area")[0];
    if (box) {
        box.style.width = "400px";
        box.style.padding = "20px";
    }
    const idiom = document.getElementById("idiom_0");
    if (idiom) {
        idiom.style.width = "90%";
    }
}
