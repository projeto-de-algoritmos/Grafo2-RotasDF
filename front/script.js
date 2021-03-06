let searchButton;

$(document).ready(function(){
    searchButton = $("#searchBtn");

    searchButton.click(pesquisar);
    
})

function pesquisar() {

    var loc = document.getElementById('origem')
    var dest = document.getElementById('destino')

    for (i = loc.value; i < dest.length; i++) {
        document.getElementById("destino").onclick = function() {
            dest.remove(i);
        };
    }

    if (loc.value == '' || dest.value == '') {
        window.alert('[ERROR] Não é possível pesquisar campos vazios. Verifique os dados e tente novamente!')
    } else if (dest.value == loc.value) {
        window.alert('[ERROR] Não é possível pesquisar campos iguais. Verifique os dados e tente novamente!')
    } else {
        var $origem = $('#origem');
        var $destino = $('#destino');
        var $rota = $('#rotaPesquisada');

        $rota[0].innerHTML = 'A rota selecionada passa pelas seguintes cidades respectivamente: ';
        console.log($rota);
        let data = {	
            origem : $origem[0].value, 
            destino : $destino[0].value
        };
        let url = "http://localhost:8000/";
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: (res)=>{
                let cidades = res.caminho;
                console.log(cidades[cidades.length-1]);
                let count = 1;
                for(let i = cidades.length-1; i >= 0; i--){
                    $rota[0].innerHTML += (`<h5> <b>${count++}. <b> ${cidades[i]}</h5>`);
                }

            }
        });
    }
}

