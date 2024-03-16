import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/products";
import { ItemCart } from "@/shopping-cart";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cart Products Page",
  description: "Cart Products Page",
};

type Cart = {
  [key: string]: number;
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProducstInCart = (cart: Cart): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];
  for (const id of Object.keys(cart)) {
    const product = products.find((product) => product.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }
  return productsInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get("cart")?.value || "{}") as Cart;
  const productsInCart = getProducstInCart(cart);

  const taxes = 0.15;
  const taxesPercentage = taxes * 100;
  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );

  return (
    <div>
      <h1 className="text-2xl">All products in the cart</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map(({ product, quantity }) => (
            <ItemCart key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total price">
            <div className="flex justify-center gap-4">
              <h3 className="text-xl font-bold text-gray-700">
                ${(totalToPay * (taxes + 1)).toFixed(2)}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Taxes of {taxesPercentage}%: ${totalToPay * taxes}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
