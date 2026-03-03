import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ImageCarouselProps {
    imagesURL: string[];
    currentIndex: number;
    altText: string;
    onNextImage: () => void;
    onPreviousImage: () => void;
}

export default function ImageCarousel({ imagesURL, currentIndex, altText, onNextImage, onPreviousImage }: ImageCarouselProps) {
    const currentImage = imagesURL[currentIndex] || imagesURL[0];

    return (
        <div className={`flex justify-center items-center w-fit`}>
            {/* cuadro de imagen principal */}
            <div className="flex justify-center items-center w-full h-full">
                <Button variant={"outline"} onClick={onPreviousImage} className="hover:bg-secondary mr-1 rounded-full">
                    <ArrowLeft size={20}  />
                </Button>
                <Image
                    src={currentImage}
                    alt={altText}
                    width={350}
                    height={350}
                    unoptimized={true}
                    className="object-cover max-h-70 max-w-70 rounded-md"
                />
                <Button variant={"outline"} onClick={onNextImage} className="hover:bg-secondary ml-1 rounded-full">
                    <ArrowRight size={20}  />
                </Button>
            </div>
        </div>
    )
}