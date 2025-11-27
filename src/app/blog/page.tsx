// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { sanityClient, urlFor } from "../../sanity/client"
// import { useRouter } from "next/navigation"
// import {
//   Box,
//   VStack,
//   Heading,
//   Text,
//   SimpleGrid,
//   Container,
//   Button,
//   Alert,
//   AlertIcon,
//   Spinner,
//   Flex,
//   Image,
//   Icon,
//   useBreakpointValue,
// } from "@chakra-ui/react"
// import { FaUserFriends } from "react-icons/fa"
 
// function BlogCard({ post }: { post: any }) {
//   console.log(post.mainImage);
//   console.log(post);
  
  
//   // const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1000).url() : "/placeholder.jpg"
//     return (
      
//     <Box
//       bg="white"
//       borderRadius="2xl"
//       overflow="hidden"
//       border="1px solid"
//       borderColor="gray.100"
//       boxShadow="0 6px 18px rgba(0,0,0,0.08)"
//       transition="all 0.3s ease"
//       _hover={{
//         transform: "translateY(-6px)",
//         boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
//       }}
//     >
//       {/* Top Image (Reduced Height) */}
//       <Box position="relative">
//         <Image
//         src={
//       post.mainImage?.asset?._ref
//         ? urlFor(post.mainImage).url()
//         : "/placeholder.jpg" // ✅ fallback image in /public folder
//     }
//            alt={post.title}
//           w="100%"
//           h={{ base: "160px", md: "180px" }}  // ✅ reduced height
//           objectFit="cover"
//           transition="transform 0.4s ease"
//           _hover={{ transform: "scale(1.05)" }}
//         />
//         <Flex
//           position="absolute"
//           bottom="3"
//           left="3"
//           bg="white"
//           px={3}
//           py={1}
//           borderRadius="full"
//           align="center"
//           boxShadow="md"
//         >
//           <Icon as={FaUserFriends} mr={2} color="gray.700" boxSize={3.5} />
//           <Text fontSize="sm" fontWeight="medium" color="gray.700">
//             Max {post.maxPeople || 20} People
//           </Text>
//         </Flex>
//       </Box>

//       {/* Content Section */}
//       <VStack align="start" spacing={3} p={5}>
//         <Heading
//           as="h3"
//           size="md"
//           fontWeight="semibold"
//           color="gray.800"
//           noOfLines={1}
//           w="full"
//         >
//           {post.title || "Untitled Destination"}
//         </Heading>

//         <Button
//           as={Link}
//            href={`/blog/${post.slug?.current || "#"}`}
//           w="full"
//           mt={1}
//           bgGradient="linear(to-r, blue.500, blue.600)"
//           color="white"
//           borderRadius="full"
//           py={4}
//           fontWeight="semibold"
//           fontSize="sm"
//           letterSpacing="0.3px"
//           _hover={{
//             bgGradient: "linear(to-r, blue.600, blue.700)",
//             transform: "translateY(-2px)",
//             boxShadow: "lg",
//           }}
//           transition="all 0.25s ease"
//         >
//           View Details
//         </Button>
//       </VStack>
//     </Box>
//   )
// }

// export default function BlogPage() {
//   const [posts, setPosts] = useState<any[]>([])
//     const router = useRouter();

//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const gridColumns = useBreakpointValue({ base: 1, sm: 2, lg: 3 })

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const query = `*[_type == "post"]{
//           _id, title, slug, mainImage, _createdAt
//         } | order(_createdAt desc)`
       
//         const data = await sanityClient.fetch(query)
//         setPosts(data)
//         console.log(setPosts(data))
//       } catch {
//         setError("Failed to load posts.")
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchPosts()
//   }, [])

//   return (
//     <Flex
//       minH="100vh"
//       direction="column"
//       align="center"
//       bg="gray.50"
//       py={{ base: 8, md: 12 }}
//     >
//       <Container maxW="container.xl">
//         {/* Header */}
// <Button
//   colorScheme="blackAlpha"
//   bg="red"
//   color="white"
//   borderRadius="xl"
//   px={3}
//   py={1}
//   _hover={{ bg: "gray.800" }}
//   onClick={()=>router.push('/admin')}
// >
//   Generate
// </Button>        <VStack spacing={2} textAlign="center" mb={10}>
//           <Text color="blue.500" fontWeight="semibold" fontSize="sm" letterSpacing="0.8px">
//             POPULAR DESTINATIONS
//           </Text>
//           <Heading as="h1" size="2xl" color="gray.800" fontWeight="extrabold">
//             Explore The World
//           </Heading>
          
//         </VStack>

