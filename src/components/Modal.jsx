import { useState } from "react";
import { Button, Modal } from 'antd';
import { FaEye } from "react-icons/fa";

const ItemModal = ({ itemInfo }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <FaEye type="primary" onClick={() => setModalOpen(true)} />
            <Modal
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
            >
                <img src={itemInfo.img} alt="" />
                <h1>{itemInfo.item_name}</h1>
                <p className="modal-price">{Number.parseFloat(itemInfo.price).toFixed(2)}</p>
            </Modal>
        </>
    );
};

export default ItemModal;