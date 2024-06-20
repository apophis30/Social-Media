import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text, useToast } from "@chakra-ui/react"
import Actions from "../components/Actions"
import useGetUserProfile from "../hooks/useGetUserProfile"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatDistanceToNowStrict } from "date-fns"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import { DeleteIcon } from "@chakra-ui/icons"
import Comment from "../components/Comment"
import postsAtom from "../atoms/postsAtom"

const PostPage = () => {
    const { user, loading } = useGetUserProfile()
    const [posts, setPosts] = useRecoilState(postsAtom)
    const toast = useToast()
    const { pid } = useParams()
    const currentUser = useRecoilValue(userAtom)
    const navigate = useNavigate()
    const currentPost = posts[0];

    useEffect(() => {
        const getPost = async () => {
            // console.log("Fetching post for pid:", pid); // Debugging statement
            setPosts([])
            try {
                const res = await fetch(`/api/posts/${pid}`)
                const data = await res.json()

                if (data.error) {
                    toast({
                        title: "Error",
                        description: data.error,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    })
                    return;
                }
                setPosts([data])
                // console.log("Post data received:", data); // Debugging statement
            } catch (err) {
                // console.log(err)
                // console.log("Error fetching post:", err); // Debugging statement
            }
        }

        getPost()
    }, [pid, toast, setPosts])

    const handleDeletePost = async () => {
        try {

            if (!window.confirm("Are you sure you want to delete the post ?")) return;
            const res = await fetch(`/api/posts/${currentPost._id}`, {
                method: "DELETE"
            })
            const data = res.json()
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
                return;
            }
            toast({
                title: "Success",
                description: "Post deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            navigate(`/${user.username}`)

        } catch (err) {
            console.log(err)
        }
    }

    // if (!user && loading) {
    //     return (
    //         <Flex justifyContent={"center"}>
    //             <Spinner size={"xl"} />
    //         </Flex>
    //     )
    // }

    if (loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!currentPost) return null

    return (
        <>
            <Flex>
                <Flex w={"full"} alignItems={"center"} gap={3}>
                    <Avatar size='md' name="Mark Zuckerberg" src={user.profilePic} />
                    <Flex>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
                        <Image src="/verified.png" w={4} h={4} ml={1} />
                    </Flex>
                </Flex>

                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"sm"} width={36} textAlign={"right"} color={"gray.light"}>
                        {formatDistanceToNowStrict(new Date(currentPost.createdAt))} ago
                    </Text>
                    {currentUser?._id === user._id && (
                        <DeleteIcon size={10} onClick={handleDeletePost}
                            cursor={"pointer"}
                        />
                    )}
                </Flex>
            </Flex>

            <Text my={3}>{currentPost.text}</Text>
            <Box
                borderRadius={6}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.light"}
            >
                <Image src={currentPost.img} w={"full"} />
            </Box>

            <Flex gap={3} my={3}>
                <Actions post={currentPost} />
            </Flex>

            <Divider my={4} />

            {/* <Flex justifyContent={"space-between"} my={"3"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>Get the app to like, reply and post</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>

            <Divider gap={4} /> */}

            {currentPost.replies.map((reply) => (
                <Comment
                    key={reply._id}
                    reply={reply}
                    lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
                />
            ))}

        </>
    )
}

export default PostPage