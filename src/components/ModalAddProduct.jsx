import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, InputGroup, InputGroupText, Form} from "reactstrap";
import Axios from "axios";
import { API_URL } from "../helper";
import { useDispatch } from "react-redux";
import { addProductAction } from "../redux/actions/productsAction";

const ModalAddProduct = (props) => {

  const dispatch = useDispatch();
  const [formAddProduct, setFormAddProduct] = React.useState({})
  const [formNama,setFormNama] = React.useState("")
  const [formDeskripsi,setFormDeskripsi] = React.useState("")
  const [formBrand,setFormBrand] = React.useState("")
  const [formKategori,setFormKategori] = React.useState("")
  const [formHarga,setFormHarga] = React.useState(0)
  const [formStock,setFormStock] = React.useState([])
  const [formImages,setFormImages] = React.useState([])

  const handleInputStock = (value, index, property) => {
    let temp = [...formStock];
    switch (property){
      case "type":
        temp[index].type=value;
        break;
      case "qty":
        temp[index].qty=parseInt(value);
        break;
    }
    setFormStock(temp)
  }

  const handleAddStockButton = () => {
    let temp=[]
    if (formStock.length>0){
      temp=[...formStock];
    }
    temp.push({type:'',qty:''})
    setFormStock(temp)
  }
  
  const htmlInputStockForm = () => {
    if(formStock.length>0){
      return formStock.map((value,index)=>{
        return <div className="row py-1">
          <div className="input-group">
            <input type="text" className="form-control" placeholder={`Type-${index+1}`} value={value.type} onChange={(e)=>handleInputStock(e.target.value, index, "type")}/>
            <input type="number" className="form-control" placeholder={`Qty-${index+1}`} value={value.qty} onChange={(e)=>handleInputStock(e.target.value, index, "qty")}/>
            <Button outline style={{width:"10px"}} color="danger" className="form-control" onClick={()=>handleDeleteStockForm(index)}>Delete</Button>
          </div>
          {/* <span className="col-4">
            <Input type="text" placeholder={`Type-${index+1}`} value={value.type} onChange={(e)=>handleInputStock(e.target.value, index, "type")}/>
          </span>
          <span className="col-4">
            <Input type="number" placeholder={`Qty-${index+1}`} value={value.qty} onChange={(e)=>handleInputStock(e.target.value, index, "qty")}/>
          </span>
          <span className="col-4">
            <Button outline color="danger" onClick={()=>handleDeleteStockForm(index)}>Delete</Button>
          </span> */}
        </div>
      })
    }
  }

  const handleDeleteStockForm = (index) => {
    let temp = [...formStock];
    temp.splice(index,1)
    setFormStock(temp)
  }

  const handleAddImageButton = () => {
    let temp=[]
    if (formImages.length>0){
      temp=[...formImages];
    }
    temp.push('')
    setFormImages(temp)
  }

  const handleInputImage = (value, index) => {
    let temp = [...formImages];
    temp[index] = value
    setFormImages(temp)
  }

  const htmlInputImageForm = () => {
    if(formImages.length>0){
      return formImages.map((value,index)=>{
        return <div className="row py-1">
          <div className="input-group">
            <Input type="text" placeholder={`Select Images-${index+1}`} value={value} onChange={(e)=>handleInputImage(e.target.value, index)}/>
            <Button outline color="danger" onClick={()=>handleDeleteImageForm(index)}>Delete</Button>
          </div>

          {/* <div className="col-8">
            <Input type="text" placeholder={`Select Images-${index+1}`} value={value} onChange={(e)=>handleInputImage(e.target.value, index)}/>
          </div>
          <div className="col-4">
            <Button outline color="danger" onClick={()=>handleDeleteImageForm(index)}>Delete</Button>
          </div> */}
        </div>
      })
    }
  }

  const handleDeleteImageForm = (index) => {
    let temp = [...formImages];
    temp.splice(index,1)
    setFormImages(temp)
  }

  const handleSubmit = async () => {
    try {
      let checkStockForm = formStock.length ? true : false
      let checkImagesForm = formImages.length ? true : false
      formStock.forEach((value)=>{
        for (const property in value) {
          if(value[property]===""){
            checkStockForm=false
          }
        }
      })
      formImages.forEach((value)=>{
        checkImagesForm= value ? true : false
      })

      if(formNama && formDeskripsi && formBrand && formKategori && formHarga && checkStockForm && checkImagesForm) {
        console.log('nama',formNama)
        console.log('deskripsi',formDeskripsi)
        console.log('brand',formBrand)
        console.log('kategori',formKategori)
        console.log('harga',formHarga)
        console.log('stock',formStock)
        console.log('images',formImages)
        // setFormAddProduct({
        //   nama:formNama,
        //   deskripsi:formDeskripsi,
        //   brand:formBrand,
        //   kategori:formKategori,
        //   harga:formHarga,
        //   stock:formStock,
        //   images:formImages,
        // })
        // console.log(formAddProduct)
        let res = await Axios.post(`${API_URL}/products`, {
          nama:formNama,
          deskripsi:formDeskripsi,
          brand:formBrand,
          kategori:formKategori,
          harga:formHarga,
          stock:formStock,
          images:formImages,
        })
        // dispatch(addProductAction({
        //   nama:formNama,
        //   deskripsi:formDeskripsi,
        //   brand:formBrand,
        //   kategori:formKategori,
        //   harga:formHarga,
        //   stock:formStock,
        //   images:formImages,
        // }))
        if(res){
          alert("Penambahan Produk Berhasil")
          setFormNama("")
          setFormDeskripsi("")
          setFormBrand("")
          setFormKategori("")
          setFormHarga(0)
          setFormStock([])
          setFormImages([])
          props.toggleAddProduct()
        }
      } else {
        alert("Isi Semua Form")
      }
    } catch (error) {
      console.log(error)
    }

  }

  return <Modal size="lg" isOpen={props.openAddProduct} toggle={props.toggleAddProduct}>
    <ModalHeader>
      Add Product  
    </ModalHeader> 
    <ModalBody>
      <Form>
        <FormGroup>
          <div className="row">
            <div className="col-12 col-md-6">
              <Label>Nama Produk</Label>
              <Input type="text" onChange={(event) => setFormNama(event.target.value)}/>
              <div className="row py-2">
                <div className="col-6">
                  <Label>Brand</Label>
                  <Input type="select" onChange={(event) => setFormBrand(event.target.value)}>
                    <option value={""}>Choose..</option>
                    <option value="IKEA">IKEA</option>
                    <option value="Mr.DIY">Mr.DIY</option>
                  </Input>
                </div>
                <div className="col-6">
                  <Label>Kategori</Label>
                  <Input type="select" onChange={(event) => setFormKategori(event.target.value)}>
                    <option value={""}>Choose..</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bedroom">Bedroom</option>
                  </Input>
                </div>
              </div>
              <Label>Harga</Label>
              <Input type="number" onChange={(event) => setFormHarga(parseInt(event.target.value))}/>
              <Label>Deskripsi</Label>
              <Input type="textarea" onChange={(event) => setFormDeskripsi(event.target.value)}/>
            </div>

            <div className="col-12 col-md-6">
              <div className="row py-2">
                <div className="col-7">
                  <Label>Stock</Label>
                </div>
                <div className="col-5 text-end">
                  <Button color="success" outline size="sm" onClick={handleAddStockButton}>Add Stock</Button>
                </div>
                <div>
                  {htmlInputStockForm()}
                </div>
              </div>
              <hr />
              <div className="row py-2">
                <div className="col-7">
                  <Label>Images</Label>
                </div>
                <div className="col-5 text-end">
                  <Button color="success" outline size="sm" onClick={handleAddImageButton}>Add Image</Button>
                </div>
                <div>
                  {htmlInputImageForm()}
                </div>
              </div>
            </div>
          </div>
            
          
          
          
        </FormGroup>
      </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" type="button" onClick={handleSubmit}>Submit</Button>
      <Button color="secondary" type="button" onClick={props.toggleAddProduct}>Cancel</Button>
    </ModalFooter> 
    
  </Modal>
}

export default ModalAddProduct