import {API_URL} from "./../config/index.js";

const callapi =(uri, method = "GET", data)=>{
    return axios({
        url:API_URL + uri,
        method,
        data,
    })
}

const getListProductService = () =>{
    return axios({
        url:"https://5f5c7a4b5e3a4d001624945d.mockapi.io/api/SanPham",
        method:"GET",
    })
};


const getListProductByIdService = (id) =>{
    return axios({
        url:`https://5f5c7a4b5e3a4d001624945d.mockapi.io/api/SanPham/${id}`,
        method:"GET",
    })
};

const deleteProductService = (id) =>{
    return axios({
        url:`https://5f5c7a4b5e3a4d001624945d.mockapi.io/api/SanPham/${id}`,
        method:"DELETE",
    })
};

const addProductService = (product1) =>{
    return axios({
        url:`https://5f5c7a4b5e3a4d001624945d.mockapi.io/api/SanPham`,
        method:"POST",
        data:product1,
    })
};

const updateProductService = (id) =>{
    return axios({
        url:`https://5f5c7a4b5e3a4d001624945d.mockapi.io/api/SanPham/${id}`,
        method:"PUT",
        data:id,
    })
};

export { getListProductService,getListProductByIdService,deleteProductService,addProductService,updateProductService,callapi };