class Libro {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; // boolean
  }

  info() {
    const readStatus = this.read ? "Leído" : "No leído aún";
    return `${this.title} de ${this.author}, ${this.pages} páginas, ${readStatus}`;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Biblioteca {
  constructor() {
    this.myLibrary = [];
  }

  addBookToLibrary(title, author, pages, read) {
    const newBook = new Libro(title, author, pages, read);
    this.myLibrary.push(newBook);
    this.renderLibrary();
  }

  renderLibrary() {
    const container = document.getElementById("listaLibros");
    container.innerHTML = ""; // limpiar antes de renderizar

    this.myLibrary.forEach(book => {
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
        this.renderLibrary();
      });

      // Botón eliminar libro
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.addEventListener("click", () => {
        this.eliminarLibro(book.id);
      });

      botonesDiv.appendChild(btnToggleRead);
      botonesDiv.appendChild(btnEliminar);
      div.appendChild(botonesDiv);

      container.appendChild(div);
    });
  }

  eliminarLibro(id) {
    let index = this.myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
      this.myLibrary.splice(index, 1);
      this.renderLibrary();
    }
  }
}

// Código para manejo del formulario y eventos DOM

const biblioteca = new Biblioteca();

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

  biblioteca.addBookToLibrary(titulo, autor, paginas, leido);

  dialog.close();
  formLibro.reset();
  console.log(biblioteca.myLibrary);
});

// Añadimos algunos libros iniciales
biblioteca.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
biblioteca.addBookToLibrary("1984", "George Orwell", 328, true);
