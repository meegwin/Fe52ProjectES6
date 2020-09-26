import { callapi,getListProductService,getListProductByIdService,deleteProductService,addProductService,updateProductService } from "./utils/callapi.js";

import Product from  './model/product.js';
const renderHTML = () => {
    const contentHTML = `
    <div class="card text-white bg-dark">
    <div class="card-body">
      <h4 class="card-title">Danh sách sản phẩm</h4>
      <div class='container'>
        <div class="row">
          <div class="col-md-3">
            <input id="maSP" class="form-control" placeholder="Mã SP" disabled />
          </div>
          <div class="col-md-3">
            <input id="tenSP" class="form-control" placeholder="Tên SP" />
          </div>
          <div class="col-md-3">
            <input id="gia" class="form-control" placeholder="Giá" />
          </div>
          <div class="col-md-3">
            <input id="hinhAnh" class="form-control" placeholder="Link hình" />
          </div>
        </div>
        <br />
        <button id="btnThem" class="btn btn-success">Thêm sản phẩm</button>
        <button id="btnCapNhat" class="btn btn-success">Cap nhat</button>
      </div>
    </div>
  </div>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th>Mã SP</th>
          <th>Tên SP</th>
          <th>Giá </th>
          <th>Hình ảnh</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tblDanhSachSanPham">

      </tbody>
    </table>
  </div>
    `;
    document.getElementById("root").innerHTML = contentHTML;
}
renderHTML();

const renderListProduct = () => {
    callapi("SanPham","GET", null)
    .then((result) =>{
        const contentTbody = renderTable(result.data)
        //DOM
        document.getElementById("tblDanhSachSanPham").innerHTML = contentTbody;
    })
    .catch((err) =>{
        console.log(err);
    })
}
renderListProduct();

const renderTable = (listProduct) => {
    let content ="";
    if(listProduct && listProduct.length > 0){
      listProduct.map((product) => {
          content +=`
          <tr>
            <td>${product.id}</td>
            <td>${product.tenSP}</td>
            <td>${product.gia}</td>
            <td>
            <img scr="./../${product.hinhAnh}" style="width:50%"/>
            </td>
            <td>
            <button class="btn btn-success" onclick="edit(${product.id})">Edit</button>
            <button class="btn btn-danger" onclick="del(${product.id})">Delete</button>
            </td>
            
          </tr>
          `;
      });
      return content;
    }
}
/**
 * Delete product
 */

window.del = del;
function del(id){
    deleteProductService(id)
    .then((result) =>{
      renderListProduct();
    })
    .catch((err) => {
      console.log(err);
    })
}
/**
 * Add product
 */
const clearInput = () =>{
  getEle("tenSP").value = "";
  getEle("gia").value = "";
  getEle("hinhAnh").value = "";
}
const getEle = (id) => { return document.getElementById(id)};

getEle("btnThem").addEventListener("click", function(){
  /**
   * DOM toi 3 o input ten, gia, hinh
   */
  let ten = getEle("tenSP").value;
  let gia = getEle("gia").value;
  let hinhAnh = getEle("hinhAnh").value;

  const product1 = new Product("",ten,gia,hinhAnh);
  console.log(product1);
  addProductService(product1)
  .then((result) => {
    renderListProduct();
    clearInput();
  })
  .catch((err) =>{
    console.log(err);
  })

})

/**
 * Edit product
 */
window.edit = edit;
function edit(id){
  getListProductByIdService(id)
    /**
     * gán tất cả dữ liệu trả về ra 4 ô input
     */
  .then((result) => {        
    getEle("maSP").value = result.data.id;
    getEle("tenSP").value = result.data.tenSP;
    getEle("gia").value = result.data.gia;
    getEle("hinhAnh").value = result.data.hinhAnh;
  })
  .catch((err) => {
    console.log(err);
  })
}

getEle("btnCapNhat").addEventListener("click",function(){
  //DOM lay value tu 4 o input
  const id = getEle("maSP").value;
  const ten = getEle("tenSP").value;
  const gia = getEle("gia").value;
  const hinhAnh = getEle("hinhAnh").value;

  const product = new Product(id,ten,gia,hinhAnh);
  callapi("SanPham","POST", product)
  updateProductService(product)
  .then(() => {
    alert("Thêm thành công!");
    renderListProduct();
  })
  .catch((err) =>{
    console.log(err);
  })
})