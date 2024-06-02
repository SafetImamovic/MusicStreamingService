"use client";

import {TbPlaylist} from "react-icons/tb";
import {AiOutlinePlus} from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";


const Library = () => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabase = useSupabaseClient();

    const onClick = async () => {
        if (!user)
        {
            return authModal.onOpen();
        }

        const { data, error } = await supabase.from('users').select('admin').eq('id', user.id)

        if (error)
        {
            return toast.error("Sorry, you're not an Admin.")
        }

        if (data[0].admin)
        {
            return uploadModal.onOpen();
        }
        else
        {
            // Handle non-admin case (optional)
            toast.error("You are not authorized to upload.");
        }

    };
    return ( 
        <div className="flex flex-col">
            <div
            className="
            flex
            items-center
            justify-between
            px-5
            pt-4
            "
            >
                <div
                className="
                inline-flex
                items-center
                gap-x-2
                "
                >
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="
                    text-neutral-400
                    font-medium
                    text-md
                    "
                    >
                        Your Library
                    </p>
                </div>
            <AiOutlinePlus 
            onClick={onClick}
            size={20}
            className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
            "
            />
            </div>
            <div className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
            ">
                List of Songs!
            </div>
        </div>
     );
}
 
export default Library;