let id = 0;
let arrayGastos = [];
let totalGastos = 0;

const getId = () => {
  id++
  return id
};


const getGastoObj = (gasto, valor) =>{
  const NewGasto = {
    id: getId(),
    gasto: gasto,
    valor: parseInt(valor)
  }
  return JSON.parse(JSON.stringify(NewGasto));
}


const addTabla = (Gasto) => {
  const tabla = document.querySelector('.container-valores');
  tabla.innerHTML += `<div class="subcontainer-valores" id="elemento${Gasto.id}">
    <div>${Gasto.gasto}</div>
    <div>$${Gasto.valor}</div>
    <div><a onclick="eliminar(${Gasto.id})"><i class="bi bi-trash-fill"></i></a></div>
    </div>`;
}


const inputGasto = () => {
  let nombreGasto = document.querySelector('#nombre-gastos').value;
  let valorGastos = document.querySelector('#cantidad-gastos').value;

  let Gasto = getGastoObj(nombreGasto, valorGastos);
  console.log('Gasto:', Gasto);
}


const btnGastos = document.querySelector('.btn-gastos');
btnGastos.addEventListener("click", () => {
  let nombreGasto = document.querySelector('#nombre-gastos').value;
  let valorGastos = document.querySelector('#cantidad-gastos').value;

  let Gasto = getGastoObj(nombreGasto, valorGastos);
  addTabla(Gasto);

  totalGastos += Gasto.valor;
  let gastosTabla = document.querySelector('#gastos-tabla');
  gastosTabla.innerHTML = `$${totalGastos}`;
  document.querySelector("#nombre-gastos").value = "";
  document.querySelector("#cantidad-gastos").value = "";

  arrayGastos.push(Gasto);
});


const btnPresupuesto = document.querySelector('.btn-presupuesto');
btnPresupuesto.addEventListener("click", () => {
  let valorPresupuesto = parseInt(document.querySelector('#presupuesto').value);
  let presupuestoTabla = document.querySelector("#presupuesto-tabla");
    
  presupuestoTabla.innerHTML="";
  presupuestoTabla.innerHTML=`$${valorPresupuesto}`;
  document.querySelector("#presupuesto").value = "";
});

const eliminar = (id) => {
  arrayGastos = arrayGastos.filter((gasto) => {
    if (gasto.id == id) {
      let filaABorrar = document.getElementById("elemento"+gasto.id);
      filaABorrar.remove();
      totalGastos -= gasto.valor;
      let gastosTabla = document.querySelector('#gastos-tabla');
      gastosTabla.innerHTML = `$${totalGastos}`
      return false;
    }
    return true;
  })
  //ELIMINAR ESTO
  console.log(arrayGastos);
}






// const btnEliminar = document.querySelector('.btn-eliminar');
// btnEliminar.addEventListener("click", () => {

// })





/*
const btnPresupuesto = document.querySelector('.btn-presupuesto');
const btnGastos = document.querySelector('.btn-gastos');

btnPresupuesto.addEventListener("click", () => {
  let valorPresupuesto = parseInt(document.querySelector('#presupuesto').value);
  let presupuestoTabla = document.querySelector("#presupuesto-tabla");
    
  presupuestoTabla.innerHTML="";
  presupuestoTabla.innerHTML=`$${valorPresupuesto}`;
});

btnGastos.addEventListener("click", () => {
  let valorGastos = parseInt(document.querySelector('#cantidad-gastos').value);
  let gastosTabla = document.querySelector('#gastos-tabla');
  let nombreGasto = document.querySelector('#nombre-gastos').value;
  let nombreTabla = document.querySelector('.gasto');
  let valorTabla = document.querySelector('.valor');
  let eliminarTabla = document.querySelector('.eliminar');
  
  gastosTabla.innerHTML='';
  gastosTabla.innerHTML=`$${valorGastos}`;

  valorTabla.innerHTML+=`<div>$${valorGastos}</div>`;
  
  nombreTabla.innerHTML+=`<div>${nombreGasto}</div>`;

  eliminarTabla.innerHTML+='<div><a><i class="bi bi-trash-fill"></i></a></div>';
});
*/