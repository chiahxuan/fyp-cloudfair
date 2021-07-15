import React from "react"
import ReactGoogleSlides from "react-google-slides";

interface SlideProps {
    slidesLink: string;
    loop?: boolean;
    slideDuration?: number;
    showControls?: boolean;
    position?: number;
    height?: string | number;
    width?: string | number;
    containerStyle?: object | null;
}

const SlideShow: React.FC<SlideProps> = (props) => {
    return (
        <ReactGoogleSlides
            width={`100%`}
            height={480}
            // slidesLink={slideLink}
            slidesLink="https://drive.google.com/file/d/1W_hEDv6u1UUJKM13Vpkr7BqLshigz-nO/view?usp=sharing"
            slideDuration={5}
            showControls
        />

    )

}

export default SlideShow