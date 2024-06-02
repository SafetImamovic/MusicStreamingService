import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
    return ( 
        <button 
        className="
        transition
        opacity-0
        rounded-full
        items-center
        bg-purple-500
        p-4
        drop-shadow-md
        translate
        translate-y-1/4
        group-hover:opacity-100
        group-hover:translate-100
        hover:scale-100 
        "
        >
            <FaPlay className="text-white"/>
        </button>
     );
}
 
export default PlayButton;