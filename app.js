document.addEventListener('DOMContentLoaded', function() { /*Evento DOMContentLoaded q asegura que el código JavaScript se ejecute solo cuando el DOM esté completamente cargado.*/
    // Seleccionamos los elementos HMTL.
    const entradaTarea = document.getElementById('entradaTarea');
    const botonAgregarTarea = document.getElementById('botonAgregarTarea');
    const listaTareas = document.getElementById('listaTareas');

    // Cargar tareas desde LocalStorage
    let tareas = JSON.parse(localStorage.getItem('tareas')) || []; // JSON.parse: toma una cadena JSON (datos almacenados como string) y la convierte en un objeto.
    renderizarTareas();

    // Evento para agregar nueva tarea
    botonAgregarTarea.addEventListener('click', agregarTarea);
    entradaTarea.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') { //Dentro de la función, se verifica si la tecla que se presionó es la tecla Enter. e.key: propiedad que representa la tecla que se presionó.
            agregarTarea(); //Si la tecla presionada es Enter, se llama a la función agregarTarea() para agregar la tarea, de la misma manera que si el usuario hubiera hecho clic en el botón.
        }
    });

    // Función para agregar una nueva tarea
    function agregarTarea() {
        const textoTarea = entradaTarea.value.trim();
        
        // Validación para evitar tareas duplicadas
        const tareaExistente = tareas.some(tarea => tarea.texto.toLowerCase() === textoTarea.toLowerCase());
        if (textoTarea === '') { //some: método que itera sobre el arreglo de tareas y verifica si alguna de las tareas ya fue agregada y de ser asì muestra una alerta.
            alert('Por favor ingresa una tarea.');
            return; 
        } else if (tareaExistente) {
            alert('Esta tarea ya existe.');
            return; 
        }

        const nuevaTarea = {
            texto: textoTarea,
            completada: false
        };

        tareas.push(nuevaTarea); //usamos método push() para agregar nuevaTarea al arreglo tareas
        actualizarLocalStorage(); //función q se llama p/ guardar el arreglo tareas actualizado en el Local Storage del navegador. Esto permite que las tareas persistan si se recarga la página.
        renderizarTareas();

        entradaTarea.value = '';
    }

    // Función para renderizar las tareas
    function renderizarTareas() {
        listaTareas.innerHTML = '';  // Limpiamos la lista de tareas antes de renderizar
        tareas.forEach((tarea, indice) => {
            const li = document.createElement('li'); // creamos un nuevo elemento de lista (<li>) que contendrá la tarea.
            
            // Checkbox para marcar la tarea como tarea hecha
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tarea.completada;
            checkbox.addEventListener('change', () => alternarTarea(indice));

            // Texto de la tarea
            const span = document.createElement('span');
            span.classList.add('texto-tarea');
            span.textContent = tarea.texto;
            if (tarea.completada) {
                li.classList.add('completada'); //Si la tarea está completada, se añade la clase completada al elemento <li>, y figurarà tachada
            }

            // Botón para eliminar la tarea
            const botonEliminar = document.createElement('button');
            botonEliminar.classList.add('boton-eliminar');
            botonEliminar.innerHTML = '<img src="assets/icono-basura.png" alt="Eliminar">';
            botonEliminar.addEventListener('click', () => eliminarTarea(indice));

            // Añadir elementos al li
            li.appendChild(checkbox); //se agrega el checkbox creado anteriormente al elemento <li> y se convierte en parte de la lista de la tarea.
            li.appendChild(span); //Se agrega el span que contiene el texto de la tarea al mismo elemento <li> y el texto de la tarea se mostrarà junto al checkbox en la misma línea.
            li.appendChild(botonEliminar); //se agrega el botón de eliminar al <li> y cada tarea tendrà un botón para ser eliminada.

            // Añadir el li al ul
            listaTareas.appendChild(li);
        });
    }

    // Función para marcar una tarea como hecha o pendiente
    function alternarTarea(indice) {
        tareas[indice].completada = !tareas[indice].completada;
        actualizarLocalStorage(); //Guarda el estado actual del arreglo de tareas en el almacenamiento local del navegador para su persistencia.    
        renderizarTareas();
    }

    // Función para eliminar una tarea
    function eliminarTarea(indice) {
        tareas.splice(indice, 1);
        actualizarLocalStorage();
        renderizarTareas();
    }

    // Actualizar LocalStorage
    function actualizarLocalStorage() { //función q se encarga de guardar el estado actual del arreglo tareas en el localStorage, p/q los datos persistan en el Tº
        localStorage.setItem('tareas', JSON.stringify(tareas));//se utiliza setItem p/ almacenar la clave llamada 'tareas'. El valor asociado a esta clave es el arreglo tareas, convertido en una cadena JSON mediante JSON.stringify(). Esto permititirà que los datos puedan ser recuperados en el futuro de la misma manera en que fueron guardados.
    }
});
