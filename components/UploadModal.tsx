"use client";

import uniqid from "uniqid";
import { FieldValues,  SubmitHandler,  useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toast } from "react-hot-toast";

import useUploadModal from "@/hooks/useUploadModal";

import Modal from "./Modal";
import Input from "./Input"
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { SupabaseClient, useSupabaseClient } from "@supabase/auth-helpers-react";


const UploadModal = () => {
    const [isLoading, setisLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const superbaseClient = useSupabaseClient();

    const{
        register,
        handleSubmit,
        reset


    } = useForm<FieldValues>({
        defaultValues: {
            author:'',
            title: '',
            song: null,
            image: null,
        }
    })

    const onChange = (open: boolean) =>{
        if (!open)
            reset();
        uploadModal.onClose();
    }

    const onSubmit: SubmitHandler<FieldValues>=  async (values) => {
        try{   
            setisLoading(true);

            const imageFile = values.image?.[0];
            const songFile =values.song?.[0];

            if(!imageFile || !songFile || !user){}
            toast.error('Missing fields');
            return;

            const uniqueID = uniqid();

            //Upload song
            const{
                data: songData,
                error: songError,
            } = await SupabaseClient
            .storage
            .from('songs')
        } catch(error) {
            toast.error("Something went wrong");
        } finally{
            setisLoading(false);    
        }

    }

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={() => {}}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                id="title"
                disabled={isLoading}
                {...register('title', {required: true})}
                placeholder="Song title"

                />
            
            <Input
                id="author"
                disabled={isLoading}
                {...register('author', {required: true})}
                placeholder="Song author"

                />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input
                id="song"
                type="file"
                disabled={isLoading}
                accept=".mp3"
                {...register('song', {required: true})}

                />
                </div>
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input
                id="image"
                type="file"
                disabled={isLoading}
                accept=".img/*"
                {...register('image', {required: true})}

                />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
                </form>
        </Modal>
    )
}

export default UploadModal;