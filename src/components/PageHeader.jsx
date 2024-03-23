import { Layout, Input } from "antd";
const { Header } = Layout;
const { Search } = Input;

import TotalModal from "./TotalModal";



const PageHeader = ({ onValSearch, cart, onUpdateCartItemQuantity }) => {
    const onSearch = (value) => {
        onValSearch(value);
    }

    if(cart.items.length >= 1) {
        window.onbeforeunload = function() {
            return "Data will be lost if you leave the page, are you sure?";
        };
    }
    return (
        <>
            <Header id="header"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Search
                placeholder="Find Item..."
                allowClear
                onChange={(e) => onSearch(e.target.value)}
                />
                <TotalModal 
                selectedItems={cart.items}
                onUpdateCartItemQuantity={onUpdateCartItemQuantity} 
                />
            </Header>
        </>
    );
};

export default PageHeader;
