import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import axiosClient from "./../axios-client";

const Products = () => {
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        axiosClient
            .get("/products")
            .then(function (response) {
                const { data } = response.data;
                setProducts(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Products List
            </h2>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                        <span className="sr-only">Delete</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {products &&
                        products.map((product, index) => {
                            return (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {product.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {product.description}
                                    </Table.Cell>
                                    <Table.Cell>{product.quantity}</Table.Cell>
                                    <Table.Cell>{product.price}</Table.Cell>
                                    <Table.Cell>
                                        <a
                                            href="#"
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-4"
                                        >
                                            Edit
                                        </a>
                                        <a
                                            href="#"
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        >
                                            Delete
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default Products;
