import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';



type PropsType = {
    grade: number
}


export  function HalfRating(props: PropsType) {
    return (
        <Stack spacing={1}>
            {/*<Rating name="half-rating" defaultValue={2.5} precision={0.5} />*/}
            <Rating style={{display: 'flex', justifyContent: 'center'}} name="half-rating-read" defaultValue={props.grade} precision={0.5} readOnly />
        </Stack>
    );
}