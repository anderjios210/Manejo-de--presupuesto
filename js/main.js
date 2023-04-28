/* variables y constantes */
const inicio = document.querySelector('#inicio'),
    fgastos = document.querySelector('#fgastos'),
    resultado = document.querySelector('#pintar'),
    agregar = document.querySelector('#agregar'),
    aparecer = document.querySelector('#oculto'), 
    cardrestante = document.querySelector('#cardrestante'), 
    r = document.querySelector('#restante');   
let va=document.querySelector('#pres'),
    presupuesto =[],
    gastos = [],
    restante;


/* funciones */
    /* crear gastos */
const Crearitems = (nomgastos,vg)=>{
    let items={
        nombregastos:nomgastos,
        vgasto:vg,
    }
    gastos.push(items);
    return items;
};


    /*crear presupuesto */
const presu=(valor)=>{
    it={
        presup:valor,
        }
    presupuesto.push(valor);
}
const gp=(v)=>{
    restante=v
    return restante;
};
const f =new Intl.NumberFormat('es-ES',{
    style:'currency',
    currency: 'cop'    
});

    /* almacenar en local storage gastos */
const Guardarlocal =() =>{
    localStorage.setItem('keygastos',JSON.stringify(gastos));
    }
    /* almacenar en local storage presupuesto */
const Guardarpres =() =>{
    localStorage.setItem('keypresupuesto',JSON.stringify(presupuesto))
    }
const Guardarestante =() =>{
    localStorage.setItem('keyrestante',JSON.stringify(restante))
    }

const Pintar=()=>{
    resultado.innerHTML='';
    
    gastos = JSON.parse(localStorage.getItem('keygastos'));
    restante = JSON.parse(localStorage.getItem('keyrestante'));
    r.innerHTML+=``;
    
    if (gastos===null) {
        gastos=[];
    }else{
        gastos.reverse();
        gastos.forEach(element => {            
            resultado.innerHTML+=`                      
                <div class="card-body text-center">                  
                    <div class="alert alert-danger">                    
                        <b id="nombredegasto">Gasto: ${element.nombregastos}</b><br>
                        <b id="valorgasto"> ${f.format(element.vgasto)}</b><br>                                
                    </div>
                </div>`
                
                });         
        };
        
};
const P=()=>{
    a =JSON.parse(localStorage.getItem('keypresupuesto'))
    b = JSON.parse(localStorage.getItem('keyrestante'))
    if(b===null){
    r.innerHTML=`<h3 class="fw-bold text-center text-negro mb-5">Presupuesto: ${f.format(a)}</h3>
            <h3 class="fw-bold text-center text-negro mb-5">Restante: ${f.format(a)}</h3>`
    }else if(b<=0){
        r.innerHTML=`<h3 class="fw-bold text-center text-negro mb-5">Presupuesto: ${f.format(a)}</h3>
        <h3 class="fw-bold text-center text-negro mb-5" id="uno">Restante: ${f.format(b)}</h3>`
        
    }else{        
        r.innerHTML=`<h3 class="fw-bold text-center text-negro mb-5">Presupuesto: ${f.format(a)}</h3>
        <h3 class="fw-bold text-center text-negro mb-5" >Restante: ${f.format(b)}</h3>`
    }
}

// eventos

agregar.addEventListener('click',(d)=>{
    d.preventDefault();
    if (va.value===null || va.value ==='' || va<=0) {
    alert("Ingresa un presupuesto");
    }else{        
    aparecer.classList.remove("d-none");
    cardrestante.classList.remove("d-none");
    inicio.classList.add("d-none"); 
    presu(va.value);      
    Guardarpres();
    gp(va.value); 
    Guardarestante();
    P();    
    };
});

fgastos.addEventListener('submit', (e)=>{
    e.preventDefault();    
    let nombregasto=document.querySelector('#ngasto').value,
        valoregasto=document.querySelector('#vgasto').value,
        resta = JSON.parse(localStorage.getItem('keyrestante'));        
    if (nombregasto===null || valoregasto === null ||nombregasto==='' || valoregasto ==='' || valoregasto<=0) {
        alert("Ingresa un gasto");
    }else{    
    Crearitems(nombregasto,valoregasto);
    Guardarlocal();
    
    gp(resta-valoregasto); 
    Guardarestante();
    r.innerHTML+=``;
    P();
    Pintar();
    fgastos.reset();     
    }
});

    document.addEventListener('DOMContentLoaded',()=>{
        resultado.innerHTML='';  
        if(JSON.parse(localStorage.getItem('keypresupuesto'))!=null){
            aparecer.classList.remove("d-none");
            cardrestante.classList.remove("d-none");
            inicio.classList.add("d-none");
            r.innerHTML+=``;
            P();
            Pintar();            
            }
    });