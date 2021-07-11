import React from "react";
import { CardProps } from "@material-ui/core";
import ReactGoogleSlides from "react-google-slides";



function CFcard(props: CardProps) {
    return (
        <ReactGoogleSlides
            width={`100%`}
            height={480}
            // slides={props.slidesLink}
            slidesLink="https://docs.google.com/presentation/d/172oFC8-LBw0GQEymFDbTBn-ORh7wi2ByfUXrXm7H-AM"
            // slidesLink="https://drive.google.com/file/d/1W_hEDv6u1UUJKM13Vpkr7BqLshigz-nO/view?usp=sharing"
            slideDuration={5}
            showControls
        />
    );
}

export default CFcard;


