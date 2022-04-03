import { render, fireEvent } from "@testing-library/react";
import React, {useContext} from "react";
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from "../context/cartProvider";
import { CartContext } from '../context/cartContext';
import {Producto} from "../interface/interfaces";

test('check that the Cart is empty', async () => {
    const {container, getByText} = render(<CartProvider><CartDrawer products={[]}/></CartProvider>);
    const buttonCart  = container.querySelector('.buttonCart')!;
    fireEvent.click(buttonCart, {});
    expect(getByText('Carrito')).toBeInTheDocument();
    expect(getByText("La cesta está vacía")).toBeInTheDocument();
    expect(getByText("Total del importe: 0.00 €")).toBeInTheDocument();
});

test('check that the products are rendered', async ()=>{

    const initialState: Producto[] = [
{
            id: 'pollo',
            nombre: 'pollo',
            precio: 1.5,
            cantidad: 1
        },{
            id: 'tortilla',
            nombre: 'tortilla',
            precio: 2,
            cantidad: 1
        }
    ]
   
    const {container, getByText} = render(<CartProvider><CartDrawer products={initialState}/></CartProvider>);

    const buttonCart  = container.querySelector('.buttonCart')!;
    fireEvent.click(buttonCart, {});

    expect(getByText('Carrito')).toBeInTheDocument();
    expect(getByText('pollo')).toBeInTheDocument();
    expect(getByText('tortilla')).toBeInTheDocument();
    expect(getByText("Total del importe: 3.50 €")).toBeInTheDocument();
})