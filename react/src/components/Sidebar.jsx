import classNames from "classnames";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { useState } from "react";
import {
    HiArrowSmRight,
    HiChartPie,
    HiShoppingBag,
    HiTable,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const [activeNavItem, SetActiveNavItem] = useState(
        useLocation().pathname.slice(1)
    );

    const handleNavItemClick = (navItem) => {
        SetActiveNavItem(navItem);
        console.log(navItem);
    };

    const navItemClass = (navItem) => {
        return classNames({
            "bg-slate-200 font-semibold": activeNavItem == navItem,
        });
    };

    return (
        <FlowbiteSidebar
            aria-label="Sidebar with logo branding example"
            className="min-h-screen"
        >
            <FlowbiteSidebar.Logo
                href="#"
                img="/favicon.svg"
                imgAlt="Flowbite logo"
            >
                Flowbite
            </FlowbiteSidebar.Logo>
            <FlowbiteSidebar.Items>
                <FlowbiteSidebar.ItemGroup>
                    <FlowbiteSidebar.Item
                        href="#"
                        icon={HiChartPie}
                        className={navItemClass("dashboard")}
                        as={Link}
                        to="/dashboard"
                        onClick={() => {
                            handleNavItemClick("dashboard");
                        }}
                    >
                        Dashboard
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                        href="#"
                        icon={HiShoppingBag}
                        className={navItemClass("products")}
                        as={Link}
                        to="/products"
                        onClick={() => {
                            handleNavItemClick("products");
                        }}
                    >
                        Products
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item href="#" icon={HiArrowSmRight}>
                        Sign In
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item href="#" icon={HiTable}>
                        Sign Up
                    </FlowbiteSidebar.Item>
                </FlowbiteSidebar.ItemGroup>
            </FlowbiteSidebar.Items>
        </FlowbiteSidebar>
    );
};

export default Sidebar;
