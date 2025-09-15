const myLibrary = [];

function Libro(title, author, pages, read) {
    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
}
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; // boolean
}

Libro.prototype.info = function() {
  const readStatus = this.read ? "read" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
};

Libro.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Libro(title, author, pages, read);
  myLibrary.push(newBook);
  renderLibrary();
}

function renderLibrary() {
  const container = document.getElementById("listaLibros");
  container.innerHTML = ""; // limpiar antes de renderizar

  myLibrary.forEach(book => {
    const div = document.createElement("div");
    div.classList.add("libro");
    div.dataset.id = book.id;

    const titulo = document.createElement("h3");
    titulo.textContent = book.title;
    div.appendChild(titulo);

    const autor = document.createElement("p");
    autor.textContent = `Autor: ${book.author}`;
    div.appendChild(autor);

    const paginas = document.createElement("p");
    paginas.textContent = `Páginas: ${book.pages}`;
    div.appendChild(paginas);

    const leido = document.createElement("p");
    leido.textContent = `Estado: ${book.read ? "Leído" : "No leído"}`;
    div.appendChild(leido);

    const botonesDiv = document.createElement("div");
    botonesDiv.classList.add("botones");

    // Botón toggle read
    const btnToggleRead = document.createElement("button");
    btnToggleRead.textContent = "Cambiar estado";
    btnToggleRead.classList.add("toggleRead");
    btnToggleRead.addEventListener("click", () => {
      book.toggleRead();
      renderLibrary();
    });

    // Botón eliminar libro
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      eliminarLibro(book.id);
      
    });

    botonesDiv.appendChild(btnToggleRead);
    botonesDiv.appendChild(btnEliminar);
    div.appendChild(botonesDiv);

    container.appendChild(div);
  });
}

function eliminarLibro(id) {
  let index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
}

// Gestión del formulario para nuevo libro y dialog

const dialog = document.getElementById("formDialog");
const btnNuevoLibro = document.getElementById("btnNuevoLibro");
const btnCancelar = document.getElementById("btnCancelar");
const formLibro = document.getElementById("formLibro");

btnNuevoLibro.addEventListener("click", () => {
  dialog.showModal();
});

btnCancelar.addEventListener("click", () => {
  dialog.close();
  formLibro.reset();
});

formLibro.addEventListener("submit", (e) => {
  e.preventDefault(); // evita comportamiento default submit
  const titulo = formLibro.titulo.value.trim();
  const autor = formLibro.autor.value.trim();
  const paginas = parseInt(formLibro.paginas.value);
  const leido = formLibro.leido.checked;

  addBookToLibrary(titulo, autor, paginas, leido);

  dialog.close();
  formLibro.reset();
  console.log(myLibrary)
});

// Añadimos algunos libros manuales para mostrar inicialmente
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);

