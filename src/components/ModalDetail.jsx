import React from "react";
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

const ModalDetail = (props) => {
  let {openDetail, toggle, data} = props;
  return <Modal size="xl" isOpen={openDetail} toggle={toggle}>
    <ModalHeader>
      <h5 className="fw-bold my-0">{data.nama}</h5>
      <p className="text-muted small my-0">{data.kategori}</p>
    </ModalHeader>
    <ModalBody>
      <div className="row">
        <div className="col-6">
          <img alt={`${data.id}-${data.nama}`} width="150px" src={data.images[0]} />
        </div>
        <div className="col-6">
          <p className='text-muted' style={{textAlign: "justify"}}>{data.deskripsi}</p>
        </div>
      </div>
    </ModalBody>
  </Modal>
}

export default ModalDetail;