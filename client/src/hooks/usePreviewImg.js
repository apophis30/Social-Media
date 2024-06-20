/* eslint-disable no-unused-vars */
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null)
    const toast = useToast()

    const handleImageChange = (e) => {
        // console.log("aa gaya")
        const file = e.target.files[0];
        console.log(file)

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()

            reader.onloadend = () => {
                console.log("Base64 string:", reader.result);
                setImgUrl(reader.result)
            }

            reader.readAsDataURL(file)
        }
        else {
            toast({
                title: "Invalidfile type",
                description: "Please select an image file",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            setImgUrl(null)
        }
    }

    return { handleImageChange, imgUrl, setImgUrl }
}

export default usePreviewImg