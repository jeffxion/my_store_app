import { Layout, Menu } from "antd";
const { Sider } = Layout;

const SideBar = ({ colorBgContain, sideBarItem, onClickFilter }) => {
  const handleCatergory = (val) => {
    onClickFilter(val);
  }

  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={200}
        style={{
          background: colorBgContain,
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          onClick={(e) => handleCatergory(e.domEvent.target.innerHTML)}
          items={sideBarItem}
        />
      </Sider>
    </>
  );
};

export default SideBar;
