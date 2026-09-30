import { buscarCep } from "../services/viacep.js";

let form = document.querySelector('#form-cadastro') 
let campoCep = document.querySelector('#cep') 

campoCep.addEventListener('blur', async () => {
    if(!campoCep.value) return

    try {
        let endereco = await buscarCep(campoCep.value)
        document.querySelector('#logradouro').value = endereco.logradouro
        document.querySelector('#bairro').value = endereco.bairro
        document.querySelector('#cidade').value = endereco.localidade
        document.querySelector('#uf').value = endereco.uf
    } catch (error) {
        console.error(error.message)
    }
})