
const fs = require('fs');


let listaToDo = [];

const guardarDB = () => {

    let data = JSON.stringify(listaToDo);

    fs.writeFile('database/data.json', data, (err) => {
        if(err) throw new Error('No se pudo grabar', err);
    });

}

const cargarDB = () => {

    try {
        listaToDo = require('../database/data.json');
    } catch(error) {
        listaToDo = [];
    }
    

}

const crear = (descripcion) => {

    cargarDB();

    let toDo = {
        descripcion,
        completado: false,
    };

    listaToDo.push(toDo);

    guardarDB();

    return toDo;
}

const getListado = () => {
    cargarDB();
    return listaToDo;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listaToDo.findIndex( tarea => {
        return tarea.descripcion === descripcion;
    });

    if ( index >= 0 ) {
        listaToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listaToDo.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (nuevoListado.length === listaToDo.length) {
        return false;
    } else {
        listaToDo = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}