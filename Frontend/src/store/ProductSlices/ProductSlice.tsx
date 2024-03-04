import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  price: "",
  stock: "",
  color: "",
  brand: "",
  size: "",
  supplier: "",
  supplier_address: "",
  category: "",
  image: "",
};

export const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});
export default productSlice.reducer;
export const { setProduct } = productSlice.actions;
