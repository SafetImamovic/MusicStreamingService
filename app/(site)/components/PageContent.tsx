"use client";

import SongItem from "@/components/SongItem";
import { Song } from "@/types"

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => { 
    if (songs.length === 0){
        return (
            <div className="mt-4 text-neutral-400"> 
                No songs availabe.
            </div>
        )
    }
    return (
        <div
        className="
            grid
            grid-cols-3
            sm-gird-cols-3
            md-grid-cols-3
            lg-grid-cols-4
            xl-gid-cols-5
            2xl-cols-8
            gap-4
            md-4
        "
        >
            {songs.map((item)=>(
                <SongItem 
                key={item.id}
                onClick={() => {}}
                data={item}
                />
            ))}
            
        </div>
    )
}

export default PageContent;