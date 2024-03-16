"use client";

import type { Product } from "@/products/data/products";
import Image from "next/image";

import { IoAddCircleOutline, IoRemove } from "react-icons/io5";
// import {} from "../actions/actions";

import { useRouter } from "next/navigation";
import {
  addProductToCart,
  deleteSingleProductFrontCart,
} from "@/shopping-cart/actions/cart-actions";

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCart = ({ product, quantity }: Props) => {
  const router = useRouter();

  function onAddToCart() {
    addProductToCart(product.id);
    router.refresh();
  }

  function onRemoveItem() {
    deleteSingleProductFrontCart(product.id);
    router.refresh();
  }

  return (
    <div className="flex items-center shadow-lg rounded-lg w-full bg-white border-blue-700">
      {/* Product Image */}
      <div className="p-2">
        <Image
          width={200}
          height={200}
          className="rounded"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Title */}
      <div className="px-5 pb-5 w-full flex flex-col mt-2">
        <a href="#">
          <h3 className="font-semibold text-xl tracking-tight ">
            {product.name} -{" "}
            <small className="text-sm">${product.price.toFixed(2)}</small>
          </h3>
        </a>

        {/* Price and Add to Cart */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-gray-900 ">Cantidad: {quantity}</span>
          <span className="font-bold ">
            Total: ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex gap-4 p-5 items-center justify-center ">
        <button
          onClick={onAddToCart}
          className="text-white bg-gradient-to-r from-sky-400 to-sky-700  focus:ring-4 focus:ring-blue-300 hover:opacity-65 font-medium rounded-lg text-sm px-3 py-2 text-center "
        >
          <IoAddCircleOutline size={20} />
        </button>
        <span className="text-2xl ">{quantity}</span>
        <button
          onClick={onRemoveItem}
          className="text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center "
        >
          <IoRemove size={20} />
        </button>
      </div>
    </div>
  );
};
