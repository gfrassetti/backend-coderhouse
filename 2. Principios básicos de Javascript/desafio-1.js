class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `El nombre es: ${this.nombre}`;
  }
  addMascota(nombre) {
    this.mascotas.push(nombre);
  }
  countMascota() {
    return `Cantidad de mascotas: ${this.mascotas.length}`;
  }
  addBook(nombre, autor) {
    let book = {
      nombre: nombre,
      autor: autor,
    };
    this.libros.push(book);
  }
  getBookNames() {
    let bookName = [];
    this.libros.forEach((libro) => {
      bookName.push(libro.nombre);
    });
    return bookName;
  }
}

newUser = new Usuario("Guido", "Frassetti");
console.log(newUser.getFullName());
newUser.addMascota("Gato");
console.log(newUser.countMascota());
newUser.addBook("Muchas vidas muchos maestros", "Brian Weiss");
console.log(newUser.getBookNames());
