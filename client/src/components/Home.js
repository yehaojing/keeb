import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper"
import KeyboardCard from "./KeyboardCard";
import KeyboardForm from "./KeyboardForm";
import keyboardService from "../services/keyboard";

const Home = () => {
    const [keyboards, setKeyboards] = useState([]);

    const hook = () => {
        keyboardService.getAll().then((response) => {
            setKeyboards(response);
        });
    };
    useEffect(hook, []);
    const deleteHandler = (id) => {
        return async () => {
            await keyboardService.deleteKeyboard(id);
            const keyboardResp = await keyboardService.getAll();
            setKeyboards(keyboardResp);
        };
    };

    const postHandler = async (newKeyboard) => {
        await keyboardService.postNewKeyboard(newKeyboard);
        const keyboardResp = await keyboardService.getAll();
        setKeyboards(keyboardResp);
    };

    return (
        <Paper style={{marginTop: 80}}>
            <Container maxWidth="sm">
                <Box sx={{ my: 4 }}>
                    {keyboards.map((keyboard) => {
                        return (
                            <KeyboardCard
                                key={keyboard.id}
                                keyboard={keyboard}
                                handleDelete={deleteHandler(keyboard.id)}
                            />
                        );
                    })}
                    <KeyboardForm handlePost={postHandler} />
                </Box>
            </Container>
        </Paper>

    )
}

export default Home
