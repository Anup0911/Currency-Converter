let url = 'https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=INR&q=100.0';

const selects=document.querySelectorAll(".dropdown select");
const amount=document.querySelector(".amount input");
let button=document.querySelector("button");
let first=document.querySelector("#first");
let second=document.querySelector("#second");
let message=document.querySelector(".msg");

for(select of selects){
    for(code in countryList){
        let newelement=document.createElement("option");
        newelement.innerText=code;
        newelement.value=code;
        if(code==='INR' && select.name==='to'){
            newelement.selected='selected';
        }
        if(code==='AUD' && select.name==='from'){
            newelement.selected='selected';
        }
        select.append(newelement);
    }
    select.addEventListener("change",(e)=>{
        updateflag(e.target);
    })
}

const updateflag=(select)=>{
    let value=select.value;
    // console.log(value);
    let countrycode=countryList[value];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let image=select.parentElement.querySelector("img");
    image.src=newSrc;
};

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '503e31c5b5msh8b29f818fd68d11p1fbfc1jsn92ad1b660b76',
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
};
button.addEventListener('click',(e)=>{//e is event obj
    e.preventDefault();
    let from=first.value;
    let to=second.value;
    
    let amt=amount.value;
    if(amt===0 || amt<1){
        alert("Invalid amount\nEnter a number greater than 0")
        amt=1;
        amount.value=1;
    }
    url=`https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=1.0`;
    // GetData();
    (async function(){
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            let finalresult=result*amt;
            message.innerText=`${amt} ${from} = ${finalresult} ${to}`;
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    
    })();

})


