const fs = require("fs");

class Container {
  constructor(filename) {
    this.filename = filename;
    fs.promises.writeFile(`./${this.filename}`, '') //se crea el file apenas se instancia
  }
  async save(object) {
      let data = await fs.promises.readFile(`./${this.filename}`, 'utf-8') //data seria el contenido del file

      if(!data)//si el file no contiene nada, si no hay data en el file.. 
      {
        object.id = 1;
        const arr = [object]
        await fs.promises.writeFile(`./${this.filename}`, JSON.stringify(arr))
        return object.id
      }
      else{
          data = JSON.parse(data)
          object.id = data.length + 1      
          data.push(object) 
          await fs.promises.writeFile(`./${this.filename}`, JSON.stringify(data))
          return object.id

      }
  }

  async getById(id){
    let products = await JSON.parse(fs.prosmises.readFile('./products.txt', 'utf-8'))
    
    try{
      let object = products.find((prod) => prod.id  == id)
    }
    catch{
      console.log(`Product does not exists with id ${id}`)
      
    }
  }
  async getAll() {
    try {
      let productos = JSON.parse(
        await fs.promises.readFile("./products.txt", "utf-8")
      );
      console.log(productos);
    } catch (error) {throw error}
  }
  async deleteById(id) {
    let productos = JSON.parse(
      await fs.promises.readFile("./productos.txt", "utf-8")
      );
      
      try {
      
        if (productos.some((prod) => prod.id == id)) {
        let newProductos = productos.filter((prod) => prod.id != id);

        await fs.promises.writeFile(
          `./${this.archivo}`,
          JSON.stringify(newProductos)
        );
        console.log("producto eliminado");
      } else {
        console.log("no existe producto con ese id");
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    
    let archivo = await fs.promises.readFile(`./${this.archivo}`, "utf-8");
    
    try {
    
      if (!archivo) {
        console.log("Archivo no existe");
      } else {
        await fs.promises.writeFile(`./${this.archivo}`, "[]");

        console.log("Todos los archivos han sido eliminados");
      }
    } catch (error){
      throw error;
    }
  }
}


const producto = new Container('products.txt')

producto.save({name: 'notebook'}).then(id => console.log(id))

producto.getById(1)

//producto.getAll()

//producto.deleteById(2)
//producto.deleteAll(2)

