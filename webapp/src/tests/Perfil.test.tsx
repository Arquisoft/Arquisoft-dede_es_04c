import { SessionProvider } from "@inrupt/solid-ui-react";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { UserProvider } from "../context/userProvider";
import Perfil from "../pages/Perfil";


test('check that the page is rendering with one order', async () => {
    const { getByText, queryByText } = render(<SessionProvider><UserProvider><Perfil/></UserProvider></SessionProvider>);
    expect(getByText('POD no vinculado')).toBeInTheDocument();
    expect(getByText('Por favor, conéctate con tu POD para que podamos utilizar tus datos')).toBeInTheDocument();
    expect(getByText('Entra con tu POD')).toBeInTheDocument();
    fireEvent.click(getByText("Entra con tu POD"));
})