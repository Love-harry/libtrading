(function () {

    var area = document.createElement('textarea');
    document.body.appendChild(area);
    area.style.display = "none";

    var content = document.querySelectorAll('.js-content');
    var copy = document.querySelectorAll('.js-copy');

    for (var i = 0; i < copy.length; i++) {
        copyOnClick(i);
    }

    function copyOnClick(i) {
        copy[i].addEventListener('click', function () {
            area.style.display = "block";
            area.value = content[i].value;
            area.select();
            document.execCommand('copy');
            area.style.display = "none";

            var t = this;
            t.innerHTML = `<i class="icon ion-md-checkmark mr-2" ></i >Copied`;
            setTimeout(function () {
                t.innerHTML = `<i class="icon ion-md-copy mr-2"></i >Copy`
            }, 2500);
        });
    }

})();