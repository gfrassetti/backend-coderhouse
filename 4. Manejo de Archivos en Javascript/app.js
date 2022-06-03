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
}

const producto = new Container('products.txt')

producto.save({name: 'notebook'}).then(id => console.log(id))