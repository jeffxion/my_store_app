import { useState } from 'react';
import { Modal, Table, Button } from 'antd';
import { TiShoppingCart } from "react-icons/ti";

const onChange = (value) => {
    console.log('changed', value);
};

const TotalModal = ({ selectedItems, onUpdateCartItemQuantity }) => {
    const [open, setOpen] = useState(false);

    const totalPrice = selectedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const formattedTotalPrice = `₱${totalPrice.toFixed(2)}`;

    const columns = [
        {
            title: 'PRODUCT IMAGE',
            dataIndex: 'img',
            key: 'img',
            render: img => <img className='cart-img' alt="" src={img} />
        },
        {
            title: 'PRODUCT INFORMATION',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'QUANTITY',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <div>
                    <Button onClick={() => onUpdateCartItemQuantity(record, -1)}>-</Button>
                    <span style={{ margin: '0 8px' }}>{text}</span>
                    <Button onClick={() => onUpdateCartItemQuantity(record, 1)}>+</Button>
                </div>
            )
        },
        {
            title: 'PRICE',
            dataIndex: 'price',
            key: 'price',
            render: price => `₱${parseFloat(price).toFixed(2)}`
        },
        {
            title: 'TOTAL PRICE',
            dataIndex: 'totalprice',
            key: 'totalprice',
            render: (text, record) => `₱${(record.price * record.quantity).toFixed(2)}`
        },
    ];
    return (
        <>
            <div className="cart-icon">
                <TiShoppingCart onClick={() => setOpen(true)} />
                <span className="badge badge-warning" id="lblCartCount">{selectedItems.length}</span>
            </div>
            <Modal
                title={`Cart (${selectedItems.length} items)`}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Table columns={columns} dataSource={selectedItems} />
                <hr />
                <div className="grand-total end">
                    <h1 className="mr-0">TOTAL COST</h1>
                    <h2 className="mr-0">{formattedTotalPrice}</h2>
                </div>
            </Modal>
        </>
    );
};
export default TotalModal;