//         {error && (
//           <Alert status="error" mb={6} borderRadius="md" variant="subtle">
//             <AlertIcon />
//             {error}
//           </Alert>
//         )}

//         {loading ? (
//           <Flex justify="center" align="center" h="60vh">
//             <Spinner size="xl" />
//           </Flex>
//         ) : posts.length > 0 ? (
//           <SimpleGrid columns={gridColumns} spacing={{ base: 6, md: 8 }}>
//             {posts.slice(0, 6).map((post) => (
//               <BlogCard key={post._id} post={post} />
//             ))}
//           </SimpleGrid>
//         ) : (
//           <Text textAlign="center" color="gray.500" mt={10}>
//             No destinations available.
//           </Text>
//         )}
//       </Container>
//     </Flex>
//   )
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sanityClient, urlFor } from "../../sanity/client";
import { useRouter } from "next/navigation";
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Container,
  Button,
  Alert,
  AlertIcon,
  Spinner,
  Flex,
  Image,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaUserFriends } from "react-icons/fa";

// ✅ Blog Card Component
function BlogCard({ post }: { post: any }) {
  // Generate short description from body field
  const shortDesc =
    post.body && post.body[0]?.children
      ? post.body[0].children
          .map((child: any) => child.text)
          .join(" ")
          .slice(0, 150) + "..."
      : "Click below to read the full article.";

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid"
      borderColor="gray.100"
      boxShadow="0 6px 18px rgba(0,0,0,0.08)"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
      }}
    >
      {/* Top Image */}
      <Box position="relative">
        <Image
          src={
            post.mainImage?.asset?._ref
              ? urlFor(post.mainImage).url()
              : "/placeholder.jpg"
          }
          alt={post.title}
          w="100%"
          h={{ base: "160px", md: "180px" }}
          objectFit="cover"
          transition="transform 0.4s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
        {/* <Flex
          position="absolute"
          bottom="3"
          left="3"
          bg="white"
          px={3}
          py={1}
          borderRadius="full"
          align="center"
          boxShadow="md"
        >
          <Icon as={FaUserFriends} mr={2} color="gray.700" boxSize={3.5} />
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            Max {post.maxPeople || 20} People
          </Text>
        </Flex> */}
      </Box>

      {/* Content Section */}
      <VStack align="start" spacing={3} p={5}>
        <Heading
          as="h3"
          size="md"
          fontWeight="semibold"
          color="gray.800"
          noOfLines={1}
          w="full"
        >
          {post.title || "Untitled Destination"}
        </Heading>

        {/* Short Description */}
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {shortDesc}
        </Text>

        {/* Read More Button */}
        <Button
          as={Link}
          href={`/blog/${post.slug?.current || "#"}`}
          w="full"
          mt={1}
          bgGradient="linear(to-r, blue.500, blue.600)"
          color="white"
          borderRadius="full"
          py={4}
          fontWeight="semibold"
          fontSize="sm"
          letterSpacing="0.3px"
          _hover={{
            bgGradient: "linear(to-r, blue.600, blue.700)",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          transition="all 0.25s ease"
        >
          Read More
        </Button>
      </VStack>
    </Box>
  );
}

// ✅ Main Blog Page
export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridColumns = useBreakpointValue({ base: 1, sm: 2, lg: 3 });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"]{
          _id, title, slug, mainImage, body, _createdAt
        } | order(_createdAt desc)`;
        const data = await sanityClient.fetch(query);
        setPosts(data);
      } catch {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      bg="gray.50"
      py={{ base: 8, md: 12 }}
    >
      <Container maxW="container.xl">
       

        <VStack spacing={2} textAlign="center" mb={10}>
          <Text
            color="blue.500"
            fontWeight="semibold"
            fontSize="sm"
            letterSpacing="0.8px"
          >
            POPULAR DESTINATIONS
          </Text>
          <Heading as="h1" size="2xl" color="gray.800" fontWeight="extrabold">
            Explore The World
          </Heading>
        </VStack>

        {error && (
          <Alert status="error" mb={6} borderRadius="md" variant="subtle">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {loading ? (
          <Flex justify="center" align="center" h="60vh">
            <Spinner size="xl" />
          </Flex>
        ) : posts.length > 0 ? (
          <SimpleGrid columns={gridColumns} spacing={{ base: 6, md: 8 }}>
            {posts.slice(0, 6).map((post) => (
              <BlogCard key={post._id} post={post}
               />
             
            ))}
          </SimpleGrid>
        ) : (
          <Text textAlign="center" color="gray.500" mt={10}>
            No destinations available.
          </Text>
        )}
      </Container>
    </Flex>
  );
}
