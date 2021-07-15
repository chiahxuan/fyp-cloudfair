import React from "react";
import ReactGoogleSlides from "react-google-slides";



function Slides(link: string) {
    console.log(link);
    return (
        <ReactGoogleSlides
            width={`100%`}
            height={480}
            slidesLink={`https://docs.google.com/presentation/d/1mpzmrQrJby_RcgSbalEuP6m322bqqSXWpoT-k80i-G8/edit`}
            slideDuration={5}
            showControls
        />
    );
}

export default Slides;


