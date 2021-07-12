import React from "react";
import ReactGoogleSlides from "react-google-slides";



function Slides(link: string) {
    console.log(link);
    return (
        <ReactGoogleSlides
            width={`100%`}
            height={480}
            // slides={props.slidesLink}
            // slidesLink={link}
            // slidesLink={`https://docs.google.com/presentation/d/172oFC8-LBw0GQEymFDbTBn-ORh7wi2ByfUXrXm7H-AM`}
            slidesLink={`https://docs.google.com/presentation/d/1mpzmrQrJby_RcgSbalEuP6m322bqqSXWpoT-k80i-G8/edit`}
            // slidesLink={`https://drive.google.com/file/d/1W_hEDv6u1UUJKM13Vpkr7BqLshigz-nO/view?usp=sharing`}
            slideDuration={5}
            showControls
        />
    );
}

export default Slides;


