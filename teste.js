const addBtn = document.querySelector(".btn")
const categoryList = [{name: "Lazer", type: "despesa"},
                        {name: "Alimentação", type: "despesa"},
                        {name: "Estudos", type: "despesa"},
                        {name: "Pessoais", type: "despesa"},
                        {name: "Saúde", type: "despesa"},
                        {name: "Pet", type: "despesa"},
                        {name: "Família", type: "despesa"},
                        {name: "Outros", type: "despesa"},
                        {name: "Salário", type: "receita"},
                        {name: "Bolsa", type: "receita"},
                        {name: "Mesada", type: "receita"},
                        {name: "Auxílio", type: "receita"}];

const getTypeTransactionByName = (transaction, list) => {
    return (list.find(elem => elem.name.toLowerCase() == transaction.toLowerCase())).type
};

//carregar as categorias da página...

const loadCategory = (lista, seletor) => {
    const categoryDataList = document.querySelector(seletor);

    //1. carregando as options com os elementos
    const opcoes = lista.reduce((acum, elem)=>{
        return acum + `<option value="${elem.name}">`;
    }, "")
    console.log(opcoes);
    //2. carregar o datalist com as opções
    categoryDataList.innerHTML = opcoes;
}

loadCategory(categoryList, "#categoryList");
/**
 * Função returna um objeto com os dados do formulário
 * @returns value, name, total, categoryName, categoryType
 */
const getFormValues = () => {
    //dados da nova entrega
    const transactionName = document.querySelector("#transactionName").value;
    const amount = parseFloat(document.querySelector("#amount").value);
    //categoria da nova entrada
    const categoryName = document.querySelector("#category").value;
    const categoryType = getTypeTransactionByName(categoryName ,categoryList)

    //valor total
    let total = document.querySelector("#balance").textContent;
    total = parseFloat(total.substring(3,total.length));
    //b. Identificar o valor da despesa/receita
    total = (categoryType == "receita") ? amount + total : total - amount
    return {value: amount,
        name: transactionName,
        total: total,
        categoryName: categoryName,
        categoryType: categoryType}
}



/**
 * Conerte moeda para float
 * @param {currency} moeda
 * @returns {Number} valor
 */
const currencyToNumber = valor => parseFloat(("" + valor).substring(4,valor.length));

/**
 * Converte a string para o tipo moeda
 * @param {String} valor
 * @returns moeda
 */
const stringToCurrency = valor => `R$ ${valor.toFixed(2)}`;
const clearForm = () =>{
    document.querySelector("#transactionName").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector("#category").value = "";
}
const loadBalance = () => {
    //1.atualizar o valor de #balance
        //a. Recuperar os vaalores digitados
        const formData = getFormValues()
        console.log(formData)
        //atualizar o DOM
        document.querySelector("#balance").textContent = stringToCurrency(formData.total);
        
    //2.adicionar a transação em despesa (#money-minus) ou receita (#money-plus)
    //Se for receita
        //recuperar o valor #money-plus
        let moneySelector = (formData.categoryType == "receita")? "#money-plus" : "#money-minus";


        document.querySelector(moneySelector).textContent = stringToCurrency(formData.value);
        //soma o valor ao #money-plus

    //3.adicionar a transação na lista
    //#transactions
    const ulTransaction = document.querySelector(".transactions");
    const transactionClass = (formData.categoryType == "receita") ? "plus" : "minus"
    const operator = (formData.categoryType == "receita") ? "+" : "-"
    //se transação for de despesa
    ulTransaction.innerHTML += `<li class="${transactionClass}">
          ${formData.name} <span>${operator}${stringToCurrency(formData.value)}</span><button class="delete-btn">x</button>
    </li>`
    
    //salvar as transações na localstorage
    clearForm();
    //localStorage.getItem("transacao")
    //localStorage.transacao = "Xablau"
    //localStorage.transacao -> Xablau
    //delete localStorage.transacao
}


addBtn.addEventListener("click", () => {
    loadBalance();
})