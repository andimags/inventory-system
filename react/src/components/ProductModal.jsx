import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";

export function ProductModal({
    openModal,
    setOpenModal,
    productFormData,
    setProductFormData,
    addProducts,
    updateProduct,
}) {
    const handleSubmitForm = () => {
        if (productFormData.method == "POST") {
            console.log("POST");
            addProducts(productFormData);
        }
        if (productFormData.method == "PUT") {
            console.log("PUT");
            updateProduct(productFormData);
        }
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
                                    setProductFormData({
                                        ...productFormData,
                                        name: e.target.value,
                                    });
                                }}
                                value={productFormData.name}
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
                                    setProductFormData({
                                        ...productFormData,
                                        description: e.target.value,
                                    });
                                }}
                                value={productFormData.description}
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
                                    setProductFormData({
                                        ...productFormData,
                                        quantity: e.target.value,
                                    });
                                }}
                                value={productFormData.quantity}
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
