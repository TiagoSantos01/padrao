function carregamento(type, atributos) {
    return new Promise(async (result) => {
        let arquivo = document.createElement(type);
        await atributos.forEach(async atributo => {
            arquivo.setAttribute(atributo.constructor.keys(atributo), atributo.constructor.values(atributo))
        });
        arquivo.onload = () => result(element);
        element = document.head.appendChild(arquivo);
    });


};
function image(url) {
    return new Promise((result) => {
        fetch(url).then((response) => {
            return response.blob();
        }).then((blob) => { result(URL.createObjectURL(blob)) })
    })
};

function request(url, form) {
    return new Promise((result) => {
        fetch(url, {
            headers: { 'Accept': 'application/json' },
            method: "POST",
            body: JSON.stringify(form)
        }).then(res => { return res.json(); })
            .then(data => { result(data) })
            .catch(err => { result({ error: true, msg: `${err}` }); })
    })
}
function insert(element, local, newElement) {
    let tipo;
    switch (local) {
        case "comeco":
            //antes do bloco
            tipo = 'beforeBegin'
            break;
        case "fim":
            // depois do bloco
            tipo = 'afterEnd'
            break;
        case "dentroultimo":
            //dentro do bloco mas no final dele
            tipo = 'beforeEnd'
            break;
        case "dentroprimeiro":
            //dentro do bloco mas no começo
            tipo = 'afterBegin'
            break;
        default:
            tipo = null;
            break;
    }
    if (tipo != null)
        return element.insertAdjacentHTML(tipo, newElement);
}




//=====================
//=====================
//=====================
window.onload = async () => {
    await carregamento('script', [{ src: `./js/${document.querySelector("[data-pagina]").dataset.pagina}.js` }])
    
}