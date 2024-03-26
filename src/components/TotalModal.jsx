import { useState } from 'react';
import { Modal, Table, Button, Input, message, Popconfirm } from 'antd';
import { TiShoppingCart } from "react-icons/ti";

const formatNumber = (value) => new Intl.NumberFormat().format(value);
const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
  ) : (
    'Input a number'
  );
  return (
    <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a number"
        maxLength={16}
    />
  );
};


const TotalModal = ({ selectedItems, onUpdateCartItemQuantity, onInputPriceManually, onEmptyCart }) => {
    const [open, setOpen] = useState(false);

    const totalPrice = selectedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const formattedTotalPrice = `₱${totalPrice.toFixed(2)}`;

    const formatNumber = (value) => Number.parseFloat(value).toFixed(2);
    
    const confirm = () => {
        onEmptyCart();
        message.success('Your cart is now empty.');
    };

    const columns = [
        {
            title: 'PRODUCT IMAGE',
            dataIndex: 'img',
            key: 'img',
            responsive: ['md'],
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
                    <Button className="quantity-btn" onClick={() => onUpdateCartItemQuantity(record, -1)}>-</Button>
                    <span style={{ margin: '0 8px' }}>{text}</span>
                    <Button className="quantity-btn" onClick={() => onUpdateCartItemQuantity(record, 1)}>+</Button>
                </div>
            )
        },
        {
            title: 'PRICE',
            dataIndex: ['price', 'fix_price'],
            key: 'price',
            render: (text, record) => {
                if (record.fix_price === false) {
                    return (
                        <Input
                            onChange={(e) => onInputPriceManually(e.target.value, record.id)}
                            placeholder="Input a number"
                            maxLength={16}
                            type="number"
                            min={1}
                            id="manualinput"
                            defaultValue={formatNumber(record.price)}
                        />
                    );
                } else {
                    return `₱${parseFloat(record.price).toFixed(2)}`;
                }
            }
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
                footer={[
                    <Popconfirm
                        title="Empty the cart"
                        description="Are you sure to empty this cart?"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button key="back">
                      Remove Items
                    </Button>
                    </Popconfirm>,
                    <Button key="submit" type="primary">
                      Checkout
                    </Button>,
                  ]}
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