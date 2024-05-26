import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";

export function ProductModal({ openModal, setOpenModal, addProducts }) {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        quantity: 0,
    });

    const handleSubmitForm = () => {
        addProducts(productData);
    };

    return (
        <>
            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                size="md"
            >
                <Modal.Header>Product Form</Modal.Header>
                <Modal.Body>
                    <form className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Product name" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Product name"
                                onChange={(e) => {
                                    setProductData({
                                        ...productData,
                                        name: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="description"
                                    value="Description"
                                />
                            </div>
                            <Textarea
                                id="description"
                                placeholder="Description"
                                required
                                rows={4}
                                onChange={(e) => {
                                    setProductData({
                                        ...productData,
                                        description: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="quantity" value="Quantity" />
                            </div>
                            <TextInput
                                id="quantity"
                                type="text"
                                placeholder="Quantity"
                                onChange={(e) => {
                                    setProductData({
                                        ...productData,
                                        quantity: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="blue"
                        onClick={() => {
                            handleSubmitForm();
                        }}
                    >
                        Add Product
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProductModal;
