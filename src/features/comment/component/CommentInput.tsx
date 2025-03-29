import { FormControl, OutlinedInput, InputAdornment, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

function CommentInput({open, onSend}: {open: Boolean, onSend: Function}) {
    const [text, setText] = useState("");

    const validate = (text: string) => {
        return text.length <= 500;
    }

    const handleSend = () => {
        if (!validate(text))
            return;

        setText("");
        onSend(text);
    }

    return (
        <>
            {open && (
                <FormControl
                    variant="outlined"
                    sx={{
                        width: "100%",
                    }}
            >
                <OutlinedInput
                    multiline
                    minRows={1}
                    id="comment-input"
                    error={!validate(text)}
                    value={text}
                    sx={{
                        borderRadius: "12px",
                        padding: "10px", 
                        display: "flex",
                        flexDirection: "column"
                    }}
                    placeholder="Введите запрос"
                    onInput={(event: React.FormEvent) => {
                        setText((event.target as HTMLInputElement).value)
                    }}
                    endAdornment={
                        <InputAdornment 
                            position="start"
                            sx={{
                                alignSelf: "end",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "end",
                                columnGap: "10px",
                                mt: "5px"
                            }}
                        >
                            <Typography 
                                color={!validate(text) ? "error" : "textPrimary"}
                                variant="subtitle1" 
                                fontSize={"15px"} 
                                lineHeight={1.5}
                            >
                                {text.length}/500
                            </Typography>
                            <SendIcon 
                                color={!validate(text) ? "disabled" : "inherit"}
                                sx={{
                                    "&:hover": {
                                        cursor: "pointer"
                                    }
                                }}
                                onClick={handleSend}
                            />
                        </InputAdornment>
                    }
                />
            </FormControl>
            )}
        </>
    )
}

export default CommentInput;