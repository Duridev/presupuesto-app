let id = 0;
let arrayGastos = [];
let totalGastos = 0;
let saldo = 0;
let presupuesto = 0;

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
  let saldoDisponible = presupuesto - totalGastos;
  if (saldoDisponible >= valorGastos && valorGastos.length > 0 && !isNaN(valorGastos)){
    let Gasto = getGastoObj(nombreGasto, valorGastos);
    addTabla(Gasto);

    totalGastos += Gasto.valor;
    let gastosTabla = document.querySelector('#gastos-tabla');
    gastosTabla.innerHTML = `$${totalGastos}`;
    document.querySelector("#nombre-gastos").value = "";
    document.querySelector("#cantidad-gastos").value = "";

    arrayGastos.push(Gasto);
    saldoTotal()
    }else{ 
      alert('No tienes saldo suficiente o ingresa un valor válido')
      }
});


const btnPresupuesto = document.querySelector('.btn-presupuesto');
btnPresupuesto.addEventListener("click", () => {
  let valorPresupuesto = parseInt(document.querySelector('#presupuesto').value);
  let presupuestoTabla = document.querySelector("#presupuesto-tabla");
  let saldoTabla = document.querySelector("#saldo-tabla");
  if (valorPresupuesto >= totalGastos && !isNaN(valorPresupuesto)){
    presupuestoTabla.innerHTML="";
    presupuestoTabla.innerHTML=`$${valorPresupuesto}`;
    saldoTabla.innerHTML=`$${valorPresupuesto}`;
    document.querySelector("#presupuesto").value = "";
    presupuesto = valorPresupuesto;
    saldoTotal();
  } else {
    alert('No puedes tener menos saldo que tus gastos, o ingresa un valor válido')
  }
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
  });
  saldoTotal()
}


/* saldoTotal = () => {
  let saldo = presupuesto - totalGastos;
  let saldoTabla = document.querySelector("#saldo-tabla");
    saldoTabla.innerHTML = `$${saldo}`;
} */

saldoTotal = () => {
  let saldo = presupuesto;
  for (let i = 0; i < arrayGastos.length; i++) {
    saldo -= arrayGastos[i].valor;
  }
  let saldoTabla = document.querySelector("#saldo-tabla");
  saldoTabla.innerHTML = `$${saldo}`;
}
