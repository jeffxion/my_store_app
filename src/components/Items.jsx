 import ItemModal from '../components/Modal.jsx';

import { Col, Row, Avatar, Card } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
import { IoBagAddOutline } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";

import { ItemList } from '../util/items.js';

const Items = ({ items, searchItems, filterItems, addToCart }) => {
    return (
        <section id="items">
            <Row justify="space-around" className="mb-5">
                {items &&
                    items
                    .filter((item) =>
                    searchItems.toLowerCase() === ''
                        ? true
                        : item.item_name.toLowerCase().includes(searchItems.toLowerCase())
                    )
                    .filter((item) =>
                    filterItems.toLowerCase() === 'all'
                        ? true
                        : item.category.toLowerCase().includes(filterItems.toLowerCase())
                    )
                    .map((item) => (
                        <Col
                            key={item.id}
                            xs={{ span: 16, offset: 1 }}
                            sm={{ span: 8, offset: 1 }}
                            md={{ span: 6, offset: 1 }}
                            lg={{ span: 4, offset: 1 }}
                        >
                            <Card
                            cover={<img alt="example" src={item.img} />}
                            actions={[
                                <ItemModal key={item.id} itemInfo={item} />,
                                <FaCartPlus  key={item.id + 'addOutline'} onClick={() => addToCart(item.id)} />
                            ]}
                            >
                            <Meta
                                title={item.item_name}
                                description={item.price.toFixed(2)}
                            />
                            </Card>
                        </Col>
                    ))}
            </Row>
        </section>
    );
};

export default Items;
