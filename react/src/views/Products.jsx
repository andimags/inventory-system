import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { Badge, Button, Table } from "flowbite-react";
import React, { useEffect, useReducer, useState } from "react";
import Filter from "../components/Filter";
import IndeterminateCheckbox from "../components/IndeterminateCheckbox";
import ProductModal from "../components/ProductModal";
import axiosClient from "./../axios-client";
import { hideSwal, showAlert, showLoading } from "./../utils/swal";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const columnHelper = createColumnHelper();

    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <IndeterminateCheckbox
                    {...{
                        checked: table.getIsAllRowsSelected(),
                        indeterminate: table.getIsSomeRowsSelected(),
                        onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            ),
            cell: ({ row }) => (
                <div className="px-1">
                    <IndeterminateCheckbox
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}
                    />
                </div>
            ),
        },
        columnHelper.accessor("name", {
            cell: (info) => info.getValue(),
            header: () => <span>Product Name</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("description", {
            cell: (info) => <i>{info.getValue()}</i>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("quantity", {
            cell: (info) => info.renderValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("price", {
            cell: (info) => info.renderValue(),
            footer: (info) => info.column.id,
            enableColumnFilter: false,
        }),
        columnHelper.accessor("action", {
            cell: (info) => (
                <>
                    <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-4"
                        data-id={info.row.id}
                    >
                        Edit
                    </a>
                    <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        data-id={info.row.id}
                        onClick={() => {
                            deleteProducts([info.row.id]);
                        }}
                    >
                        Delete
                    </a>
                </>
            ),
            header: "",
            footer: (info) => info.column.id,
            enableColumnFilter: false,
        }),
    ];

    const rerender = useReducer(() => ({}), {})[1];

    const productsTable = useReactTable({
        getRowId: (row) => row.id,
        data: products,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        state: {
            pagination,
            rowSelection,
        },
        enableRowSelection: true,
    });

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

    const deleteProducts = (ids) => {
        ids = ids.map((id) => {
            return Number(id);
        });
        axiosClient
            .delete("/products", {
                data: {
                    ids: JSON.stringify(ids),
                },
            })
            .then((data) => {
                const newProducts = products.filter((product) => {
                    return !ids.includes(product.id);
                });
                setProducts(newProducts);
                setRowSelection({});
                showAlert(
                    "Success",
                    "Product has been deleted successfully!",
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

    useEffect(() => {
        console.log(rowSelection);
    }, [rowSelection]);

    return (
        <>
            <ProductModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                addProducts={addProducts}
            />
            <div className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                    Products List
                </h2>
                <div className="flex">
                    <Button
                        color="blue"
                        className="mr-2"
                        onClick={() => {
                            setOpenModal(true);
                        }}
                    >
                        Add product
                    </Button>
                    <Button
                        color="blue"
                        onClick={() => {
                            deleteProducts(Object.keys(rowSelection));
                        }}
                    >
                        Delete all &nbsp;
                        {Object.keys(rowSelection).length != 0 && (
                            <Badge color="info">
                                {Object.keys(rowSelection).length}
                            </Badge>
                        )}
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <Table.Head>
                        {productsTable.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header) => (
                                <Table.HeadCell key={header.id}>
                                    <div
                                        {...{
                                            className:
                                                header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : "",
                                            onClick:
                                                header.column.getToggleSortingHandler(),
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: " 🔼",
                                            desc: " 🔽",
                                        }[header.column.getIsSorted()] ?? null}
                                        {header.column.getCanFilter() ? (
                                            <div>
                                                <Filter
                                                    column={header.column}
                                                    table={productsTable}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </Table.HeadCell>
                            ))
                        )}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {productsTable.getRowModel().rows.map((row) => (
                            <Table.Row
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                key={row.id}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <Table.Cell
                                        key={cell.id}
                                        className={classNames({
                                            "whitespace-nowrap font-medium text-gray-900 dark:text-white":
                                                cell.column.id == "name",
                                        })}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <div className="h-2" />
                <div className="flex items-center gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => productsTable.firstPage()}
                        disabled={!productsTable.getCanPreviousPage()}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => productsTable.previousPage()}
                        disabled={!productsTable.getCanPreviousPage()}
                    >
                        {"<"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => productsTable.nextPage()}
                        disabled={!productsTable.getCanNextPage()}
                    >
                        {">"}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => productsTable.lastPage()}
                        disabled={!productsTable.getCanNextPage()}
                    >
                        {">>"}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {productsTable.getState().pagination.pageIndex + 1}{" "}
                            of {productsTable.getPageCount().toLocaleString()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={
                                productsTable.getState().pagination.pageIndex +
                                1
                            }
                            onChange={(e) => {
                                const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                productsTable.setPageIndex(page);
                            }}
                            className="border p-1 rounded w-16"
                        />
                    </span>
                    <select
                        value={productsTable.getState().pagination.pageSize}
                        onChange={(e) => {
                            productsTable.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    Showing{" "}
                    {productsTable.getRowModel().rows.length.toLocaleString()}{" "}
                    of {productsTable.getRowCount().toLocaleString()} Rows
                </div>
                <div>
                    {Object.keys(rowSelection).length} of{" "}
                    {productsTable &&
                        productsTable.getPreFilteredRowModel().rows.length}{" "}
                    Total Rows Selected
                </div>
            </div>
        </>
    );
};

export default Products;
