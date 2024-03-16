import Image from "next/image";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import { Star } from "../Star";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  rating,
  image,
}: ProductCardProps) => {
  return (
    <div className="bg-white shadow-xl rounded-lg max-w-sm border-blue-900">
      {/* Product Image */}
      <div className="p-2">
        <Image
          width={500}
          height={500}
          className="rounded"
          src={image}
          alt="product image"
        />
      </div>

      {/* Title */}
      <div className="px-5 pb-5">
        <a href="#">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight ">
            {name}
          </h3>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          {/* Stars */}
          {Array(rating)
            .fill(0)
            .map((_, index) => (
              <Star key={index} />
            ))}

          {/* Rating Number */}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex gap-1 items-center justify-between">
          <span className="text-xl font-bold text-gray-900 ">$599</span>

          <div className="flex">
            <button className="text-white mr-2 bg-gradient-to-r from-sky-400 to-sky-700  focus:ring-4 focus:ring-blue-300 hover:opacity-65 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
              <IoAddCircleOutline size={25} />
            </button>
            <button className="text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
              <IoTrashOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
