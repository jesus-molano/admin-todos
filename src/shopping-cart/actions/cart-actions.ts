import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }
  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();
  cookieCart[id] ? (cookieCart[id] += 1) : (cookieCart[id] = 1);
  setCookie("cart", JSON.stringify(cookieCart));
};

export const deleteProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    delete cookieCart[id];
    setCookie("cart", JSON.stringify(cookieCart));
  }
};
