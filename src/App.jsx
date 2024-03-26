import React, { useState } from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import {Layout, theme, message } from "antd";
const { Content } = Layout;

import SideBar from "./components/SideBar";
import PageHeader from "./components/PageHeader";
import Items from "./components/Items";

import { ItemList, categories } from "./util/items";

const items2 = categories.map(
    (icon) => ({
      key: String(icon.id),
      label: icon.category,
    }),
  );

const App = () => {
    const [ search, setSearch ] = useState('');
    const [ filter, setFilter ] = useState('');
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });

    const [messageApi, contextHolder] = message.useMessage();

    const handleAddToCart = (id) => {
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];
      
            const existingCartItemIndex = updatedItems.findIndex(
              (cartItem) => cartItem.id === id
            );
            const existingCartItem = updatedItems[existingCartItemIndex];
      
            if (existingCartItem) {
              const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
              };
              updatedItems[existingCartItemIndex] = updatedItem;
            } else {
              const product = ItemList.find((product) => product.id === id);
              updatedItems.push({
                id: id,
                img: product.img,
                name: product.item_name,
                price: product.price,
                quantity: 1,
                fix_price: product.fix_price
              });
            }
            
           
              
                messageApi.open({
                  type: 'success',
                  content: 'Item added to cart',
                });
              
            

            return {
              items: updatedItems,
            };
        });
    }

    const handleUpdateCartItemQuantity = (productId, amount) => {
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === productId.id
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            items: updatedItems,
          };
        });
    }

    const handleManualPriceInput = (inputPrice, id) => {
      setShoppingCart((prevShoppingCart) => {
        const updatedItems = [...prevShoppingCart.items];
        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === id
        );
  
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };
  
        updatedItem.price = inputPrice;
        updatedItems[updatedItemIndex] = updatedItem;
  
        return {
          items: updatedItems,
        };
      });
    }

    const handleEmptyCart = () => {
      setShoppingCart((prevShoppingCart) => {
        const updatedItems = [...prevShoppingCart.items];
        updatedItems.splice(0,updatedItems.length );
        return {
          items: updatedItems,
        };
      });
    }

    const handleOnchange = (val) => {setSearch(val)}

    const handleOnclick = (categoryVal) => { setFilter(categoryVal) }

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
      <>
        {contextHolder}
        <Layout>
            <PageHeader 
            onValSearch={handleOnchange} 
            cart={shoppingCart}
            onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
            onInputPriceManually={handleManualPriceInput}
            onEmptyCart={handleEmptyCart}
            />
            <Layout>
                <SideBar onClickFilter={handleOnclick} colorBgContain={colorBgContainer} sideBarItem={items2} />
                <Layout
                    style={{
                        padding: "0 24px 24px",
                    }}
                >
                    <Content
                        style={{
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        margin: "16px 0",
                        }}
                    >
                        <Items 
                        filterItems={filter} 
                        searchItems={search} 
                        items={ItemList}
                        addToCart={handleAddToCart} />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        </>
    );
};
export default App;
