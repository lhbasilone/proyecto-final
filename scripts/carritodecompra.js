class Producto {
    constructor(id, nombre, cantidad, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.imagen = imagen;
    }
  }
  function graciass(){
  const comprarButton = document.getElementById('comprarBotoncito');
  const graciasCompra = comprarButton.addEventListener('click', () =>  (Swal.fire({
    icon: 'success',
    title: 'Gracias por su compra',
    text: 'Muy pronto estaremos confirmando su pedido',
  }))
  );
  }
  
  
  
  function renderCard(producto) {
    let cardRendered = `    
    <div class="card m-3" style="width: 18rem;">
        <img src="imagenes/${producto.imagen}"height="300px" class="card-img-top cardImg" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.id}. ${producto.nombre}  <br>
            <div class ="mt-1">  Cantidad: ${producto.cantidad} </div>
            <hr>
            </h5>
            <p class="card-text fs-4 shoppingCartItemPrice">$ ${producto.precio}</p>
            <a class="btn btn-success botonDeCompra" id="${producto.id}">Agregar al carrito</a>
        </div>
    </div>
    `;
    return cardRendered;
  }
  
  
  let catalogoProductos = [];
  let producto1 = new Producto(1, "Resina pequeña", "1 litro", 200, "resinachica.jpg");
  let producto2 = new Producto( 2, "Resina normal", "3 litros", 600, "a.jpg");
  let producto3 = new Producto(3, "Resina grande", "10 litros", 1000, "gr.jpg");
  let producto4 = new Producto(4, "Tinte negro", "1 litro", 200, "ñ.jpg");
  let producto5 = new Producto(5, "Tinte a eleccion", "1 litro", 500, "l.jpg");
  // let producto5 = new Producto(anadirResina())
  // JSON Y PROMISES
  
  // const anadirResina =(id,nombre,cantidad,precio,imagen) => {
  //   const resinaanadir = new Producto (id,nombre,cantidad,precio,imagen)
  //   catalogoProductos.push (resinaanadir)
  // }
  
  // const productoJson =async() =>{
     async function prodcutoJson(){
     try{
       const response = await fetch ("../Json/producto.json")
       const data = await response.json()
       data.forEach((post) => {
         anadirResina(post.id, post.nombre, post.cantidad, post.precio, post.imagen)
       })
     } catch(error){
       console.log(error)
     }
   }
  
  
  //  async function productoJson(){
  //    const response = await fetch("Json/producto.json")
  //    const data = await response.json()
  //    data.forEach((post) => {
  //      addJson(post.id,post.nombre,post.cantidad,post.precio,post.imagen)
  //    })
  //  }
  
  // generarprodcutos
  catalogoProductos.push(producto1);
  catalogoProductos.push(producto2);
  catalogoProductos.push(producto3);
  catalogoProductos.push(producto4);
  catalogoProductos.push(producto5);
  
  /* Generar mis tarjetas de productos */
  
  function crearcards(){
  let cardsDiv = document.querySelector("#cards");
  catalogoProductos.forEach(producto => {
    cardsDiv.innerHTML += renderCard(producto);
  })
  }
  // CARRITO
  function botonescarrito(){
  const addToShoppingCartButtons = document.querySelectorAll('.botonDeCompra')
  addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked)
  })
  }
  
  
  const shoppingCartItemContainer = document.querySelector('.shoppingCartItemsContainer')
  
  
  
  function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.card');
  
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.shoppingCartItemPrice').textContent;
    const itemImage = item.querySelector('.cardImg').src
    
    
  
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
  }
  
  function addItemToShoppingCart(itemTitle, itemPrice, itemImage){
    
    
    const shoppingCartRow = document.createElement('div')
    const shoppingCartContent =`
    <div class="row shoppingCartItem">
          <div class="col-6">
              <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <img src=${itemImage} height= "200px"class="shopping-cart-image">
                  <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
              </div>
          </div>
          <div class="col-2">
              <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                  <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
              </div>
          </div>
          <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
              <div>  <button class="btn btn-danger buttonDelete" type="button">X</button> </div>
            </div>
        </div>
    </div>`
    const carros =  shoppingCartRow.innerHTML = shoppingCartContent
      shoppingCartItemContainer.append(shoppingCartRow)
  
      
      let carro =[]
      storrageeCarro()
    carro =  carros + carro
    function storrageeCarro(){
    localStorage.setItem("carrito",JSON.stringify(carro))
    if(localStorage.getItem("carrito")){
      carro = JSON.parse(localStorage.getItem("carrito"))
    }
    }
    
     
    const botonborrar =  shoppingCartRow.querySelector('.buttonDelete')
      botonborrar.addEventListener('click',removeShoppingCartItem)
  
      shoppingCartRow.querySelector(".shoppingCartItemQuantity")
      .addEventListener("change",quantityChanged)
  
      updateShoppingCartTotal()
      
      if(carro){
        graciass()      
      }
  
  
      
  }
  
  
  
   function updateShoppingCartTotal() {
     let total = 0
     const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
     
     const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  
     shoppingCartItems.forEach((shoppingCartItem) => {
       const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
         '.shoppingCartItemPrice');
      
       const shoppingCartItemPrice = Number(
         shoppingCartItemPriceElement.textContent.replace('$', '')
       );
       const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
         '.shoppingCartItemQuantity'
       );
       const shoppingCartItemQuantity = Number(
         shoppingCartItemQuantityElement.value
       );
       total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
      
     });
     shoppingCartTotal.innerHTML = "" +"$ " + total
  }
  
  function removeShoppingCartItem (event){
  
  
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Queres borrar el producto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si!',
    cancelButtonText: 'No!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      const buttonClicked = event.target
  buttonClicked.closest(".shoppingCartItem").remove()
  updateShoppingCartTotal()
      swalWithBootstrapButtons.fire(
        'Producto borrado!',
        'El producto seleccionado fue borrado',
        'success'
        
      )
    
    }
  })
  updateShoppingCartTotal()
  }
  
  function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
  }
  
  function main(){
    prodcutoJson()
    .then(response =>{
      crearcards()
      botonescarrito()
    })
  
  }
  main()