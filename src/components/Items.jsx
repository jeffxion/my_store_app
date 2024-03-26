 import ItemModal from '../components/Modal.jsx';

import { Col, Row, Card } from "antd";
const { Meta } = Card;
import { FaCartPlus } from "react-icons/fa";

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
                            xs={{ span: 12, offset: 1 }}
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
