import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";
import axiosClient from "./../axios-client";
import { hideSwal, showAlert, showLoading } from "./../utils/swal";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const getProducts = () => {
        showLoading();
        axiosClient
            .get("/products")
            .then(function (response) {
                const { data } = response.data;
                setProducts(data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                hideSwal();
            });
    };

    const addProducts = (payload) => {
        axiosClient
            .post("/products", payload)
            .then(() => {
                setProducts([payload, ...products]);
                showAlert(
                    "Success",
                    "Product has been added successfully!",
                    "success"
                );
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setOpenModal(false);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <ProductModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                addProducts={addProducts}
            />
            <div className="overflow-x-auto">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                        Products List
                    </h2>
                    <Button
                        color="blue"
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        Add product
                    </Button>
                </div>

                <div className="relative overflow-x-auto">
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
                                        <Table.Row
                                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                            key={index}
                                        >
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {product.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {product.description}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {product.quantity}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {product.price}
                                            </Table.Cell>
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
            </div>
        </>
    );
};

export default Products;
