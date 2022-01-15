import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

type Props = any;

export function Caption(props: Props) {
    const { key } = props;
    function handleOnBlur() {}

    return (
        <TextField
            InputProps={{
                startAdornment: (
                    <Typography component="span">{key + 1}.</Typography>
                ),
            }}
            onBlur={handleOnBlur}
        />
    );
}
